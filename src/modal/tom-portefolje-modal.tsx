import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'nav-frontend-modal';
import { Innholdstittel } from 'nav-frontend-typografi';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { AppState } from '../reducer';

interface TomPortefoljeModalProps {
    isOpen: boolean;
}

interface TomPortefoljeModalState {
    isOpen: boolean;
}

class TomPortefoljeModal extends React.Component<TomPortefoljeModalProps, TomPortefoljeModalState> {
    constructor(props) {
        super(props);

        this.state = { isOpen: this.props.isOpen };

        this.lukkModal = this.lukkModal.bind(this);
    }

    lukkModal() {
        this.setState({ isOpen: false });
    }

    render() {
        return (
            <Modal
                className="tom-portefolje-modal"
                contentLabel="Enheten har ingen brukere"
                isOpen={this.state.isOpen}
                onRequestClose={this.lukkModal}
                closeButton
            >
                <div className="modal-header-wrapper">
                    <header className="modal-header"/>
                </div>
                <div className="innhold">
                    <Innholdstittel className="blokk-s" tag="h1">
                        Handlingen kan ikke utføres
                    </Innholdstittel>
                    <AlertStripeAdvarsel className="blokk-s">
                        Enheten har ikke portefølje. Vennligst bytt!
                    </AlertStripeAdvarsel>
                </div>
                <div className="modal-footer">
                    <button className="knapp knapp--hoved" onClick={this.lukkModal}>
                       Ok
                    </button>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps= (state: AppState): TomPortefoljeModalState =>({
    isOpen: state.statustall.data.totalt === 0,
});

export default connect(mapStateToProps, {}) (TomPortefoljeModal);
