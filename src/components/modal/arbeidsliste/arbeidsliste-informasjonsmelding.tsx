import * as React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';

const ArbeidslisteInformasjonsmelding = () => (
    <AlertStripe type="info" className="stor-feil-modal">
        Arbeidslisten er <b>kun</b> til internt bruk. Informasjon som er relevant for personen eller saksbehandlingen
        skal alltid deles i dialogen.
        <br />
        <Lenke
            href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Oversikten-i-Modia.aspx#slik-bruker-du-arbeidslisten"
            target="_blank"
        >
            <b>Les mer om hvordan bruke arbeidslisten på Navet.</b>
        </Lenke>
    </AlertStripe>
);

export default ArbeidslisteInformasjonsmelding;
