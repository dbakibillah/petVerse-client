import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const CreateThreads = ({ refetch }) => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        authorName: user?.displayName || "",
        authorEmail: user?.email || "",
        authorImg: user?.photoURL || "",
        postTitle: "",
        postDescription: "",
        tags: "",
        category: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Process tags into an array
            const processedData = {
                ...formData,
                tags: formData.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag),
                createdAt: new Date().toLocaleString(),
                likesCount: 0,
                likedBy: [],
                comments: [],
            };

            const response = await axiosPublic.post("/threads", processedData);

            if (response.data.success) {
                toast("Thread created successfully", {
                    type: "success",
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setShowForm(false);
                setFormData({
                    authorName: user?.displayName || "",
                    authorEmail: user?.email || "",
                    authorImg: user?.photoURL || "",
                    postTitle: "",
                    postDescription: "",
                    tags: "",
                    category: "",
                });
            } else {
                throw new Error(
                    response.data.message || "Failed to create thread"
                );
            }
        } catch (error) {
            console.error("Error creating thread:", error);
            toast("Failed to create thread", {
                type: "error",
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } finally {
            setIsSubmitting(false);
        }

        refetch();
    };

    return (
        <section className="max-w-5xl mx-auto">
            {/* Header with gradient background */}
            <div className="flex justify-between items-center p-6 bg-gradient-to-r from-green-100 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-sm mb-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Welcome to the Forum
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                        Share your knowledge and connect with others
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all duration-300 hover:shadow-xl flex items-center gap-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Create Thread
                </button>
            </div>

            {/* Modal Form */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
                    <div className="bg-white dark:bg-gray-900 w-full max-w-xl rounded-xl shadow-lg p-6 relative animate-fadeIn">
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                            disabled={isSubmitting}
                        >
                            &times;
                        </button>

                        <div className="flex items-center gap-4 mb-6">
                            <img
                                src={
                                    user?.photoURL ||
                                    "https://i.pravatar.cc/150?img=3"
                                }
                                alt="Author"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-semibold text-lg text-gray-800 dark:text-white">
                                    {user?.displayName}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {user?.email}
                                </p>
                            </div>
                        </div>

                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                            Start a New Thread
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                                    Post Title *
                                </label>
                                <input
                                    type="text"
                                    name="postTitle"
                                    value={formData.postTitle}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                    placeholder="e.g. How to track my pet's health?"
                                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-70"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                                    Description *
                                </label>
                                <textarea
                                    name="postDescription"
                                    value={formData.postDescription}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                    rows={5}
                                    placeholder="Share your thoughts, questions, or ideas here..."
                                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-70"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                                    Tags (comma separated)
                                </label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    placeholder="e.g. health, technology"
                                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-70"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-70"
                                >
                                    <option value="">Select a category</option>
                                    <option value="Technology">
                                        Technology
                                    </option>
                                    <option value="Health">Health</option>
                                    <option value="Education">Education</option>
                                    <option value="General">General</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    disabled={isSubmitting}
                                    className="px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition disabled:opacity-70"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg
                                                className="animate-spin h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Creating...
                                        </>
                                    ) : (
                                        "Submit Thread"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default CreateThreads;
