import {
    ENDRE_AKTIVITETER_OG_FJERN_TILTAK_FILTER,
    ENDRE_FILTER,
    VEILEDER_SOKT_FRA_TOOLBAR
} from '../ducks/filtrering';
import { logEvent } from '../utils/frontend-logger';
import { SETT_VISNINGSMODUS, SETUP } from '../ducks/paginering';
import { SETT_MARKERT_BRUKER_ALLE, SETT_SORTERING, TILDEL_VEILEDER } from '../ducks/portefolje';
import { ActionTypeKeys, Kolonne } from '../ducks/ui/listevisning';
import { ToolbarPosisjon } from '../components/toolbar/toolbar';
import { VIS_MODAL } from '../ducks/modal';
import { SORTERT_PA } from '../ducks/sortering';

interface FilterEndringData {
    filterId: string;
    filterVerdi: string | string[];
}

enum SideNavn {
    VEILEDER_OVSERIKT = 'VEILEDER_OVERSIKT',
    ENHETENS_OVERSIKT = 'ENHETENS_OVERSIKT',
    MIN_OVERSIKT = 'MIN_OVERSIKT',
    UKJENT = 'UKJENT'
}

export function finnSideNavn(): SideNavn {
    const pathname = window.location.pathname;

    if (pathname.endsWith('/veiledere')) {
        return SideNavn.VEILEDER_OVSERIKT;
    } else if (pathname.endsWith('/enhet')) {
        return SideNavn.ENHETENS_OVERSIKT;
    } else if (pathname.endsWith('/portefolje')) {
        return SideNavn.MIN_OVERSIKT;
    }

    return SideNavn.UKJENT;
}

function finnElementerSomErLagtTil(prevElementer: string[], nyeElementer: string[]): string[] {

    const elementerLagtTil: string[] = [];

    nyeElementer.forEach((element) => {
        if (prevElementer.indexOf(element) === -1) {
            elementerLagtTil.push(element);
        }
    });

    return elementerLagtTil;
}

function finnFiltreringForSide(store: any, sideNavn: SideNavn) {

    const state = store.getState();
    let filtrering;

    switch (sideNavn) {
        case SideNavn.ENHETENS_OVERSIKT:
            filtrering = state.filtrering;
            break;
        case SideNavn.VEILEDER_OVSERIKT:
            filtrering = state.filtreringVeilederoversikt;
            break;
        default:
            filtrering = state.filtreringMinoversikt;
            break;
    }

    return filtrering;
}

export const metricsMiddleWare = (store: any) => (next: any) => (action: any) => {

    const { type, data, toolbarPosisjon, kolonne} = action;
    const sideNavn = finnSideNavn();

    switch (type) {
        case ENDRE_FILTER:
            loggEndreFilter(sideNavn, data, store);
            break;
        case SETUP:
            loggPaginering(sideNavn, data, toolbarPosisjon);
            break;
        case TILDEL_VEILEDER:
            loggTildelVeileder(sideNavn, toolbarPosisjon);
            break;
        case ActionTypeKeys.VELG_ALTERNATIV:
            loggEndreListevisning(sideNavn, toolbarPosisjon, kolonne);
            break;
        case ActionTypeKeys.AVVELG_ALTERNATIV:
            loggAvvelgListevalg(sideNavn, kolonne);
            break;
        case VIS_MODAL:
            loggArbeidslisteApne(sideNavn, toolbarPosisjon);
            break;
        case SETT_VISNINGSMODUS:
            loggEndreVisningsModus(sideNavn, action.visningsmodus, toolbarPosisjon);
            break;
        case SORTERT_PA:
            loggEndreSortering(sideNavn, data.property, '');
            break;
        case SETT_SORTERING:
            loggEndreSortering(sideNavn, action.sorteringsfelt, action.sorteringsrekkefolge);
            break;
        case SETT_MARKERT_BRUKER_ALLE:
            loggVelgAlle(sideNavn, toolbarPosisjon);
            break;
        case VEILEDER_SOKT_FRA_TOOLBAR:
            loggVeilederSoktFraToolbar(sideNavn, toolbarPosisjon);
            break;
        case ENDRE_AKTIVITETER_OG_FJERN_TILTAK_FILTER:
            loggEndreAktivitetFilter(sideNavn);
            break;

    }

    return next(action);
};

