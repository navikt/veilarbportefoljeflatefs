/* eslint-disable jsx-a11y/onclick-has-focus*/
/* eslint-disable jsx-a11y/onclick-has-role*/
/* eslint-disable jsx-a11y/no-static-element-interactions*/
import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import history from '../history';
import { veilederShape } from './../proptype-shapes';
import { settValgtVeilederIdent } from '../ducks/portefolje';

class VeilederTabell extends Component {

    settValgtVeilederIdent(veileder) {
        const { settVeilederident } = this.props;
        settVeilederident(veileder.ident);
        history.push('/portefolje');
    }

    render() {
        const { veiledere } = this.props;

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
                            <td><a onClick={() => this.settValgtVeilederIdent(veileder)}>{`${veileder.navn}`}</a></td>
                            <td>{`${veileder.ident}`}</td>
                            <td>{`${veileder.brukere}`}</td>
                        </tr>
                )}
                </tbody>
            </table>
        );
    }
}

VeilederTabell.propTypes = {
    veiledere: PT.arrayOf(veilederShape),
    settVeilederident: PT.func.isRequired
};

const mapStateToProps = state => ({
    veilederident: state.portefolje.veilederident
});

const mapDispatchToProps = dispatch => ({
    settVeilederident: veilederident => dispatch(settValgtVeilederIdent(veilederident))
});

export default connect(mapStateToProps, mapDispatchToProps)(VeilederTabell);
