import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PetCareHub = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: false,
            mirror: true,
        });
    }, []);

    const features = [
        {
            icon: "https://i.ibb.co/q3PRDm8y/pic1.png",
            title: "Pet Health & Wellness",
            description:
                "Your go-to source for reliable pet health and care advice.",
            color: "bg-indigo-100 dark:bg-indigo-900/30",
            animation: "fade-up",
        },
        {
            icon: "https://i.ibb.co/XZb42pLT/pic2.png",
            title: "Nutrition Guides",
            description:
                "Expert-curated dietary plans for your pet's specific needs.",
            color: "bg-emerald-100 dark:bg-emerald-900/30",
            animation: "fade-up",
        },
        {
            icon: "https://i.ibb.co/5h4XPnkH/pic3.png",
            title: "Training Resources",
            description:
                "Positive reinforcement techniques for happy, well-behaved pets.",
            color: "bg-amber-100 dark:bg-amber-900/30",
            animation: "fade-up",
        },
        {
            icon: "https://i.ibb.co/0jq7J0S/pic4.png",
            title: "Grooming Tips",
            description:
                "Professional grooming advice to keep your pet looking their best.",
            color: "bg-blue-100 dark:bg-blue-900/30",
            animation: "fade-up",
        },
        {
            icon: "https://i.ibb.co/7QZ3q0J/pic5.png",
            title: "Pet First Aid",
            description:
                "Essential first aid knowledge every pet owner should have.",
            color: "bg-rose-100 dark:bg-rose-900/30",
            animation: "fade-up",
        },
        {
            icon: "https://i.ibb.co/4W2yX3F/pic6.png",
            title: "Behavioral Insights",
            description:
                "Understand and address your pet's behavioral patterns.",
            color: "bg-purple-100 dark:bg-purple-900/30",
            animation: "fade-up",
        },
    ];

    return (
        <section className="overflow-hidden sm:pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center pb-12" data-aos="fade-down">
                    <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                        Your Complete Pet Care Hub
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Explore all of our pet care tools designed to make pet
                        parenting easier and more enjoyable
                    </p>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`${feature.color} rounded-2xl p-6 flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group`}
                            data-aos={feature.animation}
                            data-aos-delay={index * 150}
                            data-aos-duration="600"
                        >
                            <div className="flex items-center mb-4">
                                <div
                                    className="flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-gray-800 shadow-md group-hover:shadow-lg transition-shadow"
                                    data-aos="zoom-in"
                                    data-aos-delay={index * 150 + 200}
                                >
                                    <img
                                        src={feature.icon}
                                        alt=""
                                        className="w-8 h-8 object-contain"
                                    />
                                </div>
                                <h2 className="ml-4 text-xl font-semibold text-gray-800 dark:text-white">
                                    {feature.title}
                                </h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 flex-grow">
                                {feature.description}
                            </p>
                            <div className="mt-4">
                                <button
                                    className="text-sm font-medium text-primary dark:hover:text-primary transition-colors flex items-center"
                                    data-aos="fade-left"
                                    data-aos-delay={index * 100 + 300}
                                >
                                    Learn more
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 ml-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PetCareHub;
