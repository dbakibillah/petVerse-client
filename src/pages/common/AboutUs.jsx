import React, { useEffect, useState } from "react";
import {
    FaPaw,
    FaEnvelope,
    FaCode,
    FaHeart,
    FaShoppingCart,
    FaCamera,
    FaDog,
    FaUsers,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const developers = [
    {
        name: "Asif Ahmed",
        email: "asifahmed.dev@gmail.com",
        role: "Frontend Developer | MERN Stack Enthusiast",
        img: "https://i.ibb.co/Lhp7F34W/tushar.jpg",
    },
    {
        name: "Baki Billah",
        email: "bakibillah.dev@gmail.com",
        role: "Senior Developer | Full Stack Specialist",
        img: "https://i.ibb.co/dwxbd3wn/baki.jpg",
    },
    {
        name: "Muhaiminul Shafin",
        email: "muhaiminul.shafin@gmail.com",
        role: "Junior Developer | React & Node.js",
        img: "https://i.ibb.co/ZpNv2cRm/shafin.jpg",
    },
    {
        name: "Rahatul Islam",
        email: "rahatul.islam@gmail.com",
        role: "Junior Developer | Backend Specialist",
        img: "https://i.ibb.co/FbyvCstV/rahat.jpg",
    },
];

const services = [
    {
        icon: <FaHeart className="text-2xl" />,
        title: "Pet Adoption",
        description:
            "Find your perfect furry companion through our verified adoption network",
    },
    {
        icon: <FaPaw className="text-2xl" />,
        title: "Grooming Services",
        description: "Professional grooming appointments at your convenience",
    },
    {
        icon: <FaShoppingCart className="text-2xl" />,
        title: "Pet Products",
        description:
            "Premium food, toys, and accessories delivered to your door",
    },
    {
        icon: <FaDog className="text-2xl" />,
        title: "Pet Care",
        description:
            "Walking, boarding, and daycare services from trusted providers",
    },
    {
        icon: <FaCamera className="text-2xl" />,
        title: "Pet Photography",
        description:
            "Capture your pet's personality with professional photoshoots",
    },
    {
        icon: <FaUsers className="text-2xl" />,
        title: "Community",
        description: "Connect with other pet lovers in our exclusive forums",
    },
];

const AboutUs = () => {
    // Scroll to top only on initial load
    const [hasInitialScroll, setHasInitialScroll] = useState(false);
    useEffect(() => {
        if (!hasInitialScroll) {
            window.scrollTo(0, 0);
            setHasInitialScroll(true);
        }
    }, [hasInitialScroll]);
    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block p-4 bg-orange-100 rounded-full mb-6">
                        <FaPaw className="text-4xl text-orange-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        About <span className="text-orange-500">PetVerse</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Where pets and their people find everything they need
                    </p>
                </motion.div>

                {/* Mission Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-lg p-8 mb-16"
                >
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">
                            Our Mission
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            At PetVerse, we're revolutionizing pet care by
                            creating a comprehensive ecosystem that connects pet
                            owners with trusted services, products, and a
                            supportive community—all designed to make pet
                            parenting easier and more enjoyable.
                        </p>
                        <div className="bg-orange-50 rounded-xl p-4 inline-block">
                            <p className="text-orange-600 font-medium">
                                "Building a better world for pets and their
                                humans" 🐾
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Services Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 flex items-center justify-center gap-3">
                        <FaPaw className="text-orange-500" /> Our Comprehensive
                        Services
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-all"
                            >
                                <div className="bg-orange-100 p-4 rounded-full mb-4 text-orange-500">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Team Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="border-t border-orange-200 pt-16"
                >
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 flex items-center justify-center gap-3">
                        <FaCode className="text-orange-500" /> Meet The
                        Developers
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {developers.map((dev, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
                            >
                                <div className="p-6 text-center">
                                    <div className="relative w-32 h-32 mx-auto mb-4">
                                        <img
                                            src={dev.img}
                                            alt={dev.name}
                                            className="w-full h-full rounded-full object-cover border-4 border-orange-100"
                                        />
                                        <div className="absolute -bottom-2 right-2 bg-orange-500 text-white p-1 rounded-full">
                                            <FaPaw className="text-xs" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                                        {dev.name}
                                    </h3>
                                    <p className="text-orange-500 text-sm font-medium mb-3">
                                        {dev.role}
                                    </p>
                                    <a
                                        href={`mailto:${dev.email}`}
                                        className="inline-flex items-center text-sm text-gray-600 hover:text-orange-500 transition-colors"
                                    >
                                        <FaEnvelope className="mr-2" />
                                        {dev.email}
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Closing CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-8 text-white">
                        <h2 className="text-2xl font-bold mb-4">
                            Join the PetVerse Community
                        </h2>
                        <p className="mb-6 max-w-2xl mx-auto">
                            Whether you're a pet owner, pet lover, or service
                            provider, there's a place for you in our growing
                            community.
                        </p>
                        <Link to="/forum">
                            <button className="bg-white text-orange-500 font-semibold px-6 py-3 rounded-full hover:bg-orange-50 transition-all">
                                Get Started Today
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutUs;
