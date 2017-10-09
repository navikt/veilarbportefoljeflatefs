import * as React from 'react';
import {AlertStripeInfoSolid} from 'nav-frontend-alertstriper';
import { Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

function VelgFilterMelding() {
    return (

        <AlertStripeInfoSolid className="blokk-m" >
            <div className="listevisning--infopanel" aria-live="assertive" role="alert" aria-atomic="true">
                <FormattedMessage id="velgfilter.melding" />
            </div>
        </AlertStripeInfoSolid>
    );
}

export default VelgFilterMelding;
