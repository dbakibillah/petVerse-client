import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import {
    FiHome,
    FiUser,
    FiCalendar,
    FiClock,
    FiPhone,
    FiMapPin,
    FiEdit2,
    FiTrash2,
    FiPlus,
    FiSearch,
    FiMail,
    FiHeart,
    FiCheckCircle,
    FiAlertCircle,
    FiInfo,
} from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GroomingCardsAdmin from "./GroomingCardsAdmin";

const GroomingAdmin = () => {
    const axiosPublic = useAxiosPublic();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        data: groomings = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["groomings"],
        queryFn: async () => {
            try {
                const response = await axiosPublic.get("/grooming");
                return response.data;
            } catch (error) {
                toast.error("Failed to fetch appointments");
                throw error;
            }
        },
    });

    const filteredAppointments = groomings.filter((appointment) => {
        const matchesSearch =
            appointment.petName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            appointment.phone.includes(searchTerm) ||
            appointment.ownerName
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
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
        if (
            window.confirm("Are you sure you want to delete this appointment?")
        ) {
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
            if (selectedAppointment) {
                await axiosPublic.put(
                    `/grooming/${selectedAppointment._id}`,
                    selectedAppointment
                );
                toast.update(toastId, {
                    render: "Appointment updated successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
            } else {
                await axiosPublic.post("/grooming", selectedAppointment || {});
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
            toast.update(toastId, {
                render: selectedAppointment
                    ? "Failed to update appointment"
                    : "Failed to create appointment",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            console.error(error);
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
                position="top-right"
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
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF552A] focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        className="flex items-center gap-2 bg-[#FF552A] hover:bg-[#FF7350] text-white px-5 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                        onClick={() => {
                            setSelectedAppointment({
                                status: "Pending",
                                vaccinated: "Fully Vaccinated",
                                friendly: "Yes",
                                trained: "Yes",
                            });
                            setIsModalOpen(true);
                        }}
                    >
                        <FiPlus className="text-lg" />
                        <span className="font-medium">New Appointment</span>
                    </button>
                </div>

                {/* Status Filters */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {[
                        "All",
                        "Pending",
                        "Confirmed",
                        "Completed",
                        "Cancelled",
                    ].map((status) => (
                        <button
                            key={status}
                            onClick={() => setSelectedStatus(status)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                status === selectedStatus
                                    ? "bg-[#FF552A] text-white shadow-md"
                                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:shadow-sm"
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {/* Appointments List */}
                {filteredAppointments.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center">
                        <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                            <FiUser className="w-full h-full" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 mb-1">
                            No appointments found
                        </h3>
                        <p className="text-gray-500">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                ) : (
                    <GroomingCardsAdmin
                        appointments={filteredAppointments}
                        handleStatusUpdate={handleStatusUpdate}
                        handleDelete={handleDelete}
                        setSelectedAppointment={setSelectedAppointment}
                        setIsModalOpen={setIsModalOpen}
                        getStatusColor={getStatusColor}
                        getStatusIcon={getStatusIcon}
                    />
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
                                                "Dog"
                                            }
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF552A] focus:border-transparent"
                                        >
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
                                                "Pending"
                                            }
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF552A] focus:border-transparent"
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
