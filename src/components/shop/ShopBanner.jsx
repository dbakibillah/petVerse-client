import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const ShopBanner = () => {
    useEffect(() => {
        AOS.init({
            duration: 1500,
        });
    }, []);

    const bannerImages = [
        {
            img: "https://i.ibb.co/ymd7f4dy/Dog-treats-packaging-Agu-Wu.jpg",
            label: "Pet Foods",
            path: "/products?category=Food",
        },
        {
            img: "https://i.ibb.co/kTw2XdY/Cat-Food.png",
            label: "Cat Foods",
            path: "/products?category=Food",
        },
        {
            img: "https://i.ibb.co/d0WgFQT7/Bird-Seeds.jpg",
            label: "Bird Seeds",
            path: "/products?category=Food",
        },
        {
            img: "https://i.ibb.co/7tcg3ygt/Pet-toys.jpg",
            label: "Pet Toys",
            path: "/products?category=Toys",
        },
        {
            img: "https://i.ibb.co/Dfswqb8G/Cat-grooming-needle-brush.jpg",
            label: "Grooming Kits",
            path: "/products?category=Grooming",
        },
    ];

    return (
        <section className="py-5 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
            {/* Left Main Banner */}
            <div
                className="flex-1 relative group rounded-xl overflow-hidden shadow-lg cursor-pointer"
                data-aos="fade-right"
                data-aos-once="false"
            >
                <Link to={bannerImages[0].path}>
                    <figure>
                        <img
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            src={bannerImages[0].img}
                            alt={bannerImages[0].label}
                        />
                    </figure>
                    <div className="absolute bottom-6 left-6 bg-white/70 dark:bg-black/60 px-4 py-3 rounded-xl shadow-lg transform transition-transform duration-500 group-hover:translate-x-5">
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
                            {bannerImages[0].label}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Tasty & nutritious meals for your canine.
                        </p>
                    </div>
                </Link>
            </div>

            {/* Right Small Banners */}
            <div
                className="flex-1 grid grid-cols-2 gap-2 md:gap-4"
                data-aos="fade-left"
                data-aos-once="false"
            >
                {bannerImages.slice(1).map((item, idx) => (
                    <div
                        key={idx}
                        className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition cursor-pointer"
                        data-aos="zoom-in"
                        data-aos-delay={idx * 150}
                        data-aos-once="false"
                    >
                        <Link to={item.path}>
                            <figure>
                                <img
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    src={item.img}
                                    alt={item.label}
                                />
                            </figure>
                            <figcaption className="absolute bottom-3 left-3 bg-white/80 dark:bg-black/60 px-3 py-1 rounded-lg shadow font-semibold text-gray-800 dark:text-gray-100 transform transition-transform duration-500 group-hover:translate-x-5">
                                {item.label}
                            </figcaption>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ShopBanner;
