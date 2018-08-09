import * as React from 'react';
import { connect } from 'react-redux';
import EnhetBrukerpanel from './enhet-brukerpanel';
import { settBrukerSomMarkert } from '../ducks/portefolje';
import EnhetListehode from './enhet-listehode';
import { FiltervalgModell, Sorteringsrekkefolge, ValgtEnhetModell, VeilederModell } from '../model-interfaces';
import { Kolonne, ListevisningType } from '../ducks/ui/listevisning';
import { selectValgteAlternativer } from '../ducks/ui/listevisning-selectors';
import { getFraBrukerFraUrl } from '../utils/url-utils';
import { sjekkFeature } from '../ducks/features';
import { TRENGER_VURDERING_FEATURE } from '../konstanter';

interface EnhetTabellProps {
    portefolje: any;
    valgtEnhet: ValgtEnhetModell;
    sorteringsrekkefolge: Sorteringsrekkefolge;
    settMarkert: (bruker: string, markert: boolean) => any;
    filtervalg: FiltervalgModell;
    settSorteringOgHentPortefolje: (sortering: string) => void;
    veiledere: VeilederModell;
    valgteKolonner: Kolonne[];
    erVurderingFeaturePa: boolean;
}

const finnBrukersVeileder = (veiledere, bruker) => (veiledere.find((veileder) => veileder.ident === bruker.veilederId));

class EnhetTabell extends React.Component<EnhetTabellProps, {}> {
    private forrigeBruker?: string;

    componentWillMount() {
        this.forrigeBruker = getFraBrukerFraUrl();
    }

    render() {
        const {
            settMarkert, portefolje, settSorteringOgHentPortefolje,
            filtervalg, sorteringsrekkefolge, valgtEnhet, veiledere, valgteKolonner
        } = this.props;
        const {brukere} = portefolje.data;
        const {enhetId} = valgtEnhet.enhet!;
        const forrigeBruker = this.forrigeBruker;

        this.forrigeBruker = undefined;

        return (

            <div className="brukerliste typo-undertekst">
                <EnhetListehode
                    sorteringsrekkefolge={sorteringsrekkefolge}
                    sorteringOnClick={settSorteringOgHentPortefolje}
                    filtervalg={filtervalg}
                    sorteringsfelt={portefolje.sorteringsfelt}
                    valgteKolonner={valgteKolonner}
                />
                <ul className="brukerliste">
                    {brukere.map((bruker) =>
                        <EnhetBrukerpanel
                            key={bruker.fnr || bruker.guid}
                            bruker={bruker}
                            enhetId={enhetId}
                            settMarkert={settMarkert}
                            varForrigeBruker={forrigeBruker === bruker.fnr}
                            filtervalg={filtervalg}
                            valgteKolonner={valgteKolonner}
                            brukersVeileder={finnBrukersVeileder(veiledere, bruker)}
                            erVurderingFeaturePa={this.props.erVurderingFeaturePa}
                        />
                    )}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    portefolje: state.portefolje,
    valgtEnhet: state.enheter.valgtEnhet,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    filtervalg: state.filtrering,
    valgteKolonner: selectValgteAlternativer(state, ListevisningType.enhetensOversikt),
    erVurderingFeaturePa: sjekkFeature(state, TRENGER_VURDERING_FEATURE)
});

const mapDispatchToProps = (dispatch) => ({
    settMarkert: (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert))
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetTabell);
