import * as React from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeInfoSolid } from 'nav-frontend-alertstriper';
import Knapp, { Hovedknapp } from 'nav-frontend-knapper';

interface NyContextModalProps {
    isOpen: boolean;
    isPending: boolean;
    doEndreAktivEnhet: () => void;
    doBeholdAktivEnhet: () => void;
    aktivEnhet: string;
}

class NyContextModal extends React.Component<NyContextModalProps> {
    render() {
        return (
            <NavFrontendModal
                contentLabel="Brukercontext"
                isOpen={this.props.isOpen}
                closeButton={false}
                onRequestClose={() => true}
            >
                <div className="brukercontext__modal">
                    <Innholdstittel tag="h1" className="blokk-s">
                        Du har endret Enhet
                    </Innholdstittel>
                    <AlertStripeInfoSolid className="blokk-s">
                        Du har endret enhet i et annet vindu. Du kan ikke jobbe i 2 enheter samtidig.
                        Velger du 'endre' mister du arbeidet du ikke har lagret.
                    </AlertStripeInfoSolid>
                    <Normaltekst className="blokk-s">
                        {`Ønsker du å endre enhet til ${this.props.aktivEnhet}?`}
                    </Normaltekst>
                    <div className="modal-footer" >
                        <Hovedknapp disabled={this.props.isPending} onClick={() => this.props.doEndreAktivEnhet()}>
                            Endre
                        </Hovedknapp>
                        <Knapp onClick={this.props.doBeholdAktivEnhet} type="standard" spinner={this.props.isPending} autoDisableVedSpinner>
                            Behold
                        </Knapp>
                    </div>
                </div>
            </NavFrontendModal>
        );
    }
}

export default NyContextModal;
