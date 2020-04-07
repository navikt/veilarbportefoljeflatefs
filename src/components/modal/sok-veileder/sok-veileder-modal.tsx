import { markerAlleBrukere } from '../../../ducks/portefolje';
import { skjulModal } from '../../../ducks/modal';
import React, { Component, useEffect, useState } from 'react';
import { AppState } from '../../../reducer';
import { connect } from 'react-redux';
import Modal from '../modal';
import { BrukerModell, FiltervalgModell } from '../../../model-interfaces';
import SokVeiledere from '../../sok-veiledere/sok-veiledere';
import { nameToStateSliceMap } from '../../../ducks/utils';

interface SokVeilederModalProps {
    isOpen: boolean;
    skjulSokVeilederModal: () => void;
    fjernMarkerteBrukere: () => void;
    innloggetVeileder: string;
    veileder: any;
    filtervalg: FiltervalgModell;
}

interface SokVeilederModalState {
    formIsDirty: boolean;
    isOpen: boolean;
}

class SokVeilederModal extends Component<SokVeilederModalProps, SokVeilederModalState> {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: this.props.isOpen,
            formIsDirty: false

        };
        this.lukkModal = this.lukkModal.bind(this);
        this.setFormIsDirty = this.setFormIsDirty.bind(this);
    }

    componentWillReceiveProps(nextProps: SokVeilederModalProps) {
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
            <Modal
                className='sok-veileder-modal'
                contentLabel="sokveileder"
                isOpen={this.state.isOpen || false}
                onRequestClose={this.lukkModal}
                tittel="Søk veileder"
            >
                <SokVeilederForm filtervalg={this.props.filtervalg}/>

            </Modal>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps) => {
    const stateSlice = nameToStateSliceMap[ownProps.filtergruppe] || 'filtrering';
    return ({
        filtervalg: state[stateSlice],
        innloggetVeileder: state.inloggetVeileder.data!.ident,
    });
};

const mapDispatchToProps = (dispatch) => ({
    skjulSokVeilederModal: () => dispatch(skjulModal()),
    fjernMarkerteBrukere: () => dispatch(markerAlleBrukere(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(SokVeilederModal);

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
