
import { useEffect, useState } from 'react';
import ChoiceGrooming from '../../components/grooming/ChoiceGrooming';
import MainBanner from '../../components/grooming/MainBanner';
import MoreAboutUs from '../../components/grooming/MoreAboutUs';
import SelectService from '../../components/grooming/SelectService';
import SpecialOffer from '../../components/grooming/SpecialOffer';

const Grooming = () => {
    // Scroll to top only on initial load
        const [hasInitialScroll, setHasInitialScroll] = useState(false);
        useEffect(() => {
            if (!hasInitialScroll) {
                window.scrollTo(0, 0);
                setHasInitialScroll(true);
            }
        }, [hasInitialScroll]);
    return (
        <section>
            <MainBanner/>
            <ChoiceGrooming/>
            <SelectService/>
            <SpecialOffer/>
            <MoreAboutUs/>
       </section>
    );
};

export default Grooming;
