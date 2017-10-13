import * as React from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import {Innholdstittel, Normaltekst} from "nav-frontend-typografi";
import {AlertStripeAdvarselSolid} from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';

interface NyContextModalProps {
    isOpen: boolean;
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
                    <AlertStripeAdvarselSolid className="blokk-s">
                        <span>
                            Du har enret enhet i et annet vindu. Du kan ikke jobbe i 2 enheter samtidig. Velger du
                            avbryt mister du arbeidet du ikke har lagret.
                        </span>
                    </AlertStripeAdvarselSolid>
                    <Normaltekst className="blokk-s">
                        Ønsker du å fortsette å jobbe på enheten "navn-på-enhet"?
                    </Normaltekst>
                </div>
            </NavFrontendModal>
        );
    }
}

export default NyContextModal;
