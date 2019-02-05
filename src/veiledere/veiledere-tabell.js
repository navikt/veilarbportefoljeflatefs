import React, { Component} from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { settValgtVeileder } from '../ducks/portefolje';
import TomPortefoljeModal from '../modal/tom-portefolje-modal';
import { settSide } from '../ducks/ui/side';

class VeilederTabell extends Component {
    settOgNavigerTilValgtVeileder(veileder) {
        if (this.props.innloggetVeileder === veileder.ident) {
            this.props.oppdaterSide('veilederoversikt');
        }
        this.props.settVeileder(veileder);
    }

    render() {
        const { veiledere, veilederListe, currentSortering } = this.props;

        const sorterEtternavn = currentSortering.property === 'etternavn';
        const sorterPaaPortefoljeStr = currentSortering.property === 'portefoljestorrelse';

        const veilederElementer = veiledere.map((veileder) => (
            <tr key={veileder.ident}>
                <th>
                    <Link
                        to={`/portefolje/${veileder.ident}?clean`}
                        onClick={() => this.settOgNavigerTilValgtVeileder(veileder)}
                        className="lenke lenke--frittstaende"
                    >
                        {`${veileder.navn}`}
                    </Link>
                </th>
                <td>{`${veileder.ident}`}</td>
                <td className="tabell-element-center">{veileder.portefoljestorrelse}</td>
                <td />
            </tr>
        ));

        return (
            <div>
                <TomPortefoljeModal isOpen={veilederListe.length === 0} />
                <table className="tabell veileder-tabell portefolje-tabell typo-undertekst blokk-xs">
                    <thead className="extra-head">
                        <tr>
                            <th>
                                <FormattedMessage id="enhet.veiledere.tabell.veileder" />
                            </th>
                            <th colSpan="3" />
                        </tr>
                    </thead>
                    <thead className="tabell__subhead">
                        <tr>
                            <th scope="col">
                                <button
                                    onClick={this.props.sorterPaaEtternavn}
                                    className={classNames('lenke lenke--frittstaende',
                                        { 'valgt-sortering': sorterEtternavn })}
                                    aria-pressed={sorterEtternavn}
                                    aria-label={sorterEtternavn ?
                                    currentSortering.direction : 'inaktiv'}
                                >
                                    <FormattedMessage id="enhet.veiledere.tabell.etternavn" />
                                </button>
                                <FormattedMessage id="enhet.veiledere.tabell.fornavn" />
                            </th>
                            <th scope="col">
                                <FormattedMessage id="enhet.veiledere.tabell.ident" />
                            </th>
                            <th className="tabell-element-center" scope="col">
                                <button
                                    onClick={this.props.sorterPaaPortefoljestorrelse}
                                    className={
                                    classNames('lenke lenke--frittstaende',
                                        { 'valgt-sortering': sorterPaaPortefoljeStr })
                                }
                                    aria-pressed={sorterPaaPortefoljeStr}
                                    aria-label={sorterPaaPortefoljeStr ?
                                    currentSortering.direction : 'inaktiv'}
                                >
                                    <FormattedMessage id="enhet.veiledere.tabell.brukere" />
                                </button>
                            </th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {veilederElementer}
                    </tbody>
                </table>
            </div>
        );
    }
}
/*
VeilederTabell.propTypes = {
    innloggetVeileder: PT.string,
    oppdaterSide: PT.func,
    veiledere: PT.arrayOf(veilederShape).isRequired,
    settVeileder: PT.func.isRequired,
    sorterPaaEtternavn: PT.func.isRequired,
    veilederListe: PT.arrayOf(veilederShape).isRequired,
    sorterPaaPortefoljestorrelse: PT.func.isRequired,
    currentSortering: PT.shape({
        property: PT.string,
        direction: PT.string
    }).isRequired
};
*/

const mapStateToProps = (state) => ({
    innloggetVeileder: state.enheter.ident,
    veilederListe: state.veiledere.data.veilederListe,
    currentSortering: state.sortering
});

const mapDispatchToProps = (dispatch) => ({
    oppdaterSide: (side) => dispatch(settSide(side)),
    settVeileder: (veileder) => dispatch(settValgtVeileder(veileder))
});

export default connect(mapStateToProps, mapDispatchToProps)(VeilederTabell);
