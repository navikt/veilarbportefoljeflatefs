import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as classNames from 'classnames';
import { Link } from 'react-router';
import { veilederShape } from './../proptype-shapes';
import { settValgtVeileder } from '../ducks/portefolje';
import TomPortefoljeModal from '../modal/tom-portefolje-modal';
import {VeilederModell, VisningType} from "../model-interfaces";
import {CurrentSorteringState} from "../ducks/veilederpaginering";

interface VeilederTabellProps {
    veiledere: VeilederModell[];
    settVeileder: (veileder: VeilederModell) => void;
    sorterPaaEtternavn: () => void;
    veilederListe: VeilederModell[];
    sorterPaaPortefoljestorrelse: () => void;
    currentSortering: CurrentSorteringState;
}

class VeilederTabell extends React.Component<VeilederTabellProps> {
    settOgNavigerTilValgtVeileder(veileder) {
        return () => {
            this.props.settVeileder(veileder);
        };
    }

    render() {
        const { veiledere, veilederListe, currentSortering } = this.props;

        const sorterEtternavn = currentSortering.felt === 'etternavn';
        const sorterPaaPortefoljeStr = currentSortering.felt === 'portefoljestorrelse';

        const veilederElementer = veiledere.map((veileder) => (
            <tr key={veileder.ident}>
                <th>
                    <Link
                        to={`/portefolje/${veileder.ident}?clean`}
                        onClick={this.settOgNavigerTilValgtVeileder(veileder)}
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
                <table className="tabell veileder-tabell portefolje-tabell typo-undertekst">
                    <thead className="extra-head">
                        <tr>
                            <th>
                                <FormattedMessage id="enhet.veiledere.tabell.veileder" />
                            </th>
                            <th colSpan={3} />
                        </tr>
                    </thead>
                    <thead className="tabell__subhead">
                        <tr>
                            <th scope="col">
                                <button
                                    onClick={this.props.sorterPaaEtternavn}
                                    className={classNames('lenke lenke--frittstaende', { valgt: sorterEtternavn })}
                                    aria-pressed={sorterEtternavn}
                                    aria-label={sorterEtternavn ?
                                    currentSortering.rekkefolge : 'inaktiv'}
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
                                    classNames('lenke lenke--frittstaende', { valgt: sorterPaaPortefoljeStr })
                                }
                                    aria-pressed={sorterPaaPortefoljeStr}
                                    aria-label={sorterPaaPortefoljeStr ?
                                    currentSortering.rekkefolge : 'inaktiv'}
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

const mapStateToProps = (state) => ({
    veilederListe: state.veiledere.data.veilederListe,
    currentSortering: state.veilederpaginering.currentSortering

});

const mapDispatchToProps = (dispatch) => ({
    settVeileder: (veileder) => dispatch(settValgtVeileder(veileder))
});

export default connect(mapStateToProps, mapDispatchToProps)(VeilederTabell);
