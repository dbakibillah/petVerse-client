import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Categories = ({ products }) => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });
    }, []);

    const uniqueCategories = [...new Set(products.map(p => p.category))];

    return (
        <section className="px-4 py-10">
            <h2
                className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-800 dark:text-white"
                data-aos="fade-up"
            >
                Shop by Category
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {uniqueCategories.map((category, idx) => (
                    <div
                        key={idx}
                        className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-4 shadow-md hover:shadow-xl transition-all text-center cursor-pointer group"
                        data-aos="zoom-in"
                        data-aos-delay={idx * 100}
                        data-aos-once="false"
                    >
                        <div className="h-16 w-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition">
                            <span className="text-xl font-bold text-primary capitalize">
                                {category[0]}
                            </span>
                        </div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200 capitalize">
                            {category}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;
