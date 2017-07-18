import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { enhetShape, filtervalgShape } from './../proptype-shapes';
import BrukerPanel from './bruker-panel';
import { settBrukerSomMarkert, markerAlleBrukere } from '../ducks/portefolje';
import MinOversiktListehode from './minoversikt-listehode';


function MinoversiktTabell({
                               settMarkert, portefolje, settSorteringOgHentPortefolje,
                               filtervalg, sorteringsrekkefolge, valgtEnhet
                           }) {
    const { brukere } = portefolje.data;
    const { enhetId } = valgtEnhet.enhet;
    return (
        <div className="minoversikt-liste__wrapper">
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
                        <BrukerPanel
                            bruker={bruker}
                            enhetId={enhetId}
                            settMarkert={settMarkert}
                            filtervalg={filtervalg}
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
    settSorteringOgHentPortefolje: PT.func.isRequired
};


const mapStateToProps = (state) => ({
    portefolje: state.portefolje,
    valgtEnhet: state.enheter.valgtEnhet,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    filtervalg: state.filtreringMinoversikt
});

const mapDispatchToProps = (dispatch) => ({
    settMarkert: (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert)),
    settSomMarkertAlle: (markert) => dispatch(markerAlleBrukere(markert))
});

export default connect(mapStateToProps, mapDispatchToProps)(MinoversiktTabell);
