import * as React from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { VarselModal, VarselModalType } from '../components/varselmodal/varselmodal';

interface FeilmeldingBrukereModalProps {
    isOpen?: boolean;
    fnr: string[];
    onClose: () => void;
    tittelTekst: string;
    infotekstTekst: string;
}

interface FeilmeldingBrukereModalState {
    isOpen?: boolean;
}

function FnrList({ feiledeTilordninger }) {
    const listElements = feiledeTilordninger.map((tilordning) => (
        <li key={tilordning.brukerFnr} className="fnr__listitem">{tilordning.brukerFnr}</li>
    ));

    return (
        <ul className="blokk-s">
            {listElements}
        </ul>
    );
}

class FeilmeldingBrukereModal extends React.Component<FeilmeldingBrukereModalProps, FeilmeldingBrukereModalState> {
    constructor(props) {
        super(props);

        this.state = { isOpen: this.props.isOpen };
        this.lukkModal = this.lukkModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen !== this.state.isOpen) {
            this.setState({ isOpen: nextProps.isOpen });
        }
    }

    lukkModal() {
        const { onClose } = this.props;
        onClose();

        this.setState({ isOpen: false });
    }

    render() {
        const { tittelTekst, infotekstTekst, fnr } = this.props;

        return (
            <VarselModal
                contentLabel="Modal tilordning feilet"
                isOpen={this.state.isOpen || false}
                onRequestClose={this.lukkModal}
                closeButton={false}
                type={VarselModalType.FEIL}
                portalClassName="feiletbrukere-modal"
                className="feiletbrukere-modal__content"
            >
                <Undertittel tag="h1" className="blokk-xxs">
                    {tittelTekst}
                </Undertittel>
                <Normaltekst className="blokk-s">
                    {infotekstTekst}
                </Normaltekst>
                <FnrList feiledeTilordninger={fnr} />
                <button className="knapp knapp--hoved" onClick={this.lukkModal}>
                    Ok
                </button>
            </VarselModal>
        );
    }
}

export default FeilmeldingBrukereModal;
