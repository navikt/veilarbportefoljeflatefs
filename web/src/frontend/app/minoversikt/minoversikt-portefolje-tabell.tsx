import * as React from 'react';
import { connect } from 'react-redux';
import { enhetShape, filtervalgShape, veilederShape } from './../proptype-shapes';
import MinoversiktBrukerPanel from './minoversikt-bruker-panel';
import { settBrukerSomMarkert, markerAlleBrukere } from '../ducks/portefolje';
import MinOversiktListehode from './minoversikt-listehode';
import CheckBox from '../components/tabell/checkbox';
import {
    BrukerModell, FiltervalgModell, Sorteringsfelt, Sorteringsrekkefolge, ValgtEnhetModell, VeilederModell
} from '../model-interfaces';

interface MinOversiktTabellProps {
    portefolje: {
        data: {
            brukere: BrukerModell[];
            antallTotalt: number;
            antallReturnert: number;
            fraIndex: number;
        };
        sorteringsfelt: Sorteringsfelt;
    };
        valgtEnhet: ValgtEnhetModell;
        sorteringsrekkefolge: Sorteringsrekkefolge;
        settMarkert: () => void;
        filtervalg: FiltervalgModell;
        settSorteringOgHentPortefolje: (sortering: string) => void;
        veiledere: VeilederModell[];
        innloggetVeileder: string;
}

function MinoversiktTabell({
                               settMarkert, portefolje, settSorteringOgHentPortefolje,
                               filtervalg, sorteringsrekkefolge, valgtEnhet, innloggetVeileder
                           }: MinOversiktTabellProps) {
    const brukere = portefolje.data.brukere;
    const {enhetId} = valgtEnhet.enhet!;

    return (
        <div className="minoversikt-liste__wrapper typo-undertekst">
            <MinOversiktListehode
                sorteringsrekkefolge={sorteringsrekkefolge}
                sorteringOnClick={settSorteringOgHentPortefolje}
                filtervalg={filtervalg}
                sorteringsfelt={portefolje.sorteringsfelt}
                brukere={brukere}
            />
            <ul className="minoversikt-brukere-liste">
                {brukere.map((bruker) =>
                    <li key={bruker.fnr} className="minoversikt-brukere-panel">
                        <CheckBox className="minoversikt__checkbox" bruker={bruker} settMarkert={settMarkert} />
                        <MinoversiktBrukerPanel
                            bruker={bruker}
                            enhetId={enhetId}
                            settMarkert={settMarkert}
                            filtervalg={filtervalg}
                            innloggetVeileder={innloggetVeileder}
                        />
                    </li>)}
            </ul>
        </div>
    );
}

const mapStateToProps = (state) => ({
    portefolje: state.portefolje,
    veiledere: state.veiledere.data.veilederListe,
    valgtEnhet: state.enheter.valgtEnhet,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    filtervalg: state.filtreringMinoversikt
});

const mapDispatchToProps = (dispatch) => ({
    settMarkert: (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert)),
    settSomMarkertAlle: (markert) => dispatch(markerAlleBrukere(markert))
});

export default connect(mapStateToProps, mapDispatchToProps)(MinoversiktTabell);
