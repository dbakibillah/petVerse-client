import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
    FiArrowRight,
    FiAlertCircle,
    FiCheckCircle,
    FiLock,
} from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            mirror: true,
            easing: "ease-out-cubic",
        });
    }, []);

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
        }, 2000);
    };

    return (
        <section className="bg-secondary/10 dark:bg-gray-800 py-16 px-4 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
                {/* Image Section */}
                <figure
                    className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl"
                    data-aos="fade-right"
                >
                    <img
                        src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2048&q=80"
                        alt="Cat relaxing"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                            <p className="text-sm font-medium text-center text-gray-800 dark:text-gray-200">
                                "Join thousands of cat lovers who get our weekly
                                tips and exclusive offers!"
                            </p>
                        </div>
                    </div>
                </figure>

                {/* Content Section */}
                <div className="space-y-6" data-aos="fade-left">
                    <h3 className="text-lg font-medium text-purple-600 dark:text-purple-400">
                        Get Our Weekly
                    </h3>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary">
                        Newsletter
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
                        Get weekly updates on the newest cat products, care
                        tips, and
                        <span className="font-semibold text-primary dark:text-primary-light">
                            {" "}
                            exclusive offers{" "}
                        </span>
                        right in your mailbox. Purr-fect content for cat lovers!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                        ? "border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary"
                                        : "border-red-500 focus:ring-2 focus:ring-red-500"
                                } focus:outline-none focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200`}
                                required
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-6 py-3 bg-gradient-to-r from-secondary to-primary hover:bg-gradient-to-l text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
                                    isSubmitting
                                        ? "opacity-80 cursor-not-allowed"
                                        : "hover:-translate-y-0.5"
                                }`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <ImSpinner8 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                                        Sending...
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        Subscribe{" "}
                                        <FiArrowRight className="ml-2 h-4 w-4" />
                                    </span>
                                )}
                            </button>
                        </div>

                        {!isValid && (
                            <p className="text-sm text-red-500 dark:text-red-400 flex items-center">
                                <FiAlertCircle className="mr-2 h-4 w-4" />
                                Please enter a valid email address
                            </p>
                        )}

                        {isSuccess && (
                            <div className="p-3 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-lg text-sm flex items-center animate-fade-in">
                                <FiCheckCircle className="mr-2 h-5 w-5" />
                                Thank you for subscribing! Please check your
                                inbox to confirm.
                            </div>
                        )}

                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <FiLock className="mr-2 h-4 w-4" />
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
