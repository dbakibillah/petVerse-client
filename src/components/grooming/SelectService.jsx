

const SelectService = () => {
    return (
        <section>

        <div class=" bg-yellow-50 font-sans py-12">
            
<div class=" max-w-5xl mx-auto px-4">
        
        <div class="text-center mb-12">
          <h1 class="text-3xl md:text-4xl font-bold underline decoration-black">
            Quick and Easy Booking in 3 Simple Steps!
          </h1>
        </div>

        
        <div class="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-4">
         
          <div class="flex flex-col items-center text-center w-full md:w-1/3">
            <img
              src="https://i.ibb.co/r2srT8rH/Select-Service.png"
              alt="Select-service"
              class="w-24 h-24 mb-4"
            />
            <h2 class="text-xl font-semibold mb-1">Select Service</h2>
            <p class="text-gray-600 text-sm">select your need service<br />which you needed</p>
          </div>

          
          <div class="w-full md:w-1/3 flex justify-center">
            <img
              src="https://i.ibb.co/HfzdXSq6/arrow.png"
              alt="arrow"
              class="w-35 h-auto"
            />
          </div>

          
          <div class="flex flex-col items-center text-center w-full md:w-1/3">
            <img
              src="https://i.ibb.co/Myw7sBQW/date-booked.png"
              alt="date-booked"
              class="w-24 h-24 mb-4"
            />
            <h2 class="text-xl font-semibold mb-1">Book Your Day</h2>
            <p class="text-gray-600 text-sm">Book your free day for taking<br />our services</p>
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

export default SelectService;