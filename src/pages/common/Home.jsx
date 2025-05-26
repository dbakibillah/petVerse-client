import { Helmet } from "react-helmet";
import AboutUsSec from "../../components/home/AboutUsSec";

import OfferNav from "../../components/home/OfferNav";
import Newsletter from "../../components/home/Newsletter";

const Home = () => {
    return (
        <section className="">
            <Helmet title="Petverse | Home" />
            <OfferNav />
            <AboutUsSec />

            <Newsletter />
        </section>
    );
};

export default Home;
