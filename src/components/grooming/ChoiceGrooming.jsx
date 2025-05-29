import React, { useEffect } from "react";
import {
    FaPaw,
    FaArrowRight,
    FaStar,
    FaHandHoldingHeart,
    FaSprayCan,
} from "react-icons/fa";
import { BsCheck2Circle, BsEmojiHeartEyes } from "react-icons/bs";
import { GiHealthNormal, GiFeather } from "react-icons/gi";
import AOS from "aos";
import "aos/dist/aos.css";

const ChoiceGrooming = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            easing: "ease-out-cubic",
            mirror: true,
        });
    }, []);

    const features = [
        {
            icon: <FaStar className="text-yellow-400" />,
            text: "Expert Groomers",
            desc: "Certified professionals with years of experience",
        },
        {
            icon: <BsEmojiHeartEyes className="text-pink-400" />,
            text: "Exceptional Results",
            desc: "Show-quality grooming every time",
        },
        {
            icon: <FaHandHoldingHeart className="text-rose-400" />,
            text: "Compassionate Care",
            desc: "Gentle handling for anxious pets",
        },
        {
            icon: <GiHealthNormal className="text-emerald-400" />,
            text: "Hygienic Environment",
            desc: "Sterilized tools and clean spaces",
        },
        {
            icon: <FaPaw className="text-amber-400" />,
            text: "Tailored Services",
            desc: "Customized to your pet's needs",
        },
        {
            icon: <FaSprayCan className="text-sky-400" />,
            text: "Stress-Free Experience",
            desc: "Calming techniques and patience",
        },
    ];

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-yellow-50">
            {/* Decorative floating elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <GiFeather className="absolute top-1/4 left-1/5 text-amber-100 text-6xl animate-float-slow" />
                <FaPaw
                    className="absolute bottom-1/3 right-1/4 text-amber-100 text-7xl animate-float-slower"
                    style={{ animationDelay: "2s" }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white/30 to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto py-24 px-6 lg:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                    {/* Image */}
                    <div className="relative w-full lg:w-1/2 flex justify-center">
                        <div className="group relative hover:scale-105 transition-transform duration-700">
                            <div className="absolute -inset-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-md opacity-60 group-hover:opacity-90 transition-opacity duration-500 animate-pulse"></div>
                            <img
                                src="https://i.ibb.co/sJQtQMCh/Petgrooming-2.jpg"
                                alt="Happy groomed dog"
                                className="relative rounded-full w-72 h-72 md:w-96 md:h-96 object-cover shadow-xl border-8 border-white transition-all duration-700"
                                data-aos="zoom-in"
                                data-aos-delay="500"
                                data-aos-easing="ease-in-out"
                                data-aos-duration="1000"
                                data-aos-once="false"
                            />
                            <div className="absolute -bottom-7 -right-7 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-100 transition-transform hover:scale-105">
                                <div className="flex items-center gap-2">
                                    <BsCheck2Circle className="text-emerald-500 text-xl" />
                                    <span className="font-semibold text-gray-800 text-sm">
                                        5,000+ Happy Pets
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 max-w-xl">
                        <h2
                            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight"
                            data-aos="fade-up"
                            data-aos-once="false"
                        >
                            Why We're The{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                                Preferred Choice
                            </span>{" "}
                            For Pet Grooming
                        </h2>
                        <p
                            className="text-lg text-gray-700 mb-10 leading-relaxed"
                            data-aos="fade-up"
                            data-aos-delay="100"
                            data-aos-once="false"
                        >
                            Our salon combines expert care with premium products
                            to create a luxurious experience that leaves your
                            pet looking exquisite and feeling pampered.
                        </p>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white/90 backdrop-blur p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-500"
                                    data-aos="fade-up"
                                    data-aos-delay={150 + index * 50}
                                    data-aos-once="false"
                                >
                                    <div className="flex items-start gap-4">
                                        <span className="text-2xl mt-1">
                                            {feature.icon}
                                        </span>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {feature.text}
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {feature.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChoiceGrooming;
