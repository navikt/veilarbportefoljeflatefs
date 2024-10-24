//Før du lager en ny eventType -> sjekk https://github.com/navikt/analytics-taxonomy/tree/main/events
export type AmplitudeEvent =
    | {name: 'skjema fullført'; data: {skjemanavn: string; skjemaId: string}}
    | {name: 'navigere'; data: {lenketekst: string; destinasjon: string}}
    | {name: 'modal åpnet'; data: {tekst: string}}
    | {name: 'knapp klikket'; data: {knapptekst: string; effekt: string}}
    | {name: 'alert vist'; data: {variant: string; tekst: string}}
    | {name: 'filtervalg'; data: {kategori: string; filternavn: string}}
    | {name: string; data: Record<string, unknown>};
