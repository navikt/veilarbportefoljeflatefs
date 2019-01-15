import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import { endreFiltervalg } from '../ducks/filtrering';
import { sjekkFeature } from '../ducks/features';
import { statustallShape, veilederShape, filtervalgShape } from '../proptype-shapes';
import Barlabel from './barlabel';
import {
    FILTERGRUPPE_ENHET,
    I_AVTALT_AKTIVITET,
    IKKE_I_AVTALT_AKTIVITET,
    UFORDELTE_BRUKERE,
    NYE_BRUKERE_FOR_VEILEDER,
    UTLOPTE_AKTIVITETER,
    VENTER_PA_SVAR_FRA_BRUKER,
    VENTER_PA_SVAR_FRA_NAV,
    INAKTIVE_BRUKERE,
    MIN_ARBEIDSLISTE,
    TRENGER_VURDERING,
    ER_SYKMELDT_MED_ARBEIDSGIVER
} from './filter-konstanter';
import { TRENGER_VURDERING_FEATURE, ER_SYKMELDT_MED_ARBEIDSGIVER_FEATURE } from '../konstanter';
import './filtrering-status.less';

function BarInput({ skalSkjules, id, type, className, tekstId, antall, max, barClassname, firstInGroup, ...props }) {
    if (skalSkjules) {
        return null;
    }
    return (
        <div className={`skjema__input ${firstInGroup ? 'forsteBarlabelIGruppe' : ''}`}>
            <input type={type} id={id} className={className} {...props} />
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
    type: PT.string.isRequired,
    className: PT.string.isRequired,
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

const CHECKBOX_FILTER = ['UFORDELTE_BRUKERE', 'NYE_BRUKERE_FOR_VEILEDER'];

class FiltreringStatus extends Component {

    static leggTilFerdigFilter(filterListe, filter) {
        if (CHECKBOX_FILTER.includes(filter)) {
            return [...filterListe, filter];
        } else if (!filterListe.includes(filter)) {
            const checkboxFilter = filterListe
                .filter((valgtfilter) => CHECKBOX_FILTER.includes(valgtfilter));
            return [...checkboxFilter, filter];
        }
        return filter;
    }

    static fjernFerdigfilter(valgtFilterList, removeFilter) {
        return valgtFilterList.filter((filter) => filter !== (removeFilter));
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let ferdigfilterListe = [...this.props.filtervalg.ferdigfilterListe];
        if (e.target.type === 'radio') {
            ferdigfilterListe = FiltreringStatus.leggTilFerdigFilter(ferdigfilterListe, e.target.value);
        } else {
            ferdigfilterListe = e.target.checked ?
                FiltreringStatus.leggTilFerdigFilter(ferdigfilterListe, e.target.value) :
                FiltreringStatus.fjernFerdigfilter(ferdigfilterListe, e.target.value);
        }
        this.props.endreFilter('ferdigfilterListe', ferdigfilterListe);
    }

    render() {
        const { ferdigfilterListe } = this.props.filtervalg;

        const ufordelteBrukereCheckbox = (
            <BarInput
                id="nyeBrukere"
                type="checkbox"
                name="ufordeltebruker"
                className="checkboks"
                value="UFORDELTE_BRUKERE"
                onChange={this.handleChange}
                checked={ferdigfilterListe.includes(UFORDELTE_BRUKERE)}
                tekstId="enhet.filtrering.filtrering.oversikt.ufordelte.brukere.checkbox"
                antall={this.props.statustall.data.ufordelteBrukere}
                max={this.props.statustall.data.totalt}
            />
        );

        const nyeBrukereForVeilederCheckbox = (
            <BarInput
                id="nyeBrukere"
                type="checkbox"
                name="nyeBrukere"
                className="checkboks"
                value="NYE_BRUKERE_FOR_VEILEDER"
                onChange={this.handleChange}
                checked={ferdigfilterListe.includes(NYE_BRUKERE_FOR_VEILEDER)}
                tekstId="min_oversikt.filtrering.filtrering.oversikt.nye.brukere.checkbox"
                antall={this.props.statustall.data.nyeBrukereForVeileder}
                max={this.props.statustall.data.totalt}
            />
        );

        return (
            <div className="filtrering-oversikt panel">
                <div className="typo-element blokk-xs">
                    <Element className="blokk-xxs" tag="h3">
                        <FormattedMessage
                            id="filtrering.status.totalt-antall-brukere"
                            values={{ antall: this.props.statustall.data.totalt }}
                        />
                    </Element>
                </div>
                { this.props.filtergruppe === 'enhet' ? ufordelteBrukereCheckbox : nyeBrukereForVeilederCheckbox }
                <BarInput
                    id="trengerVurdering"
                    type="radio"
                    name="ferdigfilter"
                    className="radioknapp"
                    value="TRENGER_VURDERING"
                    onChange={this.handleChange}
                    checked={ferdigfilterListe.includes(TRENGER_VURDERING)}
                    tekstId="enhet.filtering.filtrering.oversikt.trengervurdering.brukere.checkbox"
                    antall={this.props.statustall.data.trengerVurdering}
                    max={this.props.statustall.data.totalt}
                    barClassname="trengerVurdering"
                    skalSkjules={!this.props.sjekkFeature(TRENGER_VURDERING_FEATURE)}
                />
                <BarInput
                    id="erSykmeldtMedArbeidsgiver"
                    type="radio"
                    name="ferdigfilter"
                    className="radioknapp"
                    value="ER_SYKMELDT_MED_ARBEIDSGIVER"
                    onChange={this.handleChange}
                    checked={ferdigfilterListe.includes(ER_SYKMELDT_MED_ARBEIDSGIVER)}
                    tekstId="enhet.filtering.filtrering.oversikt.ersykmeldtmedarbeidsgiver.bruker.checkbox"
                    antall={this.props.statustall.data.erSykmeldtMedArbeidsgiver}
                    max={this.props.statustall.data.totalt}
                    barClassname="erSykmeldtMedArbeidsgiver"
                    skalSkjules={!this.props.sjekkFeature(ER_SYKMELDT_MED_ARBEIDSGIVER_FEATURE)}
                />
                <BarInput
                    id="venterPaSvarFraNAV"
                    type="radio"
                    name="ferdigfilter"
                    className="radioknapp"
                    value="VENTER_PA_SVAR_FRA_NAV"
                    onChange={this.handleChange}
                    checked={ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV)}
                    tekstId="enhet.filtrering.filtrering.oversikt.venterpasvarfranav.brukere.checkbox"
                    antall={this.props.statustall.data.venterPaSvarFraNAV}
                    max={this.props.statustall.data.totalt}
                    barClassname="venterPaSvarFraNAV"
                    firstInGroup
                />
                <BarInput
                    id="venterPaSvarFraBruker"
                    type="radio"
                    name="ferdigfilter"
                    className="radioknapp"
                    value="VENTER_PA_SVAR_FRA_BRUKER"
                    onChange={this.handleChange}
                    checked={ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_BRUKER)}
                    tekstId="enhet.filtrering.filtrering.oversikt.venterpasvarfrabruker.brukere.checkbox"
                    antall={this.props.statustall.data.venterPaSvarFraBruker}
                    max={this.props.statustall.data.totalt}
                    barClassname="venterPaSvarFraBruker"
                />
                <BarInput
                    id="utlopteAktiviteter"
                    type="radio"
                    name="ferdigfilter"
                    className="radioknapp"
                    value="UTLOPTE_AKTIVITETER"
                    onChange={this.handleChange}
                    checked={ferdigfilterListe.includes(UTLOPTE_AKTIVITETER)}
                    tekstId="enhet.filtrering.filtrering.oversikt.utlopteaktiviteter.brukere.checkbox"
                    antall={this.props.statustall.data.utlopteAktiviteter}
                    max={this.props.statustall.data.totalt}
                    barClassname="utlopteAktiviteter"
                    firstInGroup
                />
                <BarInput
                    id="ikkeIavtaltAktivitet"
                    type="radio"
                    name="ferdigfilter"
                    className="radioknapp"
                    value="IKKE_I_AVTALT_AKTIVITET"
                    onChange={this.handleChange}
                    checked={ferdigfilterListe.includes(IKKE_I_AVTALT_AKTIVITET)}
                    tekstId="enhet.filtrering.filtrering.oversikt.ikkeiavtaltaktivitet.brukere.checkbox"
                    antall={this.props.statustall.data.ikkeIavtaltAktivitet}
                    max={this.props.statustall.data.totalt}
                    barClassname="ikkeIAvtaltAktivitet"
                />
                <BarInput
                    id="iavtaltAktivitet"
                    type="radio"
                    name="ferdigfilter"
                    className="radioknapp"
                    value="I_AVTALT_AKTIVITET"
                    onChange={this.handleChange}
                    checked={ferdigfilterListe.includes(I_AVTALT_AKTIVITET)}
                    tekstId="enhet.filtrering.filtrering.oversikt.iavtaltaktivitet.brukere.checkbox"
                    antall={this.props.statustall.data.iavtaltAktivitet}
                    max={this.props.statustall.data.totalt}
                    barClassname="iAvtaltAktivitet"
                />
                <BarInput
                    id="inaktiveBrukere"
                    type="radio"
                    name="ferdigfilter"
                    className="radioknapp"
                    value="INAKTIVE_BRUKERE"
                    onChange={this.handleChange}
                    checked={ferdigfilterListe.includes(INAKTIVE_BRUKERE)}
                    tekstId="enhet.filtrering.filtrering.oversikt.inaktive.brukere.checkbox"
                    antall={this.props.statustall.data.inaktiveBrukere}
                    max={this.props.statustall.data.totalt}
                    barClassname="inaktiveBrukere"
                    firstInGroup
                />
                <ArbeidslisteTittel skalSkjules={this.props.filtergruppe === FILTERGRUPPE_ENHET} />
                <BarInput
                    id="minArbeidsliste"
                    type="radio"
                    name="ferdigfilter"
                    className="radioknapp"
                    value="MIN_ARBEIDSLISTE"
                    onChange={this.handleChange}
                    checked={ferdigfilterListe.includes(MIN_ARBEIDSLISTE)}
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
    sjekkFeature: PT.func.isRequired,
    statustall: PT.shape({ data: statustallShape.isRequired }).isRequired,
    filtergruppe: PT.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    veileder: veilederShape, // eslint-disable-line react/no-unused-prop-types
    filtervalg: filtervalgShape.isRequired
};

const mapStateToProps = (state) => ({
    enhet: state.enheter.valgtEnhet.enhet.enhetId,
    statustall: state.statustall,
    sjekkFeature: (feature) => sjekkFeature(state, feature)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    endreFilter: (filterId, filtervalg) => dispatch(endreFiltervalg(
        filterId, filtervalg, ownProps.filtergruppe, ownProps.veileder.ident))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringStatus);
