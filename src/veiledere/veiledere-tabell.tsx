import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { settValgtVeileder } from '../ducks/portefolje';
import { settSide } from '../ducks/ui/side';

interface VeiledereTabellProps {
    innloggetVeileder: string;
    settVeileder: (veileder: string) => void;
    oppdaterSide: (side: string) => void;
    veiledere: any;
    currentSortering: {
        property: string;
        direction: string;
    };
    sorterPaaEtternavn: () => void;
    sorterPaaPortefoljestorrelse: () => void;
}

class VeilederTabell extends Component<VeiledereTabellProps> {

    settOgNavigerTilValgtVeileder(veileder) {
        if (this.props.innloggetVeileder === veileder.ident) {
            this.props.oppdaterSide('veilederoversikt');
        }
        this.props.settVeileder(veileder);
    }

    render() {
        const {veiledere, currentSortering} = this.props;
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
                <td/>
            </tr>
        ));

        return (
            <div>
                <table className="tabell veileder-tabell portefolje-tabell typo-undertekst blokk-xs">
                    <thead className="tabell__subhead">
                    <tr>
                        <th scope="col">
                            <button
                                onClick={this.props.sorterPaaEtternavn}
                                className={classNames('lenke lenke--frittstaende',
                                    {'valgt-sortering': sorterEtternavn})}
                                aria-pressed={sorterEtternavn}
                                aria-label={sorterEtternavn ?
                                    currentSortering.direction : 'inaktiv'}
                            >
                                Etternavn
                            </button>
                            , Fornavn
                        </th>
                        <th scope="col">
                            NAV-ident
                        </th>
                        <th className="tabell-element-center" scope="col">
                            <button
                                onClick={this.props.sorterPaaPortefoljestorrelse}
                                className={
                                    classNames('lenke lenke--frittstaende',
                                        {'valgt-sortering': sorterPaaPortefoljeStr})
                                }
                                aria-pressed={sorterPaaPortefoljeStr}
                                aria-label={sorterPaaPortefoljeStr ?
                                    currentSortering.direction : 'inaktiv'}
                            >
                                Antall brukere
                            </button>
                        </th>
                        <th/>
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
    innloggetVeileder: state.enheter.ident,
    veilederListe: state.veiledere.data.veilederListe,
    currentSortering: state.sortering
});

const mapDispatchToProps = (dispatch) => ({
    oppdaterSide: (side) => dispatch(settSide(side)),
    settVeileder: (veileder) => dispatch(settValgtVeileder(veileder))
});

export default connect(mapStateToProps, mapDispatchToProps)(VeilederTabell);
