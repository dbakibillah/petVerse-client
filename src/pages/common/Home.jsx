import { Helmet } from "react-helmet";
import AboutUsSec from "../../components/home/AboutUsSec";

const Home = () => {
    return (
        <section>
            <Helmet title="Petverse | Home" />
            <AboutUsSec />
        </section>
    );
};

export default Home;
