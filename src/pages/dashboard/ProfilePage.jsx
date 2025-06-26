import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
    HiUserCircle,
    HiPencil,
    HiCheck,
    HiX,
    HiOutlineHome,
    HiOutlinePhone,
    HiOutlineMail,
    HiPlus,
    HiTrash,
} from "react-icons/hi";
import { FaPaw } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const ProfilePage = () => {
    // Common pet types
    const petTypes = [
        "Dog",
        "Cat",
        "Bird",
        "Fish",
        "Rabbit",
        "Hamster",
        "Guinea Pig",
        "Turtle",
        "Snake",
        "Lizard",
        "Other",
    ];

    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState(null);

    const { data: currentUser, isLoading } = useQuery({
        queryKey: ["currentUser", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(
                `/singleuser?email=${user.email}`
            );
            return res.data.data;
        },
        enabled: !!user?.email,
    });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        pets: [{ petName: "", petType: "", petBreed: "", petAge: "" }],
    });

    useEffect(() => {
        if (currentUser) {
            setFormData({
                name: currentUser.name || "",
                email: currentUser.email || "",
                phone: currentUser.phone || "",
                address: currentUser.address || "",
                pets:
                    currentUser.pets?.length > 0
                        ? [...currentUser.pets]
                        : [
                              {
                                  petName: "",
                                  petType: "",
                                  petBreed: "",
                                  petAge: "",
                              },
                          ],
            });
        }
    }, [currentUser]);

    const createEmptyPet = () => ({
        petName: "",
        petType: "",
        petBreed: "",
        petAge: "",
    });

    const handleEditClick = () => {
        setFormData({
            name: currentUser.name || "",
            email: currentUser.email || "",
            phone: currentUser.phone || "",
            address: currentUser.address || "",
            pets:
                currentUser.pets?.length > 0
                    ? [...currentUser.pets]
                    : [createEmptyPet()],
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePetChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedPets = [...prev.pets];
            updatedPets[index][field] = value;
            return { ...prev, pets: updatedPets };
        });
    };

    const handleAddPet = () => {
        setFormData((prev) => ({
            ...prev,
            pets: [...prev.pets, createEmptyPet()],
        }));
    };

    const handleRemovePet = (index) => {
        setFormData((prev) => {
            const updatedPets = [...prev.pets];
            updatedPets.splice(index, 1);
            return { ...prev, pets: updatedPets };
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        setUpdateError(null);

        try {
            const updatedFormData = {
                ...formData,
                email: user.email,
            };

            const res = await axiosPublic.patch(`/updateuser`, updatedFormData);

            toast("Profile updated successfully!", {
                type: "success",
                position: "top-center",
                autoClose: 3000,
            });
            if (res.data.success) {
                queryClient.invalidateQueries(["currentUser", user.email]);
                setFormData(null);
            } else {
                setUpdateError(res.data.message || "Update failed");
            }
        } catch (error) {
            setUpdateError(
                error.response?.data?.message || "An error occurred"
            );
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading || !currentUser)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-pulse text-center space-y-4">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gray-200"></div>
                    <div className="h-6 w-64 mx-auto bg-gray-200 rounded"></div>
                    <p className="text-gray-500">Loading your profile...</p>
                </div>
            </div>
        );

    // Profile completion calculation
    const profileFields = ["name", "phone", "address"];
    const petFields = ["petName", "petType", "petBreed", "petAge"];

    const userFilledFieldsCount = profileFields.reduce(
        (count, field) =>
            currentUser[field]?.toString().trim() ? count + 1 : count,
        0
    );

    const pets = currentUser.pets || [];
    const petCompletion =
        pets.length > 0
            ? Math.max(
                  ...pets.map(
                      (pet) =>
                          petFields.reduce(
                              (count, field) =>
                                  pet[field]?.toString().trim()
                                      ? count + 1
                                      : count,
                              0
                          ) / petFields.length
                  )
              )
            : 0;

    const completionPercent = Math.round(
        ((userFilledFieldsCount + petCompletion * petFields.length) /
            (profileFields.length + petFields.length)) *
            100
    );

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Pet Owner Profile
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Manage your information and your pet's details
                    </p>
                </div>

                {!formData && (
                    <button
                        onClick={handleEditClick}
                        className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-2.5 rounded-lg shadow hover:shadow-md transition-all"
                    >
                        <HiPencil className="text-lg" />
                        <span>Edit Profile</span>
                    </button>
                )}
            </div>

            {/* Profile Completion */}
            <div className="mb-6 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700 flex items-center gap-2">
                        <FaPaw className="text-orange-500" />
                        Profile Completion
                    </h3>
                    <span className="font-semibold text-orange-600">
                        {completionPercent}%
                    </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                        className="h-2.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 transition-all duration-500"
                        style={{ width: `${completionPercent}%` }}
                    />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                    {completionPercent < 50
                        ? "Add more details about you and your pet"
                        : completionPercent < 80
                        ? "Almost there! Just a few more details"
                        : "Great job! Your profile is complete"}
                </p>
            </div>

            {/* Update Error Message */}
            {updateError && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <HiX className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">
                                {updateError}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Profile Content */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 border-b">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="relative">
                            {currentUser.photo ? (
                                <img
                                    src={currentUser.photo}
                                    alt="Profile"
                                    className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow"
                                />
                            ) : (
                                <HiUserCircle className="w-20 h-20 md:w-28 md:h-28 text-orange-300" />
                            )}
                            <span className="absolute -bottom-2 -right-2 bg-white px-3 py-1 rounded-full text-xs font-medium shadow flex items-center gap-1">
                                <FaPaw className="text-orange-500" />
                                Pet Owner
                            </span>
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {currentUser.name}
                            </h2>
                            {currentUser.pets?.length > 0 && (
                                <p className="text-gray-600 mt-1 flex items-center justify-center md:justify-start gap-1">
                                    <FaPaw className="text-orange-400" />
                                    Owner of {currentUser.pets.length} pet
                                    {currentUser.pets.length !== 1 ? "s" : ""}
                                </p>
                            )}
                            <p className="text-gray-500 mt-2 flex items-center justify-center md:justify-start gap-1 text-sm">
                                <HiOutlineMail className="text-orange-400" />
                                {currentUser.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Profile Content */}
                <div className="p-6">
                    {formData ? (
                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                                        Personal Information
                                    </h3>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name || ""}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email || ""}
                                        disabled
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone || ""}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address || ""}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 mt-4">
                                            Pet Information
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={handleAddPet}
                                            className="flex items-center gap-1 text-sm bg-orange-100 text-orange-700 px-3 py-1.5 rounded-lg hover:bg-orange-200 transition"
                                        >
                                            <HiPlus />
                                            Add Pet
                                        </button>
                                    </div>
                                </div>

                                {formData.pets?.map((pet, index) => (
                                    <div
                                        key={index}
                                        className="col-span-2 bg-orange-50 p-4 rounded-lg relative"
                                    >
                                        <div className="absolute top-3 right-3">
                                            {formData.pets.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemovePet(index)
                                                    }
                                                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition"
                                                >
                                                    <HiTrash />
                                                </button>
                                            )}
                                        </div>
                                        <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                                            <FaPaw className="text-orange-500" />
                                            Pet #{index + 1}
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Pet's Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={pet.petName || ""}
                                                    onChange={(e) =>
                                                        handlePetChange(
                                                            index,
                                                            "petName",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Pet Type
                                                </label>
                                                <select
                                                    value={pet.petType || ""}
                                                    onChange={(e) =>
                                                        handlePetChange(
                                                            index,
                                                            "petType",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                                                >
                                                    <option value="">
                                                        Select pet type
                                                    </option>
                                                    {petTypes.map((type) => (
                                                        <option
                                                            key={type}
                                                            value={type}
                                                        >
                                                            {type}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Breed
                                                </label>
                                                <input
                                                    type="text"
                                                    value={pet.petBreed || ""}
                                                    onChange={(e) =>
                                                        handlePetChange(
                                                            index,
                                                            "petBreed",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Age
                                                </label>
                                                <input
                                                    type="text"
                                                    value={pet.petAge || ""}
                                                    onChange={(e) =>
                                                        handlePetChange(
                                                            index,
                                                            "petAge",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setFormData(null)}
                                    className="flex items-center gap-2 px-5 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                                    disabled={isUpdating}
                                >
                                    <HiX />
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-5 py-2 text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-lg shadow transition disabled:opacity-70"
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? (
                                        "Saving..."
                                    ) : (
                                        <>
                                            <HiCheck />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <div className="bg-gray-50 p-5 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                                    <HiUserCircle className="text-orange-500" />
                                    Personal Information
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500 flex items-center gap-2">
                                            <HiOutlineMail className="text-orange-400" />
                                            Email
                                        </p>
                                        <p className="font-medium mt-1 ml-6">
                                            {currentUser.email}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 flex items-center gap-2">
                                            <HiOutlinePhone className="text-orange-400" />
                                            Phone
                                        </p>
                                        <p className="font-medium mt-1 ml-6">
                                            {currentUser.phone ||
                                                "Not provided"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 flex items-center gap-2">
                                            <HiOutlineHome className="text-orange-400" />
                                            Address
                                        </p>
                                        <p className="font-medium mt-1 ml-6">
                                            {currentUser.address ||
                                                "Not provided"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Pet Information */}
                            <div className="bg-gray-50 p-5 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                                    <FaPaw className="text-orange-500" />
                                    Pet Information
                                </h3>
                                <div className="space-y-6">
                                    {currentUser.pets?.length > 0 ? (
                                        currentUser.pets.map((pet, index) => (
                                            <div
                                                key={index}
                                                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                                            >
                                                <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                                                    <FaPaw className="text-orange-400" />
                                                    Pet #{index + 1}
                                                </h4>
                                                <div className="space-y-4">
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            Pet's Name
                                                        </p>
                                                        <p className="font-medium">
                                                            {pet.petName ||
                                                                "Not provided"}
                                                        </p>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <p className="text-sm text-gray-500">
                                                                Type
                                                            </p>
                                                            <p className="font-medium">
                                                                {pet.petType ||
                                                                    "-"}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500">
                                                                Breed
                                                            </p>
                                                            <p className="font-medium">
                                                                {pet.petBreed ||
                                                                    "-"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            Age
                                                        </p>
                                                        <p className="font-medium">
                                                            {pet.petAge || "-"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 italic">
                                            No pets added yet
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ProfilePage;
