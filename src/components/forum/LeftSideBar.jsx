import { useState } from "react";
import {
    HiOutlineCalendar,
    HiOutlineChatAlt2,
    HiOutlineChevronRight,
    HiOutlineCollection,
    HiOutlineFire,
    HiOutlineHeart,
    HiOutlineLightBulb,
    HiOutlineMenuAlt2,
    HiOutlineQuestionMarkCircle,
    HiOutlineSparkles,
    HiOutlineTag
} from "react-icons/hi";

const categoryStyles = {
    "Lost & Found": {
        color: "text-purple-600 dark:text-purple-400",
        gradient:
            "from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-900/10",
        icon: <HiOutlineHeart className="text-xl" />,
    },
    Help: {
        color: "text-blue-600 dark:text-blue-400",
        gradient:
            "from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-900/10",
        icon: <HiOutlineQuestionMarkCircle className="text-xl" />,
    },
    Health: {
        color: "text-red-600 dark:text-red-400",
        gradient:
            "from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-900/10",
        icon: <HiOutlineFire className="text-xl" />,
    },
    "Pet Adoption": {
        color: "text-green-600 dark:text-green-400",
        gradient:
            "from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-900/10",
        icon: <HiOutlineSparkles className="text-xl" />,
    },
    "Daily Life with Pets": {
        color: "text-yellow-600 dark:text-yellow-400",
        gradient:
            "from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-900/10",
        icon: <HiOutlineChatAlt2 className="text-xl" />,
    },
    "Pet Events & Meetups": {
        color: "text-indigo-600 dark:text-indigo-400",
        gradient:
            "from-indigo-100 to-indigo-50 dark:from-indigo-900/30 dark:to-indigo-900/10",
        icon: <HiOutlineCalendar className="text-xl" />,
    },
    "Feedback & Suggestions": {
        color: "text-pink-600 dark:text-pink-400",
        gradient:
            "from-pink-100 to-pink-50 dark:from-pink-900/30 dark:to-pink-900/10",
        icon: <HiOutlineLightBulb className="text-xl" />,
    },
};

const getCategoryStyle = (category) =>
    categoryStyles[category] || {
        color: "text-gray-600 dark:text-gray-400",
        gradient:
            "from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700/80",
        icon: <HiOutlineCollection className="text-xl" />,
    };

const LeftSideBar = ({
    posts,
    selectedCategory,
    selectedTags,
    onCategorySelect,
    onTagSelect,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    // Get all unique tags from posts
    const allTags = [...new Set(posts.flatMap((post) => post.tags || []))];

    const categories = [...new Set(posts.map((post) => post.category))]
        .map((category, index) => {
            const { color, gradient, icon } = getCategoryStyle(category);
            return {
                id: `category-${index}`,
                name: category,
                count: posts.filter((p) => p.category === category).length,
                color,
                gradient,
                icon,
            };
        })
        .sort((a, b) => b.count - a.count);

    // Count tag occurrences
    const tagCounts = posts.reduce((acc, post) => {
        post.tags?.forEach((tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
    }, {});

    // Sort tags by count (most popular first)
    const sortedTags = [...allTags].sort((a, b) => tagCounts[b] - tagCounts[a]);

    return (
        <section className="w-full md:w-72 space-y-3 sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto pb-4 scrollbar-hide">
            {/* Mobile Toggle Button */}
            <div className="md:hidden sticky top-4 z-20 mb-3">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between items-center px-4 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 transition"
                >
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-gradient-to-br from-primary-100 to-blue-100 dark:from-primary-900/40 dark:to-blue-900/40">
                            <HiOutlineMenuAlt2 className="text-lg text-primary-600 dark:text-primary-400" />
                        </div>
                        <span className="text-base font-medium text-gray-800 dark:text-gray-200">
                            Browse Categories
                        </span>
                    </div>
                    <HiOutlineChevronRight
                        className={`text-lg text-gray-500 dark:text-gray-400 transition-transform ${
                            isOpen ? "rotate-90" : ""
                        }`}
                    />
                </button>
            </div>

            {/* Sidebar Content */}
            <div
                className={`md:block transition-all duration-500 ${
                    isOpen
                        ? "max-h-screen opacity-100 mt-2"
                        : "max-h-0 opacity-0 md:max-h-screen md:opacity-100"
                } overflow-hidden md:overflow-visible`}
            >
                {/* Categories Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-700">
                    {/* Header */}
                    <div className="mb-5">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-md bg-gradient-to-br from-primary-100 to-blue-100 dark:from-primary-900/40 dark:to-blue-900/40">
                                <HiOutlineSparkles className="text-lg text-primary-600 dark:text-primary-400" />
                            </div>
                            <div>
                                <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                                    Explore Topics
                                </h2>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Discover pet-related discussions
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Categories List */}
                    <ul className="space-y-2">
                        {categories.map((category) => (
                            <li key={category.id}>
                                <button
                                    onClick={() =>
                                        onCategorySelect(category.name)
                                    }
                                    className={`flex items-center justify-between w-full p-3 rounded-lg text-sm border transition group ${
                                        selectedCategory === category.name
                                            ? `bg-gradient-to-r ${category.gradient} border-transparent`
                                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-sm"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`p-2 rounded-md ${category.color} bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700`}
                                        >
                                            {category.icon}
                                        </div>
                                        <div>
                                            <span
                                                className={`block text-gray-800 dark:text-gray-200 capitalize ${
                                                    selectedCategory ===
                                                    category.name
                                                        ? "font-semibold"
                                                        : "font-normal"
                                                }`}
                                            >
                                                {category.name}
                                            </span>
                                            <span className="block text-xs text-gray-500 dark:text-gray-400">
                                                {category.count}{" "}
                                                {category.count === 1
                                                    ? "thread"
                                                    : "threads"}
                                            </span>
                                        </div>
                                    </div>
                                    <HiOutlineChevronRight
                                        className={`text-sm transition-transform ${
                                            selectedCategory === category.name
                                                ? "text-primary-600 dark:text-primary-400 translate-x-1"
                                                : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-1"
                                        }`}
                                    />
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* All Categories Link */}
                    <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <a
                            href="/categories"
                            className="flex items-center justify-center gap-1 w-full px-3 py-2 text-xs font-medium text-primary-600 dark:text-primary-400 rounded-md hover:bg-primary-50/60 dark:hover:bg-primary-900/20 transition"
                        >
                            <span>View all categories</span>
                            <HiOutlineChevronRight className="text-sm group-hover:translate-x-1" />
                        </a>
                    </div>
                </div>

                {/* Popular Tags Card */}
                <div className="mt-5 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 rounded-md bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40">
                            <HiOutlineTag className="text-lg text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                                Popular Tags
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Filter threads by tags
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {sortedTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => onTagSelect(tag)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 hover:scale-105 ${
                                    selectedTags.includes(tag)
                                        ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                                }`}
                            >
                                #{tag}{" "}
                                {tagCounts[tag] ? `(${tagCounts[tag]})` : ""}
                            </button>
                        ))}
                    </div>
                    {selectedTags.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => onTagSelect("clear-all")}
                                className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                            >
                                Clear tag filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default LeftSideBar;
