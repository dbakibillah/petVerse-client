import React from 'react';

const SpecialOffer = () => {
    return (
        <section>
            
<div class="bg-yellow-50 font-sans py-12">
      <div class="max-w-5xl mx-auto px-4">
        <div class="text-center mb-12">
          <h1 class="text-3xl md:text-4xl font-bold decoration-black">
            Special Offers
          </h1>
        </div>

        <div
          class="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12"
        >
          <div
            class="bg-gray-100 rounded-2xl shadow-md p-6 flex flex-col items-start hover:shadow-lg transition-shadow"
          >
            <h2 class="text-lg font-semibold mb-1">Summer Grooming Special</h2>
            <p class="text-sm text-gray-600">
              Add our summer upgrade with lots of goodies to your pup's next
              shop visit.
            </p>
          </div>

          <div
            class="bg-gray-100 rounded-2xl shadow-md p-6 flex flex-col items-start hover:shadow-lg transition-shadow"
          >
            <h2 class="text-lg font-semibold mb-1">Summer Special PLUS</h2>
            <p class="text-sm text-gray-600">
              Includes the Summer Grooming Special plus a nail grind & teeth
              brushing.
            </p>
          </div>

          <div
            class="bg-gray-100 rounded-2xl shadow-md p-6 flex flex-col items-start hover:shadow-lg transition-shadow"
          >
            <h2 class="text-lg font-semibold mb-1">Senior & Military Discount</h2>
            <p class="text-sm text-gray-600">
              Available at the salon on Tuesdays.
            </p>
          </div>
        </div>

        <div class="text-center mt-12">
          <a
            href="#"
            class="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-md transition"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </div>


        </section>
    );
};

export default SpecialOffer;