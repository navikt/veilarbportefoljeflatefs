import React, { PropTypes as PT, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import { endreFiltervalg } from '../ducks/filtrering';
import { statustallShape, veilederShape, filtervalgShape } from '../proptype-shapes';
import Barlabel from './barlabel';
import {
    FILTERGRUPPE_ENHET,
    I_AVTALT_AKTIVITET,
    IKKE_I_AVTALT_AKTIVITET,
    UTFORDELTE_BRUKERE,
    NYE_BRUKERE_FOR_VEILEDER,
    UTLOPTE_AKTIVITETER,
    VENTER_PA_SVAR_FRA_BRUKER,
    VENTER_PA_SVAR_FRA_NAV,
    INAKTIVE_BRUKERE,
    MIN_ARBEIDSLISTE
} from './filter-konstanter';


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
        this.fjernFraFerdigFilterListe = this.fjernFraFerdigFilterListe.bind(this);
        this.leggTilFerdigFilterListe = this.leggTilFerdigFilterListe.bind(this);
        this.state = {
            ferdigfilterstatus: '',
        };
    }

    handleChange(e) {
        var ferdigfilterListe = this.props.filtervalg.ferdigfilterListe;
        if (e.target.type === 'checkbox'){
            ferdigfilterListe =   e.target.checked ? this.leggTilFerdigFilterListe(ferdigfilterListe, e.target.value)
                                                   : this.fjernFraFerdigFilterListe(ferdigfilterListe, e.target.value);
        }else {
            ferdigfilterListe = this.fjernFraFerdigFilterListe(ferdigfilterListe, this.state.ferdigfilterstatus); //remove last selected radio ferdigfilter from ferdigfilterListe
            ferdigfilterListe = this.leggTilFerdigFilterListe(ferdigfilterListe, e.target.value); //add current selected radio ferdigfilter in ferdigfilterListe
            this.setState({ ferdigfilterstatus: e.target.value }); //set current selected radio ferdigfilter in state
        }
        this.props.endreFilter('ferdigfilterListe', ferdigfilterListe);
    }

    leggTilFerdigFilterListe(valgtFilterList, leggFilter){
        var filterlist = valgtFilterList;
        filterlist.push(leggFilter);
        return filterlist;
    }

    fjernFraFerdigFilterListe(valgtFilterList, removeFilter){
        return valgtFilterList.filter((filter) => filter !== (removeFilter));
    }

    render() {
        const { ferdigfilterListe } = this.props.filtervalg;

        const utfordelteBrukereCheckbox = (
            <BarInput
                id="nyeBrukere"
                type="checkbox"
                name="utfordeltebruker"
                className="checkboks"
                value="UTFORDELTE_BRUKERE"
                onChange={this.handleChange}
                checked={ferdigfilterListe.includes(UTFORDELTE_BRUKERE)}
                tekstId="enhet.filtrering.filtrering.oversikt.utfordelte.brukere.checkbox"
                antall={this.props.statustall.data.utfordelteBrukere}
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
                <div className="typo-element blokk-m">
                    <Element className="blokk-xxs" tag="h3">
                        <FormattedMessage
                            id="filtrering.status.totalt-antall-brukere"
                            values={{ antall: this.props.statustall.data.totalt }}
                        />
                    </Element>
                </div>
                { this.props.filtergruppe === 'enhet' ? utfordelteBrukereCheckbox : nyeBrukereForVeilederCheckbox }
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
        filterId, filtervalg, ownProps.filtergruppe, ownProps.veileder.ident))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringStatus);
