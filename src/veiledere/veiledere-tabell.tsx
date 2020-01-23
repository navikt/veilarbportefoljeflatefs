import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { settValgtVeileder } from '../ducks/portefolje';
import { settSide } from '../ducks/ui/side';
import { ReactComponent as PilAscending } from '../components/tabell/arrow-up.svg';
import { ReactComponent as PilDescending } from '../components/tabell/arrow-down.svg';
import './veiledere.less';

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
                <td>
                    <Link
                        to={`/portefolje/${veileder.ident}?clean`}
                        onClick={() => this.settOgNavigerTilValgtVeileder(veileder)}
                        className="lenke lenke--frittstaende"
                    >
                        {`${veileder.navn}`}
                    </Link>
                </td>
                <td>{`${veileder.ident}`}</td>
                <td className="tabell-element-center">{veileder.portefoljestorrelse}</td>
                <td/>
            </tr>
        ));

        const sorteringspil = (sorterPaa) => {
            const className = 'tabellheader__pil';
            if (sorterPaa) {
                if (currentSortering.direction === 'ascending') {
                    return <PilAscending className={className}/>;
                } else if (currentSortering.direction === 'descending') {
                    return <PilDescending className={className}/>;
                }
            }
            return null;
        };

        console.log('sorteringsrekkefølge:', currentSortering.direction);
        console.log('sortering:', currentSortering);

        return (
            <table className="tabell veileder-tabell portefolje-tabell typo-undertekst blokk-xs">
                <thead>
                <tr>
                    <th scope="col" className="tabellheader">
                        <div className="tabellheader__lenke">
                            <button
                                onClick={this.props.sorterPaaEtternavn}
                                className={classNames('lenke lenke--frittstaende',
                                    {'valgt-sortering': sorterEtternavn})}
                                aria-pressed={sorterEtternavn}
                                aria-label={sorterEtternavn ? currentSortering.direction : 'inaktiv'}
                            >
                                Etternavn
                            </button>
                            , Fornavn
                            {sorteringspil(sorterEtternavn)}
                        </div>
                    </th>
                    <th scope="col" className="tabellheader">
                        NAV-ident
                    </th>
                    <th className="tabellheader tabell-element-center" scope="col">
                        <div className="tabellheader__lenke">
                            <button
                                onClick={this.props.sorterPaaPortefoljestorrelse}
                                className={
                                    classNames('lenke lenke--frittstaende tabellheader__tekst',
                                        {'valgt-sortering': sorterPaaPortefoljeStr})
                                }
                                aria-pressed={sorterPaaPortefoljeStr}
                                aria-label={sorterPaaPortefoljeStr ?
                                    currentSortering.direction : 'inaktiv'}
                            >
                                Antall brukere
                            </button>
                            {sorteringspil(sorterPaaPortefoljeStr)}
                        </div>
                    </th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {veilederElementer}
                </tbody>
            </table>
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