function mapVeilederIdentTilNonsens(veilederIdent: string) {
   return [...veilederIdent]
       .map(veilederChar => veilederChar.charCodeAt(0) << 6)
       .map(veilederChar => veilederChar % 255)
       .map(hexChar => hexChar.toString(16))
       .join("")
}

export const loggEndreFilter = (sideNavn: SideNavn, data: FilterEndringData, store: any) => {
    const veilederIndent = mapVeilederIdentTilNonsens(store.getState().enheter.ident);
    if (data.filterId === 'veilederNavnQuery') {
        return;
    }

    if (Array.isArray(data.filterVerdi)) {

        const filtrering = finnFiltreringForSide(store, sideNavn);
        const prevFilter = filtrering[data.filterId];
        const lagtTilFilterVerdier = finnElementerSomErLagtTil(prevFilter, data.filterVerdi);

        lagtTilFilterVerdier.forEach((verdi) => {
            logEvent('portefolje.metrikker.endre_filter', { sideNavn, filter: data.filterId, verdi }, {veilederIdent: veilederIndent});
        });

    } else {
        logEvent('portefolje.metrikker.endre_filter', { sideNavn, filter: data.filterId, verdi: data.filterVerdi }, {veilederIdent: veilederIndent});
    }

};

const loggEndreAktivitetFilter = (sideNavn: SideNavn) => {
    logEvent('portefolje.metrikker.endre_filter', { sideNavn, filter: 'aktiviteter' });
};

const loggPaginering = (sideNavn: SideNavn, data: any, toolbarPosisjon: ToolbarPosisjon) => {
    if (data.side > 1) {
        logEvent('portefolje.metrikker.paginering', { sideNavn, toolbarPosisjon });
    } else if (data.seAlle) {
        logEvent('portefolje.metrikker.se_alle', { sideNavn, toolbarPosisjon });
    }
};

const loggTildelVeileder = (sideNavn: SideNavn, toolbarPosisjon: ToolbarPosisjon) => {
    logEvent('portefolje.metrikker.tildel_veileder', { sideNavn, toolbarPosisjon });
};

const loggEndreListevisning = (sideNavn: SideNavn, toolbarPosisjon: ToolbarPosisjon, kolonne: Kolonne) => {
    logEvent('portefolje.metrikker.listevisning_endret', { sideNavn, toolbarPosisjon, kolonne });
};

const loggAvvelgListevalg = (sideNavn: SideNavn, kolonne: Kolonne) => {
    logEvent('portefolje.metrikker.listevisning_avvelget', { sideNavn, kolonne });
};

const loggArbeidslisteApne = (sideNavn: SideNavn, toolbarPosisjon: ToolbarPosisjon) => {
    logEvent('portefolje.metrikker.arbeidsliste_apne', { sideNavn, toolbarPosisjon });
};

const loggEndreVisningsModus = (sideNavn: SideNavn, visningsmodus: string, toolbarPosisjon: ToolbarPosisjon) => {
    logEvent('portefolje.metrikker.endre_visningsmodus', { sideNavn, visningsmodus, toolbarPosisjon });
};

const loggEndreSortering = (sideNavn: SideNavn, sorteringsfelt: string, rekkefolge: string) => {
    if ((sorteringsfelt !== 'etternavn' || rekkefolge !== 'ascending')
        && (sorteringsfelt !== 'ikke_satt' || rekkefolge !== 'ikke_satt')) {
        logEvent('portefolje.metrikker.endre_sortering', { sideNavn, sorteringsfelt, rekkefolge });
    }
};

const loggVeilederSoktFraToolbar = (sideNavn: SideNavn, toolbarPosisjon: ToolbarPosisjon) => {
    logEvent('portefolje.metrikker.veileder_sokt_fra_toolbar', { sideNavn, toolbarPosisjon });
};

const loggVelgAlle = (sideNavn: SideNavn, toolbarPosisjon: ToolbarPosisjon) => {
    logEvent('portefolje.metrikker.velg_alle', { sideNavn, toolbarPosisjon });
};
