import { Helmet } from "react-helmet";
import AboutUsSec from "../../components/home/AboutUsSec";
import PetCareHub from "../../components/home/PetCareHub";
import OfferNav from "../../components/home/OfferNav";
import Newsletter from "../../components/home/Newsletter";
import AdoptionJourney from "../../components/home/AdoptionJourney";
import Banner from "../../components/home/Banner";
import { useEffect, useState } from "react";
const Home = () => {
    // Scroll to top only on initial load
    const [hasInitialScroll, setHasInitialScroll] = useState(false);
    useEffect(() => {
        if (!hasInitialScroll) {
            window.scrollTo(0, 0);
            setHasInitialScroll(true);
        }
    }, [hasInitialScroll]);
    return (
        <section className="">
            <Helmet title="Petverse | Home" />
            <OfferNav />
            <Banner />
            <AboutUsSec />
            <PetCareHub />
            <AdoptionJourney />
            <Newsletter />
        </section>
    );
};

export default Home;
