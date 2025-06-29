import { useCart } from "../../providers/CartProvider";
import {
    FaTrash,
    FaPlus,
    FaMinus,
    FaArrowLeft,
    FaShoppingCart,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
    return (
        <div className="grid grid-cols-12 p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200">
            {/* Product Info */}
            <div className="col-span-5 flex items-center space-x-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">
                        {item.productName}
                    </h3>
                    <button
                        onClick={onRemove}
                        className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center mt-1"
                    >
                        <FaTrash className="mr-1 text-xs" />
                        Remove
                    </button>
                </div>
            </div>

            {/* Price */}
            <div className="col-span-2 text-center text-gray-700 dark:text-gray-300">
                {item.discount > 0 ? (
                    <>
                        <span className="line-through text-gray-400 dark:text-gray-500 mr-2">
                            ৳{item.unitPrice.toFixed(2)}
                        </span>
                        <span>
                            ৳
                            {(
                                item.unitPrice *
                                (1 - item.discount / 100)
                            ).toFixed(2)}
                        </span>
                    </>
                ) : (
                    <span>৳{item.unitPrice.toFixed(2)}</span>
                )}
            </div>

            {/* Quantity */}
            <div className="col-span-3 flex items-center justify-center">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                    <button
                        onClick={onDecrease}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                        <FaMinus className="text-xs" />
                    </button>
                    <span className="px-4 py-1 text-center w-12 dark:text-gray-100">
                        {item.quantity}
                    </span>
                    <button
                        onClick={onIncrease}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                        <FaPlus className="text-xs" />
                    </button>
                </div>
            </div>

            {/* Total */}
            <div className="col-span-2 text-right font-medium text-gray-800 dark:text-gray-100">
                ৳{item.price.toFixed(2)}
            </div>
        </div>
    );
};

const Cart = () => {
    const {
        cart,
        isLoading,
        removeFromCart,
        clearCart,
        updateQuantity,
        decreaseQuantity,
        totalItems,
        refetchCart,
    } = useCart();

    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        refetchCart();
    }, [refetchCart]);

    // Calculate total discount
    const totalDiscount =
        cart?.cartItems?.reduce((sum, item) => {
            if (item.discount > 0) {
                const originalPrice = item.unitPrice * item.quantity;
                const discountedPrice = item.price;
                return sum + (originalPrice - discountedPrice);
            }
            return sum;
        }, 0) || 0;

    // Calculate subtotal before any discounts
    const subtotalBeforeDiscount =
        cart?.cartItems?.reduce((sum, item) => {
            return sum + item.unitPrice * item.quantity;
        }, 0) || 0;

    // Destructure shipping info from cart or provide defaults
    const shippingInfo = cart?.shippingInfo || {
        freeShipping: false,
        shippingCost: 0.0,
        estimatedDelivery: "2-4 business days",
    };

    // Calculate final total
    const finalTotal =
        subtotalBeforeDiscount -
        totalDiscount +
        (shippingInfo.freeShipping ? 0 : shippingInfo.shippingCost);

    const handleRemoveItem = (product) => {
        removeFromCart(product);
        toast.success("Item removed from cart", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: document.documentElement.classList.contains("dark")
                ? "dark"
                : "light",
        });
    };

    const handleClearCart = () => {
        clearCart();
        toast.success("Cart cleared", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: document.documentElement.classList.contains("dark")
                ? "dark"
                : "light",
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="rounded-full h-16 w-16 border-t-4 border-b-4 border-primary dark:border-primary-400"></div>
            </div>
        );
    }

    if (!cart) {
        return (
            <section className="min-h-screen py-12 px-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center py-12">
                        <div className="inline-block p-6 bg-primary/10 dark:bg-primary-400/10 rounded-full mb-6">
                            <FaShoppingCart className="text-4xl text-primary dark:text-primary-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                            Your Cart is Empty
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                            Looks like you haven't added anything to your cart
                            yet. Start shopping to discover amazing products!
                        </p>
                        <div>
                            <Link
                                to="/shop"
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-secondary to-primary dark:from-primary-500 dark:to-primary-600 text-white font-medium rounded-lg shadow-md hover:bg-gradient-to-l dark:hover:shadow-primary-500/30 transition-all duration-300"
                            >
                                <FaArrowLeft className="mr-2" />
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen py-12 px-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8">
                    Shopping Cart ({totalItems}{" "}
                    {totalItems === 1 ? "item" : "items"})
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                            {/* Cart Header */}
                            <div className="hidden md:grid grid-cols-12 bg-gray-100 dark:bg-gray-700 p-4 font-medium text-gray-700 dark:text-gray-300">
                                <div className="col-span-5">Product</div>
                                <div className="col-span-2 text-center">
                                    Price
                                </div>
                                <div className="col-span-3 text-center">
                                    Quantity
                                </div>
                                <div className="col-span-2 text-right">
                                    Total
                                </div>
                            </div>

                            {/* Cart Items List */}
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {cart.cartItems.map((item) => (
                                    <CartItem
                                        key={item.productId}
                                        item={item}
                                        onIncrease={() => updateQuantity(item)}
                                        onDecrease={() =>
                                            decreaseQuantity(item)
                                        }
                                        onRemove={() => handleRemoveItem(item)}
                                    />
                                ))}
                            </div>

                            {/* Clear Cart Button */}
                            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                                <button
                                    onClick={handleClearCart}
                                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center"
                                >
                                    <FaTrash className="mr-2" />
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-4">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">
                                        Subtotal ({totalItems} items)
                                    </span>
                                    <span className="font-medium dark:text-gray-100">
                                        ৳{subtotalBeforeDiscount.toFixed(2)}
                                    </span>
                                </div>

                                {totalDiscount > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">
                                            Discounts Applied
                                        </span>
                                        <span className="font-medium text-green-600 dark:text-green-400">
                                            -৳{totalDiscount.toFixed(2)}
                                        </span>
                                    </div>
                                )}

                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">
                                        Shipping
                                    </span>
                                    <span className="font-medium dark:text-gray-100">
                                        {shippingInfo.freeShipping
                                            ? "Free Shipping"
                                            : `৳${shippingInfo.shippingCost.toFixed(
                                                  2
                                              )}`}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">
                                        Estimated Delivery
                                    </span>
                                    <span className="font-medium dark:text-gray-100">
                                        {shippingInfo.estimatedDelivery}
                                    </span>
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between">
                                    <span className="font-bold text-lg text-gray-800 dark:text-gray-100">
                                        Total
                                    </span>
                                    <span className="font-bold text-lg text-primary dark:text-primary-400">
                                        ৳{finalTotal.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <Link to="/payment">
                                <button className="w-full bg-gradient-to-r from-secondary to-primary dark:from-primary-500 dark:to-primary-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-gradient-to-l dark:hover:shadow-primary-500/30 mb-4">
                                    Proceed to Checkout
                                </button>
                            </Link>

                            <div>
                                <Link
                                    to="/shop"
                                    className="flex items-center justify-center text-primary hover:text-primary-dark dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors duration-200"
                                >
                                    <FaArrowLeft className="mr-2" />
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
