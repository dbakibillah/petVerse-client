import { Helmet } from "react-helmet";
import AboutUsSec from "../../components/home/AboutUsSec";
import PetCareHub from "../../components/home/PetCareHub";
import OfferNav from "../../components/home/OfferNav";
import Newsletter from "../../components/home/Newsletter";
const Home = () => {
    return (
        <section className="">
            <Helmet title="Petverse | Home" />
            <OfferNav />
            <AboutUsSec />
            <PetCareHub />
            <Newsletter />
        </section>
    );
};

export default Home;
