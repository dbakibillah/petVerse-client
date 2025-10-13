import React, { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import {
    FaBoxOpen,
    FaShippingFast,
    FaPhone,
    FaMapMarkerAlt,
} from "react-icons/fa";

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    // Fetch orders using React Query
    const {
        data: orders = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["orders", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/orders?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading)
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
            </div>
        );
    if (isError)
        return (
            <div className="text-center py-12">
                <FaBoxOpen className="mx-auto text-5xl text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-gray-700">
                    Error fetching orders
                </h2>
                <p className="text-gray-500 mt-2">{error.message}</p>
            </div>
        );

    return (
        <section className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
                <p className="text-gray-600">
                    View your order history and track shipments
                </p>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-12">
                    <FaBoxOpen className="mx-auto text-5xl text-gray-400 mb-4" />
                    <h2 className="text-xl font-semibold text-gray-700">
                        No orders found
                    </h2>
                    <p className="text-gray-500 mt-2">
                        You haven't placed any orders yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="border rounded-lg shadow-sm overflow-hidden"
                        >
                            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                                <div>
                                    <h2 className="font-semibold text-lg text-gray-800">
                                        Order # {order.transactionId}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Placed on{" "}
                                        {new Date(
                                            order.createdAt ||
                                                order.cartItems[0]?.addedAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900">
                                        ${order.totalAmount?.toFixed(2)}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {order.cartItems?.length} item(s)
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 grid md:grid-cols-3 gap-6">
                                {/* Shipping Information */}
                                <div className="space-y-3">
                                    <h3 className="flex items-center font-medium text-gray-700">
                                        <FaMapMarkerAlt className="mr-2 text-blue-500" />
                                        Shipping Address
                                    </h3>
                                    <p className="text-gray-600">
                                        {order.shippingAddress}
                                    </p>
                                    <p className="text-gray-600">
                                        {order.phone}
                                    </p>
                                </div>

                                {/* Order Items */}
                                <div className="md:col-span-2">
                                    <h3 className="font-medium text-gray-700 mb-3">
                                        Order Items
                                    </h3>
                                    <div className="space-y-4">
                                        {order.cartItems?.map((item) => (
                                            <div
                                                key={item.productId}
                                                className="flex gap-4 pb-4 border-b last:border-0"
                                            >
                                                <img
                                                    src={item.productImage}
                                                    alt={item.productName}
                                                    className="w-16 h-16 object-cover rounded border"
                                                />
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-800">
                                                        {item.productName}
                                                    </h4>
                                                    <p className="text-sm text-gray-600">
                                                        ${item.price.toFixed(2)}{" "}
                                                        × {item.quantity}
                                                    </p>
                                                    <div className="flex items-center mt-1 text-sm">
                                                        <FaShippingFast className="mr-1 text-gray-400" />
                                                        <span className="text-gray-500">
                                                            {
                                                                item
                                                                    .shippingInfo
                                                                    .estimatedDelivery
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium">
                                                        $
                                                        {(
                                                            item.price *
                                                            item.quantity
                                                        ).toFixed(2)}
                                                    </p>
                                                    {item.shippingInfo
                                                        .freeShipping ? (
                                                        <span className="text-xs text-green-600">
                                                            Free shipping
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs text-gray-500">
                                                            +$
                                                            {item.shippingInfo.shippingCost.toFixed(
                                                                2
                                                            )}{" "}
                                                            shipping
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default MyOrders;
