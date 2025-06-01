import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import {
  FaArrowRight,
  FaClinicMedical,
  FaHeartbeat,
  FaStethoscope,
  FaSyringe,
  FaTeeth,
  FaWeight,
} from "react-icons/fa";

const SecondBanner = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            mirror: true,
            easing: "ease-out-cubic",
        });
    }, []);

    const services = [
        {
            icon: <FaStethoscope className="text-3xl" />,
            title: "General Health Checkups",
            description:
                "Comprehensive physical exams to monitor overall wellness and detect early signs of health issues.",
            color: "text-amber-500 dark:text-amber-400",
            bg: "bg-amber-50 dark:bg-amber-900/20",
            border: "border-amber-200 dark:border-amber-800/70",
            delay: 100,
        },
        {
            icon: <FaSyringe className="text-3xl" />,
            title: "Vaccinations Care",
            description:
                "Complete protection against rabies, distemper, parvo and other common pet diseases.",
            color: "text-pink-500 dark:text-pink-400",
            bg: "bg-pink-50 dark:bg-pink-900/20",
            border: "border-pink-200 dark:border-pink-800/70",
            delay: 200,
        },
        {
            icon: <FaTeeth className="text-3xl" />,
            title: "Dental Care",
            description:
                "Professional cleaning, extractions, and oral health management for optimal pet dental hygiene.",
            color: "text-blue-500 dark:text-blue-400",
            bg: "bg-blue-50 dark:bg-blue-900/20",
            border: "border-blue-200 dark:border-blue-800/70",
            delay: 300,
        },
        {
            icon: <FaClinicMedical className="text-3xl" />,
            title: "Spaying & Neutering",
            description:
                "Safe surgical procedures performed by experienced veterinarians with compassionate care.",
            color: "text-purple-500 dark:text-purple-400",
            bg: "bg-purple-50 dark:bg-purple-900/20",
            border: "border-purple-200 dark:border-purple-800/70",
            delay: 100,
        },
        {
            icon: <FaWeight className="text-3xl" />,
            title: "Nutrition & Weight Management",
            description:
                "Personalized diet plans and lifestyle recommendations for healthy weight maintenance.",
            color: "text-green-500 dark:text-green-400",
            bg: "bg-green-50 dark:bg-green-900/20",
            border: "border-green-200 dark:border-green-800/70",
            delay: 200,
        },
        {
            icon: <FaHeartbeat className="text-3xl" />,
            title: "Chronic Disease Management",
            description:
                "Specialized long-term care plans for diabetes, arthritis, and other chronic conditions.",
            color: "text-red-500 dark:text-red-400",
            bg: "bg-red-50 dark:bg-red-900/20",
            border: "border-red-200 dark:border-red-800/70",
            delay: 300,
        },
    ];

    return (
        <section className="font-sans py-16 md:py-24 overflow-hidden transition-colors duration-500">
            {/* Floating decorative elements */}
            <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-5 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-amber-300 dark:text-gray-600"
                        style={{
                            fontSize: `${Math.random() * 30 + 20}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${
                                Math.random() * 10 + 10
                            }s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                            opacity: Math.random() * 0.5 + 0.1,
                        }}
                    >
                        <FaHeartbeat />
                    </div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div
                    className="text-center mb-16"
                    data-aos="fade-up"
                    data-aos-delay="50"
                    data-aos-once="false"
                    data-aos-mirror="true"
                    data-aos-easing="ease-out-cubic"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        Our{" "}
                        <span className="text-primary dark:text-amber-400">
                            Premium
                        </span>{" "}
                        Services
                    </h2>
                    <p
                        className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                        data-aos="fade-up"
                        data-aos-delay="150"
                        data-aos-once="false"
                        data-aos-mirror="true"
                        data-aos-easing="ease-out-cubic"
                    >
                        Comprehensive veterinary care designed to keep your pets
                        healthy and happy at every life stage.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-once="false"
                            data-aos-mirror="true"
                            data-aos-easing="ease-out-cubic"
                            data-aos-delay={service.delay}
                            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center transition-all duration-300 border-2 ${service.border} hover:shadow-xl hover:-translate-y-2 group`}
                        >
                            <div
                                className={`mb-6 p-5 rounded-full ${service.bg} ${service.color} shadow-sm group-hover:scale-110 transition-transform`}
                            >
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 text-center">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                                {service.description}
                            </p>
                            <button
                                className={`px-6 py-2 bg-transparent border ${service.border} ${service.color} rounded-full text-sm font-medium hover:${service.bg} transition-colors flex items-center gap-2`}
                                data-aos="fade-up"
                                data-aos-delay={service.delay + 100}
                                data-aos-once="false"
                                data-aos-mirror="true"
                                data-aos-easing="ease-out-cubic"
                            >
                                Learn More{" "}
                                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SecondBanner;
