import React, { PropTypes as PT } from 'react';
import { injectIntl } from 'react-intl';
// import Feilmelding from './../feilmelding/feilmelding'; Legg til feilmeldingskomponent
import Laster from './innholdslaster-laster';
import { STATUS } from './../ducks/utils';

const array = (value) => (Array.isArray(value) ? value : [value]);
const harStatus = (...status) => (element) => array(status).includes(element.status);
const noenHarFeil = (avhengigheter) => avhengigheter && avhengigheter.some(harStatus(STATUS.ERROR));
const alleLastet = (avhengigheter) => avhengigheter && avhengigheter.every(harStatus(STATUS.OK, STATUS.RELOADING));
const medFeil = (avhengigheter) => avhengigheter.find(harStatus(STATUS.ERROR));

const Innholdslaster = ({ avhengigheter, className, feilmeldingKey, intl, children }) => {
    if (alleLastet(avhengigheter)) {
        if (typeof children === 'function') {
            return <section className={className}>{children(avhengigheter)}</section>;
        }
        return <section className={className}>{children}</section>;
    }

    if (noenHarFeil(avhengigheter)) {
        const feilendeReducer = medFeil(avhengigheter);
        console.log(feilendeReducer); // eslint-disable-line no-console

        const feilmelding = (feilmeldingKey && intl.messages[feilmeldingKey]) || (
            'Det skjedde en feil ved innlastningen av data'
            );

        return (
            <div className={className}>
                <p>{feilmelding}</p>
            </div>
        );
    }
    return <Laster className={className} />;
};

Innholdslaster.propTypes = {
    avhengigheter: PT.arrayOf(PT.object),
    className: PT.string,
    children: PT.oneOfType([PT.node, PT.func]).isRequired,
    intl: PT.object.isRequired,
    feilmeldingKey: PT.string
};

export default injectIntl(Innholdslaster);
