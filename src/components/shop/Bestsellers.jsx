import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import ProductCard from "./ProductCard";

const Bestsellers = ({ products }) => {
    useEffect(() => {
        AOS.init({ duration: 1500 });
    }, []);

    const topSelling = [...products]
        .sort((a, b) => b.totalSold - a.totalSold)
        .slice(0, 10);

    return (
        <section className="py-10 my-5">
            <h2
                className="text-3xl md:text-4xl font-bold my-5 mt-10 text-center text-gray-800 dark:text-white"
                data-aos="fade-up"
                data-aos-once="false"
            >
                Top Selling Products
            </h2>

            <Swiper
                modules={[Navigation]}
                spaceBetween={10}
                navigation
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                }}
                className="px-2"
                data-aos="zoom-in"
                data-aos-delay={150}
                data-aos-once="false"
            >
                {topSelling.map((product, idx) => (
                    <SwiperSlide key={idx}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Bestsellers;
