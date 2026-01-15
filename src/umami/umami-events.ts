//Før du lager en ny event -> sjekk https://github.com/navikt/analytics-taxonomy/tree/main/events
export enum UmamiEvents {
    filtervalg = 'filtervalg',
    alertvist = 'alert vist',
    knappklikket = 'knapp klikket',
    lenkeklikket = 'lenke klikket ny'
}

export type LenkeKlikketEvent = {
    lenketekst: string;
};

export type KnappKlikketEvent = {
    knappetekst: string;
    effekt: string;
};

export type FilterValgEvent = {
    sidenavn: string;
    filternavn: string;
    kategori: string;
};

export type AlertVistEvent = {
    variant: string;
    tekst: string;
};

export const trackFilterValgEvent = ({sidenavn, filternavn, kategori}: FilterValgEvent) => {
    if (!globalThis.umami) {
        // eslint-disable-next-line no-console
        console.warn('Umami is not initialized. Ignoring');
        return;
    }
    globalThis.umami.track(UmamiEvents.filtervalg, {
        sidenavn: sidenavn,
        filternavn: filternavn,
        kategori: kategori
    });
};

export const trackAlertVistEvent = ({variant, tekst}: AlertVistEvent) => {
    if (!globalThis.umami) {
        // eslint-disable-next-line no-console
        console.warn('Umami is not initialized. Ignoring');
        return;
    }
    globalThis.umami.track(UmamiEvents.alertvist, {
        variant: variant,
        tekst: tekst
    });
};

export const trackKnappKlikketEvent = ({knappetekst, effekt}: KnappKlikketEvent) => {
    if (!globalThis.umami) {
        // eslint-disable-next-line no-console
        console.warn('Umami is not initialized. Ignoring');
        return;
    }
    globalThis.umami.track(UmamiEvents.knappklikket, {
        knappetekst: knappetekst,
        effekt: effekt
    });
};

export const trackLenkeKlikketEvent = ({lenketekst}: LenkeKlikketEvent) => {
    if (!globalThis.umami) {
        // eslint-disable-next-line no-console
        console.warn('Umami is not initialized. Ignoring');
        return;
    }
    globalThis.umami.track(UmamiEvents.lenkeklikket, {
        lenketekst: lenketekst
    });
};
