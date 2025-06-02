import { FaFire, FaThumbsUp, FaChartBar, FaTags } from "react-icons/fa";

const RightSideBar = ({ posts, refetch }) => {
    const popularThreads = [...posts]
        .sort((a, b) => b.likesCount - a.likesCount)
        .slice(0, 3);

    const totalComments = posts.reduce(
        (total, post) => total + (post.comments?.length || 0),
        0
    );
    const uniqueMembers = new Set(posts.map((post) => post.authorEmail)).size;
    const categories = Array.from(new Set(posts.map((post) => post.category)));

    return (
        <section className="w-full md:w-72 space-y-6 sticky top-16">
            {/* Popular Threads Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 transition-all duration-300 hover:shadow-md dark:hover:shadow-gray-900/30">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                        <FaFire className="text-primary dark:text-primary-400" />
                        Trending Threads
                    </h2>
                    <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 px-2 py-1 rounded-full">
                        Hot
                    </span>
                </div>
                <div className="space-y-4">
                    {popularThreads.map((post, index) => (
                        <div
                            key={post._id}
                            className="group flex items-start gap-3 p-2 -mx-2 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        >
                            <span className="text-sm font-medium text-gray-400 dark:text-gray-500 mt-0.5">
                                0{index + 1}
                            </span>
                            <div>
                                <h3 className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                                    {post.postTitle}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                        <FaThumbsUp className="h-3.5 w-3.5 mr-0.5" />
                                        {post.likesCount}
                                    </span>
                                    <span className="text-xs px-2 py-0.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-400 rounded-full capitalize">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Forum Statistics Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-5 flex items-center gap-2">
                    <FaChartBar className="text-blue-500 dark:text-blue-400" />
                    Forum Insights
                </h2>
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-blue-50/70 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {posts.length}
                        </div>
                        <div className="text-xs text-blue-800/80 dark:text-blue-300 mt-1">
                            Threads
                        </div>
                    </div>
                    <div className="bg-emerald-50/70 dark:bg-emerald-900/20 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {totalComments}
                        </div>
                        <div className="text-xs text-emerald-800/80 dark:text-emerald-300 mt-1">
                            Comments
                        </div>
                    </div>
                    <div className="bg-purple-50/70 dark:bg-purple-900/20 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {uniqueMembers}
                        </div>
                        <div className="text-xs text-purple-800/80 dark:text-purple-300 mt-1">
                            Members
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    <FaTags className="text-primary dark:text-primary-400" />
                    Categories
                </h2>
                <div className="space-y-2">
                    {categories.map((category) => {
                        const count = posts.filter(
                            (post) => post.category === category
                        ).length;
                        return (
                            <a
                                key={category}
                                href="#"
                                className="flex items-center justify-between p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 group"
                            >
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary-400 transition-colors capitalize">
                                    {category}
                                </span>
                                <span className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 group-hover:text-primary dark:group-hover:text-primary-400 px-2 py-1 rounded-full transition-colors">
                                    {count}
                                </span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default RightSideBar;
