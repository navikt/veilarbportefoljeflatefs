import * as React from 'react';
import Modal from 'nav-frontend-modal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { IntlMessage } from '../utils/intl-utils';

interface FeilmeldingBrukereModalProps {
    isOpen?: boolean;
    fnr: string[];
    onClose: () => void;
    tittelTekstID: string;
    infotekstTekstID: string;
}

interface FeilmeldingBrukereModalState {
    isOpen?: boolean;
}

Modal.setAppElement('#applikasjon');

const fnrsToList = (fnrs) => (<ul>{(fnrs.map((fnr) => <li key={fnr} className="fnr__listitem">{fnr}</li>))}</ul>);

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
        const { tittelTekstID, infotekstTekstID, fnr } = this.props;
        return (
            <Modal
                contentLabel="Modal tilordning feilet"
                isOpen={this.state.isOpen || false}
                onRequestClose={this.lukkModal}
                closeButton={false}
            >
                <div className="feiletbrukere__modal">
                    <div className="feiledbrukeremelding blokk-m">
                        <div className="feiledbrukeremelding__ikon blokk-xxs" />
                    </div>
                    <Undertittel tag="h1" className="blokk-xxs">
                        <IntlMessage id={tittelTekstID} />
                    </Undertittel>
                    <Normaltekst className="blokk-s">
                        <IntlMessage id={infotekstTekstID} />
                    </Normaltekst>
                    {fnrsToList(fnr)}
                    <button className="knapp knapp--hoved" onClick={this.lukkModal}>
                        <IntlMessage id="modal.tilordning.feilet.knapptekst" />
                    </button>
                </div>
            </Modal>
        );
    }
}

export default FeilmeldingBrukereModal;
