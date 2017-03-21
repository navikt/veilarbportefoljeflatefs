/* eslint-disable jsx-a11y/onclick-has-focus*/
/* eslint-disable jsx-a11y/onclick-has-role*/
/* eslint-disable jsx-a11y/no-static-element-interactions*/
import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import history from '../history';
import { veilederShape } from './../proptype-shapes';
import { settValgtVeileder } from '../ducks/portefolje';
import { eksporterEnhetsportefoljeTilLocalStorage } from '../ducks/utils';


class VeilederTabell extends Component {
    componentDidMount() {
        const { valgtEnhet, filtervalg } = this.props;
        eksporterEnhetsportefoljeTilLocalStorage(filtervalg, valgtEnhet, location.pathname);
    }

    settValgtVeileder(veileder) {
        const { settVeileder } = this.props;
        settVeileder(veileder);
        history.push('/portefolje');
    }

    render() {
        const { veiledere, portefoljestorrelser } = this.props;

        const portefoljestorrelse = (storrelser, veilederId) => {
            const currentStorrelse = storrelser.find(storrelse => storrelse.value === veilederId);
            return currentStorrelse ? currentStorrelse.count : 0;
        };

        return (
            <table className="tabell portefolje-tabell" tabIndex="0">
                <thead className="extra-head">
                    <tr>
                        <th>Veileder</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th scope="col">
                            <a onClick={this.props.sorterPaaEtternavn} role="button" className="sortering-link">
                                <FormattedMessage id="enhet.veiledere.tabell.etternavn" />
                            </a>
                            <FormattedMessage id="enhet.veiledere.tabell.fornavn" />
                        </th>
                        <th scope="col">
                            <FormattedMessage id="enhet.veiledere.tabell.ident" />
                        </th>
                        <th scope="col">
                            <FormattedMessage id="enhet.veiledere.tabell.brukere" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {veiledere.map(veileder =>
                        <tr key={veileder.ident}>
                            <th>
                                <a onClick={() => this.settValgtVeileder(veileder)} className="til-veileder-link">
                                    {`${veileder.navn}`}
                                </a>
                            </th>
                            <td>{`${veileder.ident}`}</td>
                            <td>{portefoljestorrelse(portefoljestorrelser, veileder.ident)}</td>
                        </tr>
                )}
                </tbody>
            </table>
        );
    }
}

VeilederTabell.propTypes = {
    veiledere: PT.arrayOf(veilederShape),
    settVeileder: PT.func.isRequired,
    portefoljestorrelser: PT.arrayOf(PT.object).isRequired,
    sorterPaaEtternavn: PT.func.isRequired,
    valgtEnhet: PT.object,
    filtervalg: PT.object
};

const mapStateToProps = state => ({
    valgtEnhet: state.enheter.valgtEnhet.enhet,
    filtervalg: state.filtrering.filtervalg
});

const mapDispatchToProps = dispatch => ({
    settVeileder: veileder => dispatch(settValgtVeileder(veileder))
});

export default connect(mapStateToProps, mapDispatchToProps)(VeilederTabell);
