import { FaFacebookF, FaInstagram, FaTwitter, FaPaw } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <section>
            <footer className="bg-[#FF7518] text-white py-12 px-6 lg:px-20 flex flex-col md:flex-row justify-around items-start space-y-8 md:space-y-0 rounded-t-[40px]">
                
                <div className="flex flex-col md:items-start">
                    <h6 className="text-2xl font-bold mb-4">Company</h6>
                    <Link to="/about" className="link link-hover text-lg mb-2">About us</Link>
                    <Link to="/contact" className="link link-hover text-lg mb-2">Contact</Link>
                </div>

                <div className="flex flex-col md:items-start">
                    <h6 className="text-2xl font-bold mb-4">Legal</h6>
                    <a className="link link-hover text-lg mb-2">Terms of use</a>
                    <a className="link link-hover text-lg mb-2">Privacy policy</a>
                    <a className="link link-hover text-lg mb-2">Cookie policy</a>
                </div>

                <div className="flex flex-col items-start space-y-2 max-w-xs">
                    <div className="flex items-center space-x-2 text-2xl font-bold mb-2">
                        <FaPaw className="text-yellow-300" />
                        <span>Cuddle & Care Pets</span>
                    </div>
                    <p className="text-base leading-relaxed">
                        Welcome to Cuddle & Care Pets! We provide quality pet products, grooming, and care advice for your furry friends.
                    </p>
                    <p className="text-base">📧 petversewebsite@gmail.com</p>
                    <p className="text-base">📞 +99400256887</p>
                    <div className="flex space-x-4 mt-2 text-2xl">
                        <a href="#" className="hover:text-yellow-300"><FaFacebookF /></a>
                        <a href="#" className="hover:text-yellow-300"><FaInstagram /></a>
                        <a href="#" className="hover:text-yellow-300"><FaTwitter /></a>
                    </div>
                </div>

                {/* Circular Image with White Background */}
                <div className="flex justify-center items-center">
                    <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-yellow-300 shadow-xl bg-white p-2">
                        <img
                            src="https://i.ibb.co/wZqBJLn7/cute-puppy-playing-the-electric-guitar.jpg"
                            alt="Cute Puppy Playing Guitar"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default Footer;
