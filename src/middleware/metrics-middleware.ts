import {ENDRE_FILTER, VEILEDER_SOKT_FRA_TOOLBAR} from '../ducks/filtrering';
import {logEvent} from '../utils/frontend-logger';
import {SETUP} from '../ducks/paginering';
import {SETT_MARKERT_BRUKER_ALLE, SETT_SORTERING, TILDEL_VEILEDER} from '../ducks/portefolje';
import {ActionTypeKeys, Kolonne} from '../ducks/ui/listevisning';
import {SORTERT_PA} from '../ducks/sortering';
import {NY_FEILET_MODAL, REDIGERING_FEILET_MODAL, SLETTING_FEILET_MODAL} from '../ducks/modal-serverfeil';
import {
    NY_VEILEDERGRUPPER_OK,
    REDIGER_VEILEDERGRUPPER_OK,
    SLETT_VEILEDERGRUPPER_OK
} from '../ducks/veiledergrupper_filter';
import {
    HENT_MINEFILTER_FEILET,
    NY_MINEFILTER_FEILET,
    NY_MINEFILTER_OK,
    REDIGER_MINEFILTER_FEILET,
    REDIGER_MINEFILTER_OK,
    SLETT_MINEFILTER_FEILET,
    SLETT_MINEFILTER_OK,
    SORTER_MINEFILTER_FEILET,
    SORTER_MINEFILTER_OK
} from '../ducks/mine-filter';

interface FilterEndringData {
    filterId: string;
    filterVerdi: string[];
}

enum SideNavn {
    VEILEDER_OVERSIKT = 'VEILEDER_OVERSIKT',
    ENHETENS_OVERSIKT = 'ENHETENS_OVERSIKT',
    MIN_OVERSIKT = 'MIN_OVERSIKT',
    UKJENT = 'UKJENT'
}

export function finnSideNavn(): SideNavn {
    const pathname = window.location.pathname;

    if (pathname.endsWith('/veiledere')) {
        return SideNavn.VEILEDER_OVERSIKT;
    } else if (pathname.endsWith('/enhet')) {
        return SideNavn.ENHETENS_OVERSIKT;
    } else if (pathname.endsWith('/portefolje')) {
        return SideNavn.MIN_OVERSIKT;
    }

    return SideNavn.UKJENT;
}

function finnElementerSomErLagtTil(prevElementer: string[], nyeElementer: string[]): string[] {
    const elementerLagtTil: string[] = [];

    nyeElementer.forEach(element => {
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
            filtrering = state.filtreringEnhetensOversikt;
            break;
        case SideNavn.VEILEDER_OVERSIKT:
            filtrering = state.filtreringVeilederoversikt;
            break;
        default:
            filtrering = state.filtreringMinoversikt;
            break;
    }
    return filtrering;
}

function finnSlettetGruppe(store: any, filterId: number) {
    const lagretGruppe = store.getState().mineFilter.data.find(v => v.filterId === filterId);
    if (lagretGruppe) {
        return lagretGruppe.opprettetDato;
    }
    return undefined;
}

export const metricsMiddleWare = (store: any) => (next: any) => (action: any) => {
    const {type, data, kolonne} = action;
    const sideNavn = finnSideNavn();

    switch (type) {
        case ENDRE_FILTER:
            loggEndreFilter(sideNavn, data, store);
            break;
        case SETUP:
            loggPaginering(sideNavn, data);
            break;
        case TILDEL_VEILEDER:
            loggTildelVeileder(sideNavn);
            break;
        case ActionTypeKeys.VELG_ALTERNATIV:
            loggEndreListevisning(sideNavn, kolonne);
            break;
        case ActionTypeKeys.AVVELG_ALTERNATIV:
            loggAvvelgListevalg(sideNavn, kolonne);
            break;
        case SORTERT_PA:
            loggEndreSortering(sideNavn, data.property, '');
            break;
        case SETT_SORTERING:
            loggEndreSortering(sideNavn, action.sorteringsfelt, action.sorteringsrekkefolge);
            break;
        case SETT_MARKERT_BRUKER_ALLE:
            loggVelgAlle(sideNavn);
            break;
        case VEILEDER_SOKT_FRA_TOOLBAR:
            loggVeilederSoktFraToolbar(sideNavn);
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
            const opprettetTidpunkt = finnSlettetGruppe(store, action.data);
            loggSlettVeiledergruppeOK(opprettetTidpunkt, sideNavn);
            break;
        }
        case NY_VEILEDERGRUPPER_OK:
            loggNyVeiledergruppeOK(
                action.data.filterValg.veiledere.length,
                store.getState().mineFilter.data.length,
                action.data.filterNavn.trim().length,
                store.getState().valgtEnhet.data.enhetId,
                finnSideNavn()
            );
            break;
        case REDIGER_VEILEDERGRUPPER_OK:
            loggRedigerVeiledergruppeOK(action.data.filterValg.veiledere.length, sideNavn);
            break;
        //mine filter
        case NY_MINEFILTER_OK:
            loggNyttMineFilterOK(sideNavn);
            break;
        case REDIGER_MINEFILTER_OK:
            loggRedigerMineFilterOK(sideNavn);
            break;
        case SLETT_MINEFILTER_OK:
            const opprettetTidspunkt = finnSlettetGruppe(store, action.data);
            loggSlettMineFilterOK(opprettetTidspunkt, sideNavn);
            break;
        case HENT_MINEFILTER_FEILET:
            loggHentMineFilterFeilet(sideNavn);
            break;
        case NY_MINEFILTER_FEILET:
            loggNyttMineFilterFeilet(sideNavn);
            break;
        case REDIGER_MINEFILTER_FEILET:
            loggRedigerMineFilterFeilet(sideNavn);
            break;
        case SLETT_MINEFILTER_FEILET:
            loggSlettMineFilterFeilet(sideNavn);
            break;
        case SORTER_MINEFILTER_OK:
            loggSorterMineFilterOK(sideNavn);
            break;
        case SORTER_MINEFILTER_FEILET:
            loggSorterMineFilterFeilet(sideNavn);
            break;
    }

    return next(action);
};

