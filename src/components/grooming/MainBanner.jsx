import {
    FaPaw,
    FaPhoneAlt,
    FaCalendarAlt,
    FaArrowRight,
    FaStar,
} from "react-icons/fa";
import { GiFeather } from "react-icons/gi";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";


const MainBanner = () => {
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            easing: "ease-out-quart",
            mirror: true,
        });
    }, []);

    return (
        <section className="relative overflow-hidden font-sans">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <div className="w-full h-screen bg-[url('https://i.ibb.co/Z1dNhtbP/pet-grooming-2.jpg')] bg-cover bg-center scale-110 brightness-50"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
                <GiFeather className="absolute top-1/4 left-1/4 text-white/10 text-6xl animate-bounce" />
                <FaPaw className="absolute bottom-1/3 left-1/4 text-primary/30 text-6xl animate-ping" />
            </div>

            {/* Content Section */}
            <div className="relative z-10 h-screen w-full flex items-center px-4 sm:px-10 md:px-20">
                <div
                    className="max-w-3xl text-white mx-auto"
                    data-aos="fade-right"
                    data-aos-once="false"
                >
                    {/* Tagline */}
                    <div
                        className="flex items-center mb-4"
                        data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-once="false"
                    >
                        <FaPaw
                            className="text-primary mr-2 animate-pulse"
                            size={24}
                        />
                        <span className="text-primary font-semibold tracking-wider uppercase">
                            Pamper Your Pet
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                        data-aos="fade-up"
                        data-aos-delay="150"
                        data-aos-once="false"
                    >
                        Affordable{" "}
                        <span className="text-primary">High-Quality</span>
                        <br className="hidden sm:block" />
                        <span className="bg-gradient-to-r from-primary to-orange-300 bg-clip-text text-transparent">
                            Pet Grooming
                        </span>{" "}
                        Services
                    </h1>

                    {/* Description */}
                    <p
                        className="text-lg mb-8 opacity-90 leading-relaxed"
                        data-aos="fade-up"
                        data-aos-delay="200"
                        data-aos-once="false"
                    >
                        A loving, professional pet grooming care in Bangladesh.
                        We treat your pets like family with our gentle touch.
                    </p>

                    {/* Buttons */}
                    <div
                        className="flex flex-col sm:flex-row gap-4 mb-12"
                        data-aos="fade-up"
                        data-aos-delay="250"
                        data-aos-once="false"
                    >
                        <Link
                            to="/grooming-appointment"
                            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-orange-500 hover:to-orange-600 text-white text-lg rounded-lg transition-all duration-500 shadow-lg hover:shadow-xl"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            <span className="relative z-10 flex items-center">
                                <FaCalendarAlt className="mr-3" />
                                Book Appointment
                                <FaArrowRight
                                    className={`ml-3 transition-all duration-300 ${
                                        isHovering
                                            ? "translate-x-1 opacity-100"
                                            : "translate-x-0 opacity-0"
                                    }`}
                                />
                            </span>
                        </Link>

                        <a
                            href="tel:+880123456789"
                            className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 hover:border-white text-white text-lg rounded-lg transition-all duration-300 hover:bg-white/10"
                        >
                            <FaPhoneAlt className="mr-3 group-hover:scale-110 transition-transform" />
                            Call Now
                        </a>
                    </div>

                    {/* Trust Indicators */}
                    <div
                        className="flex flex-wrap items-center gap-4 text-sm"
                        data-aos="fade-up"
                        data-aos-delay="300"
                        data-aos-once="false"
                    >
                        <div className="flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                            <div className="flex mr-2">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className="text-yellow-400"
                                    />
                                ))}
                            </div>
                            <span>4.9/5 Rating</span>
                        </div>

                        <div className="flex items-center">
                            <span className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                            <span>100% Pet Friendly</span>
                        </div>

                        <div className="flex items-center">
                            <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                            <span>Certified Groomers</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                data-aos="fade-up"
                data-aos-delay="500"
                data-aos-once="false"
            >
                <div className="flex flex-col items-center text-white opacity-80">
                    <span className="text-sm mb-3 tracking-widest">
                        EXPLORE
                    </span>
                    <div className="relative w-5 h-10">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-white/30 rounded-full">
                            <div className="absolute top-0 left-0 w-full h-3 bg-primary rounded-full animate-bounce"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainBanner;
