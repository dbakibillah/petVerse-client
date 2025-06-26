import React from 'react';
import { FaPaw, FaEnvelope, FaCode } from 'react-icons/fa';

const developers = [
  {
    name: 'Asif Ahmed',
    email: 'asifahmed.dev@gmail.com',
    role: 'Frontend Developer | MERN Stack Enthusiast',
    img: 'https://i.ibb.co/Lhp7F34W/tushar.jpg',
  },
  {
    name: 'Baki Billah',
    email: 'bakibillah.dev@gmail.com',
    role: 'Senior Developer | Full Stack Specialist',
    img: 'https://i.ibb.co/dwxbd3wn/baki.jpg',
  },
  {
    name: 'Muhaiminul Shafin',
    email: 'muhaiminul.shafin@gmail.com',
    role: 'Junior Developer | React & Node.js',
    img: 'https://i.ibb.co/ZpNv2cRm/shafin.jpg',
  },
  {
    name: 'Rahatul Islam',
    email: 'rahatul.islam@gmail.com',
    role: 'Junior Developer | Backend Specialist',
    img: 'https://i.ibb.co/FbyvCstV/rahat.jpg',
  },
];

const AboutUs = () => {
  return (
    <div className="bg-orange-50 min-h-screen py-16 px-6 md:px-20 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <FaPaw className="text-orange-500 text-5xl mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-orange-600">About Us</h1>
        </div>

        <p className="text-lg mb-4 text-center">
          Welcome to <span className="font-bold text-orange-500">PetVerse</span> — your all-in-one digital destination for pet care, adoption, and connection.
        </p>

        <p className="text-base mb-6 leading-relaxed text-justify">
          At PetVerse, we believe every pet deserves a loving home, personalized care, and a vibrant community. Built by pet lovers, for pet lovers, our platform offers a full spectrum of services designed to make pet parenting more fulfilling, informed, and accessible.
        </p>

        <h2 className="text-2xl font-semibold text-orange-500 mt-10 mb-3 flex items-center gap-2">
          <FaPaw /> Our Services
        </h2>
        <ul className="list-disc list-inside mb-6 text-base leading-relaxed">
          <li>Hassle-free pet adoption platform</li>
          <li>Grooming appointments & pet spa bookings</li>
          <li>Wide range of accessories, food, and health products</li>
          <li>Pet walking, boarding, and photography services</li>
          <li>Pet community forum and regular newsletters</li>
        </ul>

        <h2 className="text-2xl font-semibold text-orange-500 mb-3 flex items-center gap-2">
          <FaPaw /> Why PetVerse?
        </h2>
        <p className="text-base leading-relaxed mb-10 text-justify">
          Whether you're looking to adopt a furry friend or pamper your pet, PetVerse connects you with trusted services all in one place. Our user-friendly platform is built with modern tools and backed by passionate developers who care deeply about animals and their well-being.
        </p>

        <div className="text-center text-orange-700 text-lg font-medium mb-12">
          PetVerse is more than a platform — it's a growing universe of love, care, and community for pets and their people. 🐾
        </div>

        {/* Developer Section */}
        <div className="border-t border-orange-200 pt-10">
          <h3 className="text-xl font-bold text-orange-600 text-center mb-8 flex items-center justify-center gap-2">
            <FaCode /> Developer Info
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {developers.map((dev, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-4 text-center">
                <img
                  src={dev.img}
                  alt={dev.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-orange-300 mb-3"
                />
                <p className="font-semibold text-base text-gray-800">{dev.name}</p>
                <p className="text-sm text-gray-600 mb-1">{dev.role}</p>
                <p className="text-sm text-gray-600">
                  <FaEnvelope className="inline mr-1 text-orange-500" />
                  <a href={`mailto:${dev.email}`} className="hover:underline text-orange-500">
                    {dev.email}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
