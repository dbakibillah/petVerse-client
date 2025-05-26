import { Helmet } from "react-helmet";
import AboutUsSec from "../../components/home/AboutUsSec";
import PetCareHub from "../../components/home/PetCareHub";

const Home = () => {
    return (
        <section>
            <Helmet title="Petverse | Home" />
            <AboutUsSec />
            <PetCareHub />
        </section>
    );
};

export default Home;
