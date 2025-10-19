import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
    FiAlertCircle,
    FiCheckCircle,
    FiEdit2,
    FiInfo,
    FiPlus,
    FiSearch,
    FiTrash2,
    FiUser,
    FiX,
} from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const GroomingAdmin = () => {
    const axiosPublic = useAxiosPublic();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    // Debounce search term
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchTerm]);

    const {
        data: groomings = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["groomings"],
        queryFn: async () => {
            try {
                const response = await axiosPublic.get("/all-grooming");
                return response.data;
            } catch (error) {
                toast.error("Failed to fetch grooming appointments");
                throw error;
            }
        },
    });

    const filteredAppointments = groomings.filter((appointment) => {
        const matchesSearch =
            appointment.petName
                ?.toLowerCase()
                .includes(debouncedSearchTerm.toLowerCase()) ||
            appointment.phone?.includes(debouncedSearchTerm) ||
            appointment.ownerName
                ?.toLowerCase()
                .includes(debouncedSearchTerm.toLowerCase());
        const matchesStatus =
            selectedStatus === "All" || appointment.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const handleStatusUpdate = async (id, newStatus) => {
        const toastId = toast.loading("Updating status...");
        try {
            await axiosPublic.patch(`/grooming/${id}`, { status: newStatus });
            toast.update(toastId, {
                render: "Status updated successfully",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
            refetch();
        } catch (error) {
            toast.update(toastId, {
                render: "Failed to update status",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Delete Appointment",
            text: "Are you sure you want to delete this appointment?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            const toastId = toast.loading("Deleting appointment...");
            try {
                await axiosPublic.delete(`/grooming/${id}`);
                toast.update(toastId, {
                    render: "Appointment deleted successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
                refetch();
            } catch (error) {
                toast.update(toastId, {
                    render: "Failed to delete appointment",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
                console.error(error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading(
            selectedAppointment
                ? "Updating appointment..."
                : "Creating appointment..."
        );

        try {
            if (selectedAppointment?._id) {
                const { _id, ...appointmentData } = selectedAppointment;
                await axiosPublic.put(`/grooming/${_id}`, appointmentData);
                toast.update(toastId, {
                    render: "Appointment updated successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
            } else {
                const response = await axiosPublic.post(
                    "/grooming",
                    selectedAppointment || {}
                );
                console.log("Creation response:", response.data); // Log successful response
                toast.update(toastId, {
                    render: "Appointment created successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
            }
            setIsModalOpen(false);
            refetch();
        } catch (error) {
            console.error("Error details:", error.response?.data); // Log detailed error
            toast.update(toastId, {
                render: selectedAppointment
                    ? "Failed to update appointment"
                    : "Failed to create appointment",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedAppointment((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Completed":
                return "bg-green-100 text-green-800";
            case "Confirmed":
                return "bg-blue-100 text-blue-800";
            case "Cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-yellow-100 text-yellow-800";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Completed":
                return <FiCheckCircle className="mr-1" />;
            case "Confirmed":
                return <FiCheckCircle className="mr-1" />;
            case "Cancelled":
                return <FiAlertCircle className="mr-1" />;
            default:
                return <FiInfo className="mr-1" />;
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF552A]"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500 text-lg">
                    Failed to load appointments. Please try again later.
                </div>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-gray-50">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            {/* Header */}
            <header className="bg-gradient-to-r from-[#FF7350] to-[#FF552A] shadow-lg">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-white">
                        Grooming Appointments
                    </h1>
                    <p className="mt-2 text-white opacity-90">
                        Manage all pet grooming appointments
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
                {/* Search and Filter */}
                <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="relative w-full sm:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search pets, owners or phone..."
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF552A] focus:border-transparent transition-all duration-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                <FiX className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            </button>
                        )}
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-[#FF552A] hover:bg-[#FF7350] text-white px-5 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                        onClick={() => {
                            setSelectedAppointment({
                                status: "pending",
                                vaccinated: "Fully Vaccinated",
                                friendly: "Yes",
                                trained: "Yes",
                            });
                            setIsModalOpen(true);
                        }}
                    >
                        <FiPlus className="text-lg" />
                        <span className="font-medium">New Appointment</span>
                    </motion.button>
                </div>

                {/* Status Filters */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {[
                        "All",
                        "pending",
                        "Confirmed",
                        "Completed",
                        "Cancelled",
                    ].map((status) => (
                        <motion.button
                            key={status}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedStatus(status)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                status === selectedStatus
                                    ? "bg-[#FF552A] text-white shadow-md"
                                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:shadow-sm"
                            }`}
                        >
                            {status}
                        </motion.button>
                    ))}
                </div>

                {/* Appointments List */}
                {filteredAppointments.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-xl shadow-md p-8 text-center"
                    >
                        <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                            <FiUser className="w-full h-full" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 mb-1">
                            No appointments found
                        </h3>
                        <p className="text-gray-500">
                            Try adjusting your search or filter criteria
                        </p>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        <AnimatePresence>
                            {filteredAppointments.map((appointment) => (
                                <motion.div
                                    key={appointment._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 border border-gray-100"
                                >
                                    {/* Card Header with Status */}
                                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">
                                                {appointment.petName}
                                            </h3>
                                            <p className="text-gray-600 text-sm">
                                                {appointment.petType} •{" "}
                                                {appointment.breed}
                                            </p>
                                        </div>
                                        <span
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                appointment.status
                                            )}`}
                                        >
                                            {getStatusIcon(appointment.status)}
                                            {appointment.status}
                                        </span>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Owner Information */}
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-500 mb-2">
                                                        Owner Information
                                                    </h4>
                                                    <div className="space-y-3">
                                                        <div>
                                                            <p className="text-xs text-gray-500">
                                                                Name
                                                            </p>
                                                            <p className="font-medium">
                                                                {
                                                                    appointment.ownerName
                                                                }
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">
                                                                Contact
                                                            </p>
                                                            <p className="font-medium">
                                                                {
                                                                    appointment.phone
                                                                }
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">
                                                                Address
                                                            </p>
                                                            <p className="font-medium text-sm">
                                                                {
                                                                    appointment.address
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Pet Details */}
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-500 mb-2">
                                                        Pet Details
                                                    </h4>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <p className="text-xs text-gray-500">
                                                                Age
                                                            </p>
                                                            <p className="font-medium">
                                                                {
                                                                    appointment.age
                                                                }{" "}
                                                                years
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">
                                                                Weight
                                                            </p>
                                                            <p className="font-medium">
                                                                {
                                                                    appointment.weight
                                                                }{" "}
                                                                lbs
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Health and Appointment Info */}
                                            <div className="space-y-4">
                                                {/* Health Information */}
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-500 mb-2">
                                                        Health Information
                                                    </h4>
                                                    <div className="grid grid-cols-3 gap-2 mb-3">
                                                        <div>
                                                            <p className="text-xs text-gray-500">
                                                                Friendly
                                                            </p>
                                                            <p className="font-medium text-sm">
                                                                {
                                                                    appointment.friendly
                                                                }
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">
                                                                Trained
                                                            </p>
                                                            <p className="font-medium text-sm">
                                                                {
                                                                    appointment.trained
                                                                }
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">
                                                                Vaccinated
                                                            </p>
                                                            <p className="font-medium text-sm">
                                                                {
                                                                    appointment.vaccinated
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">
                                                            Temperament
                                                        </p>
                                                        <p className="font-medium text-sm">
                                                            {appointment.temperament ||
                                                                "Not specified"}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Appointment Times */}
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-500 mb-2">
                                                        Appointment Times
                                                    </h4>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <p className="text-xs text-gray-500">
                                                                Pickup
                                                            </p>
                                                            <p className="font-medium text-sm">
                                                                {
                                                                    appointment.pickupTime
                                                                }
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500">
                                                                Delivery
                                                            </p>
                                                            <p className="font-medium text-sm">
                                                                {
                                                                    appointment.deliveryTime
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Medical Notes */}
                                        {appointment.medical && (
                                            <div className="mt-6">
                                                <h4 className="text-sm font-semibold text-gray-500 mb-2">
                                                    Medical Notes
                                                </h4>
                                                <p className="text-sm bg-gray-50 p-3 rounded-lg">
                                                    {appointment.medical}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Card Footer with Actions */}
                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                                        <div className="flex space-x-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => {
                                                    setSelectedAppointment(
                                                        appointment
                                                    );
                                                    setIsModalOpen(true);
                                                }}
                                                className="p-2 text-gray-600 hover:text-[#FF552A] transition-colors"
                                                title="Edit"
                                            >
                                                <FiEdit2 className="w-4 h-4" />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() =>
                                                    handleDelete(
                                                        appointment._id
                                                    )
                                                }
                                                className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                                                title="Delete"
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </motion.button>
                                        </div>

                                        <div className="flex space-x-2">
                                            {appointment.status !==
                                                "Confirmed" && (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() =>
                                                        handleStatusUpdate(
                                                            appointment._id,
                                                            "Confirmed"
                                                        )
                                                    }
                                                    className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100 transition-colors border border-blue-100"
                                                >
                                                    Confirm
                                                </motion.button>
                                            )}
                                            {appointment.status !==
                                                "Completed" && (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() =>
                                                        handleStatusUpdate(
                                                            appointment._id,
                                                            "Completed"
                                                        )
                                                    }
                                                    className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded hover:bg-green-100 transition-colors border border-green-100"
                                                >
                                                    Complete
                                                </motion.button>
                                            )}
                                            {appointment.status !==
                                                "Cancelled" && (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() =>
                                                        handleStatusUpdate(
                                                            appointment._id,
                                                            "Cancelled"
                                                        )
                                                    }
                                                    className="px-3 py-1 bg-red-50 text-red-600 text-xs rounded hover:bg-red-100 transition-colors border border-red-100"
                                                >
                                                    Cancel
                                                </motion.button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </main>

            {/* Appointment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {selectedAppointment?._id
                                        ? "Edit Appointment"
                                        : "Create New Appointment"}
                                </h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Owner Information */}
                                    <div className="md:col-span-2">
                                        <h3 className="text-lg font-semibold text-[#FF552A] border-b pb-2 mb-4">
                                            Owner Information
                                        </h3>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Owner Name*
                                        </label>
                                        <input
                                            type="text"
                                            name="ownerName"
                                            value={
                                                selectedAppointment?.ownerName ||
                                                ""
                                            }
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF552A] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Owner Email*
                                        </label>
                                        <input
                                            type="email"
                                            name="ownerEmail"
                                            value={
                                                selectedAppointment?.ownerEmail ||
                                                ""
                                            }
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF552A] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number*
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={
                                                selectedAppointment?.phone || ""
                                            }
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF552A] focus:border-transparent"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Address*
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={
                                                selectedAppointment?.address ||
                                                ""
                                            }
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF552A] focus:border-transparent"
                                        />
                                    </div>

                                    {/* Pet Information */}
                                    <div className="md:col-span-2">
                                        <h3 className="text-lg font-semibold text-[#FF552A] border-b pb-2 mb-4">
                                            Pet Information
                                        </h3>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Pet Name*
                                        </label>
                                        <input
                                            type="text"
                                            name="petName"
                                            value={
                                                selectedAppointment?.petName ||
                                                ""
                                            }
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF552A] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Pet Type*
                                        </label>
                                        <select
                                            name="petType"
                                            value={
                                                selectedAppointment?.petType ||
                                                ""
                                            }
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF552A] focus:border-transparent"
                                        >
                                            <option value="">
                                                Select Pet Type
                                            </option>
                                            <option value="Dog">Dog</option>
                                            <option value="Cat">Cat</option>
                                            <option value="Rabbit">
                                                Rabbit
                                            </option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Breed*
                                        </label>
                                        <input
                                            type="text"
                                            name="breed"
                                            value={
                                                selectedAppointment?.breed || ""
                                            }
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF552A] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Age (years)*
                                        </label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={
                                                selectedAppointment?.age || ""
                                            }
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF552A] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Weight (lbs)*
                                        </label>
                                        <input
                                            type="number"
                                            name="weight"
                                            value={
                                                selectedAppointment?.weight ||
                                                ""
                                            }
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF552A] focus:border-transparent"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Temperament
                                        </label>
                                        <input
                                            type="text"
                                            name="temperament"
                                            value={
                                                selectedAppointment?.temperament ||
                                                ""
                                            }
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF552A] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Friendly*
                                        </label>
                                        <select
                                            name="friendly"
                                            value={
                                                selectedAppointment?.friendly ||
                                                "Yes"
                                            }
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF552A] focus:border-transparent"
                                        >
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Trained*
                                        </label>
                                        <select
                                            name="trained"
                                            value={
                                                selectedAppointment?.trained ||
                                                "Yes"
                                            }
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF552A] focus:border-transparent"
                                        >
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Vaccinated*
                                        </label>
                                        <select
                                            name="vaccinated"
                                            value={
                                                selectedAppointment?.vaccinated ||
                                                "Fully Vaccinated"
                                            }
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF552A] focus:border-transparent"
                                        >
                                            <option value="Fully Vaccinated">
                                                Fully Vaccinated
                                            </option>
                                            <option value="Partially Vaccinated">
                                                Partially Vaccinated
                                            </option>
                                            <option value="Not Vaccinated">
                                                Not Vaccinated
                                            </option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Medical Notes
                                        </label>
                                        <textarea
                                            name="medical"
                                            value={
                                                selectedAppointment?.medical ||
                                                ""
                                            }
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF552A] focus:border-transparent"
                                        />
                                    </div>

                                    {/* Appointment Details */}
                                    <div className="md:col-span-2">
                                        <h3 className="text-lg font-semibold text-[#FF552A] border-b pb-2 mb-4">
                                            Appointment Details
                                        </h3>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Pickup Time*
                                        </label>
                                        <input
                                            type="time"
                                            name="pickupTime"
                                            value={
                                                selectedAppointment?.pickupTime ||
                                                ""
                                            }
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF552A] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Delivery Time*
                                        </label>
                                        <input
                                            type="time"
                                            name="deliveryTime"
                                            value={
                                                selectedAppointment?.deliveryTime ||
                                                ""
                                            }
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF552A] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Status*
                                        </label>
                                        <select
                                            name="status"
                                            value={
                                                selectedAppointment?.status ||
                                                "pending"
                                            }
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF552A] focus:border-transparent"
                                        >
                                            <option value="pending">
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

                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 bg-[#FF552A] text-white rounded-lg hover:bg-[#FF7350] transition-colors duration-200 shadow-md"
                                    >
                                        {selectedAppointment?._id
                                            ? "Save Changes"
                                            : "Create Appointment"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default GroomingAdmin;
