const FirstBanner = () => {
    return (
        <section class="bg-yellow-50 font-sans">
            <div class="flex flex-col md:flex-row items-center justify-between px-8 py-12 max-w-7xl mx-auto">
                <div class="md:w-1/2 space-y-6">
                    <h1 class="text-4xl md:text-5xl font-bold text-gray-800">
                        Your Pet’s Health, <br />
                        Our Priority
                    </h1>
                    <p class="text-gray-600 max-w-md">
                        Access expert veterinary care, treatment, and wellness
                        services all in one platform. From routine checkups to
                        emergency support, we’ve got your pet covered.
                    </p>
                    <a
                        href="#"
                        class="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-md transition"
                    >
                        Book Now
                    </a>

                    <div class="space-y-3 mt-4">
                        <div class="flex items-center text-gray-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 text-orange-500 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            Full Body Check With Cancer
                        </div>
                        <div class="flex items-center text-gray-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 text-orange-500 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            Free Home Sample Pickup
                        </div>
                    </div>
                </div>

                <div class="md:w-1/2 mt-10 md:mt-0 relative">
                    <img
                        src="https://i.ibb.co/DfBwPxnB/dog000-1.png"
                        alt="dog"
                        class="w-full max-w-sm mx-auto"
                    />

                    <div class="absolute top-4 left-4 bg-white px-3 py-1 rounded-lg shadow-md text-center text-sm">
                        <p class="text-blue-600 font-semibold">25K+</p>
                        <p class="text-gray-600">Online Classes</p>
                    </div>

                    <div class="absolute top-20 right-0 bg-white px-3 py-1 rounded-lg shadow-md text-center text-sm">
                        <p class="text-blue-600 font-semibold">15K+</p>
                        <p class="text-gray-600">Online Services</p>
                    </div>

                    <div class="absolute bottom-4 left-10 bg-white px-3 py-1 rounded-lg shadow-md text-center text-sm">
                        <p class="text-blue-600 font-semibold">15K+</p>
                        <p class="text-gray-600">
                            Internation Project Completed
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FirstBanner;
