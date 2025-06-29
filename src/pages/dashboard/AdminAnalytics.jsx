import React, { useContext, useMemo, useState } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import {
    FaDog, FaHeartbeat, FaShoppingCart, FaUserShield, FaDollarSign, FaBoxOpen,
} from 'react-icons/fa';
import {
    PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    ResponsiveContainer, LineChart, Line, Legend,
} from 'recharts';

const COLORS = ['#FF7518', '#00B9AE', '#6366F1'];

const AdminAnalytics = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { data: currentUser = {} } = useQuery({
        queryKey: ['currentUser', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/singleuser?email=${user.email}`);
            return res.data.data;
        },
        enabled: !!user?.email,
    });

    const { data: groomings = [] } = useQuery({ queryKey: ['groomings'], queryFn: async () => (await axiosPublic.get('/grooming')).data });
    const { data: healthcares = [] } = useQuery({ queryKey: ['healthcares'], queryFn: async () => (await axiosPublic.get('/healthcare')).data });
    const { data: orders = [] } = useQuery({ queryKey: ['orders'], queryFn: async () => (await axiosPublic.get('/orders')).data });

    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0).toFixed(2);
    const totalItemsSold = orders.reduce((acc, order) => acc + order.cartItems.length, 0);
    const shippingCosts = orders.reduce((acc, order) => {
        return acc + order.cartItems.reduce((sum, item) => sum + (item.shippingInfo?.shippingCost || 0), 0);
    }, 0).toFixed(2);

    const filteredOrders = useMemo(() => {
        if (!startDate || !endDate) return orders;
        const start = new Date(startDate);
        const end = new Date(endDate);
        return orders.filter(order => {
            const created = new Date(order.cartItems?.[0]?.addedAt || order.createdAt);
            return created >= start && created <= end;
        });
    }, [orders, startDate, endDate]);

    const revenueByDate = useMemo(() => {
        const revenueMap = {};
        filteredOrders.forEach(order => {
            const date = new Date(order.cartItems?.[0]?.addedAt || order.createdAt)
                .toISOString().split('T')[0];
            revenueMap[date] = (revenueMap[date] || 0) + order.totalAmount;
        });
        return Object.entries(revenueMap).map(([date, total]) => ({ date, total: total.toFixed(2) }));
    }, [filteredOrders]);

    const pieData = [
        { name: 'Groomings', value: groomings.length },
        { name: 'Healthcare', value: healthcares.length },
        { name: 'Orders', value: orders.length },
    ];

    const barData = [
        { name: 'Grooming', total: groomings.length },
        { name: 'Healthcare', total: healthcares.length },
        { name: 'Orders', total: orders.length },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-100 via-white to-orange-50 px-4 md:px-20 py-12">
            <h1 className="text-4xl font-extrabold text-[#FF7518] text-center mb-10">📈 Admin Analytics Dashboard</h1>

            {/* Admin Info */}
            <div className="bg-white shadow-xl border-l-8 border-orange-500 rounded-xl p-6 mb-10">
                <h2 className="text-2xl font-bold text-orange-600 flex items-center gap-2 mb-2">
                    <FaUserShield /> Welcome, {currentUser?.name || user?.displayName}
                </h2>
                <p className="text-gray-700"><strong>Email:</strong> {currentUser?.email}</p>
                <p className="text-gray-700"><strong>Role:</strong> {currentUser?.role || 'Admin'}</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <div className="bg-orange-200 shadow-lg rounded-xl p-6 text-center border-b-4 border-orange-600">
                    <FaDog className="text-4xl text-orange-700 mx-auto mb-2" />
                    <h3 className="text-xl font-semibold">Grooming Bookings</h3>
                    <p className="text-3xl font-bold">{groomings.length}</p>
                </div>
                <div className="bg-teal-200 shadow-lg rounded-xl p-6 text-center border-b-4 border-teal-600">
                    <FaHeartbeat className="text-4xl text-teal-700 mx-auto mb-2" />
                    <h3 className="text-xl font-semibold">Healthcare Visits</h3>
                    <p className="text-3xl font-bold">{healthcares.length}</p>
                </div>
                <div className="bg-indigo-200 shadow-lg rounded-xl p-6 text-center border-b-4 border-indigo-600">
                    <FaShoppingCart className="text-4xl text-indigo-700 mx-auto mb-2" />
                    <h3 className="text-xl font-semibold">Orders Placed</h3>
                    <p className="text-3xl font-bold">{orders.length}</p>
                </div>
            </div>

            {/* Revenue Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
                <div className="bg-green-100 p-6 rounded-xl text-center shadow-md border-b-4 border-green-500">
                    <FaDollarSign className="text-4xl text-green-600 mx-auto mb-2" />
                    <h4 className="text-xl font-semibold text-green-700">Total Revenue</h4>
                    <p className="text-3xl font-bold">${totalRevenue}</p>
                </div>
                <div className="bg-yellow-100 p-6 rounded-xl text-center shadow-md border-b-4 border-yellow-500">
                    <FaBoxOpen className="text-4xl text-yellow-600 mx-auto mb-2" />
                    <h4 className="text-xl font-semibold text-yellow-700">Total Items Sold</h4>
                    <p className="text-3xl font-bold">{totalItemsSold}</p>
                </div>
                <div className="bg-pink-100 p-6 rounded-xl text-center shadow-md border-b-4 border-pink-500">
                    <FaDollarSign className="text-4xl text-pink-600 mx-auto mb-2" />
                    <h4 className="text-xl font-semibold text-pink-700">Total Shipping Cost</h4>
                    <p className="text-3xl font-bold">${shippingCosts}</p>
                </div>
            </div>

            {/* Date Filter */}
            <div className="flex flex-wrap gap-4 items-center justify-center mb-10">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        className="border border-gray-300 px-3 py-1 rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        className="border border-gray-300 px-3 py-1 rounded-lg"
                    />
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pie Chart */}
                <div className="bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Service Distribution</h2>
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                innerRadius={50}
                                fill="#8884d8"
                                paddingAngle={3}
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value, name) => [`${value} Entries`, name]} />
                        </PieChart>
                    </ResponsiveContainer>
                    <ul className="mt-4 space-y-1 text-sm text-gray-600">
                        {pieData.map((entry, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <span className="inline-block w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index] }}></span>
                                {entry.name}: {entry.value} entries
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Bar Chart */}
                <div className="bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Total Services Overview</h2>
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                            <CartesianGrid strokeDasharray="4 4" />
                            <XAxis dataKey="name" tick={{ fill: '#555', fontSize: 14 }} />
                            <YAxis allowDecimals={false} tick={{ fill: '#555', fontSize: 14 }} />
                            <Tooltip formatter={(value, name) => [`${value} Entries`, name]} />
                            <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                                {barData.map((entry, index) => (
                                    <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Line Chart for Revenue */}
            <div className="bg-white shadow-lg rounded-xl p-6 mt-12">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Revenue Trends Over Time</h2>
                {revenueByDate.length === 0 ? (
                    <p className="text-gray-500">No data available for selected date range.</p>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueByDate} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                            <YAxis />
                            <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                            <Legend />
                            <Line type="monotone" dataKey="total" stroke="#FF7518" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default AdminAnalytics;
