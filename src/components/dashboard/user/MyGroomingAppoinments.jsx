import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProviders";

const MyGroomingAppointments = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: appointments = [], isLoading } = useQuery({
        queryKey: ["myGroomingAppointments", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/grooming?email=${user.email}`);
            return res.data.data; // assuming the backend returns { data: [...] }
        },
    });

    if (isLoading) return <p className="text-center mt-10">Loading appointments...</p>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-orange-600">My Grooming Appointments</h2>

            {appointments.length === 0 ? (
                <p className="text-gray-500">No appointments found.</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {appointments.map((item) => (
                        <div key={item._id} className="bg-white rounded-xl shadow p-4 border border-gray-200">
                            <h3 className="text-xl font-semibold text-orange-500">{item.petName} ({item.petType})</h3>
                            <p><strong>Breed:</strong> {item.breed}</p>
                            <p><strong>Age:</strong> {item.age} years</p>
                            <p><strong>Weight:</strong> {item.weight} kg</p>
                            <p><strong>Vaccinated:</strong> {item.vaccinated}</p>
                            <p><strong>Trained:</strong> {item.trained}</p>
                            <p><strong>Friendly:</strong> {item.friendly}</p>
                            <p><strong>Temperament:</strong> {item.temperament}</p>
                            <p><strong>Medical Notes:</strong> {item.medical}</p>
                            <p><strong>Pickup Time:</strong> {item.pickupTime}</p>
                            <p><strong>Delivery Time:</strong> {item.deliveryTime}</p>
                            <p><strong>Status:</strong> 
                                <span className={`ml-2 font-semibold ${
                                    item.status === 'pending' ? 'text-yellow-500' :
                                    item.status === 'approved' ? 'text-green-500' :
                                    'text-red-500'
                                }`}>
                                    {item.status}
                                </span>
                            </p>
                            <p className="text-sm text-gray-400 mt-2">Submitted on: {new Date(item.createdAt).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyGroomingAppointments;
