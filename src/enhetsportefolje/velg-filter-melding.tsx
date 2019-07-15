import * as React from 'react';
import { AlertStripeInfoSolid } from 'nav-frontend-alertstriper';

function VelgFilterMelding() {
    return (

        <AlertStripeInfoSolid className="blokk-m" >
            <div className="listevisning--infopanel" aria-live="assertive" role="alert" aria-atomic="true">
                Du må gjøre en filtrering for å se brukere i listen.
            </div>
        </AlertStripeInfoSolid>
    );
}

export default VelgFilterMelding;
