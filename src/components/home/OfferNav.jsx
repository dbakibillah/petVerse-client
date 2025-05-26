import Marquee from "react-fast-marquee";

const OfferNav = () => {
    return (
        <section className="bg-gradient-to-r from-secondary to-[#FF9570] py-2">
            <Marquee
                pauseOnHover={true}
                speed={40}
                gradient={false}
                className="overflow-hidden"
            >
                <div className="flex items-center space-x-16 px-4">
                    <h2 className="text-white whitespace-nowrap tracking-wide">
                        🎉 Let's celebrate the joy and companionship our cats
                        bring into our lives! 🐾
                    </h2>

                    {/* Adding some decorative elements */}
                    <span className="text-white text-lg">|</span>

                    <h2 className="text-white whitespace-nowrap tracking-wide">
                        🚀 Exclusive offers just for cat lovers! �
                    </h2>

                    <span className="text-white text-lg">|</span>

                    <h2 className="text-white whitespace-nowrap tracking-wide">
                        🏆 Premium cat products at unbeatable prices! 💖
                    </h2>
                </div>
            </Marquee>
        </section>
    );
};

export default OfferNav;
