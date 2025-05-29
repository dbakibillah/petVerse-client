import { useState } from "react";
import {
    HiOutlineChevronRight,
    HiOutlineMenuAlt2,
    HiOutlineHashtag,
    HiOutlineFire,
    HiOutlineStar,
    HiOutlineCollection,
} from "react-icons/hi";

const LeftSideBar = ({ posts }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);

    // Process categories with post counts
    const categories = [...new Set(posts.map((post) => post.category))]
        .map((category, index) => ({
            id: `category-${index}`,
            name: category,
            count: posts.filter((post) => post.category === category).length,
            icon: getCategoryIcon(category),
        }))
        .sort((a, b) => b.count - a.count);

    const tags = [...new Set(posts.flatMap((post) => post.tags || []))];

    function getCategoryIcon(category) {
        const icons = {
            Technology: <HiOutlineHashtag className="text-blue-500" />,
            General: <HiOutlineCollection className="text-emerald-500" />,
            Popular: <HiOutlineFire className="text-amber-500" />,
            Featured: <HiOutlineStar className="text-purple-500" />,
        };
        return (
            icons[category] || <HiOutlineHashtag className="text-gray-500" />
        );
    }

    return (
        <section className="w-full md:w-64">
            {/* Mobile Toggle Button - Sticky on mobile */}
            <div className="md:hidden sticky top-4 z-20 mb-4">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between items-center px-6 py-3 bg-white rounded-xl shadow-lg border border-gray-200 hover:border-primary transition-all duration-200"
                    aria-expanded={isOpen}
                    aria-label="Toggle categories"
                >
                    <div className="flex items-center gap-3">
                        <HiOutlineMenuAlt2 className="text-xl text-primary" />
                        <span className="text-lg font-semibold text-gray-800">
                            Browse Categories
                        </span>
                    </div>
                    <HiOutlineChevronRight
                        className={`text-xl text-gray-500 transition-transform duration-200 ${
                            isOpen ? "rotate-90" : ""
                        }`}
                    />
                </button>
            </div>

            {/* Sidebar Content */}
            <div
                className={`md:block transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isOpen
                        ? "max-h-screen opacity-100 mt-2"
                        : "max-h-0 opacity-0 md:max-h-screen md:opacity-100"
                }`}
            >
                <div className="bg-white rounded-2xl p-5 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                    {/* Header with decorative elements */}
                    <div className="mb-6 relative">
                        <h2 className="text-2xl font-bold text-gray-800 bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                            Explore Topics
                        </h2>
                        <div className="absolute -bottom-1 left-0 w-20 h-1 bg-gradient-to-r from-primary to-blue-400 rounded-full"></div>
                    </div>

                    {/* Categories List */}
                    <ul className="space-y-2">
                        {categories.map((category) => (
                            <li key={category.id}>
                                <a
                                    href={`/category/${category.name.toLowerCase()}`}
                                    onClick={() =>
                                        setActiveCategory(category.id)
                                    }
                                    className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                                        activeCategory === category.id
                                            ? "bg-primary/10 border border-primary/30"
                                            : "hover:bg-gray-50 border border-transparent"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">
                                            {category.icon}
                                        </span>
                                        <div>
                                            <span className="block font-medium text-gray-800 capitalize">
                                                {category.name}
                                            </span>
                                            <span className="block text-xs text-gray-500">
                                                {category.count} threads
                                            </span>
                                        </div>
                                    </div>
                                    <HiOutlineChevronRight
                                        className={`h-5 w-5 ${
                                            activeCategory === category.id
                                                ? "text-primary"
                                                : "text-gray-400"
                                        }`}
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* All Categories Link */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <a
                            href="/categories"
                            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-primary rounded-lg hover:bg-primary/5 transition-colors duration-200"
                        >
                            View all categories
                            <HiOutlineChevronRight className="h-4 w-4" />
                        </a>
                    </div>
                </div>

                {/* Popular Tags Section (Bonus) */}
                <div className="mt-6 bg-white rounded-2xl p-5 shadow-xl border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                        Popular Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <a
                                key={tag}
                                href={`/tags/${tag.toLowerCase()}`}
                                className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-primary/10 text-gray-700 hover:text-primary rounded-full transition-colors duration-200"
                            >
                                #{tag}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeftSideBar;
