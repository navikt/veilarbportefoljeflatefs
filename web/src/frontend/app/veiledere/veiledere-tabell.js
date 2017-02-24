/* eslint-disable jsx-a11y/onclick-has-focus*/
/* eslint-disable jsx-a11y/onclick-has-role*/
/* eslint-disable jsx-a11y/no-static-element-interactions*/
import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import history from '../history';
import { veilederShape } from './../proptype-shapes';
import { settValgtVeileder } from '../ducks/portefolje';

class VeilederTabell extends Component {

    settValgtVeileder(veileder) {
        const { settVeileder } = this.props;
        settVeileder(veileder);
        history.push('/portefolje');
    }

    render() {
        const { veiledere, portefoljestorrelser } = this.props;

        return (
            <table className="tabell tabell-skillestrek">
                <thead>
                    <tr>
                        <th scope="col">
                            <FormattedMessage id="enhet.veiledere.tabell.veiledere" />
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
                            <td><a onClick={() => this.settValgtVeileder(veileder)}>{`${veileder.navn}`}</a></td>
                            <td>{`${veileder.ident}`}</td>

                            {/* Denne må endres til å se på veileder_id (storrelse.value === veileder.veileder_id) når
                                når det er tilgjengelig fra portefølje*/}
                            <td>{portefoljestorrelser.find(storrelse => storrelse.value === 'SKAFFEA').count}</td>
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
    portefoljestorrelser: PT.arrayOf(PT.object).isRequired
};

const mapStateToProps = state => ({
    portefoljestorrelser: state.portefoljestorrelser.data.facetResults
});

const mapDispatchToProps = dispatch => ({
    settVeileder: veileder => dispatch(settValgtVeileder(veileder))
});

export default connect(mapStateToProps, mapDispatchToProps)(VeilederTabell);
