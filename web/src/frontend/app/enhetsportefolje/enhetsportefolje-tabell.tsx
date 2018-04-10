import * as React from 'react';
import { connect } from 'react-redux';
import { enhetShape, filtervalgShape, veilederShape } from './../proptype-shapes';
import EnhetBrukerpanel from './enhet-brukerpanel';
import { settBrukerSomMarkert } from '../ducks/portefolje';
import EnhetListehode from './enhet-listehode';
import {
    FiltervalgModell, Sorteringsrekkefolge, ValgtEnhetModell,
    VeilederModell
} from '../model-interfaces';
import { Kolonne, ListevisningType } from '../ducks/ui/listevisning';
import { selectValgteAlternativer } from '../ducks/ui/listevisning-selectors';
import { fjernFraBrukerFraUrl, getFrabrukerFraurl } from '../utils/url-utils';

interface EnhetTabellProps {
    portefolje: any;
    valgtEnhet: ValgtEnhetModell;
    sorteringsrekkefolge: Sorteringsrekkefolge;
    settMarkert: (bruker: string, markert: boolean) => any;
    filtervalg: FiltervalgModell;
    settSorteringOgHentPortefolje: (sortering: string) => void;
    veiledere: VeilederModell;
    valgteKolonner: Kolonne[];
}

const finnBrukersVeileder = (veiledere, bruker) => (veiledere.find((veileder) => veileder.ident === bruker.veilederId));

function EnhetTabell({
                         settMarkert, portefolje, settSorteringOgHentPortefolje,
                         filtervalg, sorteringsrekkefolge, valgtEnhet, veiledere, valgteKolonner
                     }: EnhetTabellProps) {
    const {brukere} = portefolje.data;
    const {enhetId} = valgtEnhet.enhet!;

    const forgjeBruker = getFrabrukerFraurl();
    fjernFraBrukerFraUrl();

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
                            key={bruker.fnr}
                            bruker={bruker}
                            enhetId={enhetId}
                            settMarkert={settMarkert}
                            varForjeBruker={forgjeBruker === bruker.fnr}
                            filtervalg={filtervalg}
                            valgteKolonner={valgteKolonner}
                            brukersVeileder={finnBrukersVeileder(veiledere, bruker)}
                        />
                )}
            </ul>
        </div>
    );
}

const mapStateToProps = (state) => ({
    portefolje: state.portefolje,
    valgtEnhet: state.enheter.valgtEnhet,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    filtervalg: state.filtrering,
    valgteKolonner: selectValgteAlternativer(state, ListevisningType.enhetensOversikt)
});

const mapDispatchToProps = (dispatch) => ({
    settMarkert: (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert))
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetTabell);
