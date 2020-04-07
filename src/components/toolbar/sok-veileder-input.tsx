import { markerAlleBrukere } from '../../ducks/portefolje';
import { nameToStateSliceMap } from '../../ducks/utils';
import { Component, useEffect, useState } from 'react';
import SokVeiledere from '../sok-veiledere/sok-veiledere';
import { BrukerModell, FiltervalgModell } from '../../model-interfaces';
import { AppState } from '../../reducer';
import { connect } from 'react-redux';
import React from 'react';

interface SokVeilederInputProps {
    isOpen: boolean;
    skjulSokVeilederModal: () => void;
    fjernMarkerteBrukere: () => void;
    innloggetVeileder: string;
    veileder: any;
    filtervalg: FiltervalgModell;
}

interface SokVeilederInputState {
    formIsDirty: boolean;
    isOpen: boolean;
}

class SokVeilederInput extends Component<SokVeilederInputProps, SokVeilederInputState> {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: this.props.isOpen,
            formIsDirty: false

        };
        this.lukkModal = this.lukkModal.bind(this);
        this.setFormIsDirty = this.setFormIsDirty.bind(this);
    }

    componentWillReceiveProps(nextProps: SokVeilederInputProps) {
        if (nextProps.isOpen !== this.state.isOpen) {
            this.setState({isOpen: nextProps.isOpen});
        }
    }

    setFormIsDirty(formIsDirty: boolean) {
        this.setState({...this.state, formIsDirty});
    }

    lukkModal() {
        const {skjulSokVeilederModal, fjernMarkerteBrukere} = this.props;
        if (!this.state.formIsDirty || window.confirm()) {
            this.setState({isOpen: false});
            fjernMarkerteBrukere();
            skjulSokVeilederModal();
        }
    }

    brukere(valgteBrukere: BrukerModell[]) {
        return valgteBrukere.filter((bruker) => bruker.arbeidsliste);
    }

    render() {
        return (
            <SokVeilederForm filtervalg={this.props.filtervalg}/>
        );
    }
}

function SokVeilederForm(props: { filtervalg: FiltervalgModell }) {

    const [valgteVeiledere, setValgteVeiledere] = useState<string[]>(props.filtervalg.veiledere || []);
    useEffect(() => {
        setValgteVeiledere(props.filtervalg.veiledere || []);
    }, [props.filtervalg.veiledere]);

    const hanterChange = (erValgt, veilederTarget) => erValgt
        ? setValgteVeiledere([veilederTarget, ...valgteVeiledere])
        : setValgteVeiledere(valgteVeiledere.filter(veileder => veileder !== veilederTarget));

    return (
        <SokVeiledere
            erValgt={ident => valgteVeiledere.includes(ident)}
            hanterVeilederValgt={hanterChange}
            veileder={{}}
        />
    );

}

const mapStateToProps = (state: AppState, ownProps) => {
    const stateSlice = nameToStateSliceMap[ownProps.filtergruppe] || 'filtrering';
    return ({
        filtervalg: state[stateSlice],
        innloggetVeileder: state.inloggetVeileder.data!.ident,
    });
};

const mapDispatchToProps = (dispatch) => ({
    fjernMarkerteBrukere: () => dispatch(markerAlleBrukere(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(SokVeilederInput);
