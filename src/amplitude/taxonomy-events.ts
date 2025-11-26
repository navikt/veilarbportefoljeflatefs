//Før du lager en ny eventType -> sjekk https://github.com/navikt/analytics-taxonomy/tree/main/events
export type AmplitudeEvent =
    | {name: 'knapp klikket'; data: {knapptekst: string; effekt: string}}
    | {name: 'alert vist'; data: {variant: string; tekst: string}}
    | {name: 'filtervalg'; data: {kategori: string; filternavn: string}}
    | {name: string; data: Record<string, unknown>};