export function mapVeilederIdentTilNonsens(veilederIdent: string) {
    return [...veilederIdent]
        .map(veilederChar => veilederChar.charCodeAt(0) << 6)
        .map(veilederChar => veilederChar % 255)
        .map(hexChar => hexChar.toString(16))
        .join('');
}

export const loggEndreFilter = (sideNavn: SideNavn, data: FilterEndringData, store: any) => {
    const veilederIdent = mapVeilederIdentTilNonsens(store.getState().innloggetVeileder.data.ident);
    if (data.filterId === 'veilederNavnQuery') {
        return;
    }
    if (data.filterId === 'aktiviteter') {
        return loggEndreAktivitetFilter(sideNavn, data);
    }

    if (Array.isArray(data.filterVerdi)) {
        const filtrering = finnFiltreringForSide(store, sideNavn);
        const prevFilter = filtrering[data.filterId];
        const lagtTilFilterVerdier = finnElementerSomErLagtTil(prevFilter, data.filterVerdi);

        lagtTilFilterVerdier.forEach(verdi => {
            logEvent('portefolje.metrikker.endre_filter', {
                sideNavn,
                filter: data.filterId,
                verdi,
                veilederIdent
            });
        });
    } else if (data.filterVerdi !== null) {
        logEvent('portefolje.metrikker.endre_filter', {
            sideNavn,
            filter: data.filterId,
            verdi: data.filterVerdi,
            veilederIdent
        });
    }
};

const loggEndreAktivitetFilter = (sideNavn: SideNavn, data: FilterEndringData) => {
    logEvent('portefolje.metrikker.endre_filter', {
        sideNavn,
        ...data.filterVerdi,
        filter: data.filterId
    });
};

const loggPaginering = (sideNavn: SideNavn, data: any) => {
    if (data.side > 1) {
        logEvent('portefolje.metrikker.paginering', {sideNavn});
    } else if (data.seAlle) {
        logEvent('portefolje.metrikker.se_alle', {sideNavn});
    }
};

const loggTildelVeileder = (sideNavn: SideNavn) => {
    logEvent('portefolje.metrikker.tildel_veileder', {sideNavn});
};

const loggEndreListevisning = (sideNavn: SideNavn, kolonne: Kolonne) => {
    logEvent('portefolje.metrikker.listevisning_endret', {sideNavn, kolonne});
};

const loggAvvelgListevalg = (sideNavn: SideNavn, kolonne: Kolonne) => {
    logEvent('portefolje.metrikker.listevisning_avvelget', {sideNavn, kolonne});
};

