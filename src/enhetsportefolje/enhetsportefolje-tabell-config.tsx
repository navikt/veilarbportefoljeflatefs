import React from 'react';
import { BrukerModell } from '../model-interfaces';
import BrukerNavn from '../components/tabell/brukernavn';
import { Kolonne } from '../ducks/ui/listevisning';
import BrukerFnr from '../components/tabell/brukerfnr';
import DatoKolonne from '../components/datokolonne';
import { aapRettighetsperiode, nesteUtlopsdatoEllerNull, utlopsdatoUker } from '../utils/utils';
import { ytelsevalg } from '../filtrering/filter-konstanter';
import UkeKolonne from '../components/ukekolonne';
import VeilederId from '../components/tabell/veilederid';
import VeilederNavn from '../components/tabell/veiledernavn';
import CheckBox from '../components/tabell/checkbox';
import Etiketter from '../components/tabell/etiketter';

export const lagTabellKolonneConfig = (enhetId: string, ytelse: any, brukersVeileder: (b)=> any) =>  {
    const ytelsevalgConfig = ytelsevalg();
    return [
        {
            tittel: 'Bruker',
            kolonner: [
                {
                    kolonneElementer: [{tittel: 'Etternavn', sorterbar: true}, {tittel: ', Fornavn', sorterbar: false}],
                    mapper: (bruker: BrukerModell) => <BrukerNavn bruker={bruker} enhetId={enhetId}/>,
                    id: Kolonne.BRUKER
                },
                {
                    kolonneElementer: [{tittel: 'Fødselsnummer', sorterbar: true}],
                    mapper: (bruker: BrukerModell) => <BrukerFnr bruker={bruker} />,
                    id: Kolonne.FODSELSNR
                },
            ],
        },
        {
            tittel : 'Svar fra Nav',
            kolonner: [
                {
                    kolonneElementer:  [{tittel: 'Dato', sorterbar: true}],
                    mapper: (bruker: BrukerModell) => <DatoKolonne dato={bruker.venterPaSvarFraNAV ? new Date(bruker.venterPaSvarFraNAV) : null}/>,
                    id: Kolonne.VENTER_SVAR_FRA_NAV
                }
            ]
        },
        {
            tittel : 'Svar fra Bruker',
            kolonner: [
                {
                    kolonneElementer:  [{tittel: 'Dato', sorterbar: true}],
                    mapper: (bruker: BrukerModell) => <DatoKolonne dato={bruker.venterPaSvarFraBruker ? new Date(bruker.venterPaSvarFraBruker) : null}/>,
                    id: Kolonne.VENTER_SVAR_FRA_BRUKER
                }
            ]
        },
        {
            tittel: 'Gjenstår',
            kolonner: [
                {
                    kolonneElementer:  [{tittel: 'Rettighetsperiode', sorterbar: true}],
                    mapper: (bruker: BrukerModell) => <UkeKolonne ukerIgjen={bruker.dagputlopUke} minVal={2}/>,
                    id: Kolonne.UTLOP_YTELSE,
                    filterId: [ytelsevalgConfig.DAGPENGER, ytelsevalgConfig.ORDINARE_DAGPENGER, ytelsevalgConfig.DAGPENGER_MED_PERMITTERING_FISKEINDUSTRI,
                        ytelsevalgConfig.LONNSGARANTIMIDLER_DAGPENGER]
                },
            ]
        },
        {
            tittel: 'Gjenstår',
            kolonner: [
                {
                    kolonneElementer:  [{tittel: 'Vedtaksperiode', sorterbar: true}],
                    mapper: (bruker: BrukerModell) =>  <UkeKolonne ukerIgjen={utlopsdatoUker(bruker.utlopsdato)} minVal={2}/>,
                    id: Kolonne.UTLOP_YTELSE,
                    filterId: [ytelsevalgConfig.AAP, ytelsevalgConfig.AAP_MAXTID, ytelsevalgConfig.AAP_UNNTAK]
                }
            ]
        },
        {
            tittel: 'Gjenstår',
            kolonner: [
                {
                    kolonneElementer:  [{tittel: 'Rettighetsperiode', sorterbar: true}],
                    mapper: (bruker: BrukerModell) =>  <UkeKolonne ukerIgjen={aapRettighetsperiode(ytelse, bruker.aapmaxtidUke, bruker.aapUnntakUkerIgjen)} minVal={2}/>,
                    id: Kolonne.UTLOP_YTELSE,
                    filterId: [ytelsevalgConfig.AAP, ytelsevalgConfig.AAP_MAXTID, ytelsevalgConfig.AAP_UNNTAK]
                }
            ]
        },
        {
            tittel: 'Gjenstår',
            kolonner: [
                {
                    kolonneElementer:  [{tittel: 'Vedtaksperiode', sorterbar: true}],
                    mapper: (bruker: BrukerModell) => <UkeKolonne ukerIgjen={utlopsdatoUker(bruker.utlopsdato)} minVal={2}/>,
                    id: Kolonne.UTLOP_YTELSE,
                    filterId: [ytelsevalgConfig.TILTAKSPENGER]
                }
            ]
        },
        {
            tittel: 'Utløpt aktivitet',
            kolonner: [
                {
                    kolonneElementer:  [{tittel: 'Dato', sorterbar: true}],
                    mapper: (bruker: BrukerModell) => <DatoKolonne dato={bruker.nyesteUtlopteAktivitet ? new Date(bruker.nyesteUtlopteAktivitet) : null}/>,
                    id: Kolonne.UTLOPTE_AKTIVITETER
                }
            ]
        },
        {
            tittel: 'Neste utløsdato aktivitet',
            kolonner: [
                {
                    kolonneElementer:  [{tittel: 'Dato', sorterbar: true}],
                    mapper: (bruker: BrukerModell) => <DatoKolonne dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter || null)}/>,
                    id: Kolonne.AVTALT_AKTIVITET
                }
            ]

        },
        {
            tittel: 'Første sluttdato av valgte aktivitet',
            kolonner: [
                {
                    kolonneElementer:  [{tittel: 'Dato', sorterbar: true}],
                    mapper: (bruker: BrukerModell) => <DatoKolonne dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter || null)}/>,
                    id: Kolonne.UTLOP_AKTIVITET
                }
            ]

        },
        {
            tittel: 'Veileder',
            kolonner: [
                {
                    kolonneElementer: [{tittel: 'NAV-ident', sorterbar: true}],
                    mapper: (bruker: BrukerModell) =>  <VeilederId bruker={bruker}/>,
                    id: Kolonne.NAVIDENT
                },
                {
                    kolonneElementer: [{tittel: 'Veileder', sorterbar: false}],
                    mapper: (bruker: BrukerModell) =>  <VeilederNavn bruker={bruker} veileder={brukersVeileder(bruker)}/>,
                    id: Kolonne.VEILEDER
                },
            ],

        },

    ];
};

export const checkBoksKolonne = (settMarkert: any)=>({
    tittel: '',
    kolonner: [
        {
            kolonneElementer: [{tittel: '', sorterbar: false}],
            mapper: (bruker: BrukerModell) =>   <CheckBox bruker={bruker} settMarkert={settMarkert} />,
            id: Kolonne.VEILEDER
        },
    ],
});

export const etikettKolonne = {
    tittel: '',
    kolonner: [
        {
            kolonneElementer: [{tittel: '', sorterbar: false}],
            mapper: (bruker: BrukerModell) => <Etiketter bruker={bruker}/>,
            id: Kolonne.VEILEDER
        },
    ],
};
