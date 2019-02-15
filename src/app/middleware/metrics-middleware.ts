import { ENDRE_FILTER, VEILEDER_SOKT_FRA_TOOLBAR } from '../ducks/filtrering';
import { logEvent } from '../utils/frontend-logger';
import { SETT_VISNINGSMODUS, SETUP } from '../ducks/paginering';
import { SETT_SORTERING, TILDEL_VEILEDER } from '../ducks/portefolje';
import { ActionTypeKeys } from '../ducks/ui/listevisning';
import { ToolbarPosisjon } from '../components/toolbar/toolbar';
import { VIS_MODAL } from '../ducks/modal';
import { getSorteringsFeltFromUrl } from '../utils/url-utils';

interface FilterEndringData {
    filterId: string;
    filterVerdi: string | string[];
}

function finnSideNavn(): string {
    const pathname = window.location.pathname;

    if (pathname.endsWith('/veiledere')) {
        return 'veileder-oversikt';
    } else if (pathname.endsWith('/enhet')) {
        return 'enhet-oversikt';
    } else if (pathname.endsWith('/portefolje')) {
        return 'min-oversikt';
    }

    return 'ukjent';
}

export const metricsMiddleWare = (store: any) => (next: any) => (action: any) => {

    const { type, data, toolbarPosisjon } = action;
    const sideNavn = finnSideNavn();

    switch (type) {
        case ENDRE_FILTER:
            loggEndreFilter(sideNavn, data);
            break;
        case SETUP:
            loggPaginering(sideNavn, data, toolbarPosisjon);
            break;
        case TILDEL_VEILEDER:
            loggTildelVeileder(sideNavn, toolbarPosisjon);
            break;
        case ActionTypeKeys.VELG_ALTERNATIV:
            loggEndreListevisning(sideNavn, toolbarPosisjon);
            break;
        case VIS_MODAL:
            loggArbeidslisteApne(sideNavn, toolbarPosisjon);
            break;
        case SETT_VISNINGSMODUS:
            loggEndreVisningsModus(sideNavn, action.visningsmodus, toolbarPosisjon);
            break;
        case SETT_SORTERING:
            loggEndreSortering(sideNavn, action.sorteringsfelt, action.sorteringsrekkefolge);
            break;
        case VEILEDER_SOKT_FRA_TOOLBAR:
            loggVeilederSoktFraToolbar(sideNavn, toolbarPosisjon);
            break;
    }

    next(action);
};

const loggEndreFilter = (sideNavn: string, data: FilterEndringData) => {
    logEvent('portefolje.metrikker.endre_filter', { sideNavn, filter: data.filterId, verdi: data.filterVerdi });
};

const loggPaginering = (sideNavn: string, data: any, toolbarPosisjon: ToolbarPosisjon) => {
    if (data.side > 1) {
        logEvent('portefolje.metrikker.paginering', { sideNavn, seAlle: data.seAlle, toolbarPosisjon });
    }
};

const loggTildelVeileder = (sideNavn: string, toolbarPosisjon: ToolbarPosisjon) => {
    logEvent('portefolje.metrikker.tildel_veileder', { sideNavn, toolbarPosisjon });
};

const loggEndreListevisning = (sideNavn: string, toolbarPosisjon: ToolbarPosisjon) => {
    logEvent('portefolje.metrikker.listevisning_endret', { sideNavn, toolbarPosisjon });
};

const loggArbeidslisteApne = (sideNavn: string, toolbarPosisjon: ToolbarPosisjon) => {
    logEvent('portefolje.metrikker.arbeidsliste_apne', { sideNavn, toolbarPosisjon });
};

const loggEndreVisningsModus = (sideNavn: string, visningsmodus: string, toolbarPosisjon: ToolbarPosisjon) => {
    logEvent('portefolje.metrikker.endre_visningsmodus', { sideNavn, visningsmodus, toolbarPosisjon });
};

const loggEndreSortering = (sideNavn: string, sorteringsfelt: string, rekkefolge: string) => {
    if ((sorteringsfelt !== 'etternavn' || rekkefolge !== 'ascending')
        && (sorteringsfelt !== 'ikke_satt' || rekkefolge !== 'ikke_satt')) {
        logEvent('portefolje.metrikker.endre_sortering', { sideNavn, sorteringsfelt, rekkefolge });
    }
};

const loggVeilederSoktFraToolbar = (sideNavn: string, toolbarPosisjon: ToolbarPosisjon) => {
    logEvent('portefolje.metrikker.veileder_sokt_fra_toolbar', { sideNavn, toolbarPosisjon });
};
