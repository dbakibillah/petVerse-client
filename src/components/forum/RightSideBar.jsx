import { FaFire, FaThumbsUp, FaChartBar, FaTags } from "react-icons/fa";

const RightSideBar = ({ posts }) => {
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
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <FaFire className="text-primary" />
                        Trending Threads
                    </h2>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                        Hot
                    </span>
                </div>
                <div className="space-y-4">
                    {popularThreads.map((post, index) => (
                        <div
                            key={post._id}
                            className="group flex items-start gap-3 p-2 -mx-2 rounded-lg transition-all duration-200 hover:bg-gray-50"
                        >
                            <span className="text-sm font-medium text-gray-400 mt-0.5">
                                0{index + 1}
                            </span>
                            <div>
                                <h3 className="font-medium text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                                    {post.postTitle}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="flex items-center text-xs text-gray-500">
                                        <FaThumbsUp className="h-3.5 w-3.5 mr-0.5" />
                                        {post.likesCount}
                                    </span>
                                    <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full capitalize">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Forum Statistics Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                    <FaChartBar className="text-blue-500" />
                    Forum Insights
                </h2>
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-blue-50/70 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">
                            {posts.length}
                        </div>
                        <div className="text-xs text-blue-800/80 mt-1">
                            Threads
                        </div>
                    </div>
                    <div className="bg-emerald-50/70 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-emerald-600">
                            {totalComments}
                        </div>
                        <div className="text-xs text-emerald-800/80 mt-1">
                            Comments
                        </div>
                    </div>
                    <div className="bg-purple-50/70 p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">
                            {uniqueMembers}
                        </div>
                        <div className="text-xs text-purple-800/80 mt-1">
                            Members
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaTags className="text-primary" />
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
                                className="flex items-center justify-between p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 group"
                            >
                                <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors capitalize">
                                    {category}
                                </span>
                                <span className="text-xs font-medium bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary px-2 py-1 rounded-full transition-colors">
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
