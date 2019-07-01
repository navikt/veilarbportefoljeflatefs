import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import { endreFiltervalg } from '../ducks/filtrering';
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
    ER_SYKMELDT_MED_ARBEIDSGIVER, MOTER_IDAG
} from './filter-konstanter';
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
/*
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
*/

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
        const { statustall, filtergruppe, filtervalg } = this.props;
        const { ferdigfilterListe } = filtervalg;

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
                antall={statustall.data.ufordelteBrukere}
                max={statustall.data.totalt}
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
                antall={statustall.data.nyeBrukereForVeileder}
                max={statustall.data.totalt}
            />
        );

        return (
            <div className="filtrering-oversikt panel">
                <Element className="filtrering-oversikt__totalt-antall blokk-xxs" tag="h3">
                    <FormattedMessage
                        id="filtrering.status.totalt-antall-brukere"
                        values={{ antall: statustall.data.totalt }}
                    />
                </Element>
                { filtergruppe === 'enhet' ? ufordelteBrukereCheckbox : nyeBrukereForVeilederCheckbox }
                <BarInput
                    id="trengerVurdering"
                    type="radio"
                    name="ferdigfilter"
                    className="radioknapp"
                    value="TRENGER_VURDERING"
                    onChange={this.handleChange}
                    checked={ferdigfilterListe.includes(TRENGER_VURDERING)}
                    tekstId="enhet.filtering.filtrering.oversikt.trengervurdering.brukere.checkbox"
                    antall={statustall.data.trengerVurdering}
                    max={statustall.data.totalt}
                    barClassname="trengerVurdering"
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
                />
                <BarInput
                    id="avtaltMoteMedNav"
                    type="radio"
                    name="ferdigfilter"
                    className="radioknapp"
                    value="MOTER_IDAG"
                    onChange={this.handleChange}
                    checked={ferdigfilterListe.includes(MOTER_IDAG)}
                    tekstId="enhet.filtrering.oversikt.avtaltmotermednav.brukere.checkbox"
                    antall={statustall.data.venterPaSvarFraNAV}
                    max={statustall.data.totalt}
                    barClassname="avtaltMoteMedNav"
                    firstInGroup
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
                    antall={statustall.data.venterPaSvarFraNAV}
                    max={statustall.data.totalt}
                    barClassname="venterPaSvarFraNAV"
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
                    antall={statustall.data.venterPaSvarFraBruker}
                    max={statustall.data.totalt}
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
                    antall={statustall.data.utlopteAktiviteter}
                    max={statustall.data.totalt}
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
                    antall={statustall.data.ikkeIavtaltAktivitet}
                    max={statustall.data.totalt}
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
                    antall={statustall.data.iavtaltAktivitet}
                    max={statustall.data.totalt}
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
                    antall={statustall.data.inaktiveBrukere}
                    max={statustall.data.totalt}
                    barClassname="inaktiveBrukere"
                    firstInGroup
                />
                <ArbeidslisteTittel skalSkjules={filtergruppe === FILTERGRUPPE_ENHET} />
                <BarInput
                    id="minArbeidsliste"
                    type="radio"
                    name="ferdigfilter"
                    className="radioknapp"
                    value="MIN_ARBEIDSLISTE"
                    onChange={this.handleChange}
                    checked={ferdigfilterListe.includes(MIN_ARBEIDSLISTE)}
                    tekstId="enhet.filtrering.filtrering.oversikt.min.arbeidsliste.checkbox"
                    antall={statustall.data.minArbeidsliste}
                    max={statustall.data.totalt}
                    barClassname="minArbeidsliste"
                    skalSkjules={filtergruppe === FILTERGRUPPE_ENHET}
                />
            </div>
        );
    }
}

/*
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
*/
const mapStateToProps = (state) => ({
    enhet: state.enheter.valgtEnhet.enhet.enhetId,
    statustall: state.statustall
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    endreFilter: (filterId, filtervalg) => dispatch(endreFiltervalg(
        filterId, filtervalg, ownProps.filtergruppe, ownProps.veileder.ident))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringStatus);
