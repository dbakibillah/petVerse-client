import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProviders";
import useAxiosSecure from "../hooks/useAxiosSecure";

const CheckoutForm = ({ totalPrice, cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    useEffect(() => {
        if (totalPrice > 0) {
            setLoading(true);
            setError("");

            axiosSecure
                .post("/create-payment-intent", { amount: totalPrice })
                .then((res) => {
                    if (res.data.success) {
                        setClientSecret(res.data.clientSecret);
                    } else {
                        setError(
                            res.data.message || "Payment initialization failed"
                        );
                    }
                })
                .catch((err) => {
                    console.error("Payment Error:", err);
                    setError(
                        "Failed to initialize payment. Please try again later."
                    );
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [totalPrice, axiosSecure]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!stripe || !elements) {
            setError("Payment system not ready");
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            setError("Card details not found");
            setLoading(false);
            return;
        }

        try {
            // Confirm card payment
            const { paymentIntent, error: paymentError } =
                await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: user?.displayName || "Guest",
                            email: user?.email || "guest@example.com",
                        },
                    },
                });

            if (paymentError) {
                throw paymentError;
            }

            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id);

                // Prepare payment data
                const paymentData = {
                    email: user.email,
                    name: user.displayName,
                    products: cart.cartItems.map((item) => ({
                        productId: item.productId,
                        name: item.productName,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.productImage,
                    })),
                    amount: totalPrice,
                    transactionId: paymentIntent.id,
                    cartId: cart._id,
                };

                // Save payment and create order
                await axiosSecure.post("/make-payment", paymentData);

                // Show success message
                Swal.fire({
                    title: "Payment Successful!",
                    html: `
                        <p>Thank you for your order!</p>
                        <p class="mt-2 font-semibold">Order Total: $${totalPrice.toFixed(
                            2
                        )}</p>
                        <p class="mt-1 text-sm">Transaction ID: ${
                            paymentIntent.id
                        }</p>
                    `,
                    icon: "success",
                    confirmButtonText: "View Orders",
                }).then(() => {
                    navigate("/cart");
                });
            }
        } catch (err) {
            console.error("Payment error:", err);
            setError(err.message || "Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                    hidePostalCode: true,
                }}
                className="p-3 border rounded-md"
            />

            <button
                type="submit"
                disabled={!stripe || loading || !clientSecret}
                className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                    loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
                {loading ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
            </button>

            {error && (
                <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}

            {transactionId && (
                <div className="text-center mt-4 p-3 bg-green-50 rounded-md">
                    <p className="text-green-600 font-medium">
                        Payment Successful!
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        Transaction ID: {transactionId}
                    </p>
                </div>
            )}
        </form>
    );
};

export default CheckoutForm;
