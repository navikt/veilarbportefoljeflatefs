import {Element} from 'nav-frontend-typografi';
import * as React from 'react';
import TakkIkon from './takk-ikon.png';

function TilbakemeldingTakkModal() {
    return (
        <div className="tilbakemelding-modal__takk-melding">
            <img
                alt="Takk for din tilbakemelding"
                className="tilbakemelding-modal__takk-ikon"
                src={TakkIkon}
            />
            <Element>
                Takk for at du tok deg tid til å gi tilbakemelding. Vi bruker innspillene til å forbedre løsningen.
            </Element>
        </div>
    );
}

export default TilbakemeldingTakkModal;
