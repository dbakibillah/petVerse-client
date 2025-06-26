import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import {
    FaBone,
    FaCalendarAlt,
    FaCar,
    FaCat,
    FaCheck,
    FaClipboard,
    FaDog,
    FaPaw,
    FaPhone,
    FaShower,
} from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProviders";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const HealthCareAppoinment = () => {
    const axiosPublic = useAxiosPublic();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [visitedSteps, setVisitedSteps] = useState([0]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [showPetAnimation, setShowPetAnimation] = useState(false);
    const [selectedPetType, setSelectedPetType] = useState(null);
    const { user } = useContext(AuthContext);

    const petTypes = [
        { value: "Dog", label: "Dog", icon: <FaDog className="inline mr-2" /> },
        { value: "Cat", label: "Cat", icon: <FaCat className="inline mr-2" /> },
        {
            value: "Rabbit",
            label: "Rabbit",
            icon: <FaPaw className="inline mr-2" />,
        },
        {
            value: "Bird",
            label: "Bird",
            icon: <FaBone className="inline mr-2" />,
        },
    ];

    const steps = [
        { id: "pet-info", title: "Pet Info", icon: <FaDog />, color: "orange" },
        {
            id: "contact-info",
            title: "Contact",
            icon: <FaPhone />,
            color: "pink",
        },
        {
            id: "additional-info",
            title: "Additional",
            icon: <FaClipboard />,
            color: "yellow",
        },
        {
            id: "schedule",
            title: "Schedule",
            icon: <FaCalendarAlt />,
            color: "red",
        },
        { id: "review", title: "Review", icon: <FaCheck />, color: "green" },
    ];

    useEffect(() => {
        if (showPetAnimation) {
            const timer = setTimeout(() => {
                setShowPetAnimation(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showPetAnimation]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if checkbox is checked
        const isChecked = document.getElementById("terms-checkbox")?.checked;
        if (!isChecked) {
            alert("Please agree to the terms and conditions");
            return;
        }

        const healthCareData = {
            ownerName: user?.displayName || "Anonymous",
            ownerEmail: user?.email || "Anonymous",
            status: "pending",
            createdAt: new Date().toISOString(),
            petName: formData.petName,
            petType: formData.petType,
            age: formData.age || null,
            weight: formData.weight || null,
            breed: formData.breed || null,
            temperament: formData.temperament || null,
            phone: formData.phone,
            address: formData.address,
            friendly: formData.friendly,
            trained: formData.trained,
            vaccinated: formData.vaccinated,
            medical: formData.medical || null,
            pickupTime: formData.pickupTime,
            deliveryTime: formData.deliveryTime,
        };

        setIsSubmitting(true);

        try {
            const res = await axiosPublic.post(
                "/healthcare/appointment",
                healthCareData
            );

            if (res.data.insertedId) {
                setSubmitSuccess(true);
                setCurrentStep(steps.length - 1);
                setShowPetAnimation(true);

                setTimeout(() => {
                    setFormData({});
                    setCurrentStep(0);
                    setVisitedSteps([0]);
                    setSelectedPetType(null);
                    setSubmitSuccess(false);
                }, 5000);
            } else {
                console.error("Submission failed:", res.data);
                alert(
                    "Submission received but confirmation failed. Please contact support."
                );
            }
        } catch (error) {
            console.error(
                "Error details:",
                error.response?.data || error.message
            );
            if (error.response?.data?.missingFields) {
                alert(
                    `Missing fields: ${error.response.data.missingFields.join(
                        ", "
                    )}`
                );
            } else {
                alert(
                    error.response?.data?.message ||
                        "Something went wrong. Please try again."
                );
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1 && isStepComplete(currentStep)) {
            setCurrentStep(currentStep + 1);
            if (!visitedSteps.includes(currentStep + 1)) {
                setVisitedSteps([...visitedSteps, currentStep + 1]);
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePetTypeSelect = (petType) => {
        setSelectedPetType(petType);
        setFormData({
            ...formData,
            petType: petType.value,
        });
    };

    const isStepComplete = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return !!formData.petName && !!formData.petType;
            case 1:
                return !!formData.phone && !!formData.address;
            case 2:
                return (
                    !!formData.friendly &&
                    !!formData.trained &&
                    !!formData.vaccinated
                );
            case 3:
                return !!formData.pickupTime && !!formData.deliveryTime;
            case 4:
                return document.querySelector('input[type="checkbox"]')
                    ?.checked;
            default:
                return false;
        }
    };

    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    const petAnimationVariants = {
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -100, opacity: 0 },
    };

    return (
        <section className="font-sans text-gray-800 min-h-screen relative overflow-hidden p-2">
            <AnimatePresence>
                {showPetAnimation && (
                    <motion.div
                        variants={petAnimationVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.8, type: "spring" }}
                        className="fixed bottom-0 left-0 right-0 flex justify-center z-50 pointer-events-none"
                    >
                        <div className="bg-white p-4 rounded-full shadow-xl border-2 border-orange-300">
                            <div className="text-4xl animate-bounce">
                                {formData.petType === "Dog"
                                    ? "🐶"
                                    : formData.petType === "Cat"
                                    ? "🐱"
                                    : formData.petType === "Rabbit"
                                    ? "🐰"
                                    : formData.petType === "Bird"
                                    ? "🐦"
                                    : "🐾"}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <section className="max-w-4xl mx-auto text-center px-4 py-12 relative">
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-0 right-20 w-40 h-40 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <h2 className="text-3xl font-bold text-orange-600 mb-4">
                        Why Choose Our Pet Spa?
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Our professional pet healthcare service ensures that
                        your furry friend receives the best care, hygiene, and
                        comfort.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        {[
                            {
                                icon: <FaCar className="text-xl" />,
                                text: "Pickup & Drop",
                                bg: "bg-orange-100",
                                textColor: "text-orange-700",
                            },
                            {
                                icon: <FaShower className="text-xl" />,
                                text: "Sanitized Tools",
                                bg: "bg-red-100",
                                textColor: "text-red-700",
                            },
                            {
                                icon: "🧑‍⚕️",
                                text: "Vet Supervision",
                                bg: "bg-yellow-100",
                                textColor: "text-yellow-700",
                            },
                            {
                                icon: "💯",
                                text: "Customer Satisfaction",
                                bg: "bg-pink-100",
                                textColor: "text-pink-700",
                            },
                        ].map((item, index) => (
                            <motion.span
                                key={index}
                                whileHover={{ y: -3, scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`${item.bg} ${item.textColor} px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm`}
                            >
                                {item.icon} {item.text}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </section>

            <div className="max-w-6xl mx-auto px-6 mb-8">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-6 rounded-2xl shadow-lg border border-orange-200 relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            {steps.map((step, index) => (
                                <div
                                    key={step.id}
                                    className="flex flex-col items-center relative"
                                >
                                    <div
                                        className={`absolute h-1 top-6 ${
                                            index === 0
                                                ? "left-1/2"
                                                : index === steps.length - 1
                                                ? "right-1/2"
                                                : "inset-x-0"
                                        } ${
                                            currentStep >= index
                                                ? "bg-gradient-to-r from-orange-400 to-pink-400"
                                                : "bg-gray-200"
                                        }`}
                                    ></div>
                                    <motion.button
                                        whileHover={{
                                            scale: visitedSteps.includes(index)
                                                ? 1.1
                                                : 1,
                                        }}
                                        whileTap={{
                                            scale: visitedSteps.includes(index)
                                                ? 0.95
                                                : 1,
                                        }}
                                        onClick={() => {
                                            if (visitedSteps.includes(index)) {
                                                setCurrentStep(index);
                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: "smooth",
                                                });
                                            }
                                        }}
                                        className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-2 transition-all shadow-md ${
                                            currentStep === index
                                                ? `bg-${step.color}-500 text-white scale-110 ring-4 ring-${step.color}-200`
                                                : visitedSteps.includes(index)
                                                ? `bg-${step.color}-200 text-${step.color}-700`
                                                : "bg-gray-200 text-gray-500"
                                        }`}
                                        disabled={!visitedSteps.includes(index)}
                                    >
                                        {step.icon}
                                    </motion.button>
                                    <span
                                        className={`text-sm font-medium ${
                                            currentStep === index
                                                ? `text-${step.color}-600 font-bold`
                                                : "text-gray-600"
                                        }`}
                                    >
                                        {step.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <motion.div
                                className="bg-gradient-to-r from-orange-400 to-pink-400 h-3 rounded-full"
                                initial={{ width: "0%" }}
                                animate={{
                                    width: `${
                                        (currentStep / (steps.length - 1)) * 100
                                    }%`,
                                }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            ></motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <section className="max-w-6xl mx-auto bg-white p-6 sm:p-10 mt-6 mb-16 rounded-3xl shadow-2xl border border-orange-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-pink-50/30 z-0"></div>
                <div className="relative z-10">
                    <form onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                variants={formVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                            >
                                {currentStep === 0 && (
                                    <div className="space-y-8">
                                        <div className="flex items-center mb-8">
                                            <div
                                                className={`bg-${steps[0].color}-500 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4 text-xl shadow-md`}
                                            >
                                                1
                                            </div>
                                            <h3 className="text-2xl font-bold text-orange-600">
                                                <FaDog className="inline mr-2" />{" "}
                                                Pet Information
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 }}
                                            >
                                                <label className="block mb-2 font-semibold text-gray-700">
                                                    Pet Name *
                                                </label>
                                                <input
                                                    name="petName"
                                                    type="text"
                                                    value={
                                                        formData.petName || ""
                                                    }
                                                    onChange={handleInputChange}
                                                    placeholder="e.g. Bella"
                                                    className="w-full px-4 py-3 rounded-xl border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-sm transition-all duration-200"
                                                    required
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <label className="block mb-2 font-semibold text-gray-700">
                                                    Type of Pet *
                                                </label>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                    {petTypes.map((pet) => (
                                                        <motion.button
                                                            key={pet.value}
                                                            type="button"
                                                            whileHover={{
                                                                scale: 1.03,
                                                            }}
                                                            whileTap={{
                                                                scale: 0.97,
                                                            }}
                                                            onClick={() =>
                                                                handlePetTypeSelect(
                                                                    pet
                                                                )
                                                            }
                                                            className={`px-3 py-2 rounded-lg border-2 text-sm flex items-center justify-center ${
                                                                selectedPetType?.value ===
                                                                pet.value
                                                                    ? `border-${steps[0].color}-500 bg-${steps[0].color}-100 text-${steps[0].color}-700`
                                                                    : "border-gray-200 hover:border-gray-300"
                                                            }`}
                                                        >
                                                            {pet.icon}{" "}
                                                            {pet.label}
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                <label className="block mb-2 font-semibold text-gray-700">
                                                    Age (Years)
                                                </label>
                                                <input
                                                    name="age"
                                                    type="number"
                                                    min="0"
                                                    max="30"
                                                    value={formData.age || ""}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-sm transition-all duration-200"
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 }}
                                            >
                                                <label className="block mb-2 font-semibold text-gray-700">
                                                    Weight (kg)
                                                </label>
                                                <input
                                                    name="weight"
                                                    type="number"
                                                    min="0"
                                                    step="0.1"
                                                    value={
                                                        formData.weight || ""
                                                    }
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-sm transition-all duration-200"
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                            >
                                                <label className="block mb-2 font-semibold text-gray-700">
                                                    Breed
                                                </label>
                                                <input
                                                    name="breed"
                                                    type="text"
                                                    value={formData.breed || ""}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g. Labrador"
                                                    className="w-full px-4 py-3 rounded-xl border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-sm transition-all duration-200"
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.6 }}
                                                className="sm:col-span-2 lg:col-span-3"
                                            >
                                                <label className="block mb-2 font-semibold text-gray-700">
                                                    Temperament or Behavior
                                                    Notes
                                                </label>
                                                <textarea
                                                    name="temperament"
                                                    rows="4"
                                                    value={
                                                        formData.temperament ||
                                                        ""
                                                    }
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-sm transition-all duration-200"
                                                    placeholder="Shy around strangers, scared of loud noises, etc."
                                                />
                                            </motion.div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 1 && (
                                    <div className="space-y-8">
                                        <div className="flex items-center mb-8">
                                            <div
                                                className={`bg-${steps[1].color}-500 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4 text-xl shadow-md`}
                                            >
                                                2
                                            </div>
                                            <h3 className="text-2xl font-bold text-pink-600">
                                                <FaCar className="inline mr-2" />{" "}
                                                Pickup & Contact Info
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 }}
                                            >
                                                <label className="block mb-2 font-semibold text-gray-700">
                                                    Phone Number *
                                                </label>
                                                <input
                                                    name="phone"
                                                    type="tel"
                                                    value={formData.phone || ""}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-pink-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 shadow-sm transition-all duration-200"
                                                    required
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <label className="block mb-2 font-semibold text-gray-700">
                                                    Pickup Address *
                                                </label>
                                                <input
                                                    name="address"
                                                    type="text"
                                                    value={
                                                        formData.address || ""
                                                    }
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-pink-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 shadow-sm transition-all duration-200"
                                                    required
                                                />
                                            </motion.div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="space-y-8">
                                        <div className="flex items-center mb-8">
                                            <div
                                                className={`bg-${steps[2].color}-500 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4 text-xl shadow-md`}
                                            >
                                                3
                                            </div>
                                            <h3 className="text-2xl font-bold text-yellow-600">
                                                <FaClipboard className="inline mr-2" />{" "}
                                                Additional Info
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 }}
                                            >
                                                <label className="block mb-2 font-semibold text-gray-700">
                                                    Friendly with other pets? *
                                                </label>
                                                <select
                                                    name="friendly"
                                                    value={
                                                        formData.friendly || ""
                                                    }
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-yellow-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 shadow-sm transition-all duration-200 appearance-none"
                                                    required
                                                >
                                                    <option value="">
                                                        Select option
                                                    </option>
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                    <option>Sometimes</option>
                                                </select>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <label className="block mb-2 font-semibold text-gray-700">
                                                    Trained? *
                                                </label>
                                                <select
                                                    name="trained"
                                                    value={
                                                        formData.trained || ""
                                                    }
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-yellow-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 shadow-sm transition-all duration-200 appearance-none"
                                                    required
                                                >
                                                    <option value="">
                                                        Select option
                                                    </option>
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                    <option>Partially</option>
                                                </select>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                <label className="block mb-2 font-semibold text-gray-700">
                                                    Vaccination Status *
                                                </label>
                                                <select
                                                    name="vaccinated"
                                                    value={
                                                        formData.vaccinated ||
                                                        ""
                                                    }
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-yellow-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 shadow-sm transition-all duration-200 appearance-none"
                                                    required
                                                >
                                                    <option value="">
                                                        Select status
                                                    </option>
                                                    <option>
                                                        Fully Vaccinated
                                                    </option>
                                                    <option>Partially</option>
                                                    <option>
                                                        Not Vaccinated
                                                    </option>
                                                </select>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 }}
                                                className="sm:col-span-2 lg:col-span-3"
                                            >
                                                <label className="block mb-2 font-semibold text-gray-700">
                                                    Medical Conditions or
                                                    Allergies
                                                </label>
                                                <textarea
                                                    name="medical"
                                                    rows="4"
                                                    value={
                                                        formData.medical || ""
                                                    }
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-yellow-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 shadow-sm transition-all duration-200"
                                                    placeholder="Mention anything important"
                                                />
                                            </motion.div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div className="space-y-8">
                                        <div className="flex items-center mb-8">
                                            <div
                                                className={`bg-${steps[3].color}-500 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4 text-xl shadow-md`}
                                            >
                                                4
                                            </div>
                                            <h3 className="text-2xl font-bold text-red-600">
                                                <FaCalendarAlt className="inline mr-2" />{" "}
                                                Schedule
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 }}
                                            >
                                                <label className="block mb-2 font-semibold text-gray-700">
                                                    Pickup Time *
                                                </label>
                                                <input
                                                    name="pickupTime"
                                                    type="time"
                                                    value={
                                                        formData.pickupTime ||
                                                        ""
                                                    }
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm transition-all duration-200"
                                                    required
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <label className="block mb-2 font-semibold text-gray-700">
                                                    Delivery Time *
                                                </label>
                                                <input
                                                    name="deliveryTime"
                                                    type="time"
                                                    value={
                                                        formData.deliveryTime ||
                                                        ""
                                                    }
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm transition-all duration-200"
                                                    required
                                                />
                                            </motion.div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 4 && (
                                    <div className="space-y-8">
                                        <div className="flex items-center mb-8">
                                            <div
                                                className={`bg-${steps[4].color}-500 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4 text-xl shadow-md`}
                                            >
                                                5
                                            </div>
                                            <h3 className="text-2xl font-bold text-green-600">
                                                <FaCheck className="inline mr-2" />{" "}
                                                Review Your Information
                                            </h3>
                                        </div>

                                        {submitSuccess ? (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.9,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border border-green-200 text-center shadow-sm"
                                            >
                                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                                    <svg
                                                        className="w-12 h-12 text-green-500"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M5 13l4 4L19 7"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <h4 className="text-2xl font-bold text-green-600 mb-2">
                                                    Appointment Confirmed!
                                                </h4>
                                                <p className="text-gray-600 mb-6">
                                                    We've received your
                                                    healthcare appointment
                                                    request. Our team will
                                                    contact you shortly to
                                                    confirm the details.
                                                </p>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData({});
                                                        setCurrentStep(0);
                                                        setVisitedSteps([0]);
                                                        setSubmitSuccess(false);
                                                        setSelectedPetType(
                                                            null
                                                        );
                                                    }}
                                                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300"
                                                >
                                                    <FaPaw className="inline mr-2" />{" "}
                                                    Book Another Appointment
                                                </motion.button>
                                            </motion.div>
                                        ) : (
                                            <>
                                                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                                    <h4 className="text-lg font-semibold text-orange-600 mb-4 pb-2 border-b border-orange-100">
                                                        Pet Information
                                                    </h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                                        <div>
                                                            <p className="text-gray-500 text-sm">
                                                                Pet Name
                                                            </p>
                                                            <p className="font-medium">
                                                                {formData.petName ||
                                                                    "-"}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500 text-sm">
                                                                Type
                                                            </p>
                                                            <p className="font-medium">
                                                                {formData.petType ||
                                                                    "-"}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500 text-sm">
                                                                Age
                                                            </p>
                                                            <p className="font-medium">
                                                                {formData.age ||
                                                                    "-"}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500 text-sm">
                                                                Breed
                                                            </p>
                                                            <p className="font-medium">
                                                                {formData.breed ||
                                                                    "-"}
                                                            </p>
                                                        </div>
                                                        <div className="md:col-span-2">
                                                            <p className="text-gray-500 text-sm">
                                                                Temperament
                                                                Notes
                                                            </p>
                                                            <p className="font-medium">
                                                                {formData.temperament ||
                                                                    "-"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <h4 className="text-lg font-semibold text-pink-600 mb-4 pb-2 border-b border-pink-100">
                                                        Contact Information
                                                    </h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                                        <div>
                                                            <p className="text-gray-500 text-sm">
                                                                Phone
                                                            </p>
                                                            <p className="font-medium">
                                                                {formData.phone ||
                                                                    "-"}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500 text-sm">
                                                                Address
                                                            </p>
                                                            <p className="font-medium">
                                                                {formData.address ||
                                                                    "-"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <h4 className="text-lg font-semibold text-yellow-600 mb-4 pb-2 border-b border-yellow-100">
                                                        Additional Information
                                                    </h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                                        <div>
                                                            <p className="text-gray-500 text-sm">
                                                                Friendly with
                                                                pets
                                                            </p>
                                                            <p className="font-medium">
                                                                {formData.friendly ||
                                                                    "-"}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500 text-sm">
                                                                Trained
                                                            </p>
                                                            <p className="font-medium">
                                                                {formData.trained ||
                                                                    "-"}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500 text-sm">
                                                                Vaccination
                                                            </p>
                                                            <p className="font-medium">
                                                                {formData.vaccinated ||
                                                                    "-"}
                                                            </p>
                                                        </div>
                                                        <div className="md:col-span-3">
                                                            <p className="text-gray-500 text-sm">
                                                                Medical Notes
                                                            </p>
                                                            <p className="font-medium">
                                                                {formData.medical ||
                                                                    "-"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <h4 className="text-lg font-semibold text-red-600 mb-4 pb-2 border-b border-red-100">
                                                        Schedule
                                                    </h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <p className="text-gray-500 text-sm">
                                                                Pickup Time
                                                            </p>
                                                            <p className="font-medium">
                                                                {formData.pickupTime ||
                                                                    "-"}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500 text-sm">
                                                                Delivery Time
                                                            </p>
                                                            <p className="font-medium">
                                                                {formData.deliveryTime ||
                                                                    "-"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-200">
                                                    <label className="flex items-start gap-3">
                                                        <input
                                                            id="terms-checkbox"
                                                            type="checkbox"
                                                            className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                                                            required
                                                        />
                                                        <span className="text-sm text-gray-700">
                                                            I agree that the
                                                            above information is
                                                            accurate and I
                                                            accept the terms of
                                                            the healthcare
                                                            service. *
                                                        </span>
                                                    </label>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {!submitSuccess && (
                            <div className="flex justify-between mt-10 border-t border-gray-200 pt-6">
                                {currentStep > 0 && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="button"
                                        onClick={handlePrev}
                                        className="px-8 py-3 rounded-xl font-medium flex items-center gap-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 19l-7-7 7-7"
                                            ></path>
                                        </svg>
                                        Previous
                                    </motion.button>
                                )}

                                {currentStep < steps.length - 1 ? (
                                    <motion.button
                                        whileHover={{
                                            scale: isStepComplete(currentStep)
                                                ? 1.05
                                                : 1,
                                        }}
                                        whileTap={{
                                            scale: isStepComplete(currentStep)
                                                ? 0.95
                                                : 1,
                                        }}
                                        type="button"
                                        onClick={handleNext}
                                        disabled={!isStepComplete(currentStep)}
                                        className={`px-8 py-3 rounded-xl font-medium text-white flex items-center gap-2 ${
                                            !isStepComplete(currentStep)
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : `bg-primary hover:bg-${steps[currentStep].color}-600`
                                        }`}
                                    >
                                        Next Step
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            ></path>
                                        </svg>
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        onClick={handleSubmit}
                                        disabled={
                                            isSubmitting ||
                                            !document.querySelector(
                                                'input[type="checkbox"]'
                                            )?.checked
                                        }
                                        className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg
                                                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <FaPaw className="inline mr-2" />{" "}
                                                Submit Appointment
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M5 13l4 4L19 7"
                                                    ></path>
                                                </svg>
                                            </>
                                        )}
                                    </motion.button>
                                )}
                            </div>
                        )}
                    </form>
                </div>
            </section>
        </section>
    );
};

export default HealthCareAppoinment;
