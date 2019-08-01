import * as React from 'react';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import { EnheterState, hentEnheterForVeileder, velgEnhetForVeileder } from '../ducks/enheter';
import { hentVeiledereForEnhet, VeiledereState } from '../ducks/veiledere';
import { hentFeaturesFraUnleash } from '../ducks/features';
import { hentAktivEnhet } from '../components/enhet-context/context-api';
import { STATUS } from '../ducks/utils';
import { leggEnhetIUrl } from '../utils/url-utils';
import { settEnhetIDekorator } from '../eventhandtering';
import Innholdslaster from '../innholdslaster/innholdslaster';

interface DispatchProps {
    children: React.ReactNode;
    hentFeatures(): void;
    hentEnheter(): void;
    hentVeiledere(enhetId: string): void;
    velgEnhet(enhetId: string): void;
}

interface StateProps {
    enheter: EnheterState;
    veiledere: VeiledereState;
}

type InitialDataProviderProps = DispatchProps & StateProps;

class InitialDataProvider extends React.Component<InitialDataProviderProps, {}> {

    componentDidMount() {
        this.props.hentEnheter();
        this.props.hentFeatures();
    }

    componentDidUpdate() {
        const {enheter} = this.props;
        if (enheter.status === STATUS.OK && enheter.valgtEnhet.status !== STATUS.OK) {
            this.oppdaterDekoratorMedInitiellEnhet();
        }

    }

    finnInitiellEnhet() {
        const {enheter} = this.props;

        const enhetliste = enheter.data;
        const enhetFraUrl = parse(location.search).enhet;// eslint-disable-line no-undef
        const enhetIdListe = enhetliste.map((enhet) => (enhet.enhetId));

        if (enhetFraUrl !== '') {
            const nyEnhet = enhetIdListe.includes(enhetFraUrl) ? enhetFraUrl : enhetIdListe[0];
            return Promise.resolve(nyEnhet);
        }
        return hentAktivEnhet()
            .then((enhet) => {
                if (enhet == null || enhet === '') {
                    return Promise.resolve(enhetIdListe[0]);
                }
                return Promise.resolve(enhet);
            }).catch(() => Promise.resolve(enhetIdListe[0]));
    }

    oppdaterDekoratorMedInitiellEnhet() {
        const {velgEnhet, hentVeiledere} = this.props;
        this.finnInitiellEnhet().then((initiellEnhet) => {
            velgEnhet(initiellEnhet);
            leggEnhetIUrl(initiellEnhet);
            hentVeiledere(initiellEnhet);
            settEnhetIDekorator(initiellEnhet);
        });
    }

    render() {
        return (
            <Innholdslaster avhengigheter={[this.props.enheter, this.props.enheter.valgtEnhet, this.props.veiledere]}>
                {this.props.children}
            </Innholdslaster>
        );

    }

}

const mapStateToProps = (state) => ({
    enheter: state.enheter,
    veiledere: state.veiledere
});

const mapDispatchToProps = (dispatch) => ({
    hentFeatures: () => dispatch(hentFeaturesFraUnleash()),
    hentEnheter: () => dispatch(hentEnheterForVeileder()),
    hentVeiledere: (enhet) => dispatch(hentVeiledereForEnhet(enhet)),
    velgEnhet: (enhetid) => dispatch(velgEnhetForVeileder({enhetId: enhetid}))
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialDataProvider);
