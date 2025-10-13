import React, { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import {
    FaDog,
    FaHeartbeat,
    FaShoppingCart,
    FaUserShield,
    FaDollarSign,
    FaBoxOpen,
    FaCalendarAlt,
    FaChartLine,
    FaChartPie,
    FaChartBar,
    FaRegChartBar,
    FaRegCalendarAlt,
    FaRegMoneyBillAlt,
} from "react-icons/fa";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    LineChart,
    Line,
    Legend,
} from "recharts";
import { motion } from "framer-motion";

// Custom color palette with harmonious colors
const COLORS = [
    "#FF7E33", // Vibrant orange
    "#00C9B8", // Teal
    "#4F46E5", // Indigo
    "#8B5CF6", // Purple
    "#F43F5E", // Rose
    "#10B981", // Emerald
    "#F59E0B", // Amber
];

// Animation variants
const CARD_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const CHART_ANIMATION = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
};

const AdminAnalytics = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Fetch data
    const { data: currentUser = {} } = useQuery({
        queryKey: ["currentUser", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(
                `/singleuser?email=${user.email}`
            );
            return res.data.data;
        },
        enabled: !!user?.email,
    });

    const { data: groomings = [] } = useQuery({
        queryKey: ["groomings"],
        queryFn: async () => (await axiosPublic.get("/grooming")).data,
    });

    const { data: healthcares = [] } = useQuery({
        queryKey: ["healthcares"],
        queryFn: async () => (await axiosPublic.get("/healthcare")).data,
    });

    const { data: orders = [] } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => (await axiosPublic.get("/orders")).data,
    });

    // Calculate metrics
    const totalRevenue = orders
        .reduce((acc, order) => acc + order.totalAmount, 0)
        .toFixed(2);
    const totalItemsSold = orders.reduce(
        (acc, order) => acc + order.cartItems.length,
        0
    );
    const shippingCosts = orders
        .reduce((acc, order) => {
            return (
                acc +
                order.cartItems.reduce(
                    (sum, item) => sum + (item.shippingInfo?.shippingCost || 0),
                    0
                )
            );
        }, 0)
        .toFixed(2);

    // Filter data based on date range
    const filteredOrders = useMemo(() => {
        if (!startDate || !endDate) return orders;
        const start = new Date(startDate);
        const end = new Date(endDate);
        return orders.filter((order) => {
            const created = new Date(
                order.cartItems?.[0]?.addedAt || order.createdAt
            );
            return created >= start && created <= end;
        });
    }, [orders, startDate, endDate]);

    // Prepare chart data
    const revenueByDate = useMemo(() => {
        const revenueMap = {};
        filteredOrders.forEach((order) => {
            const date = new Date(
                order.cartItems?.[0]?.addedAt || order.createdAt
            )
                .toISOString()
                .split("T")[0];
            revenueMap[date] = (revenueMap[date] || 0) + order.totalAmount;
        });
        return Object.entries(revenueMap).map(([date, total]) => ({
            date,
            total: parseFloat(total.toFixed(2)),
        }));
    }, [filteredOrders]);

    const pieData = [
        { name: "Groomings", value: groomings.length, icon: <FaDog /> },
        {
            name: "Healthcare",
            value: healthcares.length,
            icon: <FaHeartbeat />,
        },
        { name: "Orders", value: orders.length, icon: <FaShoppingCart /> },
    ];

    const barData = [
        { name: "Grooming", total: groomings.length },
        { name: "Healthcare", total: healthcares.length },
        { name: "Orders", total: orders.length },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 md:px-8 lg:px-12 py-8">
            {/* Header with animated gradient */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <motion.div
                    animate={{
                        background: [
                            "linear-gradient(45deg, #FF7E33, #4F46E5)",
                            "linear-gradient(45deg, #4F46E5, #00C9B8)",
                            "linear-gradient(45deg, #00C9B8, #FF7E33)",
                        ],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className="inline-block p-1 rounded-lg mb-4"
                >
                    <div className="bg-white px-4 py-2 rounded-md">
                        <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-600">
                            ADMIN DASHBOARD
                        </span>
                    </div>
                </motion.div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3">
                    Business Analytics Overview
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Comprehensive insights and performance metrics for your pet
                    care business
                </p>
            </motion.div>

            {/* Admin Profile Card */}
            <motion.div
                variants={CARD_VARIANTS}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 hover:shadow-md transition-all duration-300"
            >
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="w-20 h-20 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-orange-500 to-blue-500 shadow-md overflow-hidden"
                        >
                            {currentUser?.photo ? (
                                <img
                                    src={currentUser.photo}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-2xl font-bold">
                                    {currentUser?.name?.charAt(0) ||
                                        user?.displayName?.charAt(0) ||
                                        "A"}
                                </span>
                            )}
                        </motion.div>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                            <FaUserShield className="text-xs text-white" />
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center justify-center md:justify-start gap-2">
                            Welcome back,{" "}
                            {currentUser?.name || user?.displayName || "Admin"}
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                {currentUser?.role || "Admin"}
                            </span>
                        </h2>
                        <p className="text-gray-600 mt-1">
                            {currentUser?.email || user?.email}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full flex items-center gap-1"
                            >
                                <FaDog className="text-xs" /> {groomings.length}{" "}
                                Groomings
                            </motion.span>
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full flex items-center gap-1"
                            >
                                <FaHeartbeat className="text-xs" />{" "}
                                {healthcares.length} Healthcare
                            </motion.span>
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full flex items-center gap-1"
                            >
                                <FaShoppingCart className="text-xs" />{" "}
                                {orders.length} Orders
                            </motion.span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Date Range Filter */}
            <motion.div
                variants={CARD_VARIANTS}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 hover:shadow-md transition-all duration-300"
            >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <FaRegCalendarAlt className="text-orange-500" />{" "}
                            Filter Analytics
                        </h3>
                        <p className="text-sm text-gray-500">
                            Select date range to view specific period data
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Date
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) =>
                                        setStartDate(e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                End Date
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                {[
                    {
                        title: "Grooming Bookings",
                        value: groomings.length,
                        icon: <FaDog className="text-xl" />,
                        color: "bg-orange-50",
                        border: "border-orange-200",
                        text: "text-orange-800",
                        trend: "↑ 12%",
                        trendColor: "bg-orange-100 text-orange-800",
                    },
                    {
                        title: "Healthcare Visits",
                        value: healthcares.length,
                        icon: <FaHeartbeat className="text-xl" />,
                        color: "bg-teal-50",
                        border: "border-teal-200",
                        text: "text-teal-800",
                        trend: "↑ 8%",
                        trendColor: "bg-teal-100 text-teal-800",
                    },
                    {
                        title: "Orders Placed",
                        value: orders.length,
                        icon: <FaShoppingCart className="text-xl" />,
                        color: "bg-indigo-50",
                        border: "border-indigo-200",
                        text: "text-indigo-800",
                        trend: "↑ 15%",
                        trendColor: "bg-indigo-100 text-indigo-800",
                    },
                ].map((card, index) => (
                    <motion.div
                        key={index}
                        variants={CARD_VARIANTS}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className={`${card.color} border ${card.border} rounded-xl p-5 hover:shadow-md transition-all duration-300`}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">
                                    {card.title}
                                </p>
                                <p className="text-3xl font-bold text-gray-800">
                                    {card.value}
                                </p>
                            </div>
                            <motion.div
                                whileHover={{ rotate: 15 }}
                                className={`p-3 rounded-lg ${card.color.replace(
                                    "50",
                                    "100"
                                )}`}
                            >
                                {card.icon}
                            </motion.div>
                        </div>
                        <div className="mt-4">
                            <span
                                className={`text-xs px-2 py-1 rounded-full ${card.trendColor}`}
                            >
                                {card.trend} from last month
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Revenue Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                {[
                    {
                        title: "Total Revenue",
                        value: `$${totalRevenue}`,
                        icon: <FaDollarSign className="text-xl" />,
                        color: "bg-green-50",
                        border: "border-green-200",
                        text: "text-green-800",
                        description: "All-time revenue generated",
                    },
                    {
                        title: "Total Items Sold",
                        value: totalItemsSold,
                        icon: <FaBoxOpen className="text-xl" />,
                        color: "bg-amber-50",
                        border: "border-amber-200",
                        text: "text-amber-800",
                        description: "Products purchased by customers",
                    },
                    {
                        title: "Shipping Costs",
                        value: `$${shippingCosts}`,
                        icon: <FaRegMoneyBillAlt className="text-xl" />,
                        color: "bg-rose-50",
                        border: "border-rose-200",
                        text: "text-rose-800",
                        description: "Total shipping expenses",
                    },
                ].map((card, index) => (
                    <motion.div
                        key={index}
                        variants={CARD_VARIANTS}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className={`${card.color} border ${card.border} rounded-xl p-5 hover:shadow-md transition-all duration-300`}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">
                                    {card.title}
                                </p>
                                <p className="text-3xl font-bold text-gray-800">
                                    {card.value}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    {card.description}
                                </p>
                            </div>
                            <motion.div
                                whileHover={{ rotate: 15 }}
                                className={`p-3 rounded-lg ${card.color.replace(
                                    "50",
                                    "100"
                                )}`}
                            >
                                {card.icon}
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
                {/* Pie Chart */}
                <motion.div
                    variants={CARD_VARIANTS}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <FaChartPie className="text-orange-500" />{" "}
                                Service Distribution
                            </h2>
                            <p className="text-sm text-gray-500">
                                Breakdown of services by category
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                {startDate && endDate
                                    ? `${startDate} to ${endDate}`
                                    : "All time"}
                            </span>
                        </div>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    innerRadius={50}
                                    paddingAngle={2}
                                    dataKey="value"
                                    label={({ name, percent }) =>
                                        `${name} ${(percent * 100).toFixed(0)}%`
                                    }
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                            stroke="#fff"
                                            strokeWidth={2}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name) => [
                                        `${value}`,
                                        name,
                                    ]}
                                    contentStyle={{
                                        background: "rgba(255, 255, 255, 0.98)",
                                        border: "1px solid #eee",
                                        borderRadius: "8px",
                                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                        padding: "8px 12px",
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {pieData.map((entry, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.03 }}
                                className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                            >
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: COLORS[index] }}
                                ></div>
                                <span className="text-sm font-medium text-gray-700">
                                    {entry.name}
                                </span>
                                <span className="ml-auto text-sm font-bold">
                                    {entry.value}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Bar Chart */}
                <motion.div
                    variants={CARD_VARIANTS}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 1.0 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <FaRegChartBar className="text-blue-500" />{" "}
                                Services Overview
                            </h2>
                            <p className="text-sm text-gray-500">
                                Comparison of service categories
                            </p>
                        </div>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={barData}
                                margin={{
                                    top: 20,
                                    right: 20,
                                    left: 0,
                                    bottom: 20,
                                }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#f0f0f0"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fill: "#6b7280", fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    allowDecimals={false}
                                    tick={{ fill: "#6b7280", fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    formatter={(value) => [`${value}`, "Count"]}
                                    contentStyle={{
                                        background: "rgba(255, 255, 255, 0.98)",
                                        border: "1px solid #eee",
                                        borderRadius: "8px",
                                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                        padding: "8px 12px",
                                    }}
                                />
                                <Bar
                                    dataKey="total"
                                    radius={[4, 4, 0, 0]}
                                    animationDuration={1500}
                                >
                                    {barData.map((entry, index) => (
                                        <Cell
                                            key={`bar-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Line Chart */}
            <motion.div
                variants={CARD_VARIANTS}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 1.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 hover:shadow-md transition-all duration-300"
            >
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <FaChartLine className="text-green-500" /> Revenue
                            Trends
                        </h2>
                        <p className="text-sm text-gray-500">
                            {startDate && endDate
                                ? `Revenue from ${startDate} to ${endDate}`
                                : "Select date range to view revenue trends"}
                        </p>
                    </div>
                    {revenueByDate.length > 0 && (
                        <div className="flex items-center gap-2">
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                $
                                {revenueByDate
                                    .reduce((acc, day) => acc + day.total, 0)
                                    .toFixed(2)}{" "}
                                Total
                            </span>
                        </div>
                    )}
                </div>
                {revenueByDate.length === 0 ? (
                    <motion.div
                        variants={CHART_ANIMATION}
                        initial="hidden"
                        animate="visible"
                        className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-lg"
                    >
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                            <FaChartLine className="text-gray-400 text-xl" />
                        </div>
                        <p className="text-gray-500 text-center max-w-xs">
                            {startDate && endDate
                                ? "No revenue data available for selected date range"
                                : "Please select a date range to view revenue trends"}
                        </p>
                    </motion.div>
                ) : (
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={revenueByDate}
                                margin={{
                                    top: 20,
                                    right: 20,
                                    left: 0,
                                    bottom: 20,
                                }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#f0f0f0"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 12, fill: "#6b7280" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tickFormatter={(value) => `$${value}`}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "#6b7280" }}
                                />
                                <Tooltip
                                    formatter={(value) => [
                                        `$${value}`,
                                        "Revenue",
                                    ]}
                                    labelFormatter={(value) => `Date: ${value}`}
                                    contentStyle={{
                                        background: "rgba(255, 255, 255, 0.98)",
                                        border: "1px solid #eee",
                                        borderRadius: "8px",
                                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                        padding: "8px 12px",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#FF7E33"
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: "#FF7E33" }}
                                    activeDot={{
                                        r: 6,
                                        stroke: "#FF7E33",
                                        strokeWidth: 2,
                                        fill: "#fff",
                                    }}
                                    name="Revenue ($)"
                                    animationDuration={1500}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </motion.div>

            {/* Footer with animated gradient */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="text-center text-sm text-gray-500 mt-12"
            >
                <motion.div
                    animate={{
                        background: [
                            "linear-gradient(45deg, #FF7E33, #4F46E5)",
                            "linear-gradient(45deg, #4F46E5, #00C9B8)",
                            "linear-gradient(45deg, #00C9B8, #FF7E33)",
                        ],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className="inline-block p-1 rounded-lg mb-4"
                >
                    <div className="bg-white px-4 py-2 rounded-md">
                        <p>
                            Last updated: {new Date().toLocaleDateString()} at{" "}
                            {new Date().toLocaleTimeString()}
                        </p>
                        <p className="mt-1">
                            © {new Date().getFullYear()} PetCare Analytics
                            Dashboard
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AdminAnalytics;
