import * as React from 'react';
import Modal from 'nav-frontend-modal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { IntlMessage } from '../utils/intl-utils';
import { injectIntl, InjectedIntl } from 'react-intl';

interface FeilmeldingBrukereModalProps {
    isOpen?: boolean;
    fnr: string[];
    onClose: () => void;
    tittelTekstID: string;
    infotekstTekstID: string;
    intl: InjectedIntl;
}

interface FeilmeldingBrukereModalState {
    isOpen?: boolean;
}

function FnrList({ feiledeTilordninger }) {
    const listElements = feiledeTilordninger.map((tilordning) => (
        <li key={tilordning.brukerFnr} className="fnr__listitem">{tilordning.brukerFnr}</li>
    ));

    return (
        <ul>
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
        const { tittelTekstID, infotekstTekstID, fnr, intl } = this.props;

        return (
            <Modal
                contentLabel={intl.formatMessage({ id: 'modal.feilmelding.brukere' })}
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
                    <FnrList feiledeTilordninger={fnr} />
                    <button className="knapp knapp--hoved" onClick={this.lukkModal}>
                        <IntlMessage id="modal.tilordning.feilet.knapptekst" />
                    </button>
                </div>
            </Modal>
        );
    }
}

export default injectIntl(FeilmeldingBrukereModal);
