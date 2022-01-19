import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';

const ArbeidslisteInformasjonsmelding = () => (
    <AlertStripe type="info" className="stor-feil-modal">
        Arbeidslisten er <b>kun</b> til internt bruk. Informasjon som er relevant for personen eller saksbehandlingen skal
        alltid deles i dialogen.
    </AlertStripe>
);

export default ArbeidslisteInformasjonsmelding;

