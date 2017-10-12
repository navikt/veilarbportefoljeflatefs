import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { enhetShape, filtervalgShape, veilederShape } from './../proptype-shapes';
import MinoversiktBrukerPanel from './minoversikt-bruker-panel';
import { settBrukerSomMarkert, markerAlleBrukere } from '../ducks/portefolje';
import MinOversiktListehode from './minoversikt-listehode';
import CheckBox from '../components/tabell/checkbox';

function finnVeilederSistEndretAv(bruker, veiledere) {
    const veilederId = bruker.arbeidsliste.sistEndretAv.veilederId;
    const veileder = veiledere.find((x) => x.ident === veilederId);
    return veileder ? veileder.navn : (veilederId || '');
}

function MinoversiktTabell({
                               settMarkert, portefolje, settSorteringOgHentPortefolje,
                               filtervalg, sorteringsrekkefolge, valgtEnhet, veiledere, innloggetVeileder
                           }) {
    const { brukere } = portefolje.data;
    const { enhetId } = valgtEnhet.enhet;

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
                        <CheckBox bruker={bruker} settMarkert={settMarkert} />
                        <MinoversiktBrukerPanel
                            bruker={bruker}
                            arbeidslisteSistEndretAv={finnVeilederSistEndretAv(bruker, veiledere)}
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

MinoversiktTabell.propTypes = {
    portefolje: PT.shape({
        data: PT.shape({
            brukere: PT.arrayOf(PT.object).isRequired,
            antallTotalt: PT.number.isRequired,
            antallReturnert: PT.number.isRequired,
            fraIndex: PT.number.isRequired
        }).isRequired,
        sorteringsrekkefolge: PT.string.isRequired
    }).isRequired,
    valgtEnhet: enhetShape.isRequired,
    sorteringsrekkefolge: PT.string.isRequired,
    settMarkert: PT.func.isRequired,
    filtervalg: filtervalgShape.isRequired,
    settSorteringOgHentPortefolje: PT.func.isRequired,
    veiledere: PT.arrayOf(veilederShape).isRequired,
    innloggetVeileder: PT.string.isRequired
};


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
