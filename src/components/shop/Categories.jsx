import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Categories = ({ products }) => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            mirror: true,
            easing: "ease-out-cubic",
        });
    }, []);

    const uniqueCategories = [
        ...new Set(products.map((p) => p.category)),
    ].slice(0, 6);
    
    const categoryIcons = {
        food: "🍗",
        toys: "🎾",
        beds: "🛏️",
        grooming: "🛁",
        health: "💊",
        accessories: "🧥",
        litter: "🚽",
        carriers: "🎒",
    };

    return (
        <section className="px-4 py-12">
            <div className="max-w-7xl mx-auto">
                <h2
                    className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white"
                    data-aos="fade-down"
                    data-aos-delay="150"
                >
                    Shop by Category
                </h2>

                <div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
                    data-aos="fade-up"
                >
                    {uniqueCategories.map((category, idx) => (
                        <div
                            key={idx}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center cursor-pointer group border border-gray-100 dark:border-gray-700"
                            data-aos="zoom-in"
                            data-aos-delay={idx * 150 + 200}
                        >
                            <div className="h-20 w-20 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-primary/30 dark:from-primary/20 dark:to-primary/40 rounded-full flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/40 transition-all duration-500">
                                <span className="text-3xl">
                                    {categoryIcons[category.toLowerCase()] ||
                                        "🐾"}
                                </span>
                            </div>
                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 capitalize">
                                {category}
                            </p>
                            <p className="text-xs text-primary font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Shop now →
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
