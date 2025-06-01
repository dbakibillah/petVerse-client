import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import {
  FaCheck,
  FaClock,
  FaDollarSign,
  FaHandHoldingHeart,
  FaHeart,
  FaPaw,
  FaShieldAlt,
  FaThumbsUp,
  FaUserMd,
} from "react-icons/fa";

const ThirdBanner = () => {
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    const benefits = [
        {
            icon: <FaUserMd className="text-orange-500" />,
            text: "Certified Experts – Skilled professionals with real experience in pet care.",
        },
        {
            icon: <FaPaw className="text-orange-500" />,
            text: "Comprehensive Services – Everything your pet needs, all in one platform.",
        },
        {
            icon: <FaClock className="text-orange-500" />,
            text: "24/7 Support – Always here to help, anytime you need us.",
        },
        {
            icon: <FaHeart className="text-orange-500" />,
            text: "Trusted by Pet Lovers – A growing community of happy pet parents.",
        },
        {
            icon: <FaShieldAlt className="text-orange-500" />,
            text: "Safe & Secure – We ensure the highest safety standards in every service.",
        },
        {
            icon: <FaDollarSign className="text-orange-500" />,
            text: "Transparent Pricing – No hidden costs, just honest value.",
        },
        {
            icon: <FaHandHoldingHeart className="text-orange-500" />,
            text: "Personalized Care – Services tailored to your pet's unique needs.",
        },
        {
            icon: <FaThumbsUp className="text-orange-500" />,
            text: "Easy Access – Simple, user-friendly platform for seamless bookings.",
        },
        {
            icon: <FaCheck className="text-orange-500" />,
            text: "Quality Assurance – Only verified professionals and trusted products.",
        },
        {
            icon: <FaHeart className="text-orange-500" />,
            text: "Passion-Driven – Built by pet lovers, for pet lovers.",
        },
    ];

    return (
        <section className="font-sans py-16 md:py-24 overflow-hidden transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Text Content */}
                    <div className="lg:w-1/2" data-aos="fade-right">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-8 leading-tight">
                            Why{" "}
                            <span className="text-orange-500 dark:text-orange-400">
                                PetVerse
                            </span>
                            : Your Trusted
                            <br />
                            <span className="relative inline-block">
                                Pet Treatment Center
                                <span className="absolute bottom-1 left-0 w-full h-2 bg-orange-200 dark:bg-orange-900 opacity-50 -z-10 rounded-full"></span>
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            People trust us because we prioritize their pets'
                            health, happiness, and safety above all. Our team
                            delivers reliable, compassionate care every step of
                            the way.
                        </p>

                        <ul className="space-y-4">
                            {benefits.map((benefit, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 50}
                                >
                                    <span className="flex-shrink-0 p-2 bg-orange-50 dark:bg-orange-900/30 rounded-full">
                                        {benefit.icon}
                                    </span>
                                    <span>{benefit.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Image */}
                    <div className="lg:w-1/2 relative" data-aos="fade-left">
                        <div className="relative">
                            <img
                                src="https://i.ibb.co/dwtY45JD/download-13.jpg"
                                alt="Trusted treatment"
                                className="rounded-3xl shadow-2xl w-full object-cover border-8 border-white dark:border-gray-700"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white px-6 py-3 rounded-xl shadow-lg">
                                <div className="flex items-center gap-2">
                                    <FaHeart className="text-white" />
                                    <span className="font-bold">
                                        Trusted by 35K+ Pet Owners
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ThirdBanner;
