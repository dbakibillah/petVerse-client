import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
    FiSearch,
    FiMessageSquare,
    FiHome,
    FiArrowRight,
} from "react-icons/fi";

const AdoptionJourney = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            easing: "ease-in-out",
            mirror: true,
        });
    }, []);

    const steps = [
        {
            title: "Search your perfect match",
            description:
                "Browse adoption pets in shelters and rescues near you to find the perfect companion for your family.",
            icon: <FiSearch className="h-5 w-5" />,
        },
        {
            title: "Connect with a shelter",
            description:
                "Get in touch with local shelters to learn more about your potential pet and schedule a visit.",
            icon: <FiMessageSquare className="h-5 w-5" />,
        },
        {
            title: "Prepare for adoption",
            description:
                "Get your home ready and complete the adoption process to welcome your new family member.",
            icon: <FiHome className="h-5 w-5" />,
        },
    ];

    return (
        <section className="bg-gradient-to-br from-third to-indigo-50/40 dark:from-gray-800 dark:to-gray-900 py-16 lg:py-24">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2" data-aos="fade-right">
                        <div className="rounded-xl overflow-hidden">
                            <img
                                className="w-full h-auto object-cover"
                                src="https://i.ibb.co/8nWp2hBS/banner3.png"
                                alt="Happy adopted pets"
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full lg:w-1/2" data-aos="fade-left">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-8">
                            Start Your Adoption Journey
                        </h1>

                        <div className="space-y-8">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className="flex items-start group"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 150 + 200}
                                >
                                    <div className="flex-shrink-0 mr-4">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 shadow-md group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors duration-300">
                                            {step.icon}
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                            {step.title}
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div
                            className="mt-10"
                            data-aos="fade-up"
                            data-aos-delay="500"
                        >
                            <button className="px-8 py-4 bg-gradient-to-r from-secondary to-primary hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center">
                                Search Adoption Posts
                                <FiArrowRight className="ml-2 h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdoptionJourney;
