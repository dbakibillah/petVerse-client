import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { HiFilter, HiOutlineSearch, HiSparkles, HiX } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/shop/ProductCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllProducts = () => {
    const axiosPublic = useAxiosPublic();
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get("category");

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(
        categoryParam || ""
    );
    const [priceRange, setPriceRange] = useState([0, 99999]);
    const [showFiltersMobile, setShowFiltersMobile] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [maxPrice, setMaxPrice] = useState(99999);
    const [hasInitialScroll, setHasInitialScroll] = useState(false);

    // Scroll to top only on initial load
    useEffect(() => {
        if (!hasInitialScroll) {
            window.scrollTo(0, 0);
            setHasInitialScroll(true);
        }
    }, [hasInitialScroll]);

    // Handle scroll event for showing/hiding search bar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Update selectedCategory when URL parameter changes
    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        } else {
            setSelectedCategory("");
        }
    }, [categoryParam]);

    const {
        data: products = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axiosPublic.get("/products");
            const prices = response.data.map((p) => p.price);
            const calculatedMax = Math.max(...prices, 99999);
            setMaxPrice(calculatedMax);
            setPriceRange([0, calculatedMax]);
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
    });

    const categories = useMemo(() => {
        return [...new Set(products.map((product) => product.category))];
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory
                ? product.category === selectedCategory
                : true;
            const matchesPrice =
                product.price >= priceRange[0] &&
                product.price <= priceRange[1];
            return matchesSearch && matchesCategory && matchesPrice;
        });
    }, [products, searchTerm, selectedCategory, priceRange]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        if (category) {
            searchParams.set("category", category);
        } else {
            searchParams.delete("category");
        }
        setSearchParams(searchParams);
    };

    const resetFilters = () => {
        setSearchTerm("");
        setSelectedCategory("");
        setPriceRange([0, maxPrice]);
        setSearchParams({});
    };

    const handlePriceChange = (index, value) => {
        const newPriceRange = [...priceRange];
        const numValue = Number(value);

        if (isNaN(numValue)) return;

        newPriceRange[index] = Math.min(
            Math.max(numValue, 0),
            index === 0 ? priceRange[1] : maxPrice
        );

        if (index === 0 && newPriceRange[0] > newPriceRange[1]) {
            newPriceRange[1] = newPriceRange[0];
        } else if (index === 1 && newPriceRange[1] < newPriceRange[0]) {
            newPriceRange[0] = newPriceRange[1];
        }

        setPriceRange(newPriceRange);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(price);
    };

    const minPercentage = (priceRange[0] / maxPrice) * 100;
    const maxPercentage = 100 - (priceRange[1] / maxPrice) * 100;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full mb-6"
                ></motion.div>
                <motion.p
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1,
                    }}
                    className="text-xl text-gray-600 font-medium"
                >
                    Loading our furry favorites...
                </motion.p>
            </div>
        );
    }

    if (isError) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center"
            >
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <HiX className="text-red-600 text-3xl" />
                </div>
                <h3 className="text-2xl font-semibold text-red-600 mb-3">
                    Oops!
                </h3>
                <p className="text-gray-600 max-w-md mb-6">
                    {error?.message ||
                        "We couldn't fetch the products. Please try again later."}
                </p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                    <FiRefreshCw className="animate-spin" /> Retry
                </motion.button>
            </motion.div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 py-10">
            <AnimatePresence>
                {isScrolled && (
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ type: "spring", damping: 25 }}
                        className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 py-3 px-4"
                    >
                        <div className="max-w-4xl mx-auto relative">
                            <HiOutlineSearch className="absolute left-4 top-3.5 text-gray-400 text-xl" />
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search for pet products..."
                                className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm text-gray-700 placeholder-gray-400 transition"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <div className="inline-flex items-center bg-orange-50 text-primary px-4 py-2 rounded-full mb-4">
                    <HiSparkles className="mr-2" />
                    <span className="text-sm font-medium">
                        Premium Pet Products
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Pamper Your{" "}
                    <span className="text-primary">Furry Friend</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                    Discover handpicked products to keep your pet happy,
                    healthy, and stylish
                </p>

                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="max-w-3xl mx-auto relative"
                >
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <HiOutlineSearch className="text-gray-400 text-xl" />
                    </div>
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for treats, toys, or accessories..."
                        className="w-full pl-12 pr-5 py-3 md:py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-lg text-gray-700 placeholder-gray-400 transition"
                    />
                </motion.div>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="hidden lg:block w-72 xl:w-80 flex-shrink-0"
                >
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Filters
                            </h2>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={resetFilters}
                                className="text-sm text-orange-600 hover:text-orange-800 transition flex items-center gap-1"
                            >
                                <FiRefreshCw size={14} /> Reset
                            </motion.button>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-gray-700 font-medium mb-3 text-sm uppercase tracking-wider">
                                Categories
                            </h3>
                            <div className="space-y-2">
                                <motion.button
                                    whileHover={{ x: 5 }}
                                    onClick={() => handleCategorySelect("")}
                                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                        selectedCategory === ""
                                            ? "bg-orange-50 text-orange-700 border-l-4 border-orange-600 shadow-inner"
                                            : "text-gray-700 hover:bg-gray-50 hover:shadow-sm"
                                    }`}
                                >
                                    All Products
                                </motion.button>
                                {categories.map((cat) => (
                                    <motion.button
                                        key={cat}
                                        whileHover={{ x: 5 }}
                                        onClick={() =>
                                            handleCategorySelect(cat)
                                        }
                                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                            selectedCategory === cat
                                                ? "bg-orange-50 text-orange-700 border-l-4 border-orange-600 shadow-inner"
                                                : "text-gray-700 hover:bg-gray-50 hover:shadow-sm"
                                        }`}
                                    >
                                        {cat}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-gray-700 font-medium mb-4 text-sm uppercase tracking-wider">
                                Price Range
                            </h3>
                            <div className="mb-4">
                                <div className="flex justify-between text-sm text-gray-500 mb-2">
                                    <span>{formatPrice(priceRange[0])}</span>
                                    <span>{formatPrice(priceRange[1])}</span>
                                </div>
                                <div className="relative h-2 bg-gray-200 rounded-full">
                                    <div
                                        className="absolute h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                                        style={{
                                            left: `${minPercentage}%`,
                                            right: `${maxPercentage}%`,
                                        }}
                                    ></div>
                                    <input
                                        type="range"
                                        min={0}
                                        max={maxPrice}
                                        step={
                                            maxPrice > 1000
                                                ? Math.floor(maxPrice / 100)
                                                : 1
                                        }
                                        value={priceRange[0]}
                                        onChange={(e) =>
                                            handlePriceChange(0, e.target.value)
                                        }
                                        className="absolute w-full appearance-none h-2 bg-transparent pointer-events-none top-0 left-0"
                                    />
                                    <input
                                        type="range"
                                        min={0}
                                        max={maxPrice}
                                        step={
                                            maxPrice > 1000
                                                ? Math.floor(maxPrice / 100)
                                                : 1
                                        }
                                        value={priceRange[1]}
                                        onChange={(e) =>
                                            handlePriceChange(1, e.target.value)
                                        }
                                        className="absolute w-full appearance-none h-2 bg-transparent pointer-events-none top-0 left-0"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex-1">
                                    <label className="block text-xs text-gray-500 mb-1">
                                        Min
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-gray-400">
                                            $
                                        </span>
                                        <input
                                            type="number"
                                            min={0}
                                            max={priceRange[1]}
                                            value={priceRange[0]}
                                            onChange={(e) =>
                                                handlePriceChange(
                                                    0,
                                                    e.target.value
                                                )
                                            }
                                            className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs text-gray-500 mb-1">
                                        Max
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-gray-400">
                                            $
                                        </span>
                                        <input
                                            type="number"
                                            min={priceRange[0]}
                                            max={maxPrice}
                                            value={priceRange[1]}
                                            onChange={(e) =>
                                                handlePriceChange(
                                                    1,
                                                    e.target.value
                                                )
                                            }
                                            className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={resetFilters}
                            className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 transition-all rounded-xl py-3 font-medium text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                            <HiX /> Clear All Filters
                        </motion.button>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {showFiltersMobile && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 overflow-y-auto"
                        >
                            <div className="flex min-h-screen">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 bg-black bg-opacity-50"
                                    onClick={() => setShowFiltersMobile(false)}
                                ></motion.div>

                                <motion.div
                                    initial={{ x: "100%" }}
                                    animate={{ x: 0 }}
                                    exit={{ x: "100%" }}
                                    transition={{ type: "spring", damping: 30 }}
                                    className="relative bg-white w-4/5 max-w-sm ml-auto h-screen overflow-y-auto"
                                >
                                    <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center shadow-sm">
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            Filters
                                        </h2>
                                        <button
                                            onClick={() =>
                                                setShowFiltersMobile(false)
                                            }
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <HiX className="text-2xl" />
                                        </button>
                                    </div>

                                    <div className="p-6">
                                        <div className="mb-8">
                                            <h3 className="text-gray-700 font-medium mb-4 text-sm uppercase tracking-wider">
                                                Categories
                                            </h3>
                                            <div className="grid grid-cols-2 gap-3">
                                                <motion.button
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() =>
                                                        handleCategorySelect("")
                                                    }
                                                    className={`px-4 py-3 rounded-xl text-sm font-medium transition ${
                                                        selectedCategory === ""
                                                            ? "bg-orange-600 text-white shadow-md"
                                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                    }`}
                                                >
                                                    All
                                                </motion.button>
                                                {categories.map((cat) => (
                                                    <motion.button
                                                        key={cat}
                                                        whileTap={{
                                                            scale: 0.95,
                                                        }}
                                                        onClick={() =>
                                                            handleCategorySelect(
                                                                cat
                                                            )
                                                        }
                                                        className={`px-4 py-3 rounded-xl text-sm font-medium transition ${
                                                            selectedCategory ===
                                                            cat
                                                                ? "bg-orange-600 text-white shadow-md"
                                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                        }`}
                                                    >
                                                        {cat}
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mb-8">
                                            <h3 className="text-gray-700 font-medium mb-4 text-sm uppercase tracking-wider">
                                                Price Range
                                            </h3>
                                            <div className="mb-4">
                                                <div className="flex justify-between text-sm text-gray-500 mb-2">
                                                    <span>
                                                        {formatPrice(
                                                            priceRange[0]
                                                        )}
                                                    </span>
                                                    <span>
                                                        {formatPrice(
                                                            priceRange[1]
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="relative h-2 bg-gray-200 rounded-full">
                                                    <div
                                                        className="absolute h-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                                                        style={{
                                                            left: `${minPercentage}%`,
                                                            right: `${maxPercentage}%`,
                                                        }}
                                                    ></div>
                                                    <input
                                                        type="range"
                                                        min={0}
                                                        max={maxPrice}
                                                        step={
                                                            maxPrice > 1000
                                                                ? Math.floor(
                                                                      maxPrice /
                                                                          100
                                                                  )
                                                                : 1
                                                        }
                                                        value={priceRange[0]}
                                                        onChange={(e) =>
                                                            handlePriceChange(
                                                                0,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="absolute w-full appearance-none h-2 bg-transparent pointer-events-none top-0 left-0"
                                                    />
                                                    <input
                                                        type="range"
                                                        min={0}
                                                        max={maxPrice}
                                                        step={
                                                            maxPrice > 1000
                                                                ? Math.floor(
                                                                      maxPrice /
                                                                          100
                                                                  )
                                                                : 1
                                                        }
                                                        value={priceRange[1]}
                                                        onChange={(e) =>
                                                            handlePriceChange(
                                                                1,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="absolute w-full appearance-none h-2 bg-transparent pointer-events-none top-0 left-0"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1">
                                                    <label className="block text-xs text-gray-500 mb-1">
                                                        Min
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        max={priceRange[1]}
                                                        value={priceRange[0]}
                                                        onChange={(e) =>
                                                            handlePriceChange(
                                                                0,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block text-xs text-gray-500 mb-1">
                                                        Max
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min={priceRange[0]}
                                                        max={maxPrice}
                                                        value={priceRange[1]}
                                                        onChange={(e) =>
                                                            handlePriceChange(
                                                                1,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={resetFilters}
                                                className="flex-1 bg-gray-100 hover:bg-gray-200 transition-all rounded-xl py-3 font-medium text-gray-700 shadow-md"
                                            >
                                                Reset
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() =>
                                                    setShowFiltersMobile(false)
                                                }
                                                className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 transition-all rounded-xl py-3 font-medium text-white shadow-md hover:shadow-lg"
                                            >
                                                Apply
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex-1">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                {selectedCategory || "All"} Products
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Showing {filteredProducts.length}{" "}
                                {filteredProducts.length === 1
                                    ? "item"
                                    : "items"}
                                {searchTerm && ` for "${searchTerm}"`}
                            </p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowFiltersMobile(true)}
                            className="lg:hidden flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all"
                        >
                            <HiFilter className="text-gray-600" />
                            <span className="text-sm font-medium">Filters</span>
                        </motion.button>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <motion.div
                                    key={product._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <div className="mx-auto w-28 h-28 bg-gray-100 rounded-full flex items-center justify-center mb-5">
                                <HiOutlineSearch className="text-gray-400 text-4xl" />
                            </div>
                            <h3 className="text-2xl font-medium text-gray-900 mb-3">
                                No products found
                            </h3>
                            <p className="text-gray-500 max-w-md mx-auto mb-6">
                                Try adjusting your search or filters to find
                                what you're looking for.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={resetFilters}
                                className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                            >
                                Reset All Filters
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
