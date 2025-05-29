import React from 'react';

const MoreAboutUs = () => {
    return (
        <section>
        <div class="bg-yellow-50 font-sans">
            <div class="flex flex-col md:flex-row items-center justify-center p-8 md:p-16 gap-10">
            <div class="w-full md:w-1/2 text-center md:text-left max-w-xl">
                <h1 class="text-3xl md:text-4xl font-bold mb-4">Few Words About Our Pet Grooming</h1>
                <p class="text-gray-700 mb-6">Our pet grooming is all about love and care. Expert groomers, gentle touch, and personalized services. Pamper your pets with us!</p>
                <a href="#"  class="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-md transition">More Details</a>
            </div>
            <div class="w-full md:w-1/2 flex justify-center">
                <img src="https://i.ibb.co/BVyrdC13/Why-Socializing-Your-Cat-Is-Crucial-Tips-for-a-Happier-Healthier-Pet.jpg" class="rounded-full w-[300px] md:w-[400px] object-cover shadow-lg"/>
            </div>
        </div>
        </div>
    </section>
    );
};

export default MoreAboutUs;