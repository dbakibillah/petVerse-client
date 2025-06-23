import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ProductCard from "../../components/shop/ProductCard";
import { HiOutlineSearch, HiX } from "react-icons/hi";

const categories = ["Food", "Grooming", "Accessories", "Toys", "Training Items"];

const AllProducts = () => {
  const axiosPublic = useAxiosPublic();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosPublic.get("/products");
      return response.data;
    },
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchTerm, selectedCategory, priceRange]);

  const resetFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, 1000]);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-96 text-xl text-gray-500 animate-pulse">
        Loading products...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-96 text-red-600 text-xl">
        Error: {error?.message || "Something went wrong"}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Search Bar at top */}
      <div className="mb-8 max-w-3xl mx-auto relative">
        <HiOutlineSearch className="absolute left-4 top-3.5 text-gray-400" />
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition text-gray-800"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div
          className={`fixed inset-0 bg-gray-50 z-40 lg:static lg:bg-transparent lg:z-auto transition-transform duration-300 ${
            showFiltersMobile
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          } w-72 lg:w-80 p-6 overflow-y-auto lg:overflow-visible h-full lg:h-auto shadow-lg lg:shadow-none rounded-r-lg`}
        >
          <div className="flex items-center justify-between mb-8 lg:hidden">
            <h2 className="text-2xl font-semibold text-gray-700">Filters</h2>
            <button
              onClick={() => setShowFiltersMobile(false)}
              className="text-gray-700 text-3xl"
              aria-label="Close Filters"
            >
              <HiX />
            </button>
          </div>

          {/* Category Pills */}
          <div className="mb-8">
            <h3 className="text-gray-700 font-semibold mb-3">Categories</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory("")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${
                  selectedCategory === ""
                    ? "bg-blue-600 text-white border-blue-600 shadow"
                    : "border-gray-300 text-gray-700 hover:bg-blue-100 hover:border-blue-400"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white border-blue-600 shadow"
                      : "border-gray-300 text-gray-700 hover:bg-blue-100 hover:border-blue-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h3 className="text-gray-700 font-semibold mb-3">
              Price Range (${priceRange[0]} - ${priceRange[1]})
            </h3>
            <div className="flex items-center space-x-4 mb-3">
              <input
                type="number"
                min={0}
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([
                    Math.min(Number(e.target.value), priceRange[1]),
                    priceRange[1],
                  ])
                }
                className="w-20 rounded-lg px-3 py-2 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-label="Minimum Price"
              />
              <span className="text-gray-600">to</span>
              <input
                type="number"
                min={priceRange[0]}
                max={10000}
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([
                    priceRange[0],
                    Math.max(Number(e.target.value), priceRange[0]),
                  ])
                }
                className="w-20 rounded-lg px-3 py-2 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-label="Maximum Price"
              />
            </div>
            {/* Range sliders */}
            <input
              type="range"
              min={0}
              max={1000}
              step={1}
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([
                  Math.min(Number(e.target.value), priceRange[1]),
                  priceRange[1],
                ])
              }
              className="w-full accent-blue-600"
            />
            <input
              type="range"
              min={0}
              max={1000}
              step={1}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([
                  priceRange[0],
                  Math.max(Number(e.target.value), priceRange[0]),
                ])
              }
              className="w-full accent-blue-600 mt-2"
            />
          </div>

          {/* Reset Filters */}
          <button
            onClick={resetFilters}
            className="w-full bg-red-600 hover:bg-red-700 transition rounded-lg py-3 font-semibold text-white"
          >
            Clear Filters
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Products</h1>
            <button
              onClick={() => setShowFiltersMobile(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
            >
              Filters
            </button>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-xl mt-20">
              No products found matching your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
