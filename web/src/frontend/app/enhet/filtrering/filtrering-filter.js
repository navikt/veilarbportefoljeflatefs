import React, { PropTypes as PT, createElement, Component } from 'react';
import { connect } from 'react-redux';
import { Element } from 'nav-frontend-typografi';
import { endreFiltervalgMellomlagring } from '../../ducks/filtrering-mellomlagring';
import { endreFiltervalg } from '../../ducks/filtrering';
import FiltreringDemografi from './filtrering-demografi';
import FiltreringSituasjon from './filtrering-situasjon';
import { filtervalgMellomlagringShape, filtervalgShape } from '../../proptype-shapes';
import { erFiltervalgEndret } from '../../utils/utils';
import DropdownContainer from './../../components/dropdown/dropdown-container';
import Dropdown from './../../components/dropdown/dropdown';
import checkboksform from './../../components/checkbox-filterform/checkbox-filterform-factory';
import { range, lag2Sifret } from '../../utils/utils';

const aldersIntervaller = [
    '19 og under',
    '20-24',
    '25-29',
    '30-39',
    '40-49',
    '50-59',
    '60-66',
    '67-70'
].map((alder, index) => ({ value: index, label: alder, checked: false }));
const fodselsdagIMnd = range(1, 31, true).map((x, index) => ({
    value: index,
    label: lag2Sifret(x),
    checked: false
}));
const kjonn = ['Kvinne', 'Mann'].map(
    (kjonn, index) => ({
        value: index,
        label: kjonn,
        checked: false
    })
);

function prepFormdata(data, filtervalg) {
    // data: [{ value, label, checked }]
    // filtervalg: [ 1 ]
    return data
        .map((valg) => {
            if (filtervalg.includes(valg.value)) {
                valg.checked = true;
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

        return (
            <div className="filtrering-filter">
                <DropdownContainer>
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
                            <Dropdown name="dropdown-4">
                                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur aut dicta ducimus maxime, nostrum pariatur quam rem repellendus veritatis. Doloribus esse expedita hic, itaque iure laudantium nostrum quas repellendus sunt.</span>
                            </Dropdown>
                            <Dropdown name="dropdown-5">
                                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur aut dicta ducimus maxime, nostrum pariatur quam rem repellendus veritatis. Doloribus esse expedita hic, itaque iure laudantium nostrum quas repellendus sunt.</span>
                            </Dropdown>
                            <Dropdown name="dropdown-6">
                                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur aut dicta ducimus maxime, nostrum pariatur quam rem repellendus veritatis. Doloribus esse expedita hic, itaque iure laudantium nostrum quas repellendus sunt.</span>
                            </Dropdown>
                        </div>
                        <div className="col-sm-3">
                            <Element>Situasjon</Element>
                            <Dropdown name="dropdown-7">
                                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur aut dicta ducimus maxime, nostrum pariatur quam rem repellendus veritatis. Doloribus esse expedita hic, itaque iure laudantium nostrum quas repellendus sunt.</span>
                            </Dropdown>
                            <Dropdown name="dropdown-8">
                                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur aut dicta ducimus maxime, nostrum pariatur quam rem repellendus veritatis. Doloribus esse expedita hic, itaque iure laudantium nostrum quas repellendus sunt.</span>
                            </Dropdown>
                            <Dropdown name="dropdown-9">
                                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur aut dicta ducimus maxime, nostrum pariatur quam rem repellendus veritatis. Doloribus esse expedita hic, itaque iure laudantium nostrum quas repellendus sunt.</span>
                            </Dropdown>
                        </div>
                        <div className="col-sm-3">
                            <Element>Aktivitetsplan</Element>
                            <Dropdown name="dropdown-10" className="dropdown--alignright">
                                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur aut dicta ducimus maxime, nostrum pariatur quam rem repellendus veritatis. Doloribus esse expedita hic, itaque iure laudantium nostrum quas repellendus sunt.</span>
                            </Dropdown>
                            <Dropdown name="dropdown-11" className="dropdown--alignright">
                                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur aut dicta ducimus maxime, nostrum pariatur quam rem repellendus veritatis. Doloribus esse expedita hic, itaque iure laudantium nostrum quas repellendus sunt.</span>
                            </Dropdown>
                            <Dropdown name="dropdown-12" className="dropdown--alignright">
                                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur aut dicta ducimus maxime, nostrum pariatur quam rem repellendus veritatis. Doloribus esse expedita hic, itaque iure laudantium nostrum quas repellendus sunt.</span>
                            </Dropdown>
                        </div>
                    </div>
                </DropdownContainer>
                <FiltreringDemografi
                    filtervalg={this.props.filtervalg}
                    filtervalgMellomlagring={this.props.filtervalgMellomlagring}
                    handleChange={this.handleChange}
                    endreFilter={this.props.endreFilter}
                />
                <FiltreringSituasjon
                    filtervalg={this.props.filtervalg}
                    filtervalgMellomlagring={this.props.filtervalgMellomlagring}
                    handleChange={this.handleChange}
                    endreFilter={this.props.endreFilter}
                />
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
