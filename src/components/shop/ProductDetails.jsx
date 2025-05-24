import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { BsCart3 } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { MdOutlineTimer, MdVerified } from "react-icons/md";

const ProductDetails = () => {
    const { productId } = useParams();

    const {
        data: productList,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await fetch("/products.json");
            if (!res.ok) throw new Error("Failed to fetch product list");
            return res.json();
        },
    });

    if (isLoading) return <div className="p-10 text-center">Loading...</div>;
    if (isError)
        return (
            <div className="p-10 text-center text-red-500">
                Error: {error.message}
            </div>
        );

    const product = productList.find((item) => item.id === productId);

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
        <section className="container mx-auto px-4 py-12 dark:bg-gray-900 text-gray-800 dark:text-white">
            {/* Layout grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Product Image */}
                <div className="rounded-lg md:p-6">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="lg:h-[650px] w-full object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                    />
                </div>

                {/* Product Info */}
                <div className="space-y-6 md:p-6">
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        {product.name}
                    </h1>

                    {/* Rating */}
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

                    {/* Price Display */}
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

                    {/* Tags */}
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

                    {/* Meta Info */}
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
                            <strong>Expires:</strong> {product.expirationDate}
                        </li>
                        <li>
                            <strong>Warranty:</strong> {product.warrantyInfo}
                        </li>
                    </ul>

                    {/* Shipping Details */}
                    <div>
                        <div className="mt-6 border-t pt-4 space-y-2 text-sm">
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

                        {/* CTA Buttons */}
                        <div className="flex gap-4 mt-6">
                            <button className="flex-1 py-3 bg-gradient-to-r from-secondary to-primary hover:bg-gradient-to-l text-white rounded-lg font-semibold hover:bg-primary/90 transition">
                                Buy Now
                            </button>
                            <button className="w-12 h-12 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center justify-center text-xl">
                                <BsCart3 />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="mt-16 border-t pt-6">
                <h2 className="text-xl font-semibold mb-2">
                    Product Description
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {product.description}
                </p>
            </div>
        </section>
    );
};

export default ProductDetails;
