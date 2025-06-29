import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProviders";
import {
    FaPaw,
    FaDog,
    FaCat,
    FaBone,
    FaFeatherAlt,
    FaCalendarAlt,
    FaShieldAlt,
    FaGraduationCap,
    FaSmile,
    FaNotesMedical,
    FaClock,
    FaTruck,
    FaCheckCircle,
    FaHourglassHalf,
    FaTimesCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const MyGroomingAppointments = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: appointments = [], isLoading } = useQuery({
        queryKey: ["myGroomingAppointments", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/grooming?email=${user.email}`);
            return res.data;
        },
    });

    const petTypeIcons = {
        Dog: <FaDog className="inline mr-1" />,
        Cat: <FaCat className="inline mr-1" />,
        Rabbit: <FaBone className="inline mr-1" />,
        Bird: <FaFeatherAlt className="inline mr-1" />,
    };

    const statusIcons = {
        pending: <FaHourglassHalf className="inline mr-1" />,
        approved: <FaCheckCircle className="inline mr-1" />,
        rejected: <FaTimesCircle className="inline mr-1" />,
    };

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader"></div>
            </div>
        );

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-orange-600 mb-3">
                        My Grooming Appointments
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Here you can view all your pet's grooming appointments
                        and their current status
                    </p>
                </motion.div>

                {appointments.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md mx-auto"
                    >
                        <div className="text-6xl text-gray-300 mb-4">🐾</div>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                            No Appointments Found
                        </h3>
                        <p className="text-gray-500">
                            You haven't booked any grooming appointments yet.
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {appointments.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div
                                    className={`p-5 ${getStatusColor(
                                        item.status
                                    )}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white flex items-center">
                                                {petTypeIcons[item.petType] || (
                                                    <FaPaw />
                                                )}
                                                {item.petName}
                                            </h3>
                                            <p className="text-white opacity-90">
                                                {item.petType}
                                            </p>
                                        </div>
                                        <span className="bg-white bg-opacity-30 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                                            {statusIcons[item.status]}
                                            {item.status
                                                .charAt(0)
                                                .toUpperCase() +
                                                item.status.slice(1)}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="bg-orange-50 p-3 rounded-lg">
                                            <p className="text-xs text-orange-600 font-semibold">
                                                BREED
                                            </p>
                                            <p className="font-medium">
                                                {item.breed || "Unknown"}
                                            </p>
                                        </div>
                                        <div className="bg-orange-50 p-3 rounded-lg">
                                            <p className="text-xs text-orange-600 font-semibold">
                                                AGE
                                            </p>
                                            <p className="font-medium">
                                                {item.age || "-"} years
                                            </p>
                                        </div>
                                        <div className="bg-orange-50 p-3 rounded-lg">
                                            <p className="text-xs text-orange-600 font-semibold">
                                                WEIGHT
                                            </p>
                                            <p className="font-medium">
                                                {item.weight || "-"} kg
                                            </p>
                                        </div>
                                        <div className="bg-orange-50 p-3 rounded-lg">
                                            <p className="text-xs text-orange-600 font-semibold">
                                                VACCINATED
                                            </p>
                                            <p className="font-medium flex items-center">
                                                <FaShieldAlt className="mr-1" />
                                                {item.vaccinated || "-"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <FaGraduationCap className="text-gray-400 mr-2" />
                                            <span className="text-sm">
                                                Trained: {item.trained}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaSmile className="text-gray-400 mr-2" />
                                            <span className="text-sm">
                                                Friendly: {item.friendly}
                                            </span>
                                        </div>
                                        {item.temperament && (
                                            <div className="flex items-start">
                                                <FaNotesMedical className="text-gray-400 mr-2 mt-1" />
                                                <span className="text-sm">
                                                    Temperament:{" "}
                                                    {item.temperament}
                                                </span>
                                            </div>
                                        )}
                                        {item.medical && (
                                            <div className="flex items-start">
                                                <FaNotesMedical className="text-gray-400 mr-2 mt-1" />
                                                <span className="text-sm">
                                                    Medical Notes:{" "}
                                                    {item.medical}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-gray-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center text-sm">
                                                <FaClock className="text-gray-400 mr-2" />
                                                <span>
                                                    Pickup: {item.pickupTime}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <FaTruck className="text-gray-400 mr-2" />
                                                <span>
                                                    Delivery:{" "}
                                                    {item.deliveryTime}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-400 text-right mt-2">
                                            Booked on:{" "}
                                            {new Date(
                                                item.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper function for status colors
function getStatusColor(status) {
    switch (status) {
        case "approved":
            return "bg-green-500";
        case "rejected":
            return "bg-red-500";
        default:
            return "bg-yellow-500";
    }
}

export default MyGroomingAppointments;
