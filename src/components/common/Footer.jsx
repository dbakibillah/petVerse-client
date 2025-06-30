import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaPaw,
    FaHeart,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <section className="relative bg-[#2c2c2c]">
            {/* Decorative top accent */}
            <div className="h-1.5 bg-gradient-to-r from-[#FF7518] via-[#ff8a3d] to-[#FF7518] w-full"></div>

            <footer className="py-16 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
                        {/* Brand section - Right */}
                        <div className="md:col-span-2 flex flex-col space-y-6 text-start">
                            <div className="flex items-center space-x-3">
                                <FaPaw className="text-3xl text-[#FF7518] animate-pulse" />
                                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF7518] to-[#ff9d5c]">
                                    Cuddle & Care Pets
                                </span>
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                                Your trusted partner in pet care. We provide
                                premium products, grooming services, and expert
                                advice for your beloved companions.
                            </p>
                            <div className="flex space-x-5 text-xl">
                                <a
                                    href="#"
                                    className="bg-gray-700 hover:bg-[#FF7518] text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                                >
                                    <FaFacebookF />
                                </a>
                                <a
                                    href="#"
                                    className="bg-gray-700 hover:bg-[#FF7518] text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                                >
                                    <FaInstagram />
                                </a>
                                <a
                                    href="#"
                                    className="bg-gray-700 hover:bg-[#FF7518] text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                                >
                                    <FaTwitter />
                                </a>
                            </div>
                            <div className="space-y-2">
                                <p className="text-gray-300 flex items-center">
                                    <span className="bg-[#FF7518] text-white p-1 rounded mr-3">
                                        📧
                                    </span>
                                    petversewebsite@gmail.com
                                </p>
                                <p className="text-gray-300 flex items-center">
                                    <span className="bg-[#FF7518] text-white p-1 rounded mr-3">
                                        📞
                                    </span>
                                    +99400256887
                                </p>
                            </div>
                        </div>
                        {/* Centered Image */}
                        <div className="md:col-span-1 flex justify-center">
                            <div className="relative group w-48 h-48">
                                <div className="absolute inset-0 bg-[#FF7518] rounded-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500"></div>
                                <div className="relative w-full h-full overflow-hidden rounded-lg border-4 border-white shadow-xl transform group-hover:-translate-y-2 transition-transform duration-500">
                                    <img
                                        src="https://i.ibb.co/wZqBJLn7/cute-puppy-playing-the-electric-guitar.jpg"
                                        alt="Happy Puppy"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-3 -right-3 bg-white text-[#FF7518] p-2 rounded-full shadow-lg">
                                    <FaPaw className="text-xl" />
                                </div>
                            </div>
                        </div>
                        {/* Company links - Left */}
                        <div className="flex flex-col space-y-6 text-start">
                            <h6 className="text-xl font-bold uppercase tracking-wider text-[#FF7518] border-b border-[#FF7518] pb-2 w-max">
                                Company
                            </h6>
                            <div className="flex flex-col space-y-4">
                                <Link
                                    to="/about"
                                    className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group"
                                >
                                    <span className="w-3 h-0.5 bg-[#FF7518] mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                                    About us
                                    <span className="ml-auto opacity-0 group-hover:opacity-100 text-[#FF7518]">
                                        →
                                    </span>
                                </Link>
                                <Link
                                    to="/contact"
                                    className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group"
                                >
                                    <span className="w-3 h-0.5 bg-[#FF7518] mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                                    Contact
                                    <span className="ml-auto opacity-0 group-hover:opacity-100 text-[#FF7518]">
                                        →
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* Legal links - Left */}
                        <div className="flex flex-col space-y-6 text-start">
                            <h6 className="text-xl font-bold uppercase tracking-wider text-[#FF7518] border-b border-[#FF7518] pb-2 w-max">
                                Legal
                            </h6>
                            <div className="flex flex-col space-y-4">
                                <a className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group">
                                    <span className="w-3 h-0.5 bg-[#FF7518] mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                                    Terms of use
                                    <span className="ml-auto opacity-0 group-hover:opacity-100 text-[#FF7518]">
                                        →
                                    </span>
                                </a>
                                <a className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group">
                                    <span className="w-3 h-0.5 bg-[#FF7518] mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                                    Privacy policy
                                    <span className="ml-auto opacity-0 group-hover:opacity-100 text-[#FF7518]">
                                        →
                                    </span>
                                </a>
                                <a className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group">
                                    <span className="w-3 h-0.5 bg-[#FF7518] mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                                    Cookie policy
                                    <span className="ml-auto opacity-0 group-hover:opacity-100 text-[#FF7518]">
                                        →
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Copyright section */}
                    <div className="border-t border-gray-700 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm text-start">
                            © {new Date().getFullYear()} Cuddle & Care Pets. All
                            rights reserved.
                        </p>
                        <p className="text-gray-400 text-sm mt-2 md:mt-0 flex items-center text-start">
                            Made with{" "}
                            <FaHeart className="mx-1.5 text-[#FF7518] animate-pulse" />{" "}
                            for furry friends
                        </p>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default Footer;
