import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import { endreFiltervalg } from '../ducks/filtrering';
import { hentStatusTall, hentStatusTallForVeileder } from '../ducks/statustall';
import { statustallShape, veilederShape, filtervalgShape } from '../proptype-shapes';

function calcWidth(antall, max) {
    if (antall === 0) {
        return 0;
    }

    const width = Math.round(Math.min(antall / max, 1) * 100);
    return Math.max(width, 6);
}

function Barlabel({ htmlFor, tekstId, antall, max, className }) {
    const style = { width: `${calcWidth(antall, max)}%` };

    return (
        <label htmlFor={htmlFor} className={['barlabel', className].join(' ')}>
            <FormattedMessage id={tekstId}/>
            &nbsp;
            <div className="barlabel__barwrapper">
                <Element className="barlabel__antall">{antall}</Element>
                <div className="barlabel__bar">
                    <span className="barlabel__bartrack" aria-hidden="true"/>
                    <span className="barlabel__barface" aria-hidden="true" style={style}/>
                </div>
            </div>
        </label>
    );
}

class FiltreringStatus extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.props.fetchStatusTall(this.props.enhet);
    }

    handleChange(e) {
        this.props.endreFilter(e.target.id, e.target.checked);
    }

    render() {
        const { nyeBrukere, inaktiveBrukere } = this.props.filtervalg;
        const nyeBrukereCheckbox = (
            <div className="skjema__input">
                <input
                    className="checkboks"
                    id="nyeBrukere"
                    type="checkbox"
                    onChange={this.handleChange}
                    checked={nyeBrukere}
                />
                <Barlabel
                    htmlFor="nyeBrukere"
                    tekstId="enhet.filtrering.filtrering.oversikt.nye.brukere.checkbox"
                    antall={this.props.statustall.data.nyeBrukere}
                    max={this.props.statustall.data.totalt}
                />
            </div>
        );
        return (
            <div className="filtrering-oversikt panel">
                <div className="typo-element blokk-xs">
                    <FormattedMessage
                        id="filtrering.status.totalt-antall-brukere"
                        values={{ antall: this.props.statustall.data.totalt }}
                    />
                </div>
                { this.props.filtergruppe === 'enhet' ? nyeBrukereCheckbox : null }
                <div className="skjema__input">
                    <input
                        className="checkboks"
                        id="inaktiveBrukere"
                        type="checkbox"
                        onChange={this.handleChange}
                        checked={inaktiveBrukere}
                    />
                    <Barlabel
                        className="inaktiveBrukere"
                        htmlFor="inaktiveBrukere"
                        tekstId="enhet.filtrering.filtrering.oversikt.inaktive.brukere.checkbox"
                        antall={this.props.statustall.data.inaktiveBrukere}
                        max={this.props.statustall.data.totalt}
                    />
                </div>
            </div>
        );
    }
}

FiltreringStatus.defaultProps = {
    veileder: {
        ident: '',
        navn: '',
        fornavn: '',
        etternavn: ''
    }
};

FiltreringStatus.propTypes = {
    endreFilter: PT.func.isRequired,
    fetchStatusTall: PT.func.isRequired,
    enhet: PT.string.isRequired,
    statustall: PT.shape({ data: statustallShape.isRequired }).isRequired,
    filtergruppe: PT.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    veileder: veilederShape, // eslint-disable-line react/no-unused-prop-types
    filtervalg: filtervalgShape.isRequired
};

const mapStateToProps = (state) => ({
    enhet: state.enheter.valgtEnhet.enhet.enhetId,
    statustall: state.statustall
});

const statusTallHenter = (dispatch, enhet, veileder, filtergruppe) => {
    if (filtergruppe === 'enhet') {
        dispatch(hentStatusTall(enhet));
    } else {
        dispatch(hentStatusTallForVeileder(enhet, veileder.ident));
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    endreFilter: (filterId, filtervalg) => dispatch(endreFiltervalg(
        filterId, filtervalg, ownProps.filtergruppe, ownProps.veileder)),
    fetchStatusTall: (enhet) => statusTallHenter(dispatch, enhet, ownProps.veileder, ownProps.filtergruppe)
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringStatus);
