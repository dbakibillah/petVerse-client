import ForumCard from "../../components/forum/ForumCard";
import { useQuery } from "@tanstack/react-query";
import LeftSideBar from "../../components/forum/LeftSideBar";
import CreateThreads from "../../components/forum/CreateThreads";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import RightSideBar from "../../components/forum/RightSideBar";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Forum = () => {
    const axiosPublic = useAxiosPublic();
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

    const sortedPosts = [...posts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return (
        <section className="container mx-auto py-8 flex flex-col md:flex-row gap-6 max-w-7xl">
            {/* Left Sidebar */}
            <div
                className="hidden lg:block sticky top-20 h-[calc(100vh-4rem)]"
                data-aos="fade-right"
                data-aos-delay="150"
            >
                <LeftSideBar posts={posts} refetch={refetch} />
            </div>

            {/* Main Content */}
            <main className="flex-1">
                <div>
                    <CreateThreads refetch={refetch} />
                </div>

                <div className="bg-white rounded-lg p-2 dark:bg-gray-900 dark:border dark:border-gray-700">
                    {/* Thread items would go here */}
                    <div className="">
                        {sortedPosts.map((post, index) => (
                            <div
                                key={post.id}
                                className="transition-colors duration-200"
                                data-aos="fade-up"
                                data-aos-easing="ease-in-out"
                                data-aos-mirror="true"
                                data-aos-delay={150 * (index % 5)}
                            >
                                <ForumCard post={post} refetch={refetch} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Right Sidebar */}
            <div
                className="hidden md:block sticky top-20 h-[calc(100vh-4rem)]"
                data-aos="fade-left"
                data-aos-delay="150"
            >
                <RightSideBar posts={posts} refetch={refetch} />
            </div>
        </section>
    );
};

export default Forum;
