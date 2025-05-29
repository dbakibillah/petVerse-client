import React, { useEffect } from "react";
import { FaPaw, FaArrowRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const MoreAboutUs = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            easing: "ease-out-cubic",
            mirror: true,
        });
    }, []);

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/50 to-transparent"></div>
            <FaPaw className="absolute top-1/4 left-1/4 text-amber-100 text-6xl opacity-20" />
            <FaPaw className="absolute bottom-1/3 right-1/4 text-amber-100 text-6xl opacity-20" />

            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Text content */}
                    <div
                        className="w-full lg:w-1/2 max-w-2xl"
                        data-aos="fade-right"
                        data-aos-once="false"
                    >
                        <h1
                            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                            data-aos="fade-up"
                            data-aos-once="false"
                        >
                            Few Words About Our{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                                Pet Grooming
                            </span>
                        </h1>
                        <p
                            className="text-lg text-gray-700 mb-8 leading-relaxed"
                            data-aos="fade-up"
                            data-aos-delay="100"
                            data-aos-once="false"
                        >
                            At our grooming salon, we believe every pet deserves
                            to look and feel their best. Our certified groomers
                            provide gentle, stress-free experiences using only
                            premium products tailored to your pet's unique
                            needs.
                        </p>
                        <div
                            data-aos="fade-up"
                            data-aos-delay="200"
                            data-aos-once="false"
                        >
                            <a
                                href="#"
                                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 group"
                            >
                                More About Us
                                <FaArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-2" />
                            </a>
                        </div>
                    </div>

                    {/* Image */}
                    <div
                        className="w-full lg:w-1/2 flex justify-center"
                        data-aos="fade-left"
                        data-aos-delay="300"
                        data-aos-once="false"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                            <img
                                src="https://i.ibb.co/BVyrdC13/Why-Socializing-Your-Cat-Is-Crucial-Tips-for-a-Happier-Healthier-Pet.jpg"
                                alt="Happy groomed cat"
                                className="relative rounded-full w-[300px] h-[300px] md:w-[400px] md:h-[400px] object-cover shadow-xl border-8 border-white transition-all duration-700 group-hover:scale-105"
                                data-aos="zoom-in"
                                data-aos-once="false"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MoreAboutUs;
