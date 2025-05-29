import ForumCard from "../../components/forum/ForumCard";
import { useQuery } from "@tanstack/react-query";
import LeftSideBar from "../../components/forum/LeftSideBar";
import CreateThreads from "../../components/forum/CreateThreads";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import RightSideBar from "../../components/forum/RightSideBar";

const Forum = () => {
    const axiosPublic = useAxiosPublic();
    const { data: posts = [], refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const response = await axiosPublic.get("/threads");
            return response.data;
        },
    });

    return (
        <section className="container mx-auto py-8 flex flex-col md:flex-row gap-6 max-w-7xl">
            {/* Left Sidebar */}
            <LeftSideBar posts={posts} />

            {/* Main Content */}
            <main className="flex-1">
                <CreateThreads refetch={refetch} />

                <div className="bg-white rounded-lg shadow-sm p-2">
                    {/* Thread items would go here */}
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                        {posts.map((post) => (
                            <ForumCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </main>

            {/* Right Sidebar */}
            <RightSideBar posts={posts} />
        </section>
    );
};

export default Forum;
