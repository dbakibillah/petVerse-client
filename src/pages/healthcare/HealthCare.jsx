import { useEffect, useState } from "react";
import FirstBanner from "../../components/healthcare/FirstBanner";
import Sceondbanner from "../../components/healthcare/Sceondbanner";
import ThridBanner from "../../components/healthcare/ThridBanner";

const HealthCare = () => {
    // Scroll to top only on initial load
        const [hasInitialScroll, setHasInitialScroll] = useState(false);
        useEffect(() => {
            if (!hasInitialScroll) {
                window.scrollTo(0, 0);
                setHasInitialScroll(true);
            }
        }, [hasInitialScroll]);
    return (
        <section className="bg-gradient-to-br from-orange-100 via-white to-orange-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
            <FirstBanner />
            <Sceondbanner />
            <ThridBanner />
        </section>
    );
};

export default HealthCare;
