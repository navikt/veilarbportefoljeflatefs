import React, { PropTypes as PT, createElement, Component } from 'react';
import { connect } from 'react-redux';
import { Element } from 'nav-frontend-typografi';
import { endreFiltervalgMellomlagring } from '../../ducks/filtrering-mellomlagring';
import { endreFiltervalg } from '../../ducks/filtrering';
import { filtervalgMellomlagringShape, filtervalgShape } from '../../proptype-shapes';
import { erFiltervalgEndret, range, lag2Sifret } from '../../utils/utils';
import Dropdown from './../../components/dropdown/dropdown';
import checkboksform from './../../components/checkbox-filterform/checkbox-filterform-factory';
import radioform from './../../components/radio-filterform/radio-filterform-factory';

function lagChecklistdata(arr) {
    return arr.map((label, index) => ({ value: index, label: label, checked: false }));
}

const aldersIntervaller = lagChecklistdata([
    '19 og under',
    '20-24',
    '25-29',
    '30-39',
    '40-49',
    '50-59',
    '60-66',
    '67-70'
]);
const fodselsdagIMnd = range(1, 31, true).map((x, index) => ({
    value: index,
    label: lag2Sifret(x),
    checked: false
}));
const kjonn = lagChecklistdata(['Kvinne', 'Mann']);
const innsatsgrupper = lagChecklistdata([
    'Spesielt tilpasset innsats',
    'Situasjonsbestemt innsats',
    'Standardinnsats',
    'Varig tilpasset'
]);
const formidlingsgrupper = lagChecklistdata([
    'Arbeidssøker',
    'Ikke arbeidssøker',
    'Ikke servicebehov',
    'Pre arbeidssøker',
    'Pre reaktivert arbeidssøker'
]);
const servicegrupper = lagChecklistdata([
    'Behov for arbeidsevnevurdering',
    'Ikke vurdert',
    'Helserelatert arbeidsrettet oppfølging i NAV',
    'Varig tilpasset innsats',
    'Sykmeldt, oppfølging på arbeidsplassen',
    'Sykmeldt uten arbeidsgiver'
]);
const ytelser = [
    'ORDINARE_DAGPENGER',
    'DAGPENGER_MED_PERMITTERING',
    'DAGPENGER_OVRIGE',
    'AAP_MAXTID',
    'AAP_UNNTAK',
    'TILTAKSPENGER'
].map((ytelse) => ({
    name: 'ytelse',
    value: ytelse,
    label: ytelse.toLocaleLowerCase().replace(/\_/g, ' '),
    checked: false
}));

function prepFormdata(data, filtervalg) {
    // data: [{ value, label, checked }]
    // filtervalg: [ 1 ]
    return data
        .map((valg) => {
            if (filtervalg.includes(valg.value)) {
                return { ...valg, checked: true };
            }
            return valg;
        })
}

function prepRadioFormdata(data, filtervalg) {
    return data
        .map((valg) => {
            if (valg.value === filtervalg) {
                return { ...valg, checked: true };
            }
            return valg;
        })
}

function hentFilter(data) {
    return Object.entries(data)
        .filter(([_, value]) => value)
        .map(([key]) => parseInt(key.split('--')[0], 10));
}

class FiltreringFilter extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (erFiltervalgEndret(prevProps.filtervalg, this.props.filtervalg)) {
            this.props.oppdaterDatagrunnlag();
        }
    }

    handleChange(e, filter) {
        const { endreFilterMellomlagring, filtervalgMellomlagring } = this.props;

        const newArray = Array.from(filtervalgMellomlagring[filter]);
        if (e.target.checked === true) {
            newArray.push(Number(e.target.value));
        } else {
            newArray.splice(newArray.indexOf(Number(e.target.value)), 1);
        }

        endreFilterMellomlagring(filter, newArray);
    }

    onSubmitHandler(filterId) {
        return (data) => {
            this.props.endreFilter(filterId, hentFilter(data));
            return false;
        };
    }

    render() {
        const AlderFilter = checkboksform('alder', prepFormdata(aldersIntervaller, this.props.filtervalg.alder));
        const FodselsdatoFilter = checkboksform('fodselsdato', prepFormdata(fodselsdagIMnd, this.props.filtervalg.fodselsdagIMnd));
        const KjonnsFilter = checkboksform('kjonn', prepFormdata(kjonn, this.props.filtervalg.kjonn));
        const InnsatsgrupppeFilter = checkboksform('innsatsgruppe', prepFormdata(innsatsgrupper, this.props.filtervalg.innsatsgruppe));
        const FormidlingsgruppeFilter = checkboksform('formidlingsgruppe', prepFormdata(formidlingsgrupper, this.props.filtervalg.formidlingsgruppe));
        const ServicegruppeFilter = checkboksform('servicegruppe', prepFormdata(servicegrupper, this.props.filtervalg.servicegruppe));
        const YtelseFilter = radioform('ytelse', prepRadioFormdata(ytelser, this.props.filtervalg.ytelse));

        return (
            <div className="filtrering-filter">
                <div className="row">
                    <div className="col-sm-3">
                        <Element>Demografi</Element>
                        <Dropdown name="Alder">
                            <AlderFilter onSubmit={this.onSubmitHandler('alder')}/>
                        </Dropdown>
                        <Dropdown name="Fødselsdato">
                            <FodselsdatoFilter onSubmit={this.onSubmitHandler('fodselsdagIMnd')}/>
                        </Dropdown>
                        <Dropdown name="Kjønn">
                            <KjonnsFilter onSubmit={this.onSubmitHandler('kjonn')}/>
                        </Dropdown>
                    </div>
                    <div className="col-sm-3">
                        <Element>Situasjon</Element>
                        <Dropdown name="Innsatsgruppe">
                            <InnsatsgrupppeFilter onSubmit={this.onSubmitHandler('innsatsgruppe')}/>
                        </Dropdown>
                        <Dropdown name="Formidlingsgruppe">
                            <FormidlingsgruppeFilter onSubmit={this.onSubmitHandler('formidlingsgruppe')}/>
                        </Dropdown>
                        <Dropdown name="Servicegruppe">
                            <ServicegruppeFilter onSubmit={this.onSubmitHandler('servicegruppe')}/>
                        </Dropdown>
                    </div>
                    <div className="col-sm-3">
                        <Element>Ytelse</Element>
                        <Dropdown name="Ytelse">
                            <YtelseFilter onSubmit={(data) => {
                                this.props.endreFilter('ytelse', data.ytelse);
                                return false;
                            }}/>
                        </Dropdown>
                    </div>
                </div>
            </div>
        );
    }
}

FiltreringFilter.propTypes = {
    endreFilterMellomlagring: PT.func.isRequired,
    endreFilter: PT.func.isRequired,
    filtervalg: filtervalgShape.isRequired,
    filtervalgMellomlagring: filtervalgMellomlagringShape.isRequired,
    oppdaterDatagrunnlag: PT.func.isRequired
};

const mapStateToProps = state => ({
    filtervalg: state.filtrering.filtervalg,
    filtervalgMellomlagring: state.filtreringMellomlagring.filtervalg
});

const mapDispatchToProps = dispatch => ({
    endreFilterMellomlagring: (filterId, filtervalg) => dispatch(endreFiltervalgMellomlagring(filterId, filtervalg)),
    endreFilter: (filterId, filtervalg) => dispatch(endreFiltervalg(filterId, filtervalg))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltreringFilter);
