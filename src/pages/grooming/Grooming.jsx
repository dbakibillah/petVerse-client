
import ChoiceGrooming from '../../components/grooming/ChoiceGrooming';
import MainBanner from '../../components/grooming/MainBanner';
import MoreAboutUs from '../../components/grooming/MoreAboutUs';
import SelectService from '../../components/grooming/SelectService';
import SpecialOffer from '../../components/grooming/SpecialOffer';

const Grooming = () => {
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
