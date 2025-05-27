import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { BsCart3 } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { MdOutlineTimer, MdVerified } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductCard from "./ProductCard";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ProductDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        AOS.init({ duration: 1500, once: false });
        // Refresh AOS on component update if needed
        AOS.refresh();
    }, []);

    const {
        data: product,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const response = await axiosPublic.get(`/product/${id}`);
            return response.data;
        },
    });

    // Optional: fetch all products for related slider
    const { data: allProducts = [] } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axiosPublic.get("/products");
            return response.data;
        },
    });

    if (isLoading) return <div className="p-10 text-center">Loading...</div>;
    if (isError)
        return (
            <div className="p-10 text-center text-red-500">
                Error: {error.message}
            </div>
        );

    if (!product)
        return (
            <div className="p-10 text-center text-red-500">
                Product not found.
            </div>
        );

    const hasDiscount = product.discount > 0;
    const discountedPrice = hasDiscount
        ? (product.price - (product.price * product.discount) / 100).toFixed(2)
        : null;

    return (
        <section className="min-h-screen dark:bg-gray-900 text-gray-800 dark:text-white">
            <Helmet>
                <title>petVerse | {product.name}</title>
            </Helmet>
            <section className="container mx-auto px-4 py-12 lg:px-24">
                {/* Product Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Image */}
                    <div
                        className="rounded-lg md:p-6"
                        data-aos="fade-right"
                        data-aos-delay="100"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="lg:h-[650px] w-full object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                        />
                    </div>

                    {/* Details */}
                    <div
                        className="space-y-6 md:p-6"
                        data-aos="fade-left"
                        data-aos-delay="200"
                    >
                        <h1 className="text-3xl font-extrabold tracking-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-center space-x-2">
                            <Rating
                                initialValue={product.rating}
                                size={22}
                                readonly
                                SVGstyle={{ display: "inline-block" }}
                                allowFraction
                            />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {product.rating} / 5.0
                            </span>
                            <MdVerified className="text-blue-500" />
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-primary">
                                ${discountedPrice || product.price}
                            </span>
                            {hasDiscount && (
                                <>
                                    <span className="line-through text-gray-400">
                                        ${product.price}
                                    </span>
                                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                                        {product.discount}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {product.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <ul className="space-y-2 text-sm border-t pt-4 text-gray-600 dark:text-gray-300">
                            <li>
                                <strong>Brand:</strong> {product.brand}
                            </li>
                            <li>
                                <strong>Category:</strong> {product.category}
                            </li>
                            <li>
                                <strong>Pet Type:</strong>{" "}
                                {product.petType.join(", ")}
                            </li>
                            <li>
                                <strong>Weight:</strong> {product.weight}
                            </li>
                            <li>
                                <strong>Stock:</strong>{" "}
                                <span
                                    className={
                                        product.availableStock > 0
                                            ? "text-green-600"
                                            : "text-red-500"
                                    }
                                >
                                    {product.availableStock > 0
                                        ? `${product.availableStock} available`
                                        : "Out of stock"}
                                </span>
                            </li>
                            <li>
                                <strong>Sold:</strong> {product.totalSold} pcs
                            </li>
                            <li>
                                <strong>Expires:</strong>{" "}
                                {product.expirationDate}
                            </li>
                            <li>
                                <strong>Warranty:</strong>{" "}
                                {product.warrantyInfo}
                            </li>
                        </ul>

                        <div
                            className="mt-6 border-t pt-4 space-y-2 text-sm"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            <p className="flex items-center gap-2">
                                <FaShippingFast className="text-lg text-primary" />
                                <strong>Shipping:</strong>{" "}
                                {product.shippingInfo.freeShipping
                                    ? "Free Shipping"
                                    : `$${product.shippingInfo.shippingCost}`}
                            </p>
                            <p className="flex items-center gap-2">
                                <MdOutlineTimer className="text-lg text-primary" />
                                <strong>Estimated Delivery:</strong>{" "}
                                {product.shippingInfo.estimatedDelivery}
                            </p>
                            <p className="flex items-center gap-2">
                                <GiReturnArrow className="text-lg text-primary" />
                                <strong>Return Policy:</strong>{" "}
                                {product.returnPolicy}
                            </p>
                        </div>

                        <div
                            className="flex gap-4 mt-6"
                            data-aos="zoom-in"
                            data-aos-delay="400"
                        >
                            <button className="flex-1 py-3 bg-gradient-to-r from-secondary to-primary hover:from-primary hover:to-secondary text-white rounded-lg font-semibold transition">
                                Buy Now
                            </button>
                            <button className="w-12 h-12 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center justify-center text-xl">
                                <BsCart3 />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div
                    className="mt-16 border-t pt-6"
                    data-aos="fade-up"
                    data-aos-delay="500"
                >
                    <div className="space-y-2 mx-auto">
                        <h2 className="text-xl font-semibold mb-2">
                            Product Description
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 lg:px-8 leading-relaxed">
                            {product.description}
                        </p>
                    </div>
                </div>

                {/* Similar Products Section */}
                <div
                    className="mt-16 border-t pt-6"
                    data-aos="fade-up"
                    data-aos-delay="600"
                >
                    <h2 className="text-xl font-semibold mb-4">
                        You May Also Like
                    </h2>
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={10}
                        navigation
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 5 },
                        }}
                        className="px-2"
                        data-aos="zoom-in"
                        data-aos-delay={150}
                        data-aos-once="false"
                    >
                        {allProducts
                            .filter(
                                (p) =>
                                    p.category === product.category &&
                                    p._id !== product._id
                            )
                            .map((p, idx) => (
                                <SwiperSlide key={idx}>
                                    <ProductCard product={p} />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            </section>
        </section>
    );
};

export default ProductDetails;
