import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { endreFiltervalg } from '../../ducks/filtrering';
import { hentStatusTall } from '../../ducks/statustall';
import { statustallShape } from '../../proptype-shapes';
import Innholdslaster from '../../innholdslaster/innholdslaster';

class FiltreringStatus extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.props.fetchStatusTall(this.props.enhet);
    }

    componentDidUpdate() {
        this.props.oppdaterDatagrunnlag();
    }

    handleChange(e) {
        const { endreFilter } = this.props;
        endreFilter(e.target.id, e.target.checked);
    }

    render() {
        const { nyeBrukere, inaktiveBrukere } = this.props;

        const checkboxNyeBrukere = (<div className="skjema__input">
            <input
                className="checkboks"
                id="checkbox-filtrering-oversikt-nye-brukere"
                type="checkbox"
                onChange={this.handleChange}
                checked={nyeBrukere}
            />
            <label htmlFor="checkbox-filtrering-oversikt-nye-brukere">
                <FormattedMessage
                    id="enhet.filtrering.filtrering.oversikt.nye.brukere.checkbox"
                    values={{ antall: this.props.statustall.data.nyeBrukere }}
                />
            </label>
        </div>);

        const checkboxInaktiveBrukere = (<div className="skjema__input">
            <input
                className="checkboks"
                id="checkbox-filtrering-oversikt-inaktive-brukere"
                type="checkbox"
                onChange={this.handleChange}
                checked={inaktiveBrukere}
            />
            <label htmlFor="checkbox-filtrering-oversikt-inaktive-brukere">
                <FormattedMessage
                    id="enhet.filtrering.filtrering.oversikt.inaktive.brukere.checkbox"
                    values={{ antall: this.props.statustall.data.inaktiveBrukere }}
                />
            </label>
        </div>);

        const totaltAntallBrukere = (
            <div className="typo-element blokk-xs">
                <FormattedMessage
                    id="filtrering.status.totalt-antall-brukere"
                    values={{ antall: this.props.statustall.data.totalt }}
                />
            </div>
        );
        return (
            <div className="filtrering-oversikt panel">
                <Innholdslaster avhengigheter={[this.props.statustall]}>
                    {totaltAntallBrukere}
                    {checkboxNyeBrukere}
                    {checkboxInaktiveBrukere}
                </Innholdslaster>
            </div>
        );
    }
}

FiltreringStatus.propTypes = {
    endreFilter: PT.func.isRequired,
    oppdaterDatagrunnlag: PT.func.isRequired,
    nyeBrukere: PT.bool.isRequired,
    inaktiveBrukere: PT.bool.isRequired,
    fetchStatusTall: PT.func.isRequired,
    enhet: PT.string.isRequired,
    statustall: PT.shape({ data: statustallShape.isRequired }).isRequired
};

const mapStateToProps = state => ({
    nyeBrukere: state.filtrering.filtervalg.nyeBrukere,
    inaktiveBrukere: state.filtrering.filtervalg.inaktiveBrukere,
    enhet: state.enheter.valgtEnhet.enhet.enhetId,
    statustall: state.statustall
});

const mapDispatchToProps = dispatch => ({
    endreFilter: (filterId, filtervalg) => dispatch(endreFiltervalg(filterId, filtervalg)),
    fetchStatusTall: enhet => dispatch(hentStatusTall(enhet))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringStatus);
