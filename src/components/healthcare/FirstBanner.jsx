import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import {
    FaArrowRight,
    FaBookMedical,
    FaClinicMedical,
    FaGlobeAmericas,
    FaPaw,
} from "react-icons/fa";
import { GiDogBowl } from "react-icons/gi";
import { RiCustomerService2Fill } from "react-icons/ri";

const FirstBanner = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-in-out-quart",
            once: false,
            mirror: true,
        });
    }, []);

    const features = [
        {
            text: "Full Body Check Ups",
            icon: <FaBookMedical className="text-xl" />,
            color: "text-blue-500 dark:text-blue-400",
            bg: "bg-blue-50 dark:bg-blue-900/30",
            border: "border-blue-100 dark:border-blue-800/50",
        },
        {
            text: "Free Home Sample Pickup",
            icon: <GiDogBowl className="text-xl" />,
            color: "text-purple-500 dark:text-purple-400",
            bg: "bg-purple-50 dark:bg-purple-900/30",
            border: "border-purple-100 dark:border-purple-800/50",
        },
        {
            text: "24/7 Emergency Support",
            icon: <RiCustomerService2Fill className="text-xl" />,
            color: "text-red-500 dark:text-red-400",
            bg: "bg-red-50 dark:bg-red-900/30",
            border: "border-red-100 dark:border-red-800/50",
        },
        {
            text: "Personalized Care Plans",
            icon: <FaClinicMedical className="text-xl" />,
            color: "text-green-500 dark:text-green-400",
            bg: "bg-green-50 dark:bg-green-900/30",
            border: "border-green-100 dark:border-green-800/50",
        },
        {
            text: "Certified Veterinary Experts",
            icon: <FaPaw className="text-xl" />,
            color: "text-orange-500 dark:text-orange-400",
            bg: "bg-orange-50 dark:bg-orange-900/30",
            border: "border-orange-100 dark:border-orange-800/50",
        },
        {
            text: "Pet Wellness Programs",
            icon: <FaGlobeAmericas className="text-xl" />,
            color: "text-teal-500 dark:text-teal-400",
            bg: "bg-teal-50 dark:bg-teal-900/30",
            border: "border-teal-100 dark:border-teal-800/50",
        },
    ];

    const stats = [
        {
            position: "top-4 left-4",
            value: "5K+",
            label: "Veterinarians",
            delay: 300,
            icon: <FaBookMedical className="text-4xl" />,
            color: "text-blue-500 dark:text-blue-400",
            bg: "bg-blue-100/80 dark:bg-blue-900/30",
            border: "border-blue-200 dark:border-blue-800/50",
        },
        {
            position: "top-20 right-0",
            value: "15K+",
            label: "Online Services",
            delay: 400,
            icon: <FaClinicMedical className="text-4xl" />,
            color: "text-green-500 dark:text-green-400",
            bg: "bg-green-100/80 dark:bg-green-900/30",
            border: "border-green-200 dark:border-green-800/50",
        },
        {
            position: "bottom-4 left-10",
            value: "35K+",
            label: "Pet Owners",
            delay: 500,
            icon: <FaGlobeAmericas className="text-4xl" />,
            color: "text-orange-500 dark:text-orange-400",
            bg: "bg-amber-100/80 dark:bg-orange-900/30",
            border: "border-amber-200 dark:border-orange-800/50",
        },
    ];

    return (
        <section className="bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans overflow-hidden relative transition-colors duration-500 flex items-center">
            <div className="container px-2 lg:px-24 py-16 mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Text Content */}
                    <div
                        className="lg:w-1/2 space-y-8"
                        data-aos="fade-right"
                        data-aos-delay="100"
                    >
                        <div className="space-y-6">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-800 dark:text-gray-100">
                                Your Pet's{" "}
                                <span className="text-orange-500 dark:text-orange-400 relative inline-block">
                                    Health
                                    <span className="absolute -bottom-1 left-0 w-full h-2 bg-orange-200 dark:bg-orange-800 opacity-50 rounded-full"></span>
                                </span>
                                ,<br />
                                Our{" "}
                                <span className="text-orange-600 dark:text-orange-300 relative inline-block">
                                    Priority
                                    <span className="absolute -bottom-1 left-0 w-full h-2 bg-orange-100 dark:bg-orange-900/50 opacity-70 rounded-full"></span>
                                </span>
                            </h1>

                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
                                Access{" "}
                                <span className="font-semibold text-orange-500 dark:text-orange-400">
                                    expert veterinary care
                                </span>
                                , treatment, and wellness services all in one
                                platform. From routine checkups to emergency
                                support, we've got your pet covered.
                            </p>
                        </div>

                        {/* Book Now Button */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="#"
                                className="relative inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl active:translate-y-0 overflow-hidden group"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Book Now{" "}
                                    <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                                </span>
                                <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            </a>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center p-4 rounded-xl ${feature.bg} backdrop-blur-sm border ${feature.border} transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group`}
                                    data-aos="fade-up"
                                    data-aos-delay={150 + index * 50}
                                >
                                    <div
                                        className={`flex-shrink-0 p-3 rounded-full ${feature.bg} ${feature.color} transition-all duration-300 group-hover:rotate-6`}
                                    >
                                        {feature.icon}
                                    </div>
                                    <span className="ml-3 text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                                        {feature.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image + Stats */}
                    <div
                        className="lg:w-1/2 relative"
                        data-aos="fade-left"
                        data-aos-delay="200"
                    >
                        <div className="relative max-w-lg mx-auto">
                            <div className="relative">
                                <img
                                    src="https://i.ibb.co/DfBwPxnB/dog000-1.png"
                                    alt="Happy dog receiving care"
                                    className="w-full drop-shadow-2xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            {/* Stats Cards */}
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className={`absolute ${stat.position} ${stat.bg} backdrop-blur-sm px-5 py-4 rounded-xl shadow-lg text-center transition-all duration-500 border ${stat.border} hover:shadow-xl`}
                                    data-aos="zoom-in"
                                    data-aos-delay={stat.delay}
                                >
                                    <div
                                        className={`mb-2 flex items-center justify-center w-12 h-12 rounded-full ${stat.bg} ${stat.color} mx-auto`}
                                    >
                                        {stat.icon}
                                    </div>
                                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">
                                        {stat.value}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Decorative Shapes */}
                        <div
                            className="absolute -bottom-10 left-2 w-32 h-32 bg-orange-300 rounded-full opacity-20 dark:opacity-10 mix-blend-multiply -z-20 animate-pulse delay-100"
                            data-aos="fade"
                            data-aos-delay="600"
                        ></div>
                        <div
                            className="absolute -top-8 -right-8 w-40 h-40 bg-blue-300 rounded-full opacity-20 dark:opacity-10 -z-10 mix-blend-multiply animate-pulse delay-200"
                            data-aos="fade"
                            data-aos-delay="700"
                        ></div>
                        <div
                            className="absolute top-1/3 -left-8 w-24 h-24 bg-purple-300 rounded-full opacity-15 dark:opacity-5 -z-10 mix-blend-multiply animate-pulse delay-300"
                            data-aos="fade"
                            data-aos-delay="800"
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FirstBanner;
