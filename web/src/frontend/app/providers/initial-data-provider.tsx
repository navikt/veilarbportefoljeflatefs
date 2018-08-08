import * as React from 'react';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import { EnheterState, hentEnheterForVeileder, velgEnhetForVeileder } from '../ducks/enheter';
import { hentVeiledereForEnhet } from '../ducks/veiledere';
import { hentLedetekster } from '../ducks/ledetekster';
import { hentFeatureFraUnleash } from '../ducks/features';
import { hentAktivEnhet } from '../components/enhet-context/context-api';
import { STATUS } from '../ducks/utils';
import { leggEnhetIUrl } from '../utils/url-utils';
import { settEnhetIDekorator } from '../eventhandtering';
import { enhetShape, valgtEnhetShape } from '../proptype-shapes';
import Application from './../application';
import { TRENGER_VURDERING_FEATURE } from '../konstanter';

interface DispatchProps {
    hentFeature(feature: string): void;
    hentTekster(): void;
    hentEnheter(): void;
    hentVeiledere(enhetId: string): void;
    velgEnhet(enhetId: string): void;
}

interface StateProps {
    enheter: EnheterState;
}

type InitialDataProviderProps = DispatchProps & StateProps;

class InitialDataProvider extends React.Component<InitialDataProviderProps, {}> {
    componentDidMount() {
        this.props.hentTekster();
        this.props.hentEnheter();
        this.props.hentFeature(TRENGER_VURDERING_FEATURE);
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
        const {...props} = this.props;

        return <div>
                <Application {...props}/>
            </div>;
    }

}

const mapStateToProps = (state) => ({
    ledetekster: state.ledetekster,
    enheter: state.enheter,
    veiledere: state.veiledere
});

const mapDispatchToProps = (dispatch) => ({
    hentFeature: (feature: string) => dispatch(hentFeatureFraUnleash(feature)),
    hentTekster: () => dispatch(hentLedetekster()),
    hentEnheter: () => dispatch(hentEnheterForVeileder()),
    hentVeiledere: (enhet) => dispatch(hentVeiledereForEnhet(enhet)),
    velgEnhet: (enhetid) => dispatch(velgEnhetForVeileder({enhetId: enhetid}))
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialDataProvider);
