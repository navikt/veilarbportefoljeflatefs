import React, {useState}  from 'react';
import {useSelector} from 'react-redux';
import {Innholdstittel, Normaltekst} from 'nav-frontend-typografi';
import { AppState } from '../reducer';
import { AdvarselModal } from '../components/advarselmodal/advarsel-modal';
import { Hovedknapp } from 'nav-frontend-knapper';

function TomPortefoljeModal () {
    const erNullBrukere =  useSelector((state: AppState) => state.statustall.data.totalt === 0);
    const [isOpen, setIsOpen] = useState(erNullBrukere);

    return (
        <AdvarselModal
            portalClassName="brukercontext-modal"
            className="brukercontext-modal__content"
            contentLabel="Enheten har ingen brukere"
            isOpen={isOpen}
            onRequestClose={()=> setIsOpen(false)}
            closeButton
        >
            <Innholdstittel className="blokk-s" tag="h1">
                Handlingen kan ikke utføres
            </Innholdstittel>
            <Normaltekst className="blokk-s">
                Enheten har ikke portefølje. Vennligst bytt!
            </Normaltekst>
            <div className="blokk-s">
                <Hovedknapp className="ok-knapp" onClick={()=> setIsOpen(false)}>
                    Ok
                </Hovedknapp>
            </div>
        </AdvarselModal>
    );

}

export default TomPortefoljeModal;
