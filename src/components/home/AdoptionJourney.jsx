const AdoptionJourney = () => {
  return (
    <section className="container mx-auto px-4 lg:px-24 py-12 lg:py-24 flex flex-col lg:flex-row items-center gap-10">
      <div class="flex ">
        <div class="w-1/2 p-5 m-6">
          <img
            class="w-full h-full"
            src="https://i.ibb.co/8nWp2hBS/banner3.png"
          />
        </div>
        <div class="w-1/2">
          <div class=" text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white leading-tight text-center mt-5 mb-5">
            <h1>Start your Adoption Journey</h1>
          </div>
          <div class="flex ">
            <div class="w-9 h-9 bg-purple-300 rounded-full mt-5 mx-1"></div>
            <div class="mx-3 mb-2">
              <h2 class="text-lg font-medium text-gray-900 dark:text-gray-300 mx-3">
                Search your perfect match
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-1">
                Browse adoption pets in shelter and rescue near you and find the
                perfect match for your family
              </p>
            </div>
          </div>
          <div class="flex ">
            <div class="w-9 h-9 bg-purple-300 rounded-full mt-5 mx-1"></div>
            <div class="mb-2 mx-3 gap-1">
              <h2 class="text-lg font-medium text-gray-900 dark:text-gray-300 mx-3">
                Connect with a shelter
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
                Browse adoption pets in shelter and rescue near you and find the
                perfect match for your family
              </p>
            </div>
          </div>
          <div class="flex">
            <div class="w-9 h-9 bg-purple-300 rounded-full mt-5 mx-1"></div>
            <div class="mb-2 mx-3">
              <h2 class="text-lg font-medium text-gray-900 dark:text-gray-300 mx-3">
                Prepare for a Adoption
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
                Browse adoption pets in shelter and rescue near you and find the
                perfect match for your family
              </p>
            </div>
          </div>
          <div class="mx-4 my-4">
          <button class="px-7 py-4 bg-red-500 text-white font-semibold rounded-2xl shadow-md hover:bg-orange-300 transition duration-300">
            Search Adoption Post
          </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdoptionJourney;
