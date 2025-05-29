import React, { useEffect } from "react";
import {
    FaPaw,
    FaArrowRight,
    FaStar,
    FaUmbrellaBeach,
    FaUserShield,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const SpecialOffer = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            easing: "ease-out-cubic",
            mirror: true,
        });
    }, []);

    const offers = [
        {
            icon: <FaUmbrellaBeach className="text-amber-500 text-3xl" />,
            title: "Summer Grooming Special",
            description:
                "Add our summer upgrade with cooling treatments, blueberry facial, and paw balm to your pup's next spa visit.",
            color: "from-amber-100 to-amber-50",
        },
        {
            icon: <FaStar className="text-orange-400 text-3xl" />,
            title: "Summer Special PLUS",
            description:
                "Includes the Summer Grooming Special plus a nail grind, teeth brushing, and aromatherapy treatment.",
            color: "from-orange-100 to-orange-50",
        },
        {
            icon: <FaUserShield className="text-amber-600 text-3xl" />,
            title: "Senior & Military Discount",
            description:
                "15% discount available every Tuesday for seniors and military personnel. ID required.",
            color: "from-yellow-100 to-yellow-50",
        },
    ];

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50 py-16 md:py-24">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/50 to-transparent"></div>
            <div className="absolute top-1/4 left-10 text-amber-100 text-6xl opacity-20">
                <FaPaw />
            </div>
            <div className="absolute bottom-1/4 right-10 text-amber-100 text-6xl opacity-20">
                <FaPaw />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div
                    className="text-center mb-16"
                    data-aos="fade-up"
                    data-aos-once="false"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                            Special Offers
                        </span>
                    </h1>
                    <p
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                        data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-once="false"
                    >
                        Treat your pet to premium grooming services at special
                        prices
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {offers.map((offer, index) => (
                        <div
                            key={index}
                            className={`bg-gradient-to-br ${offer.color} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/50`}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            data-aos-once="false"
                        >
                            <div className="flex items-center mb-4">
                                <div className="bg-white p-3 rounded-full shadow-md mr-4">
                                    {offer.icon}
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">
                                    {offer.title}
                                </h2>
                            </div>
                            <p className="text-gray-600 mb-6">
                                {offer.description}
                            </p>
                            <a
                                href="#"
                                className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700 transition-colors"
                                data-aos="fade-up"
                                data-aos-delay={index * 100 + 50}
                                data-aos-once="false"
                            >
                                Learn more <FaArrowRight className="ml-2" />
                            </a>
                        </div>
                    ))}
                </div>

                {/* <div
                    className="text-center"
                    data-aos="fade-up"
                    data-aos-delay="300"
                    data-aos-once="false"
                >
                    <a
                        href="#"
                        className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 group"
                    >
                        Book Appointment Now
                        <FaArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-2" />
                    </a>
                </div> */}
            </div>
        </section>
    );
};

export default SpecialOffer;
