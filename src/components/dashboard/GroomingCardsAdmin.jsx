import React from "react";
import {
    FiUser,
    FiClock,
    FiPhone,
    FiMapPin,
    FiEdit2,
    FiTrash2,
    FiMail,
    FiHeart,
    FiCheckCircle,
    FiAlertCircle,
    FiInfo,
} from "react-icons/fi";

const GroomingCardsAdmin = ({
    appointments,
    handleStatusUpdate,
    handleDelete,
    setSelectedAppointment,
    setIsModalOpen,
    getStatusColor,
    getStatusIcon,
}) => {
    return (
        <div className="grid gap-6">
            {appointments.map((appointment) => (
                <div
                    key={appointment._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
                >
                    {/* Card Header */}
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <div className="flex items-center">
                            <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                    appointment.status
                                )}`}
                            >
                                {getStatusIcon(appointment.status)}
                                {appointment.status}
                            </span>
                            <span className="ml-3 text-sm text-gray-500">
                                ID:{" "}
                                {appointment._id.substring(
                                    appointment._id.length - 6
                                )}
                            </span>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => {
                                    setSelectedAppointment(appointment);
                                    setIsModalOpen(true);
                                }}
                                className="p-2 text-gray-500 hover:text-[#FF552A] rounded-full hover:bg-[#FFFBEE] transition-colors duration-200"
                                title="Edit"
                            >
                                <FiEdit2 size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(appointment._id)}
                                className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors duration-200"
                                title="Delete"
                            >
                                <FiTrash2 size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Card Body */}
                    <div className="px-6 py-4">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Pet Info */}
                            <div className="flex-1">
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#FFFBEE] p-3 rounded-xl">
                                        <FiHeart className="text-2xl text-[#FF552A]" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">
                                            {appointment.petName}
                                        </h3>
                                        <p className="text-gray-600">
                                            <span className="font-medium">
                                                {appointment.breed}
                                            </span>{" "}
                                            • {appointment.petType}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                                                {appointment.age} years
                                            </span>
                                            <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                                                {appointment.weight} lbs
                                            </span>
                                            <span
                                                className={`text-sm px-3 py-1 rounded-full ${
                                                    appointment.friendly ===
                                                    "Yes"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {appointment.friendly} friendly
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Pet Details */}
                                <div className="mt-6">
                                    <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                                        <FiUser className="mr-2 text-[#FF552A]" />
                                        Pet Details
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-gray-600">
                                                <span className="font-medium">
                                                    Temperament:
                                                </span>{" "}
                                                {appointment.temperament}
                                            </p>
                                            <p className="text-gray-600">
                                                <span className="font-medium">
                                                    Trained:
                                                </span>{" "}
                                                {appointment.trained}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">
                                                <span className="font-medium">
                                                    Vaccinated:
                                                </span>{" "}
                                                {appointment.vaccinated}
                                            </p>
                                            <p className="text-gray-600">
                                                <span className="font-medium">
                                                    Medical Notes:
                                                </span>{" "}
                                                {appointment.medical || "None"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Owner Info */}
                            <div className="md:w-1/3 border-l border-gray-100 md:pl-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                                            <FiUser className="mr-2 text-[#FF552A]" />
                                            Owner Information
                                        </h4>
                                        <p className="text-gray-800 font-medium">
                                            {appointment.ownerName}
                                        </p>
                                        <div className="flex items-center mt-1 text-gray-600">
                                            <FiMail className="mr-2" />
                                            <span>
                                                {appointment.ownerEmail}
                                            </span>
                                        </div>
                                        <div className="flex items-center mt-1 text-gray-600">
                                            <FiPhone className="mr-2" />
                                            <span>{appointment.phone}</span>
                                        </div>
                                        <div className="flex items-start mt-1 text-gray-600">
                                            <FiMapPin className="mr-2 mt-1 flex-shrink-0" />
                                            <span>{appointment.address}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                                            <FiClock className="mr-2 text-[#FF552A]" />
                                            Appointment Times
                                        </h4>
                                        <div className="flex items-center text-gray-600">
                                            <span className="font-medium mr-2">
                                                Pickup:
                                            </span>
                                            <span>
                                                {appointment.pickupTime}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <span className="font-medium mr-2">
                                                Delivery:
                                            </span>
                                            <span>
                                                {appointment.deliveryTime}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-700 mb-2">
                                            Update Status
                                        </h4>
                                        <select
                                            value={appointment.status}
                                            onChange={(e) =>
                                                handleStatusUpdate(
                                                    appointment._id,
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF552A] focus:border-transparent"
                                        >
                                            <option value="Pending">
                                                Pending
                                            </option>
                                            <option value="Confirmed">
                                                Confirmed
                                            </option>
                                            <option value="Completed">
                                                Completed
                                            </option>
                                            <option value="Cancelled">
                                                Cancelled
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GroomingCardsAdmin;
