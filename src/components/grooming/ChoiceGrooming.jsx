import React from 'react';

const ChoiceGrooming = () => {
    return (
        <section>
           
<div class="bg-yellow-50 font-sans">
  <div class="flex flex-col md:flex-row items-center justify-center p-8 md:p-16 gap-10">
    
    
    <div class=" w-full md:w-1/2 flex justify-center">
      <img src="https://i.ibb.co/sJQtQMCh/Petgrooming-2.jpg" alt="Pet Grooming" class="rounded-full w-[300px] md:w-[400px] object-cover shadow-lg"/>
    </div>

    
    <div class="w-full md:w-1/2 text-center md:text-left max-w-xl">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">Why We're The Top Choice For Grooming</h2>
      <p class="text-gray-700 mb-6">
        Top Choice for Grooming: Expert care, premium products, stress-free experience.
        Your pets deserve the best, and we deliver exceptional results.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-left text-gray-800">
        <p>✅ <span class="font-semibold">Expert Groomers</span></p>
        <p>✅ <span class="font-semibold">Exceptional Results</span></p>
        <p>✅ <span class="font-semibold">Compassionate Care</span></p>
        <p>✅ <span class="font-semibold">Hygienic Environment</span></p>
        <p>✅ <span class="font-semibold">Tailored Services</span></p>
        <p>✅ <span class="font-semibold">Stress-Free Experience</span></p>
      </div>

      <a href="#" class="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-md transition">
        Book Appointment
      </a>
    </div>

</div>
</div>

        </section>
    );
};

export default ChoiceGrooming;