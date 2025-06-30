import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

const ProductCard = ({ product }) => {
    const hasDiscount = product.discount > 0;
    const discountedPrice = hasDiscount
        ? (product.price - (product.price * product.discount) / 100).toFixed(2)
        : null;

    return (
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition transform flex flex-col h-full min-h-[400px] my-5">
            <div className="relative flex flex-col h-full">
                {/* Image (Fixed Height) */}
                <figure className="h-48 flex-shrink-0">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 bg-white dark:bg-gray-800"
                    />
                </figure>
                {hasDiscount && (
                    <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        {product.discount}% OFF
                    </span>
                )}

                {/* Content (Flexible, Anchored to Bottom) */}
                <div className="p-4 flex flex-col flex-grow">
                    <div className="flex-grow">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-2">
                            {product.name.slice(0, 15)}
                            {product.name.length > 15 ? "..." : ""}
                        </h3>
                        <div className="flex items-center space-x-2 mt-2">
                            <Rating
                                initialValue={product.rating}
                                size={20}
                                readonly
                                allowFraction
                                SVGstyle={{ display: "inline-block" }}
                            />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                ({product.rating})
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                            {product.description}
                        </p>
                    </div>

                    {/* Price/Button (Anchored to Bottom) */}
                    <div className="mt-auto">
                        <div className="flex justify-between items-center pt-2">
                            <div>
                                {hasDiscount ? (
                                    <div className="space-x-1">
                                        <span className="text-lg font-bold text-primary">
                                            ৳{discountedPrice}
                                        </span>
                                        <span className="text-sm line-through text-gray-400">
                                            ৳{product.price}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-lg font-bold text-primary">
                                        ৳{product.price}
                                    </span>
                                )}
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {product.totalSold} Sold
                            </span>
                        </div>
                        <Link to={`/product/${product._id}`}>
                            <button className="mt-3 w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg">
                                View Details
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductCard;
