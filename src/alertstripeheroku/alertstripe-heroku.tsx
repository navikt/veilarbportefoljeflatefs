import React from 'react';
import { AlertStripeInfoSolid } from 'nav-frontend-alertstriper';

function AlertStripeHeroku() {
        return (

            <AlertStripeInfoSolid>
                <div className="listevisning--infopanel" aria-live="assertive" role="alert" aria-atomic="true">
                    Dette er en testapplikasjon. Alle data er fiktive og ingen endring vil bli lagret.
                </div>
            </AlertStripeInfoSolid>
        );
}

export default AlertStripeHeroku;
