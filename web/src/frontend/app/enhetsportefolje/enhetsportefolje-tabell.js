import React, { PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { enhetShape, filtervalgShape, veilederShape } from './../proptype-shapes';
import EnhetBrukerpanel from './enhet-brukerpanel';
import { settBrukerSomMarkert, markerAlleBrukere } from '../ducks/portefolje';
import EnhetListehode from './enhet-listehode';

const finnBrukersVeileder = (veiledere, bruker) => (veiledere.find((veileder) => veileder.ident === bruker.veilederId));
function EnhetTabell({
                         settMarkert, portefolje, settSorteringOgHentPortefolje,
                         filtervalg, sorteringsrekkefolge, valgtEnhet, veiledere
                           }) {
    const { brukere } = portefolje.data;
    const { enhetId } = valgtEnhet.enhet;
    return (

        <div className="enhet-liste__wrapper typo-undertekst">
            <EnhetListehode
                sorteringsrekkefolge={sorteringsrekkefolge}
                sorteringOnClick={settSorteringOgHentPortefolje}
                filtervalg={filtervalg}
                sorteringsfelt={portefolje.sorteringsfelt}
                brukere={brukere}
            />
            <ul className="enhet-brukere-liste">
                {brukere.map((bruker) =>
                    <li key={bruker.fnr} className="enhet-brukere-panel">
                        <EnhetBrukerpanel
                            bruker={bruker}
                            enhetId={enhetId}
                            settMarkert={settMarkert}
                            filtervalg={filtervalg}
                            brukersVeileder={finnBrukersVeileder(veiledere, bruker)}
                        />
                    </li>)}
            </ul>
        </div>
    );
}

EnhetTabell.propTypes = {
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
    veiledere: PT.arrayOf(veilederShape).isRequired
};


const mapStateToProps = (state) => ({
    portefolje: state.portefolje,
    valgtEnhet: state.enheter.valgtEnhet,
    sorteringsrekkefolge: state.portefolje.sorteringsrekkefolge,
    filtervalg: state.filtrering
});

const mapDispatchToProps = (dispatch) => ({
    settMarkert: (fnr, markert) => dispatch(settBrukerSomMarkert(fnr, markert)),
    settSomMarkertAlle: (markert) => dispatch(markerAlleBrukere(markert))
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhetTabell);
