import {
    HiOutlineCheckCircle,
    HiOutlineChatAlt2,
    HiOutlineUserCircle,
    HiOutlineHeart,
    HiOutlineBookmark,
} from "react-icons/hi";
import { formatDistanceToNow } from "date-fns";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ForumCard = ({ post }) => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const [liked, setLiked] = useState(
        post.likedBy?.includes(user?.email) || false
    );
    const [likesCount, setLikesCount] = useState(post.likesCount || 0);

    const formattedDate = formatDistanceToNow(new Date(post.createdAt), {
        addSuffix: true,
    });

    const handleLike = async () => {
        if (!user) return;

        try {
            const response = await axiosPublic.patch(`/threads/${post._id}`, {
                userEmail: user.email,
            });

            const {
                success,
                liked: isLiked,
                likesCount: updatedLikesCount,
            } = response.data;

            if (success) {
                setLiked(isLiked);
                setLikesCount(updatedLikesCount);
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    return (
        <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5">
            {/* Header with subtle gradient effect */}
            <div className="flex items-center gap-5 mb-5">
                {/* author image */}
                <div className="flex-shrink-0 z-10">
                    {post.authorImg ? (
                        <img
                            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary/20 hover:ring-primary/70 hover:ring-5 transition-all duration-400"
                            src={post.authorImg}
                            alt={post.authorName}
                        />
                    ) : (
                        <HiOutlineUserCircle className="w-12 h-12 text-gray-400 hover:text-primary transition-colors duration-200" />
                    )}
                </div>
                <div className="z-10 w-full flex justify-between items-center">
                    {/* author name */}
                    <div>
                        <h3 className="font-semibold text-gray-900 text-lg group text-start">
                            <span className="group-hover:text-primary transition-colors duration-200">
                                {post.authorName}
                            </span>
                        </h3>
                        <p className="text-gray-400 text-start text-sm">
                            {formattedDate}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <span className="capitalize bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                            {post.category}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mb-5 group">
                <h2 className="text-xl text-start font-bold text-gray-900 mb-3 hover:text-primary transition-colors duration-200 cursor-pointer">
                    {post.postTitle}
                </h2>
                <div className="text-gray-600 text-sm text-start space-y-2 leading-relaxed">
                    {post.postDescription.split("\n").map((paragraph, i) => (
                        <p
                            key={i}
                            className="hover:text-gray-800 transition-colors duration-200"
                            dangerouslySetInnerHTML={{
                                __html: paragraph.replace(
                                    /\*\*(.*?)\*\*/g,
                                    "<strong class='font-semibold text-gray-800'>$1</strong>"
                                ),
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Tags */}
            {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-1 text-sm transition-colors duration-200 ${
                            liked
                                ? "text-red-500"
                                : "text-gray-500 hover:text-red-500"
                        }`}
                        disabled={!user}
                        title={!user ? "Please login to like" : ""}
                    >
                        <HiOutlineHeart
                            className={`w-5 h-5 transition-transform duration-200 hover:scale-110 ${
                                liked ? "fill-red-500 text-red-500" : ""
                            }`}
                        />
                        <span>{likesCount}</span>
                    </button>

                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-500 transition-colors duration-200">
                        <HiOutlineChatAlt2 className="w-5 h-5 transition-transform duration-200 hover:scale-110" />
                        <span>{post.comments?.length || 0} responses</span>
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary font-medium text-sm rounded-lg transition-all duration-200 hover:shadow-sm active:scale-95">
                        <HiOutlineCheckCircle className="w-5 h-5" />
                        <span>Add Response</span>
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ForumCard;
