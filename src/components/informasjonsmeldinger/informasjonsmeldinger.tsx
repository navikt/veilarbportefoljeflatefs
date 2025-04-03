import {Systemmeldinger} from './systemmeldinger';
import {SesjonStatusmelding} from './sesjon-statusmelding';
import './informasjonsmeldinger.css';

export const Informasjonsmeldinger = () => {
    return (
        <>
            <section className="informasjonsmeldinger informasjonsmeldinger--sticky">
                <SesjonStatusmelding />
            </section>
            <section className="informasjonsmeldinger">
                <Systemmeldinger />
            </section>
        </>
    );
};
