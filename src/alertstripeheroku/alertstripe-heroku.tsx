import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';

function AlertStripeHeroku() {
        return (

            <AlertStripe type="advarsel">
                <div className="listevisning--infopanel" aria-live="assertive" role="alert" aria-atomic="true">
                    Dette er en testapplikasjon. Alle data er fiktive og ingen endring vil bli lagret.
                </div>
            </AlertStripe>
        );
}

export default AlertStripeHeroku;
