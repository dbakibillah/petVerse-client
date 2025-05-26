import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const AboutUsSec = () => {
    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: false,
        });
    }, []);

    return (
        <section className="container mx-auto px-4 lg:px-24 py-12 lg:py-24 flex flex-col lg:flex-row items-center gap-10">
            {/* Image Section */}
            <div className="lg:w-1/2" data-aos="fade-right" data-aos-once="false">
                <div className="rounded-xl overflow-hidden">
                    <img
                        src="https://i.ibb.co/Lht8nLk7/Untitled-design-9.png"
                        alt="Happy dog"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Text Section */}
            <div
                className="lg:w-1/2 space-y-6 px-4 lg:px-0"
                data-aos="fade-left" data-aos-once="false"
            >
                <h3 className="inline-block bg-[#ffac93] text-white px-6 py-2 rounded-full text-sm font-semibold">
                    About Us
                </h3>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white leading-tight">
                    Your Partner in{" "}
                    <span className="text-primary">Pawsitive</span> Pet Care
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    At <strong>petVerse</strong>, we believe pets are more than
                    animals—they’re family. From playful pups to curious cats,
                    we provide love, comfort, and expert care to ensure their
                    happiness and well-being.
                </p>
                <button className="py-4 px-8 bg-gradient-to-r from-secondary to-primary hover:from-primary hover:to-secondary transition rounded-full text-white text-lg font-semibold shadow-md hover:shadow-lg">
                    Discover More
                </button>
            </div>
        </section>
    );
};

export default AboutUsSec;
