import React from 'react';
import 'moment/locale/nb';
import {loggBrowserMetrikker} from './utils/metrikker/browser-metrikker';
import AlertStripe from "nav-frontend-alertstriper";
import './stengetid.less'

loggBrowserMetrikker();


function Routes() {
    return (
        <AlertStripe type="advarsel" className="varsel-om-stengetid" aria-live="assertive" role="alert" aria-atomic="true">
            <p>Tjenesten er stengt på grunn av arbeid med kommunesammenslåing. Tjenesten skal etter planen åpnes igjen 2. januar.</p>
        </AlertStripe>
    );
}

export default Routes;
