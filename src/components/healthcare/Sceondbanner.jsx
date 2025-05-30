import React from 'react';

const Sceondbanner = () => {
    return (
         <section class="bg-yellow-50 font-sans py-12">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-12">
        Our Provided Services
      </h1>

      <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        
        <div class="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow border-2 border-blue-300">
          <div class="text-4xl text-yellow-600 mb-4">📝</div>
          <h2 class="text-xl font-semibold text-gray-800 mb-2 text-center">General Health Checkups</h2>
          <p class="text-sm text-gray-600 text-center">
            Routine physical exams to monitor overall wellness.
          </p>
        </div>

        
        <div class="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow border-2 border-blue-300">
          <div class="text-4xl text-pink-500 mb-4">➕</div>
          <h2 class="text-xl font-semibold text-gray-800 mb-2 text-center">Vaccinations Care</h2>
          <p class="text-sm text-gray-600 text-center">
            Protection against common diseases like rabies, distemper, and parvo.
          </p>
        </div>

        
        <div class="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow border-2 border-blue-300">
          <div class="text-4xl text-blue-500 mb-4">🦷</div>
          <h2 class="text-xl font-semibold text-gray-800 mb-2 text-center">Dental Care</h2>
          <p class="text-sm text-gray-600 text-center">
            Cleaning, extractions, and oral health management for pets.
          </p>
        </div>

        
        <div class="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow border-2 border-blue-300">
          <div class="text-4xl text-purple-500 mb-4">📄</div>
          <h2 class="text-xl font-semibold text-gray-800 mb-2 text-center">Spaying & Neutering</h2>
          <p class="text-sm text-gray-600 text-center">
            Safe and effective reproductive health procedures.
          </p>
        </div>

        
        <div class="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow border-2 border-blue-300">
          <div class="text-4xl text-green-600 mb-4">➕</div>
          <h2 class="text-xl font-semibold text-gray-800 mb-2 text-center">Nutrition & Weight Management</h2>
          <p class="text-sm text-gray-600 text-center">
            Diet plans and support for healthy living.
          </p>
        </div>

        
        <div class="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow border-2 border-blue-300">
          <div class="text-4xl text-pink-400 mb-4">🩺</div>
          <h2 class="text-xl font-semibold text-gray-800 mb-2 text-center">Chronic Disease Management</h2>
          <p class="text-sm text-gray-600 text-center">
            Long-term care for conditions like diabetes or arthritis.
          </p>
        </div>

      </div>
    </section>
    );
};

export default Sceondbanner;