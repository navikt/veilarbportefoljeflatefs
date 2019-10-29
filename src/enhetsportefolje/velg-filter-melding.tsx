import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';

function VelgFilterMelding() {
    return (

        <Alertstripe type="info" className="blokk-m" >
            <div className="listevisning--infopanel" aria-live="assertive" role="alert" aria-atomic="true">
                Du må gjøre en filtrering for å se brukere i listen.
            </div>
        </Alertstripe>
    );
}

export default VelgFilterMelding;
