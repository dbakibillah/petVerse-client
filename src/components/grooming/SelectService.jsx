import {
    FaArrowRight,
    FaCalendarAlt,
    FaCheckCircle,
    FaChevronRight,
} from "react-icons/fa";
import { GiSittingDog } from "react-icons/gi";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const SelectService = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            mirror: true,
            easing: "ease-out-cubic",
        });
    }, []);

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50 py-16 md:py-24">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/50 to-transparent"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div
                    className="text-center mb-16"
                    data-aos="fade-up"
                    data-aos-once="false"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Quick and Easy Booking in{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                            3 Simple Steps
                        </span>
                        !
                    </h1>
                    <p
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                        data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-once="false"
                    >
                        Our streamlined process makes scheduling your pet's
                        grooming session effortless
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8 mb-16">
                    {/* Step 1 */}
                    <div
                        className="flex flex-col items-center text-center w-full md:w-1/3 group"
                        data-aos="fade-right"
                        data-aos-delay="200"
                        data-aos-once="false"
                    >
                        <div className="relative mb-6">
                            <div className="absolute -inset-4 bg-amber-200 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                            <div className="relative bg-white p-6 rounded-full shadow-lg border-4 border-amber-100 group-hover:border-amber-200 transition-all duration-300">
                                <GiSittingDog className="text-amber-500 text-4xl" />
                            </div>
                        </div>
                        <div className="flex items-center justify-center mb-2">
                            <span className="bg-amber-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-2">
                                1
                            </span>
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Select Service
                            </h2>
                        </div>
                        <p className="text-gray-600">
                            Choose from our premium grooming packages tailored
                            for your pet's needs
                        </p>
                    </div>

                    {/* Arrow */}
                    <div
                        className="hidden md:block text-amber-400 px-4"
                        data-aos="fade-up"
                        data-aos-delay="300"
                        data-aos-once="false"
                    >
                        <FaChevronRight className="text-4xl animate-pulse" />
                    </div>

                    {/* Step 2 */}
                    <div
                        className="flex flex-col items-center text-center w-full md:w-1/3 group"
                        data-aos="fade-up"
                        data-aos-delay="400"
                        data-aos-once="false"
                    >
                        <div className="relative mb-6">
                            <div className="absolute -inset-4 bg-orange-200 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                            <div className="relative bg-white p-6 rounded-full shadow-lg border-4 border-orange-100 group-hover:border-orange-200 transition-all duration-300">
                                <FaCalendarAlt className="text-orange-500 text-4xl" />
                            </div>
                        </div>
                        <div className="flex items-center justify-center mb-2">
                            <span className="bg-orange-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-2">
                                2
                            </span>
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Choose Date & Time
                            </h2>
                        </div>
                        <p className="text-gray-600">
                            Pick the perfect slot that fits your busy schedule
                        </p>
                    </div>

                    {/* Arrow */}
                    <div
                        className="hidden md:block text-orange-400 px-4"
                        data-aos="fade-up"
                        data-aos-delay="500"
                        data-aos-once="false"
                    >
                        <FaChevronRight className="text-4xl animate-pulse" />
                    </div>

                    {/* Step 3 */}
                    <div
                        className="flex flex-col items-center text-center w-full md:w-1/3 group"
                        data-aos="fade-left"
                        data-aos-delay="600"
                        data-aos-once="false"
                    >
                        <div className="relative mb-6">
                            <div className="absolute -inset-4 bg-green-200 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                            <div className="relative bg-white p-6 rounded-full shadow-lg border-4 border-green-100 group-hover:border-green-200 transition-all duration-300">
                                <FaCheckCircle className="text-green-500 text-4xl" />
                            </div>
                        </div>
                        <div className="flex items-center justify-center mb-2">
                            <span className="bg-green-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-2">
                                3
                            </span>
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Confirmation
                            </h2>
                        </div>
                        <p className="text-gray-600">
                            Receive instant confirmation and prepare your pet
                            for their spa day
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SelectService;
