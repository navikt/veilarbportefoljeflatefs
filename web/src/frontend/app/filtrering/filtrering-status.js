import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import { endreFiltervalg } from '../ducks/filtrering';
import { statustallShape, veilederShape, filtervalgShape } from '../proptype-shapes';
import Barlabel from './barlabel';
import { FILTERGRUPPE_ENHET } from './filter-konstanter';


function BarInput({ skalSkjules, id, tekstId, antall, max, barClassname, firstInGroup, ...props }) {
    if (skalSkjules) {
        return null;
    }
    return (
        <div className={`skjema__input ${firstInGroup ? 'forsteBarlabelIGruppe': ''}`}>
            <input type="radio" id={id} className="radioknapp" {...props} />
            <Barlabel
                htmlFor={id}
                tekstId={tekstId}
                antall={antall}
                max={max}
                className={`${barClassname} skjemaelement__label`}
            />
        </div>
    );
}

function ArbeidslisteTittel({ skalSkjules }) {
    if (skalSkjules) {
        return null;
    }
    return (
        <div className="minArbeidsliste__tittel">
            <div className="typo-element">
                <Element className="blokk-xxs" tag="h3">
                    <FormattedMessage
                        id="filtrering.status.arbeidsliste"
                    />
                </Element>
            </div>
        </div>
    );
}

BarInput.propTypes = {
    id: PT.string.isRequired,
    tekstId: PT.string.isRequired,
    antall: PT.number.isRequired,
    max: PT.number.isRequired,
    barClassname: PT.string,
    skalSkjules: PT.bool,
    firstInGroup: PT.bool
};

BarInput.defaultProps = {
    skalSkjules: false,
    firstInGroup: false
};

ArbeidslisteTittel.propTypes = {
    skalSkjules: PT.bool.isRequired
};

class FiltreringStatus extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.endreFilter('brukerstatus', e.target.value);
    }

    render() {
        const { brukerstatus } = this.props.filtervalg;

        const nyeBrukereCheckbox = (
            <BarInput
                id="nyeBrukere"
                name="brukerstatus"
                value="NYE_BRUKERE"
                onChange={this.handleChange}
                checked={brukerstatus === 'NYE_BRUKERE'}
                tekstId="enhet.filtrering.filtrering.oversikt.nye.brukere.checkbox"
                antall={this.props.statustall.data.nyeBrukere}
                max={this.props.statustall.data.totalt}
            />
        );

        return (
            <div className="filtrering-oversikt panel">
                <div className="typo-element blokk-m">
                    <Element className="blokk-xxs" tag="h3">
                        <FormattedMessage
                            id="filtrering.status.totalt-antall-brukere"
                            values={{ antall: this.props.statustall.data.totalt }}
                        />
                    </Element>
                </div>
                { this.props.filtergruppe === 'enhet' ? nyeBrukereCheckbox : null }
                <BarInput
                    id="venterPaSvarFraNAV"
                    name="brukerstatus"
                    value="VENTER_PA_SVAR_FRA_NAV"
                    onChange={this.handleChange}
                    checked={brukerstatus === 'VENTER_PA_SVAR_FRA_NAV'}
                    tekstId="enhet.filtrering.filtrering.oversikt.venterpasvarfranav.brukere.checkbox"
                    antall={this.props.statustall.data.venterPaSvarFraNAV}
                    max={this.props.statustall.data.totalt}
                    barClassname="venterPaSvarFraNAV"
                    firstInGroup={true}
                />
                <BarInput
                    id="venterPaSvarFraBruker"
                    name="brukerstatus"
                    value="VENTER_PA_SVAR_FRA_BRUKER"
                    onChange={this.handleChange}
                    checked={brukerstatus === 'VENTER_PA_SVAR_FRA_BRUKER'}
                    tekstId="enhet.filtrering.filtrering.oversikt.venterpasvarfrabruker.brukere.checkbox"
                    antall={this.props.statustall.data.venterPaSvarFraBruker}
                    max={this.props.statustall.data.totalt}
                    barClassname="venterPaSvarFraBruker"
                />
                <BarInput
                    id="utlopteAktiviteter"
                    name="brukerstatus"
                    value="UTLOPTE_AKTIVITETER"
                    onChange={this.handleChange}
                    checked={brukerstatus === 'UTLOPTE_AKTIVITETER'}
                    tekstId="enhet.filtrering.filtrering.oversikt.utlopteaktiviteter.brukere.checkbox"
                    antall={this.props.statustall.data.utlopteAktiviteter}
                    max={this.props.statustall.data.totalt}
                    barClassname="utlopteAktiviteter"
                    firstInGroup={true}
                />
                <BarInput
                    id="ikkeIavtaltAktivitet"
                    name="brukerstatus"
                    value="IKKE_I_AVTALT_AKTIVITET"
                    onChange={this.handleChange}
                    checked={brukerstatus === 'IKKE_I_AVTALT_AKTIVITET'}
                    tekstId="enhet.filtrering.filtrering.oversikt.ikkeiavtaltaktivitet.brukere.checkbox"
                    antall={this.props.statustall.data.ikkeIavtaltAktivitet}
                    max={this.props.statustall.data.totalt}
                    barClassname="ikkeIAvtaltAktivitet"
                />
                <BarInput
                    id="iavtaltAktivitet"
                    name="brukerstatus"
                    value="I_AVTALT_AKTIVITET"
                    onChange={this.handleChange}
                    checked={brukerstatus === 'I_AVTALT_AKTIVITET'}
                    tekstId="enhet.filtrering.filtrering.oversikt.iavtaltaktivitet.brukere.checkbox"
                    antall={this.props.statustall.data.iavtaltAktivitet}
                    max={this.props.statustall.data.totalt}
                    barClassname="iAvtaltAktivitet"
                />
                <BarInput
                    id="inaktiveBrukere"
                    name="brukerstatus"
                    value="INAKTIVE_BRUKERE"
                    onChange={this.handleChange}
                    checked={brukerstatus === 'INAKTIVE_BRUKERE'}
                    tekstId="enhet.filtrering.filtrering.oversikt.inaktive.brukere.checkbox"
                    antall={this.props.statustall.data.inaktiveBrukere}
                    max={this.props.statustall.data.totalt}
                    barClassname="inaktiveBrukere"
                    firstInGroup={true}
                />
                <ArbeidslisteTittel skalSkjules={this.props.filtergruppe === FILTERGRUPPE_ENHET} />
                <BarInput
                    id="minArbeidsliste"
                    name="brukerstatus"
                    value="MIN_ARBEIDSLISTE"
                    onChange={this.handleChange}
                    checked={brukerstatus === 'MIN_ARBEIDSLISTE'}
                    tekstId="enhet.filtrering.filtrering.oversikt.min.arbeidsliste.checkbox"
                    antall={this.props.statustall.data.minArbeidsliste}
                    max={this.props.statustall.data.totalt}
                    barClassname="minArbeidsliste"
                    skalSkjules={this.props.filtergruppe === FILTERGRUPPE_ENHET}
                />
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
    statustall: PT.shape({ data: statustallShape.isRequired }).isRequired,
    filtergruppe: PT.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    veileder: veilederShape, // eslint-disable-line react/no-unused-prop-types
    filtervalg: filtervalgShape.isRequired
};

const mapStateToProps = (state) => ({
    enhet: state.enheter.valgtEnhet.enhet.enhetId,
    statustall: state.statustall
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    endreFilter: (filterId, filtervalg) => dispatch(endreFiltervalg(
        filterId, filtervalg, ownProps.filtergruppe, ownProps.veileder))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringStatus);
