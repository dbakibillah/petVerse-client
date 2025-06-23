import React from 'react';

const HealthCareAppointment = () => {
    return (
         <section class="bg-pink-50 text-gray-800 font-sans leading-relaxed tracking-wide">

  
  <header class="bg-gradient-to-r from-[#fb6f92] via-[#ffb3c1] to-[#fcd5ce] text-white py-12 text-center shadow-lg">
    <h1 class="text-4xl md:text-5xl font-extrabold">🐾 PetVerse Health Appointment</h1>
    <p class="mt-3 text-xl italic">“Gentle care. Trusted hands. Better health.”</p>
  </header>

  
  <div class="max-w-4xl mx-auto my-6 px-4 text-center text-base text-gray-600">
    <p>
      Book a health consultation for your pet. Our expert vets provide thorough checkups, vaccinations, and guidance tailored to your pet’s unique needs. Fill out the form below and we’ll get back to you shortly.
    </p>
  </div>

  
  <section class="max-w-5xl mx-auto bg-white p-10 my-10 rounded-3xl shadow-xl border border-[#ffb3c1]">
    <form class="space-y-12">

      
      <div>
        <h2 class="text-2xl font-bold text-[#fb6f92] mb-3">🐶 Pet Information</h2>
        <p class="text-sm text-gray-500 mb-5">Tell us more about your furry (or feathery) friend.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="petName" type="text" placeholder="Pet Name (e.g., Bella)" required class="form-input border border-[#fb6f92] rounded-xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-[#fb6f92]" />
          
          <select name="petType" required class="form-select border border-[#fb6f92] rounded-xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-[#fb6f92]">
            <option disabled selected>Select Pet Type</option>
            <option>Dog</option>
            <option>Cat</option>
            <option>Rabbit</option>
            <option>Bird</option>
            <option>Other</option>
          </select>

          <input name="breed" type="text" placeholder="Breed (e.g., Labrador)" class="form-input border border-[#fb6f92] rounded-xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-[#fb6f92]" />
          <input name="age" type="number" placeholder="Age in Years" class="form-input border border-[#fb6f92] rounded-xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-[#fb6f92]" />
          
          <input name="weight" type="number" placeholder="Weight in kg" class="form-input border border-[#fb6f92] rounded-xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-[#fb6f92]" />
        </div>
      </div>

      
      <div>
        <h2 class="text-2xl font-bold text-[#ffb3c1] mb-3">🩺 Health Details</h2>
        <p class="text-sm text-gray-500 mb-5">Help us understand your pet’s current health situation.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <select name="vaccinated" required class="form-select border border-[#ffb3c1] rounded-xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-[#ffb3c1]">
            <option disabled selected>Vaccination Status</option>
            <option>Fully Vaccinated</option>
            <option>Partially Vaccinated</option>
            <option>Not Vaccinated</option>
          </select>
          <input name="allergies" type="text" placeholder="Allergies (if any)" class="form-input border border-[#ffb3c1] rounded-xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-[#ffb3c1]" />
          <textarea name="symptoms" rows="3" placeholder="Medical concerns, symptoms, or recent issues" class="col-span-2 border border-[#ffb3c1] rounded-xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-[#ffb3c1]"></textarea>
        </div>
      </div>

      
      <div>
        <h2 class="text-2xl font-bold text-[#fcd5ce] mb-3">👤 Owner Contact Info</h2>
        <p class="text-sm text-gray-500 mb-5">We'll use this to follow up and confirm your appointment.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="ownerName" type="text" placeholder="Owner's Full Name" required class="form-input border border-[#fcd5ce] rounded-xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-[#fcd5ce]" />
          <input name="phone" type="tel" placeholder="Phone Number" required class="form-input border border-[#fcd5ce] rounded-xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-[#fcd5ce]" />
          <input name="email" type="email" placeholder="Email Address (optional)" class="form-input border border-[#fcd5ce] rounded-xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-[#fcd5ce]" />
          <input name="address" type="text" placeholder="Pickup Address" required class="form-input border border-[#fcd5ce] rounded-xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-[#fcd5ce]" />
        </div>
      </div>

      
      <div>
        <h2 class="text-2xl font-bold text-pink-500 mb-3">📅 Preferred Schedule</h2>
        <p class="text-sm text-gray-500 mb-5">Pick a time that works best for you. We’ll confirm it via call or SMS.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="preferredDate" type="date" required class="form-input border border-pink-300 rounded-xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-pink-400" />
          <input name="preferredTime" type="time" required class="form-input border border-pink-300 rounded-xl px-4 py-2 shadow-inner focus:ring-2 focus:ring-pink-400" />
        </div>
      </div>

      
      <div class="mt-6">
        <label class="flex gap-2 items-start">
          <input type="checkbox" required class="mt-1" />
          <span class="text-sm text-gray-700">I confirm the above information is accurate and I agree to PetVerse's terms and policies.</span>
        </label>
        <div class="text-center mt-10">
          <button type="submit" class="bg-gradient-to-r from-[#fb6f92] to-[#ffb3c1] hover:from-[#f94f70] hover:to-[#ff99af] text-white font-bold px-10 py-4 rounded-xl text-lg shadow-lg transition duration-300">
            🐾 Confirm Appointment
          </button>
        </div>
      </div>
    </form>
  </section>

  
  <footer class="bg-white border-t py-6 text-center text-sm text-gray-500">
    “Your trusted partner in pet wellness – over <strong>1,000 happy tails</strong> and counting!”
  </footer>

  </section>
    );
};

export default HealthCareAppointment;