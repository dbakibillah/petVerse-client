import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../providers/AuthProviders";
import { useCart } from "../providers/CartProvider";

const Payment = () => {
    const { cart, clearCart } = useCart();
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const { data: currentUser, isLoading } = useQuery({
        queryKey: ["currentUser", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(
                `/singleuser?email=${user.email}`
            );
            return res.data.data;
        },
        enabled: !!user?.email,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const orderData = {
                userName: currentUser.name,
                userEmail: currentUser.email,
                cartItems: cart.cartItems,
                totalAmount: cart.totalPrice,
                shippingAddress: currentUser.address || "Not provided",
                phone: currentUser.phone || "Not provided",
            };

            const response = await axiosPublic.post("/order", orderData);

            window.location.replace(response.data.url);
            setPaymentSuccess(true);
            clearCart();

            setTimeout(() => {
                navigate("/shop");
            }, 2000);
        } catch (error) {
            console.error("Payment failed:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    if (!cart || cart.cartItems.length === 0)
        return (
            <div className="flex justify-center items-center h-screen">
                Your cart is empty
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Complete Your Purchase
            </h1>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Payment Section */}
                <div className="md:w-2/3">
                    <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Contact Information
                        </h2>

                        {
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm mb-1"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={currentUser?.email || ""}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm mb-1"
                                        htmlFor="phone"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={currentUser?.phone || ""}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label
                                        className="block text-gray-700 text-sm mb-1"
                                        htmlFor="address"
                                    >
                                        Shipping Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        value={currentUser?.address || ""}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition ${
                                        isProcessing
                                            ? "opacity-70 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    {isProcessing
                                        ? "Processing..."
                                        : `Pay $${cart.totalPrice.toFixed(2)}`}
                                </button>
                            </form>
                        }
                    </div>
                </div>

                {/* Order Summary */}
                <div className="md:w-1/3">
                    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Order Summary
                        </h2>

                        <div className="space-y-3 mb-4">
                            {cart.cartItems.map((item) => (
                                <div
                                    key={item.productId}
                                    className="flex justify-between items-start pb-3 border-b border-gray-100"
                                >
                                    <div className="flex items-start space-x-3">
                                        <img
                                            src={item.productImage}
                                            alt={item.productName}
                                            className="w-12 h-12 object-cover rounded-md"
                                        />
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-800">
                                                {item.productName}
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-800">
                                            ${item.price.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 pt-3 border-t border-gray-200">
                            <div className="flex justify-between">
                                <span className="text-gray-600 text-sm">
                                    Subtotal
                                </span>
                                <span className="font-medium">
                                    ${cart.totalPrice.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 text-sm">
                                    Shipping
                                </span>
                                <span className="text-green-600 text-sm">
                                    Free
                                </span>
                            </div>
                            <div className="flex justify-between font-semibold mt-3 pt-3 border-t border-gray-200">
                                <span>Total</span>
                                <span>${cart.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
