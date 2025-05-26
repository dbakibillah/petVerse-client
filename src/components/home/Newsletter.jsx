import { useState } from "react";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setIsValid(false);
            return;
        }

        setIsSubmitting(true);
        setIsValid(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setEmail("");
            // Hide success message after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);
        }, 1500);
    };

    return (
        <section className="bg-secondary/10 dark:bg-gray-800 py-16 px-4 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Image Section */}
                <figure className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
                    <img
                        src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2048&q=80"
                        alt="Cat relaxing"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </figure>

                {/* Content Section */}
                <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">
                        Get Our Weekly
                    </h3>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary">
                        Newsletter
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
                        Get weekly updates on the newest cat products, care
                        tips, and exclusive offers right in your mailbox.
                        Purr-fect content for cat lovers!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (!isValid) setIsValid(true);
                                }}
                                placeholder="Your email address"
                                className={`flex-grow px-4 py-3 rounded-lg border ${
                                    isValid
                                        ? "border-gray-300 dark:border-gray-600"
                                        : "border-red-500"
                                } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white`}
                                required
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-6 py-3 bg-primary text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg ${
                                    isSubmitting
                                        ? "opacity-75 cursor-not-allowed"
                                        : "hover:-translate-y-0.5"
                                }`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                        Sending...
                                    </span>
                                ) : (
                                    "Subscribe"
                                )}
                            </button>
                        </div>

                        {!isValid && (
                            <p className="text-sm text-red-500 dark:text-red-400">
                                Please enter a valid email address
                            </p>
                        )}

                        {isSuccess && (
                            <div className="p-3 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-lg text-sm">
                                🎉 Thank you for subscribing! Please check your
                                inbox to confirm.
                            </div>
                        )}

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
