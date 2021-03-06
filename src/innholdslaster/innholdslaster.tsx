import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import Laster from './innholdslaster-laster';
import {STATUS} from '../ducks/utils';
import {useState} from 'react';
import getFeilmeldingForReducer from './get-feilmelding-for-reducer';

interface InnholdslasterProps {
    className?: string;
    avhengigheter: any;
    children: React.ReactNode;
}

function Innholdslaster(props: InnholdslasterProps) {
    const array = value => (Array.isArray(value) ? value : [value]);
    const harStatus = (...status) => element => array(status).includes(element.status);
    const noenHarFeil = avhengigheter => avhengigheter && avhengigheter.some(harStatus(STATUS.ERROR));
    const alleLastet = avhengigheter => avhengigheter && avhengigheter.every(harStatus(STATUS.OK));

    const alleLastetEllerReloading = avhengigheter =>
        avhengigheter && avhengigheter.every(harStatus(STATUS.OK, STATUS.RELOADING));
    const medFeil = avhengigheter => avhengigheter.find(harStatus(STATUS.ERROR));
    const [timeout, setLocalTimeout] = useState(false);
    let timer;

    const setTimer = () => {
        if (!timer) {
            timer = window.setTimeout(() => {
                setLocalTimeout(false);
            }, 200);
        }
    };

    const clearTimer = () => {
        if (timer) {
            clearTimeout(timer);
            timer = undefined;
            setTimeout(() => setLocalTimeout(false), 0);
        }
    };

    const renderChildren = () => {
        if (typeof props.children === 'function') {
            return <>{props.children(props.avhengigheter)}</>;
        }
        return <>{props.children}</>;
    };

    if (alleLastet(props.avhengigheter)) {
        clearTimer();
        return renderChildren();
    } else if (!timeout && alleLastetEllerReloading(props.avhengigheter)) {
        setTimer();
        return renderChildren();
    }

    if (noenHarFeil(props.avhengigheter)) {
        clearTimer();
        const feilendeReducer = medFeil(props.avhengigheter);

        const feilmelding =
            getFeilmeldingForReducer(feilendeReducer) || 'Det skjedde en feil ved innlastningen av data';

        return (
            <AlertStripe type="feil" className={props.className}>
                <p>{feilmelding}</p>
            </AlertStripe>
        );
    }

    return <Laster />;
}

export default Innholdslaster;
