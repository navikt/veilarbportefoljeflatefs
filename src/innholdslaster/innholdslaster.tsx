import {ReactNode, useState} from 'react';
import {Alert, BodyShort, Loader} from '@navikt/ds-react';
import {STATUS} from '../ducks/utils';
import {getFeilmeldingForReducer} from './get-feilmelding-for-reducer';
import {loggVisningAvAlert} from '../amplitude/logg-visning-av-alert';

interface InnholdslasterProps {
    avhengigheter: any;
    className?: string;
    children: ReactNode;
}

export function Innholdslaster({avhengigheter, className, children}: InnholdslasterProps) {
    const array = value => (Array.isArray(value) ? value : [value]);
    const harStatus =
        (...status) =>
        element =>
            array(status).includes(element.status);
    const noenHarFeil = avhengigheter => avhengigheter?.some(harStatus(STATUS.ERROR));
    const alleLastet = avhengigheter => avhengigheter?.every(harStatus(STATUS.OK));

    const alleLastetEllerReloading = avhengigheter => avhengigheter?.every(harStatus(STATUS.OK, STATUS.RELOADING));
    const medFeil = avhengigheter => avhengigheter.find(harStatus(STATUS.ERROR));
    const [localTimeout, setLocalTimeout] = useState(false);
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
        if (typeof children === 'function') {
            return <>{children(avhengigheter)}</>;
        }
        return <>{children}</>;
    };

    if (alleLastet(avhengigheter)) {
        clearTimer();
        return renderChildren();
    } else if (!localTimeout && alleLastetEllerReloading(avhengigheter)) {
        setTimer();
        return renderChildren();
    }

    if (noenHarFeil(avhengigheter)) {
        clearTimer();
        const feilendeReducer = medFeil(avhengigheter);

        const feilmelding =
            getFeilmeldingForReducer(feilendeReducer) ?? 'Det skjedde en feil ved innlastningen av data';

        loggVisningAvAlert({variant: 'error', tekst: feilmelding});

        return (
            <Alert variant="error" className={className} size="small">
                <BodyShort size="small">{feilmelding}</BodyShort>
            </Alert>
        );
    }

    return <Loader size="2xlarge" />;
}
