import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Root = () => {
    return (
        <section className="bg-third dark:bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950">
            <Navbar />
            <Outlet />
            <Footer />
        </section>
    );
};

export default Root;
