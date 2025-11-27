//Før du lager en ny event -> sjekk https://github.com/navikt/analytics-taxonomy/tree/main/events
export enum UmamiEvents {
    filtervalg = 'filtervalg',
    alertvist = 'alert vist',
    knappklikket = 'knapp klikket'
}

export type KnappKlikketEvent = {
    tekst: string;
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

//Man må maskere fødselsnummer med funksjonen nedenfor hvis payloaden(data som skal sendes til umami) inneholder det
const maskereFodselsnummer = (data?: Record<string, unknown>) => {
    const maskertObjekt = JSON.stringify(data).replace(/\d{11}/g, (_, indexOfMatch, fullString) =>
        fullString.charAt(indexOfMatch - 1) === '"' ? '***********' : '"***********"'
    );

    try {
        return JSON.parse(maskertObjekt);
    } catch (e) {
        console.error('kunne ikke maskere data korrekt før sending til amplitude');
    }
    return {};
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

export const trackKnappKlikketEvent = ({tekst, effekt}: KnappKlikketEvent) => {
    if (!globalThis.umami) {
        // eslint-disable-next-line no-console
        console.warn('Umami is not initialized. Ignoring');
        return;
    }
    globalThis.umami.track(UmamiEvents.knappklikket, {
        tekst: tekst,
        effekt: effekt
    });
};
