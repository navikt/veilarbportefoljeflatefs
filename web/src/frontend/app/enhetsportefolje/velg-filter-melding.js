import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

function VelgFilterMelding() {
    return (
        <div className="velgfiltermelding">
            <div className="velgfiltermelding__ikon blokk-xxs" />

            <Undertittel aria-live="polite" aria-atomic="true">
                <FormattedMessage id="velgfilter.melding" />
            </Undertittel>
        </div>
    );
}


export default VelgFilterMelding;
