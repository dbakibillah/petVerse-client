import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Root = () => {
    return (
        <section className="bg-gradient-to-br from-orange-100 via-white to-orange-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
            <Navbar />
            <Outlet />
            <Footer />
        </section>
    );
};

export default Root;
