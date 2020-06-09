import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import Laster from './innholdslaster-laster';
import { STATUS } from '../ducks/utils';

const array = (value) => (Array.isArray(value) ? value : [value]);
const harStatus = (...status) => (element) => array(status).includes(element.status);

const noenHarFeil = (avhengigheter) => avhengigheter && avhengigheter.some(harStatus(STATUS.ERROR));

const alleLastet = (avhengigheter) => avhengigheter && avhengigheter.every(harStatus(STATUS.OK));

const alleLastetEllerReloading = (avhengigheter) => (
    avhengigheter && avhengigheter.every(harStatus(STATUS.OK, STATUS.RELOADING))
);
const medFeil = (avhengigheter) => avhengigheter.find(harStatus(STATUS.ERROR));

function getFeilmeldingForReducer(feilendeReducer) {
    const status = feilendeReducer.data.response.status;
    if (status >= 500) {
        return 'Vi har dessverre tekniske problemer. Vi jobber med å løse disse.';
    } else if (status === 403) {
        return 'Beklager, du har ikke tilgang.';
    }
    return null;
}

interface InnholdslasterProps {
    className?: string;
    avhengigheter: any;
}

interface InnholdslasterState {
    timeout: boolean;
}

class Innholdslaster extends React.Component<InnholdslasterProps, InnholdslasterState> {
    private timer: number | undefined;

    constructor(props) {
        super(props);

        this.state = {timeout: false};
        this.timer = undefined;

        this.renderChildren = this.renderChildren.bind(this);
        this.setTimer = this.setTimer.bind(this);
        this.clearTimer = this.clearTimer.bind(this);
    }

    setTimer() {
        if (!this.timer) {
            this.timer = window.setTimeout(() => {
                this.setState({timeout: true});
            }, 200);
        }
    }

    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined;

            // Deferred, slik at setState ikke er en del av render
            setTimeout(() => this.setState({timeout: false}), 0);
        }
    }

    renderChildren() {
        const {avhengigheter, children} = this.props;
        if (typeof children === 'function') {
            return <>{children(avhengigheter)}</>;
        }
        return <>{children}</>;
    }

    render() {
        const {avhengigheter, className} = this.props;
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

            const feilmelding = getFeilmeldingForReducer(feilendeReducer) ||
                ('Det skjedde en feil ved innlastningen av data');

            return (
                <AlertStripe type="advarsel" className={className}>
                    <p>{feilmelding}</p>
                </AlertStripe>
            );
        }

        return <Laster/>;
    }
}

export default Innholdslaster;
