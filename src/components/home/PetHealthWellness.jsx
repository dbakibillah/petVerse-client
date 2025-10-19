import React from "react";
import { motion } from "framer-motion";
import { FaPaw, FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const articles = [
  {
    title: "5 Essential Tips for Your Pet’s Skin & Coat Health",
    category: "Grooming",
    date: "October 10, 2025",
    image: "https://i.ibb.co/QfJ0Sx8/pet-grooming.jpg",
    description:
      "Discover natural ways to keep your furry friend’s skin and coat shiny, soft, and healthy all year round.",
  },
  {
    title: "Understanding Pet Anxiety and How to Help",
    category: "Wellness",
    date: "October 7, 2025",
    image: "https://i.ibb.co/n1Dpg4b/pet-anxiety.jpg",
    description:
      "Learn from pet behavior experts how to identify anxiety symptoms in pets and calm them effectively.",
  },
  {
    title: "The Importance of Regular Vet Checkups",
    category: "Healthcare",
    date: "October 1, 2025",
    image: "https://i.ibb.co/rvnQgC5/pet-healthcare.jpg",
    description:
      "Preventive care can extend your pet’s life. Here’s why consistent veterinary visits matter more than you think.",
  },
  {
    title: "Choosing the Right Diet for Your Pet’s Lifestyle",
    category: "Nutrition",
    date: "September 25, 2025",
    image: "https://i.ibb.co/znsQ9Sw/pet-nutrition.jpg",
    description:
      "Balanced nutrition is key to your pet’s health. Discover which diet plans work best for dogs and cats.",
  },
];

const PetHealthWellness = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-100 text-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://i.ibb.co/BtLZc7D/pet-wellness-bg.jpg"
            alt="Pet Wellness"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 py-24 text-center max-w-3xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-extrabold text-orange-600 drop-shadow-sm"
          >
            🐾 Pet Health & Wellness
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-700 mt-4"
          >
            Your go-to source for reliable pet health and care advice — from the experts at PetVerse.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-8 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition"
          >
            Learn More
          </motion.button>
        </div>
      </div>

      {/* Latest Articles Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-orange-600 mb-3"
          >
            📰 Latest Pet Health Articles
          </motion.h2>
          <p className="text-gray-600">
            Stay informed with our expert insights and daily pet wellness tips.
          </p>
        </div>

        {/* Article Cards */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-orange-200 transition border border-orange-100 overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition">
                  {article.title}
                </h3>
                <div className="flex items-center text-gray-500 text-sm">
                  <FaCalendarAlt className="mr-2 text-orange-400" /> {article.date}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{article.description}</p>
                <div className="flex justify-end mt-4">
                  <button className="flex items-center text-orange-500 font-medium hover:underline">
                    Read More <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-orange-100 py-10 mt-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <FaPaw className="text-3xl text-orange-500 mx-auto mb-2" />
          <h4 className="text-lg font-semibold text-gray-700">
            Stay Connected with PetVerse Wellness Updates 🐶🐱
          </h4>
          <p className="text-gray-500 mt-1 text-sm">
            Follow our journey of love, health, and happiness for every pet.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PetHealthWellness;
