import {ENDRE_FILTER} from '../ducks/filtrering';
import {logEvent} from '../utils/frontend-logger';
import {SETT_SORTERING} from '../ducks/portefolje';
import {ActionTypeKeys, Kolonne} from '../ducks/ui/listevisning';
import {SORTERT_PA} from '../ducks/sortering';
import {Filtervalg} from '../typer/filtervalg-modell';

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

export const metricsMiddleWare = (store: any) => (next: any) => (action: any) => {
    const {type, data, kolonne} = action;
    const sideNavn = finnSideNavn();

    switch (type) {
        case ENDRE_FILTER:
            loggEndreFilter(sideNavn, data, store);
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
    if (data.filterId === Filtervalg.veilederNavnQuery) {
        return;
    }
    if (data.filterId === Filtervalg.aktiviteter) {
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
