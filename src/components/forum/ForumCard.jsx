import {
    HiOutlineCheckCircle,
    HiOutlineChatAlt2,
    HiOutlineUserCircle,
    HiOutlineHeart,
} from "react-icons/hi";
import { formatDistanceToNow } from "date-fns";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import CommentsContainer from "./CommentsContainer";
import { motion } from "framer-motion";

const ForumCard = ({ post, refetch }) => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const [liked, setLiked] = useState(
        post.likedBy?.includes(user?.email) || false
    );
    const [likesCount, setLikesCount] = useState(post.likesCount || 0);
    const [isAnimating, setIsAnimating] = useState(false);

    const [showCommentForm, setShowCommentForm] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState(post.comments || []);

    const formattedDate = formatDistanceToNow(new Date(post.createdAt), {
        addSuffix: true,
    });

    // Category color mapping
    const categoryColors = {
        "Lost & Found": "bg-purple-100 text-purple-800",
        Help: "bg-blue-100 text-blue-800",
        Health: "bg-red-100 text-red-800",
        "Pet Adoption": "bg-green-100 text-green-800",
        "Daily Life with Pets": "bg-yellow-100 text-yellow-800",
        "Pet Events & Meetups": "bg-indigo-100 text-indigo-800",
        "Feedback & Suggestions": "bg-pink-100 text-pink-800",
    };

    const handleLike = async () => {
        if (!user) return;

        setIsAnimating(true);

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
        refetch();
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim() || !user) return;

        const newComment = {
            userName: user.displayName,
            userImg: user.photoURL,
            comment: commentText,
            time: new Date().toLocaleString(),
        };
        try {
            const response = await axiosPublic.patch(
                `/threads/comment/${post._id}`,
                { newComment }
            );

            if (response.data.success) {
                setComments((prev) => [...prev, newComment]);
                setCommentText("");
                setShowCommentForm(false);

                toast.success("Comment added successfully", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: document.documentElement.classList.contains("dark")
                        ? "dark"
                        : "light",
                });
            }
        } catch (error) {
            console.error("Failed to submit comment:", error);
        }
        refetch();
    };

    return (
        <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5 dark:bg-gray-900/80 dark:border-gray-700 dark:hover:border-primary/40">
            {/* Header with subtle gradient effect */}
            <div className="flex items-center gap-5 mb-5">
                {/* author image */}
                <div className="flex-shrink-0 z-10">
                    {post.authorImg ? (
                        <img
                            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary/20 hover:ring-primary/70 hover:ring-5 transition-all duration-400 dark:ring-primary/30 dark:hover:ring-primary/50"
                            src={post.authorImg}
                            alt={post.authorName}
                        />
                    ) : (
                        <HiOutlineUserCircle className="w-12 h-12 text-gray-400 hover:text-primary transition-colors duration-200 dark:text-gray-500" />
                    )}
                </div>
                <div className="z-10 w-full flex justify-between items-center">
                    {/* author name */}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg group text-start">
                            <span className="group-hover:text-primary transition-colors duration-200">
                                {post.authorName}
                            </span>
                        </h3>
                        <p className="text-gray-400 text-start text-sm dark:text-gray-400">
                            {formattedDate}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span
                            className={`capitalize px-3 py-1 rounded-full text-xs font-medium ${
                                categoryColors[post.category] ||
                                "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                            }`}
                        >
                            {post.category}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mb-5 group">
                <h2 className="text-xl text-start font-bold text-gray-900 dark:text-white mb-3 hover:text-primary transition-colors duration-200 cursor-pointer">
                    {post.postTitle}
                </h2>
                <div className="text-gray-600 dark:text-gray-300 text-sm text-start space-y-2 leading-relaxed">
                    {post.postDescription.split("\n").map((paragraph, i) => (
                        <p
                            key={i}
                            className="hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200"
                            dangerouslySetInnerHTML={{
                                __html: paragraph.replace(
                                    /\*\*(.*?)\*\*/g,
                                    "<strong class='font-semibold text-gray-800 dark:text-gray-200'>$1</strong>"
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
                            className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-primary/10 hover:text-primary transition-colors duration-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-primary/20"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-1 text-sm transition-colors duration-200 ${
                            liked
                                ? "text-red-500"
                                : "text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500"
                        }`}
                        disabled={!user || isAnimating}
                        title={!user ? "Please login to like" : ""}
                    >
                        <motion.div
                            animate={{
                                scale: isAnimating ? [1, 1.5, 1] : 1,
                                rotate: isAnimating ? [0, -10, 10, 0] : 0,
                            }}
                            transition={{
                                duration: 0.6,
                                ease: "easeInOut",
                            }}
                            onAnimationComplete={() => setIsAnimating(false)}
                        >
                            <HiOutlineHeart
                                className={`w-5 h-5 transition-transform duration-200 hover:scale-110 ${
                                    liked ? "fill-red-500 text-red-500" : ""
                                }`}
                            />
                        </motion.div>
                        <motion.span
                            key={likesCount}
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {likesCount}
                        </motion.span>
                    </button>

                    <button
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-500 transition-colors duration-200 dark:text-gray-400 dark:hover:text-blue-400"
                        onClick={() => setShowCommentForm(!showCommentForm)}
                    >
                        <HiOutlineChatAlt2 className="w-5 h-5 transition-transform duration-200 hover:scale-110" />
                        <span>{post.comments?.length || 0} responses</span>
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowCommentForm(!showCommentForm)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary font-medium text-sm rounded-lg transition-all duration-200 hover:shadow-sm active:scale-95 dark:bg-primary/20 dark:hover:bg-primary/30"
                    >
                        <HiOutlineCheckCircle className="w-5 h-5" />
                        <span>Add Response</span>
                    </button>
                </div>
            </div>

            <div>
                {showCommentForm && (
                    <form
                        onSubmit={handleCommentSubmit}
                        className="mt-4 flex flex-col gap-2"
                    >
                        <textarea
                            rows="3"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write your comment..."
                            className="w-full p-2 border rounded-lg focus:outline-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                        />
                        <button
                            onClick={handleCommentSubmit}
                            type="submit"
                            className="self-end bg-primary text-white px-4 py-1.5 rounded-md hover:bg-primary/90 transition-all dark:hover:bg-primary/80"
                        >
                            Submit Comment
                        </button>
                    </form>
                )}
            </div>
            <CommentsContainer comments={comments} />
        </article>
    );
};

export default ForumCard;
