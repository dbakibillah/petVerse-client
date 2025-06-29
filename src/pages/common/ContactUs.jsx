import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-orange-200 py-3">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left text-lg font-semibold text-orange-700 focus:outline-none"
            >
                {question}
                <FaChevronDown
                    className={`ml-2 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 text-gray-700 text-base overflow-hidden"
                    >
                        {answer}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
};

const ContactUs = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        e.target.reset();
        setTimeout(() => setSubmitted(false), 4000); // hide after 4 seconds
    };

    return (
        <div className="bg-orange-50 min-h-screen py-16 px-6 md:px-20 text-gray-800">
            <h1 className="text-4xl font-bold text-orange-600 text-center mb-12">
                Contact Us & FAQs
            </h1>

            <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto items-start">
                {/* Contact Form */}
                <div className="bg-white shadow-xl rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-orange-500 mb-4">Send Us a Message</h2>
                    <p className="text-base text-gray-600 mb-6">
                        We'd love to hear from you! Whether it's a question, suggestion, or just a hello 🐾
                    </p>

                    {submitted && (
                        <div className="text-green-600 font-semibold text-center mb-4">
                            ✅ Thank you! Your message has been sent.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Your full name"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="you@example.com"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Message</label>
                            <textarea
                                name="message"
                                required
                                rows="5"
                                placeholder="Write your message here..."
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                            />
                        </div>

                        {/* Centered Submit Button */}
                        <div className="text-center pt-2">
                            <button
                                type="submit"
                                className="bg-[#FF7518] hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-md transition"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-sm text-gray-600">
                        📧 <span className="text-orange-600">petversewebsite@gmail.com</span><br />
                        📞 <span className="text-orange-600">+99400256887</span>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white shadow-xl rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-orange-500 mb-4">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <FAQItem
                            question="Do you offer grooming for both dogs and cats?"
                            answer="Absolutely! Our certified groomers specialize in both canine and feline grooming. We offer a range of services like nail trimming, baths, fur styling, and skin treatments tailored for each pet's needs."
                        />
                        <FAQItem
                            question="How do I book an appointment?"
                            answer="Appointments can be booked via our website, phone call, or social media. You’ll get confirmation and reminders automatically."
                        />
                        <FAQItem
                            question="What products do you offer?"
                            answer="We offer high-quality pet foods, accessories, grooming tools, treats, and health essentials. All products are vet-approved and safe for your furry friend."
                        />
                        <FAQItem
                            question="Are your services available on weekends?"
                            answer="Yes! We’re open every day from 10 AM to 8 PM including weekends, so you can visit us at your convenience."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
