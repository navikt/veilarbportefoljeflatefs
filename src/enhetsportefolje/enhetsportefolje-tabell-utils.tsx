import { BrukerModell } from '../model-interfaces';
import CheckBox from '../components/tabell/checkbox';
import { DefaultKolonneType } from '../components/tabell-ny/tabell';
import BrukerNavn from '../components/tabell/brukernavn';
import { Kolonne } from '../ducks/ui/listevisning';
import * as React from 'react';

export const lagTabellKolonneConfig = (enhetId: string, settMarkert: (bruker: string, markert: boolean) => void ) =>  [
    {
        tittel: '',
        kolonner: [
            {
                navn: '',
                mapper: (bruker: BrukerModell) => <CheckBox bruker={bruker} settMarkert={settMarkert} />,
                id: DefaultKolonneType.Checkboks,
                erObligatorisk: true

            }
        ]
    },
    {
        tittel: 'Bruker',
        kolonner: [
            {
                navn: 'Etternavn, Fornavn',
                mapper: (bruker: BrukerModell) => <BrukerNavn bruker={bruker} enhetId={enhetId}/>,
                id: Kolonne.BRUKER
            },
            {
                navn: 'Fodselsnummer',
                mapper: (bruker: BrukerModell) => <span>{bruker.etternavn}</span>,
                id: Kolonne.FODSELSNR
            },
        ],
    },
    {
        tittel: 'Veileder',
        kolonner: [
            {
                navn: 'Veileder',
                mapper: (bruker: BrukerModell) => <span>{bruker.etternavn}</span>,
                id: Kolonne.VEILEDER
            },
            {
                navn: 'NAV-ident',
                mapper: (bruker: BrukerModell) => <span>{bruker.etternavn}</span>,
                id: Kolonne.NAVIDENT
            },
        ],

    },

];

export function filtrerValgteKolonner(tabellKolonneObj, valgteKolonner) {
    const filtreradeKolonner = tabellKolonneObj.kolonner.filter((kol) => valgteKolonner.includes(kol.id) || kol.erObligatorisk );
    return Object.assign({}, tabellKolonneObj, {kolonner: filtreradeKolonner});
}

export function filtrerTommeKolonneGruppe(tabellKolonneObj) {
    return tabellKolonneObj.kolonner.length > 0;
}

export function antallFilter(filtervalg) {
    function mapAktivitetFilter(value) {
        return Object.entries(value).map(([_, verdi]) => {
            if (verdi === 'NA') return 0;
            return 1;
        }).reduce((a: number, b: number) => a + b, 0);
    }

    return Object.entries(filtervalg)
        .map(([filter, value]) => {
            if (value === true) return 1;
            else if (Array.isArray(value)) return value.length;
            else if (filter === 'aktiviteter') return mapAktivitetFilter(value);
            else if (typeof value === 'object') return value ? Object.entries(value).length : 0;
            else if (value) return 1;
            return 0;
        }).reduce((a, b) => a + b, 0);
}