const loggEndreSortering = (sideNavn: SideNavn, sorteringsfelt: string, rekkefolge: string) => {
    if (
        (sorteringsfelt !== 'etternavn' || rekkefolge !== 'stigende') &&
        (sorteringsfelt !== 'ikke_satt' || rekkefolge !== 'ikke_satt')
    ) {
        logEvent('portefolje.metrikker.endre_sortering', {sideNavn, sorteringsfelt, rekkefolge});
    }
};

const loggVeilederSoktFraToolbar = (sideNavn: SideNavn) => {
    logEvent('portefolje.metrikker.veileder_sokt_fra_toolbar', {sideNavn});
};

const loggVelgAlle = (sideNavn: SideNavn) => {
    logEvent('portefolje.metrikker.velg_alle', {sideNavn});
};

//veiledergrupper
const loggNyVeiledergruppeFeilet = () => {
    logEvent('portefolje.metrikker.veiledergrupper.oppretting-feilet');
};

const loggRedigerVeiledergruppeFeilet = () => {
    logEvent('portefolje.metrikker.veiledergrupper.lagring-feilet');
};

const loggSlettVeiledergruppeFeilet = () => {
    logEvent('portefolje.metrikker.veiledergrupper.sletting-feilet');
};

const loggNyVeiledergruppeOK = (antallVeiledere, antallGrupper, gruppeNavn, enhetId, sideNavn: SideNavn) => {
    logEvent(
        'portefolje.metrikker.veiledergrupper.oppretting-vellykket',
        {veiledere: antallVeiledere, antallGrupper, gruppeNavn},
        {enhetId, sideNavn}
    );
};

const loggRedigerVeiledergruppeOK = (antallVeiledere, sideNavn: SideNavn) => {
    logEvent('portefolje.metrikker.veiledergrupper.lagring-vellykket', {veiledere: antallVeiledere}, {sideNavn});
};

const loggSlettVeiledergruppeOK = (opprettetTidspunkt, sideNavn: SideNavn) => {
    logEvent(
        'portefolje.metrikker.veiledergrupper.sletting-vellykket',
        {levetid: (new Date().getTime() - new Date(opprettetTidspunkt).getTime()) / (1000 * 3600 * 24)},
        {sideNavn}
    );
};

//Lagrede filter
const loggNyttMineFilterOK = (sideNavn: SideNavn) => {
    logEvent('portefolje.metrikker.lagredefilter.oppretting-vellykket', {sideNavn: sideNavn}, {});
};

const loggRedigerMineFilterOK = (sideNavn: SideNavn) => {
    logEvent('portefolje.metrikker.lagredefilter.lagring-vellykket', {sideNavn: sideNavn}, {});
};

const loggSlettMineFilterOK = (opprettetTidspunkt, sideNavn: SideNavn) => {
    logEvent(
        'portefolje.metrikker.lagredefilter.sletting-vellykket',
        {
            levetid: (new Date().getTime() - new Date(opprettetTidspunkt).getTime()) / (1000 * 3600 * 24),
            sideNavn: sideNavn
        },
        {}
    );
};

const loggHentMineFilterFeilet = (sideNavn: SideNavn) => {
    logEvent('portefolje.metrikker.lagredefilter.henting-feilet', {sideNavn: sideNavn});
};

const loggNyttMineFilterFeilet = (sideNavn: SideNavn) => {
    logEvent('portefolje.metrikker.lagredefilter.oppretting-feilet', {sideNavn: sideNavn});
};

const loggRedigerMineFilterFeilet = (sideNavn: SideNavn) => {
    logEvent('portefolje.metrikker.lagredefilter.lagring-feilet', {sideNavn: sideNavn});
};

const loggSlettMineFilterFeilet = (sideNavn: SideNavn) => {
    logEvent('portefolje.metrikker.lagredefilter.sletting-feilet', {sideNavn: sideNavn});
};

const loggSorterMineFilterOK = (sideNavn: SideNavn) => {
    logEvent('portefolje.metrikker.lagredefilter.sortering-vellykket', {sideNavn: sideNavn});
};

const loggSorterMineFilterFeilet = (sideNavn: SideNavn) => {
    logEvent('portefolje.metrikker.lagredefilter.sortering-feilet', {sideNavn: sideNavn});
};
