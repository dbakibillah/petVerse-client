import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

const ProductCard = ({ product }) => {
    const hasDiscount = product.discount > 0;
    const discountedPrice = hasDiscount
        ? (product.price - (product.price * product.discount) / 100).toFixed(2)
        : null;

    return (
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition transform flex flex-col justify-between my-5 mb-10">
            <div className="relative">
                <figure>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-72 object-contain rounded-t-2xl p-4 bg-white dark:bg-gray-800"
                    />
                </figure>
                {hasDiscount && (
                    <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        {product.discount}% OFF
                    </span>
                )}
            </div>
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        {product.name.slice(0, 20)}
                    </h3>

                    <div className="flex items-center space-x-2">
                        <Rating
                            initialValue={product.rating}
                            size={20}
                            readonly
                            allowFraction
                            SVGstyle={{ display: "inline-block" }}
                            className="flex"
                        />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            ({product.rating})
                        </span>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        {product.description.slice(0, 60)}...
                    </p>
                </div>

                <div>
                    <div className="flex justify-between items-center pt-2">
                        <div>
                            {hasDiscount ? (
                                <div className="text-sm space-x-1">
                                    <span className="text-lg font-bold text-primary">
                                        ${discountedPrice}
                                    </span>
                                    <span className="line-through text-gray-400">
                                        ${product.price}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-lg font-bold text-primary">
                                    ${product.price}
                                </span>
                            )}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {product.totalSold} Sold
                        </span>
                    </div>
                    <Link to={`/product/${product.id}`}>
                        <button className="mt-3 w-full bg-primary hover:bg-primary/90 text-white text-sm font-medium py-2 rounded-lg transition">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProductCard;
