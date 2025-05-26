import React from 'react';

const PetCareHub = () => {
    return (
       <section>
        <div class="text-center py-12">
      <h1 class="text-5xl dark:text-white font-bold mb-2">Your Complete Pet Care Hub</h1>
      <p class="text-gray-500 dark:text-white">Explore All Of Our Pet Care Tools</p>
    </div>
     
     <div
        class=" max-w-6xl  mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12"
      >
        <div
          class="bg-gray-100  rounded-2xl shadow-md p-6 flex flex-col items-start hover:shadow-lg transition-shadow"
        >
          <div>
            <img class="border w-12 h-12 rounded-full" src="https://i.ibb.co/q3PRDm8y/pic1.png" />
          </div>
          <h2 class="text-lg font-semibold mb-1">Pet Health & Wellness</h2>
          <p class="text-sm text-gray-600">
            Your go-to source for reliable pet health and care advice.
          </p>
        </div>

        <div
          class="bg-gray-100 rounded-2xl shadow-md p-6 flex flex-col items-start hover:shadow-lg transition-shadow"
        >
          <div>
            <img class="border w-12 h-12 rounded-full" src="https://i.ibb.co/XZb42pLT/pic2.png" />
          </div>
          <h2 class="text-lg font-semibold mb-1">Pet Health & Wellness</h2>
          <p class="text-sm text-gray-600">
            Your go-to source for reliable pet health and care advice.
          </p>
        </div>

        <div
          class="bg-gray-100 rounded-2xl shadow-md p-6 flex flex-col items-start hover:shadow-lg transition-shadow"
        >
          <div>
            <img class="border w-12 h-12 rounded-full" src="https://i.ibb.co/5h4XPnkH/pic3.png" alt="" />
          </div>
          <h2 class="text-lg font-semibold mb-1">Pet Health & Wellness</h2>
          <p class="text-sm text-gray-600">
            Your go-to source for reliable pet health and care advice.
          </p>
        </div>
      </div>

       </section>
    );
};

export default PetCareHub;