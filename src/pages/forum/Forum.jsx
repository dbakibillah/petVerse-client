import { useQuery } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CreateThreads from "../../components/forum/CreateThreads";
import ForumCard from "../../components/forum/ForumCard";
import LeftSideBar from "../../components/forum/LeftSideBar";
import RightSideBar from "../../components/forum/RightSideBar";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Forum = () => {
    const axiosPublic = useAxiosPublic();
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState(
        searchParams.get("category") || null
    );
    const [selectedTags, setSelectedTags] = useState(
        searchParams.get("tags")?.split(",") || []
    );

    const { data: posts = [], refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const response = await axiosPublic.get("/threads");
            return response.data;
        },
    });

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: false,
            mirror: true,
        });
    }, []);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        if (category) {
            searchParams.set("category", category);
        } else {
            searchParams.delete("category");
        }
        setSearchParams(searchParams);
    };

    const handleTagSelect = (tag) => {
        let newTags;
        if (selectedTags.includes(tag)) {
            newTags = selectedTags.filter((t) => t !== tag);
        } else {
            newTags = [...selectedTags, tag];
        }
        setSelectedTags(newTags);

        if (newTags.length > 0) {
            searchParams.set("tags", newTags.join(","));
        } else {
            searchParams.delete("tags");
        }
        setSearchParams(searchParams);
    };

    const filteredPosts = posts.filter((post) => {
        // Category filter
        const categoryMatch =
            !selectedCategory || post.category === selectedCategory;

        // Tag filter
        const tagMatch =
            selectedTags.length === 0 ||
            selectedTags.some((tag) => post.tags?.includes(tag));

        return categoryMatch && tagMatch;
    });

    const sortedPosts = [...filteredPosts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return (
        <section className="container mx-auto py-8 flex flex-col md:flex-row gap-6 max-w-7xl">
            {/* Left Sidebar */}
            <div className="hidden lg:block sticky top-20 h-[calc(100vh-4rem)]">
                <LeftSideBar
                    posts={posts}
                    selectedCategory={selectedCategory}
                    selectedTags={selectedTags}
                    onCategorySelect={handleCategorySelect}
                    onTagSelect={handleTagSelect}
                />
            </div>

            {/* Main Content */}
            <main className="flex-1">
                <div>
                    <CreateThreads refetch={refetch} />
                </div>

                <div className="bg-white rounded-lg p-2 dark:bg-gray-900">
                    {/* Filter indicators */}
                    {(selectedCategory || selectedTags.length > 0) && (
                        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="flex flex-wrap gap-2 items-center">
                                <span className="text-blue-800 dark:text-blue-200">
                                    Showing threads:
                                </span>
                                {selectedCategory && (
                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full flex items-center gap-1">
                                        {selectedCategory}
                                        <button
                                            onClick={() =>
                                                handleCategorySelect(null)
                                            }
                                            className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                                {selectedTags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full flex items-center gap-1"
                                    >
                                        #{tag}
                                        <button
                                            onClick={() => handleTagSelect(tag)}
                                            className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                                {(selectedCategory ||
                                    selectedTags.length > 0) && (
                                    <button
                                        onClick={() => {
                                            handleCategorySelect(null);
                                            setSelectedTags([]);
                                        }}
                                        className="ml-2 text-sm text-blue-600 dark:text-blue-300 hover:underline"
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Threads list */}
                    <div className="">
                        {sortedPosts.map((post, index) => (
                            <div
                                key={post.id}
                                className="transition-colors duration-200"
                            >
                                <ForumCard post={post} refetch={refetch} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Right Sidebar */}
            <div className="hidden md:block sticky top-20 h-[calc(100vh-4rem)]">
                <RightSideBar
                    posts={posts}
                    selectedCategory={selectedCategory}
                    onCategorySelect={handleCategorySelect}
                />
            </div>
        </section>
    );
};

export default Forum;
