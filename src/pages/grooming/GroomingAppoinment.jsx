import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const GroomingAppointment = () => {
  const axiosPublic = useAxiosPublic();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    // Convert FormData to a readable object
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const res = await axiosPublic.post("/grooming/appointment", data);
      if (res.data.insertedId) {
        alert("Appointment submitted successfully!");
        form.reset();
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
      alert("Something went wrong. Please try again.");
    }

    // Optionally reset the form
    form.reset();
  };

  return (
    <div className="bg-rose-50 font-sans text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 text-white py-12 shadow-md text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          🐾 Grooming Appointment Form 🐶🐱
        </h1>
        <p className="mt-2 text-xl italic">
          “Groomed with love, returned with joy.”
        </p>
      </header>

      {/* Why Choose Us */}
      <section className="max-w-4xl mx-auto text-center px-4 py-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-2">
          Why Choose Us?
        </h2>
        <p className="text-lg text-gray-700">
          Our professional pet grooming service ensures that your furry friend
          receives the best care, hygiene, and comfort. We offer{" "}
          <strong>home pickup and delivery</strong>,{" "}
          <strong>trained professionals</strong>, and a
          <strong> clean, pet-friendly environment</strong>.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
            🚗 Pickup & Drop
          </span>
          <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
            🧼 Sanitized Tools
          </span>
          <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
            🧑‍⚕️ Vet Supervision
          </span>
          <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-semibold">
            💯 Customer Satisfaction
          </span>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-6xl mx-auto bg-white p-10 mt-6 mb-10 rounded-3xl shadow-2xl border border-orange-200">
        <form className="space-y-10" onSubmit={handleSubmit}>
          {/* Pet Info */}
          <div>
            <h3 className="text-2xl font-bold text-orange-500 mb-4">
              🐶 Pet Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block mb-1 font-semibold">Pet Name</label>
                <input
                  name="petName"
                  type="text"
                  placeholder="e.g. Bella"
                  className="w-full px-4 py-2 rounded-xl border border-orange-300 focus:ring-2 focus:ring-orange-500 shadow-inner"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">Type of Pet</label>
                <select
                  name="petType"
                  className="w-full px-4 py-2 rounded-xl border border-orange-300 focus:ring-2 focus:ring-orange-500 shadow-inner"
                  required
                >
                  <option disabled selected>
                    Select type
                  </option>
                  <option>Dog</option>
                  <option>Cat</option>
                  <option>Rabbit</option>
                  <option>Bird</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-semibold">Age (Years)</label>
                <input
                  name="age"
                  type="number"
                  className="w-full px-4 py-2 rounded-xl border border-orange-300 focus:ring-2 focus:ring-orange-500 shadow-inner"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Weight (kg)</label>
                <input
                  name="weight"
                  type="number"
                  className="w-full px-4 py-2 rounded-xl border border-orange-300 focus:ring-2 focus:ring-orange-500 shadow-inner"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Breed</label>
                <input
                  name="breed"
                  type="text"
                  placeholder="e.g. Labrador"
                  className="w-full px-4 py-2 rounded-xl border border-orange-300 focus:ring-2 focus:ring-orange-500 shadow-inner"
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block mb-1 font-semibold">
                  Temperament or Behavior Notes
                </label>
                <textarea
                  name="temperament"
                  rows="3"
                  className="w-full px-4 py-2 rounded-xl border border-orange-300 focus:ring-2 focus:ring-orange-500 shadow-inner"
                  placeholder="Shy around strangers, scared of loud noises, etc."
                />
              </div>
            </div>
          </div>

          {/* Pickup & Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-pink-500 mb-4">
              📦 Pickup & Contact Info
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-semibold">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  className="w-full px-4 py-2 rounded-xl border border-pink-300 focus:ring-2 focus:ring-pink-500 shadow-inner"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">
                  Pickup Address
                </label>
                <input
                  name="address"
                  type="text"
                  className="w-full px-4 py-2 rounded-xl border border-pink-300 focus:ring-2 focus:ring-pink-500 shadow-inner"
                  required
                />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">
              📋 Additional Info
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block mb-1 font-semibold">
                  Friendly with other pets?
                </label>
                <select
                  name="friendly"
                  className="w-full px-4 py-2 rounded-xl border border-yellow-300 focus:ring-2 focus:ring-yellow-400 shadow-inner"
                  required
                >
                  <option disabled selected>
                    Select
                  </option>
                  <option>Yes</option>
                  <option>No</option>
                  <option>Sometimes</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-semibold">Trained?</label>
                <select
                  name="trained"
                  className="w-full px-4 py-2 rounded-xl border border-yellow-300 focus:ring-2 focus:ring-yellow-400 shadow-inner"
                  required
                >
                  <option disabled selected>
                    Select
                  </option>
                  <option>Yes</option>
                  <option>No</option>
                  <option>Partially</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-semibold">
                  Vaccination Status
                </label>
                <select
                  name="vaccinated"
                  className="w-full px-4 py-2 rounded-xl border border-yellow-300 focus:ring-2 focus:ring-yellow-400 shadow-inner"
                  required
                >
                  <option disabled selected>
                    Select
                  </option>
                  <option>Fully Vaccinated</option>
                  <option>Partially</option>
                  <option>Not Vaccinated</option>
                </select>
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block mb-1 font-semibold">
                  Medical Conditions or Allergies
                </label>
                <textarea
                  name="medical"
                  rows="3"
                  className="w-full px-4 py-2 rounded-xl border border-yellow-300 focus:ring-2 focus:ring-yellow-400 shadow-inner"
                  placeholder="Mention anything important"
                />
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <h3 className="text-2xl font-bold text-red-500 mb-4">
              🕐 Schedule
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-semibold">Pickup Time</label>
                <input
                  name="pickupTime"
                  type="time"
                  className="w-full px-4 py-2 rounded-xl border border-red-300 focus:ring-2 focus:ring-red-500 shadow-inner"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">
                  Delivery Time
                </label>
                <input
                  name="deliveryTime"
                  type="time"
                  className="w-full px-4 py-2 rounded-xl border border-red-300 focus:ring-2 focus:ring-red-500 shadow-inner"
                  required
                />
              </div>
            </div>
          </div>

          {/* Agreement */}
          <div className="mt-6">
            <label className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" required />
              <span className="text-sm text-gray-700">
                I agree that the above information is accurate and I accept the
                terms of the grooming service.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-10">
            <button
              type="submit"
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-12 py-4 rounded-xl text-lg shadow-lg transition-all duration-300"
            >
              🐾 Submit Appointment
            </button>
          </div>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8 text-center text-sm text-gray-500">
        “Over <strong>1,200 happy pets</strong> groomed with care. Your pet’s
        next spa day is just a click away!”
      </footer>
    </div>
  );
};

export default GroomingAppointment;
