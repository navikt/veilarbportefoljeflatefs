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
import { NY_FEILET_MODAL, REDIGERING_FEILET_MODAL, SLETTING_FEILET_MODAL } from '../ducks/modal-serverfeil';
import {
    NY_VEILEDERGRUPPER_OK,
    REDIGER_VEILEDERGRUPPER_OK,
    SLETT_VEILEDERGRUPPER_OK
} from '../ducks/lagret-filter';

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

function finnSlettetVeilederGruppe(store: any, filterId: number) {
    const lagretGruppe = store.getState().lagretFilter.data.find(v => v.filterId === filterId);
    if (lagretGruppe) {
        return lagretGruppe.opprettetDato;
    }
    return undefined;
}

export const metricsMiddleWare = (store: any) => (next: any) => (action: any) => {

    const {type, data, toolbarPosisjon, kolonne} = action;
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
            loggEndreListevisning(sideNavn, kolonne);
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
        case SLETTING_FEILET_MODAL:
            loggSlettVeiledergruppeFeilet();
            break;
        case REDIGERING_FEILET_MODAL:
            loggRedigerVeiledergruppeFeilet();
            break;
        case NY_FEILET_MODAL:
            loggNyVeiledergruppeFeilet();
            break;
        case SLETT_VEILEDERGRUPPER_OK: {
            const opprettetTidpunkt = finnSlettetVeilederGruppe(store, action.data);
            loggSlettVeiledergruppeOK(opprettetTidpunkt);
            break;
        }
        case NY_VEILEDERGRUPPER_OK:
            loggNyVeiledergruppeOK(action.data.filterValg.veiledere.length, store.getState().enheter.valgtEnhet.enhet.enhetId);
            break;
        case REDIGER_VEILEDERGRUPPER_OK:
            loggRedigerVeiledergruppeOK(action.data.filterValg.veiledere.length);
            break;
    }

    return next(action);
};

function mapVeilederIdentTilNonsens(veilederIdent: string) {
    return [...veilederIdent]
        .map(veilederChar => veilederChar.charCodeAt(0) << 6)
        .map(veilederChar => veilederChar % 255)
        .map(hexChar => hexChar.toString(16))
        .join('');
}

export const loggEndreFilter = (sideNavn: SideNavn, data: FilterEndringData, store: any) => {
    const veilederIdent = mapVeilederIdentTilNonsens(store.getState().enheter.ident);
    if (data.filterId === 'veilederNavnQuery') {
        return;
    }

    if (Array.isArray(data.filterVerdi)) {

        const filtrering = finnFiltreringForSide(store, sideNavn);
        const prevFilter = filtrering[data.filterId];
        const lagtTilFilterVerdier = finnElementerSomErLagtTil(prevFilter, data.filterVerdi);

        lagtTilFilterVerdier.forEach((verdi) => {
            logEvent('portefolje.metrikker.endre_filter', {
                sideNavn,
                filter: data.filterId,
                verdi
            }, {veilederIdent: veilederIdent});
        });

    } else {
        logEvent('portefolje.metrikker.endre_filter', {
            sideNavn,
            filter: data.filterId,
            verdi: data.filterVerdi
        }, {veilederIdent: veilederIdent});
    }

};

const loggEndreAktivitetFilter = (sideNavn: SideNavn) => {
    logEvent('portefolje.metrikker.endre_filter', {sideNavn, filter: 'aktiviteter'});
};

const loggPaginering = (sideNavn: SideNavn, data: any, toolbarPosisjon: ToolbarPosisjon) => {
    if (data.side > 1) {
        logEvent('portefolje.metrikker.paginering', {sideNavn, toolbarPosisjon});
    } else if (data.seAlle) {
        logEvent('portefolje.metrikker.se_alle', {sideNavn, toolbarPosisjon});
    }
};

const loggTildelVeileder = (sideNavn: SideNavn, toolbarPosisjon: ToolbarPosisjon) => {
    logEvent('portefolje.metrikker.tildel_veileder', {sideNavn, toolbarPosisjon});
};

const loggEndreListevisning = (sideNavn: SideNavn, kolonne: Kolonne) => {
    logEvent('portefolje.metrikker.listevisning_endret', {sideNavn, kolonne});
};

const loggAvvelgListevalg = (sideNavn: SideNavn, kolonne: Kolonne) => {
    logEvent('portefolje.metrikker.listevisning_avvelget', {sideNavn, kolonne});
};

const loggArbeidslisteApne = (sideNavn: SideNavn, toolbarPosisjon: ToolbarPosisjon) => {
    logEvent('portefolje.metrikker.arbeidsliste_apne', {sideNavn, toolbarPosisjon});
};

const loggEndreVisningsModus = (sideNavn: SideNavn, visningsmodus: string, toolbarPosisjon: ToolbarPosisjon) => {
    logEvent('portefolje.metrikker.endre_visningsmodus', {sideNavn, visningsmodus, toolbarPosisjon});
};

const loggEndreSortering = (sideNavn: SideNavn, sorteringsfelt: string, rekkefolge: string) => {
    if ((sorteringsfelt !== 'etternavn' || rekkefolge !== 'ascending')
        && (sorteringsfelt !== 'ikke_satt' || rekkefolge !== 'ikke_satt')) {
        logEvent('portefolje.metrikker.endre_sortering', {sideNavn, sorteringsfelt, rekkefolge});
    }
};

const loggVeilederSoktFraToolbar = (sideNavn: SideNavn, toolbarPosisjon: ToolbarPosisjon) => {
    logEvent('portefolje.metrikker.veileder_sokt_fra_toolbar', {sideNavn, toolbarPosisjon});
};

const loggVelgAlle = (sideNavn: SideNavn, toolbarPosisjon: ToolbarPosisjon) => {
    logEvent('portefolje.metrikker.velg_alle', {sideNavn, toolbarPosisjon});
};

const loggNyVeiledergruppeFeilet = () => {
    logEvent('portefolje.metrikker.veiledergrupper.oppretting-feilet');
};

const loggRedigerVeiledergruppeFeilet = () => {
    logEvent('portefolje.metrikker.veiledergrupper.lagring-feilet');
};

const loggSlettVeiledergruppeFeilet = () => {
    logEvent('portefolje.metrikker.veiledergrupper.sletting-feilet');
};

const loggNyVeiledergruppeOK = (antallVeiledere, enhetId) => {
    logEvent('portefolje.metrikker.veiledergrupper.oppretting-vellykket',
        {veiledere: antallVeiledere},
        {enhetId: enhetId});
};

const loggRedigerVeiledergruppeOK = (antallVeiledere) => {
    logEvent('portefolje.metrikker.veiledergrupper.lagring-vellykket',
        {veiledere: antallVeiledere});
};

const loggSlettVeiledergruppeOK = (opprettetTidspunkt) => {
    logEvent('portefolje.metrikker.veiledergrupper.sletting-vellykket',
        {levetid: (new Date().getTime() - new Date(opprettetTidspunkt).getTime()) / (1000 * 3600 * 24)});
};

