import React, { Component, PropTypes as PT } from 'react';
import { injectIntl } from 'react-intl';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
// import Feilmelding from './../feilmelding/feilmelding'; Legg til feilmeldingskomponent
import Laster from './innholdslaster-laster';
import { STATUS } from './../ducks/utils';

const array = (value) => (Array.isArray(value) ? value : [value]);
const harStatus = (...status) => (element) => array(status).includes(element.status);
const noenHarFeil = (avhengigheter) => avhengigheter && avhengigheter.some(harStatus(STATUS.ERROR));
const alleLastet = (avhengigheter) => avhengigheter && avhengigheter.every(harStatus(STATUS.OK));
const alleLastetEllerReloading = (avhengigheter) => (
    avhengigheter && avhengigheter.every(harStatus(STATUS.OK, STATUS.RELOADING))
);
const medFeil = (avhengigheter) => avhengigheter.find(harStatus(STATUS.ERROR));
function getFeilmeldingForReducer(feilendeReducer, intl) {
    const status = feilendeReducer.data.response.status;
    if (status >= 500) {
        return intl.messages['innholdslaster.system.nede'];
    } else if (status === 403) {
        return intl.messages['innholdslaster.ikke.tilgang'];
    }
    return null;
}

function getFeilmeldingFraKey(feilmeldingKey, intl) {
    return (feilmeldingKey && intl.messages[feilmeldingKey]);
}

class Innholdslaster extends Component {
    constructor(props) {
        super(props);

        this.state = { timeout: false };
        this.timer = undefined;

        this.renderChildren = this.renderChildren.bind(this);
        this.setTimer = this.setTimer.bind(this);
        this.clearTimer = this.clearTimer.bind(this);
    }

    setTimer() {
        if (!this.timer) {
            this.timer = setTimeout(() => {
                this.setState({ timeout: true });
            }, 200);
        }
    }

    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined;

            // Deferred, slik at setState ikke er en del av render
            setTimeout(() => this.setState({ timeout: false }), 0);
        }
    }

    renderChildren() {
        const { avhengigheter, className, children } = this.props;

        if (typeof children === 'function') {
            return <section className={className}>{children(avhengigheter)}</section>;
        }
        return <section className={className}>{children}</section>;
    }

    render() {
        const { avhengigheter, className, feilmeldingKey, intl, storrelse } = this.props;
        if (alleLastet(avhengigheter)) {
            this.clearTimer();
            return this.renderChildren();
        } else if (!this.state.timeout && alleLastetEllerReloading(avhengigheter)) {
            this.setTimer();
            return this.renderChildren();
        }

        if (noenHarFeil(avhengigheter)) {
            this.clearTimer();
            const feilendeReducer = medFeil(avhengigheter);
            console.log(feilendeReducer); // eslint-disable-line no-console

            const feilmelding = getFeilmeldingFraKey(feilmeldingKey, intl) ||
                getFeilmeldingForReducer(feilendeReducer, intl) ||
                ('Det skjedde en feil ved innlastningen av data');

            return (
                <AlertStripeAdvarsel className={className}>
                    <p>{feilmelding}</p>
                </AlertStripeAdvarsel>
            );
        }

        return <Laster className={className} storrelse={storrelse} />;
    }
}

Innholdslaster.propTypes = {
    storrelse: PT.oneOf(['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']),
    avhengigheter: PT.arrayOf(PT.object).isRequired,
    className: PT.string,
    children: PT.oneOfType([PT.node, PT.func]).isRequired,
    intl: PT.object.isRequired,
    feilmeldingKey: PT.string
};

Innholdslaster.defaultProps = {
    storrelse: 'xxl',
    className: undefined,
    feilmeldingKey: undefined
};

export default injectIntl(Innholdslaster);
