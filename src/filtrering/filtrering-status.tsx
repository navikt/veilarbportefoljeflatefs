import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import { endreFiltervalg } from '../ducks/filtrering';

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
    ER_SYKMELDT_MED_ARBEIDSGIVER,
    MOTER_IDAG
} from './filter-konstanter';
import './filtrering-status.less';
import { sjekkFeature } from '../ducks/features';
import { VIS_MOTER_MED_NAV } from '../konstanter';
import { BarInput } from '../components/barinput/barinput';

function ArbeidslisteTittel({ skalSkjules }) {
    if (skalSkjules) {
        return null;
    }
    return (
        <div className="minArbeidsliste__tittel">
            <div className="typo-element">
                <Element className="blokk-xxs" tag="h3">
                    Arbeidsliste
                </Element>
            </div>
        </div>
    );
}

const CHECKBOX_FILTER = ['UFORDELTE_BRUKERE', 'NYE_BRUKERE_FOR_VEILEDER'];

function FiltreringStatus() {

    function leggTilFerdigFilter(filterListe, filter) {
        if (CHECKBOX_FILTER.includes(filter)) {
            return [...filterListe, filter];
        } else if (!filterListe.includes(filter)) {
            const checkboxFilter = filterListe
                .filter((valgtfilter) => CHECKBOX_FILTER.includes(valgtfilter));
            return [...checkboxFilter, filter];
        }
        return filter;
    }

    function fjernFerdigfilter(valgtFilterList, removeFilter) {
        return valgtFilterList.filter((filter) => filter !== (removeFilter));
    }

    function handleChange(e) {
        let ferdigfilterListen = [...props.filtervalg.ferdigfilterListe];
        if (e.target.type === 'radio') {
            ferdigfilterListen = FiltreringStatus.leggTilFerdigFilter(ferdigfilterListe, e.target.value);
        } else {
            ferdigfilterListen = e.target.checked ?
                FiltreringStatus.leggTilFerdigFilter(ferdigfilterListe, e.target.value) :
                FiltreringStatus.fjernFerdigfilter(ferdigfilterListe, e.target.value);
        }
        props.endreFilter('ferdigfilterListe', ferdigfilterListen);
    }

    const { statustall, filtergruppe, filtervalg,  harFeature} = this.props;
    const { ferdigfilterListe } = filtervalg;

    const visMoterIdagFeature = harFeature(VIS_MOTER_MED_NAV);

    const ufordelteBrukereCheckbox = (
        <BarInput
            id="nyeBrukere"
            type="checkbox"
            name="ufordeltebruker"
            className="checkboks"
            value="UFORDELTE_BRUKERE"
            onChange={handleChange}
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
            onChange={handleChange}
            checked={ferdigfilterListe.includes(NYE_BRUKERE_FOR_VEILEDER)}
            tekstId="min_oversikt.filtrering.filtrering.oversikt.nye.brukere.checkbox"
            antall={statustall.data.nyeBrukereForVeileder}
            max={statustall.data.totalt}
        />
    );

    const tekster = (antall) => ({ 0: 'Ingen brukere', 1 : 'Totalt 1, bruker', [antall]: () => `Totalt ${antall} brukere`});

    const tekst = tekster(statustall.data.totalt);

    return (
        <div className="filtrering-oversikt panel">
            <Element className="filtrering-oversikt__totalt-antall blokk-xxs" tag="h3">
                {tekst[statustall.data.totalt]}
            </Element>
            { filtergruppe === 'enhet' ? ufordelteBrukereCheckbox : nyeBrukereForVeilederCheckbox }
            <BarInput
                id="trengerVurdering"
                type="radio"
                name="ferdigfilter"
                className="radioknapp"
                value="TRENGER_VURDERING"
                onChange={handleChange}
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
                onChange={handleChange}
                checked={ferdigfilterListe.includes(ER_SYKMELDT_MED_ARBEIDSGIVER)}
                tekstId="enhet.filtering.filtrering.oversikt.ersykmeldtmedarbeidsgiver.bruker.checkbox"
                antall={props.statustall.data.erSykmeldtMedArbeidsgiver}
                max={props.statustall.data.totalt}
                barClassname="erSykmeldtMedArbeidsgiver"
            />
            <BarInput
                id="venterPaSvarFraNAV"
                type="radio"
                name="ferdigfilter"
                className="radioknapp"
                value="VENTER_PA_SVAR_FRA_NAV"
                onChange={handleChange}
                checked={ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_NAV)}
                tekstId="enhet.filtrering.filtrering.oversikt.venterpasvarfranav.brukere.checkbox"
                antall={statustall.data.venterPaSvarFraNAV}
                max={statustall.data.totalt}
                barClassname="venterPaSvarFraNAV"
                firstInGroup
            />
            <BarInput
                id="venterPaSvarFraBruker"
                type="radio"
                name="ferdigfilter"
                className="radioknapp"
                value="VENTER_PA_SVAR_FRA_BRUKER"
                onChange={handleChange}
                checked={ferdigfilterListe.includes(VENTER_PA_SVAR_FRA_BRUKER)}
                tekstId="enhet.filtrering.filtrering.oversikt.venterpasvarfrabruker.brukere.checkbox"
                antall={statustall.data.venterPaSvarFraBruker}
                max={statustall.data.totalt}
                barClassname="venterPaSvarFraBruker"
            />
            {filtergruppe === 'veileder' && visMoterIdagFeature &&
            <BarInput
                id="avtaltMoteMedNav"
                type="radio"
                name="ferdigfilter"
                className="radioknapp"
                value="MOTER_IDAG"
                onChange={handleChange}
                checked={ferdigfilterListe.includes(MOTER_IDAG)}
                tekstId="enhet.filtrering.oversikt.avtaltmotermednav.brukere.checkbox"
                antall={statustall.data.moterMedNAVIdag}
                max={statustall.data.totalt}
                barClassname="avtaltMoteMedNav"
            /> }
            <BarInput
                id="utlopteAktiviteter"
                type="radio"
                name="ferdigfilter"
                className="radioknapp"
                value="UTLOPTE_AKTIVITETER"
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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

const mapStateToProps = (state) => ({
    enhet: state.enheter.valgtEnhet.enhet.enhetId,
    statustall: state.statustall,
    harFeature: (feature) => sjekkFeature(state, feature)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    endreFilter: (filterId, filtervalg) => dispatch(endreFiltervalg(
        filterId, filtervalg, ownProps.filtergruppe, ownProps.veileder.ident))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringStatus);
