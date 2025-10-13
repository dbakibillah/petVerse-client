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

    // Icon mappings for different pet types
    const petTypeIcons = {
        Dog: <FaDog className="text-blue-500" />,
        Cat: <FaCat className="text-blue-500" />,
        Rabbit: <FaBone className="text-blue-500" />,
        Bird: <FaFeatherAlt className="text-blue-500" />,
    };

    // Status configurations
    const statusConfig = {
        pending: {
            icon: <FaHourglassHalf />,
            color: "bg-amber-100 text-amber-800",
            border: "border-amber-200",
        },
        approved: {
            icon: <FaCheckCircle />,
            color: "bg-green-100 text-green-800",
            border: "border-green-200",
        },
        rejected: {
            icon: <FaTimesCircle />,
            color: "bg-red-100 text-red-800",
            border: "border-red-200",
        },
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-gray-900 mb-3"
                    >
                        My Grooming Appointments
                    </motion.h1>
                    <p className="text-lg text-gray-600">
                        View and manage your pet's upcoming grooming sessions
                    </p>
                </div>

                {/* Content */}
                {appointments.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100"
                    >
                        <div className="text-blue-500 text-5xl mb-4">
                            <FaPaw className="inline-block" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            No Appointments Scheduled
                        </h3>
                        <p className="text-gray-500 mb-6">
                            You don't have any grooming appointments booked yet.
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200">
                            Book Appointment
                        </button>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        {appointments.map((appointment, index) => (
                            <motion.div
                                key={appointment._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-200"
                            >
                                {/* Pet Header */}
                                <div className="p-5 border-b border-gray-100">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center">
                                            <div className="mr-3 text-xl">
                                                {petTypeIcons[
                                                    appointment.petType
                                                ] || (
                                                    <FaPaw className="text-blue-500" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-800">
                                                    {appointment.petName}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {appointment.petType}
                                                </p>
                                            </div>
                                        </div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
                                                statusConfig[appointment.status]
                                                    .color
                                            } ${
                                                statusConfig[appointment.status]
                                                    .border
                                            } border`}
                                        >
                                            <span className="mr-1.5">
                                                {
                                                    statusConfig[
                                                        appointment.status
                                                    ].icon
                                                }
                                            </span>
                                            {appointment.status
                                                .charAt(0)
                                                .toUpperCase() +
                                                appointment.status.slice(1)}
                                        </span>
                                    </div>
                                </div>

                                {/* Pet Details */}
                                <div className="p-5">
                                    <div className="flex flex-wrap gap-3 mb-4">
                                        <DetailCard
                                            label="Breed"
                                            value={appointment.breed || "—"}
                                        />
                                        <DetailCard
                                            label="Age"
                                            value={
                                                appointment.age
                                                    ? `${appointment.age} yrs`
                                                    : "—"
                                            }
                                        />
                                        <DetailCard
                                            label="Weight"
                                            value={
                                                appointment.weight
                                                    ? `${appointment.weight} kg`
                                                    : "—"
                                            }
                                        />
                                        <DetailCard
                                            label="Vaccinated"
                                            value={
                                                appointment.vaccinated || "—"
                                            }
                                            icon={
                                                <FaShieldAlt className="text-blue-400" />
                                            }
                                        />
                                    </div>

                                    <div className="space-y-3 text-sm">
                                        <InfoItem
                                            icon={
                                                <FaGraduationCap className="text-gray-400" />
                                            }
                                            text={`Trained: ${appointment.trained}`}
                                        />
                                        <InfoItem
                                            icon={
                                                <FaSmile className="text-gray-400" />
                                            }
                                            text={`Friendly: ${appointment.friendly}`}
                                        />
                                        {appointment.temperament && (
                                            <InfoItem
                                                icon={
                                                    <FaNotesMedical className="text-gray-400" />
                                                }
                                                text={`Temperament: ${appointment.temperament}`}
                                            />
                                        )}
                                        {appointment.medical && (
                                            <InfoItem
                                                icon={
                                                    <FaNotesMedical className="text-gray-400" />
                                                }
                                                text={`Medical: ${appointment.medical}`}
                                            />
                                        )}
                                    </div>

                                    {/* Appointment Times */}
                                    <div className="mt-6 pt-4 border-t border-gray-100">
                                        <div className="flex flex-col sm:flex-row justify-between gap-3">
                                            <InfoItem
                                                icon={
                                                    <FaClock className="text-gray-400" />
                                                }
                                                text={
                                                    <span className="text-gray-700">
                                                        Pickup:{" "}
                                                        <span className="font-medium">
                                                            {
                                                                appointment.pickupTime
                                                            }
                                                        </span>
                                                    </span>
                                                }
                                            />
                                            <InfoItem
                                                icon={
                                                    <FaTruck className="text-gray-400" />
                                                }
                                                text={
                                                    <span className="text-gray-700">
                                                        Delivery:{" "}
                                                        <span className="font-medium">
                                                            {
                                                                appointment.deliveryTime
                                                            }
                                                        </span>
                                                    </span>
                                                }
                                            />
                                        </div>
                                        <p className="text-xs text-gray-400 mt-3">
                                            Booked on{" "}
                                            {new Date(
                                                appointment.createdAt
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

// Reusable Detail Card Component
const DetailCard = ({ label, value, icon }) => (
    <div className="bg-gray-50 p-2.5 rounded-lg min-w-[120px]">
        <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
        <p className="font-medium text-gray-800 flex items-center">
            {icon && <span className="mr-1.5">{icon}</span>}
            {value}
        </p>
    </div>
);

// Reusable Info Item Component
const InfoItem = ({ icon, text }) => (
    <div className="flex items-start">
        <span className="mt-0.5 mr-2.5">{icon}</span>
        <span>{text}</span>
    </div>
);

export default MyGroomingAppointments;
