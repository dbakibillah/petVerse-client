import React from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

const AdminProductForm = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-50 p-10 relative overflow-hidden">

      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-orange-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      </div>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center mb-12"
      >
        <h2 className="text-4xl font-extrabold text-orange-600 drop-shadow-lg">
          🛒 Admin Product Management
        </h2>
        <p className="text-gray-600 mt-2">
          Add or modify products with complete details for your shop.
        </p>
      </motion.div>

      {/* Product Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-6xl mx-auto bg-white/80 backdrop-blur-lg border border-orange-200 shadow-2xl rounded-3xl p-10 hover:shadow-orange-200/50 transition-all duration-300"
      >
        <form className="space-y-10">
          {/* Basic Info Section */}
          <section>
            <h3 className="text-2xl font-bold text-orange-600 mb-6 border-b border-orange-200 pb-2">
              📌 Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Product Name", placeholder: "Aloe Vera Pet Shampoo" },
                { label: "Price ($)", placeholder: "349.99" },
                { label: "Discount (%)", placeholder: "15" },
                { label: "Available Stock", placeholder: "40" },
                { label: "Total Sold", placeholder: "120" },
                { label: "Category", placeholder: "Grooming" },
                { label: "Pet Type", placeholder: "dog, cat" },
                { label: "Brand", placeholder: "PurePaws" },
                { label: "Volume", placeholder: "250ml" },
                { label: "Expiration Date", placeholder: "YYYY-MM-DD" },
                { label: "Tags", placeholder: "shampoo, natural, skin care" },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <label className="block text-gray-700 font-medium mb-2">{f.label}</label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition"
                  />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Media Section */}
          <section>
            <h3 className="text-2xl font-bold text-orange-600 mb-6 border-b border-orange-200 pb-2">
              🖼️ Product Media
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <label className="block text-gray-700 font-medium">Product Image URL</label>
              <input
                type="url"
                placeholder="https://i.ibb.co/9vQYQmF/aloe-vera-shampoo.png"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400 bg-white/90 shadow-sm hover:shadow-md transition"
              />
            </motion.div>
          </section>

          {/* Policies Section */}
          <section>
            <h3 className="text-2xl font-bold text-orange-600 mb-6 border-b border-orange-200 pb-2">
              📄 Policies & Description
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-gray-700 font-medium mb-2">Return Policy</label>
                <input
                  type="text"
                  placeholder="7-day return with original packaging"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400 bg-white/90 shadow-sm hover:shadow-md transition"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-gray-700 font-medium mb-2">Warranty Info</label>
                <input
                  type="text"
                  placeholder="No warranty"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400 bg-white/90 shadow-sm hover:shadow-md transition"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-6"
            >
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                rows="4"
                placeholder="Soothing shampoo made with natural Aloe Vera for sensitive pet skin."
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400 bg-white/90 shadow-sm hover:shadow-md transition"
              ></textarea>
            </motion.div>
          </section>

          {/* Action Buttons */}
          <div className="flex justify-end mt-8 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-gray-400 text-white font-bold px-6 py-2 rounded-lg hover:bg-gray-500 transition"
            >
              Reset
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold px-8 py-2 rounded-lg shadow-md hover:shadow-lg transition"
            >
              Save Product
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminProductForm;
