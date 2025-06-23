import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Categories = ({ products }) => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: "ease-out-cubic",
        });
    }, []);

    // Get unique categories and encode them for URLs
    const uniqueCategories = [
        ...new Set(products?.map((p) => p.category)),
    ].slice(0, 6); // Show exactly 6 categories

    const categoryData = {
        Food: {
            icon: "🍗",
            path: "/products?category=Food",
            color: "from-amber-100 to-amber-50",
        },
        Toys: {
            icon: "🎾",
            path: "/products?category=Toys",
            color: "from-blue-100 to-blue-50",
        },
        "Beds & Furniture": {
            icon: "🛏️",
            path: "/products?category=Beds+%26+Furniture",
            color: "from-purple-100 to-purple-50",
        },
        Grooming: {
            icon: "🛁",
            path: "/products?category=Grooming",
            color: "from-pink-100 to-pink-50",
        },
        Health: {
            icon: "💊",
            path: "/products?category=Health",
            color: "from-red-100 to-red-50",
        },
        Accessories: {
            icon: "🧥",
            path: "/products?category=Accessories",
            color: "from-green-100 to-green-50",
        },
    };

    return (
        <section className="px-4 py-12 md:py-16 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">
                <h2
                    className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-gray-800 dark:text-white"
                    data-aos="fade-down"
                >
                    Shop by Category
                </h2>

                <div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
                    data-aos="fade-up"
                >
                    {uniqueCategories.map((category, idx) => {
                        const data = categoryData[category] || {
                            icon: "🐾",
                            path: `/products?category=${encodeURIComponent(
                                category
                            )}`,
                            color: "from-gray-100 to-gray-50",
                        };

                        return (
                            <Link
                                key={idx}
                                to={data.path}
                                className="block bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 text-center group border border-gray-200 dark:border-gray-700"
                                data-aos="zoom-in"
                                data-aos-delay={idx * 100}
                                aria-label={`Shop ${category}`}
                            >
                                <div
                                    className={`h-16 w-16 mx-auto mb-3 bg-gradient-to-br ${data.color} rounded-full flex items-center justify-center group-hover:shadow-inner transition-all duration-300`}
                                >
                                    <span className="text-3xl">
                                        {data.icon}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    {category}
                                </h3>
                                <p className="text-xs text-primary font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Shop now →
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Categories;
