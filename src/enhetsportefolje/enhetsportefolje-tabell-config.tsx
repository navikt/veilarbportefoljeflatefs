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
import TidKolonne from '../components/tidkolonne';
import { klokkeslettTilMinutter, minuttDifferanse } from '../utils/dato-utils';

export const lagTabellKolonneConfig = (enhetId: string, ytelse: any, brukersVeileder: (b)=> any) =>  {
    const ytelsevalgConfig = ytelsevalg();
    return [
        {
            tittel: 'Bruker',
            kolonner: [
                {
                    kolonneProps: [
                        {
                            tittel: 'Etternavn',
                            sorterbar: true
                        },
                        {
                            tittel: ', Fornavn',
                            sorterbar: false
                        }
                    ],
                    mapper: (bruker: BrukerModell) => <BrukerNavn bruker={bruker} enhetId={enhetId}/>,
                    id: Kolonne.BRUKER,
                    kolonneStorrelse: 'minmax(150px, 200px)',
                },
                {
                    kolonneProps: [
                        {
                            tittel: 'Fødselsnummer',
                            sorterbar: true
                        }
                    ],
                    mapper: (bruker: BrukerModell) => <BrukerFnr bruker={bruker} />,
                    id: Kolonne.FODSELSNR,
                    kolonneStorrelse: 'minmax(150px, 200px)',
                },
            ],
        },
        {
            tittel: 'Klokkeslett for møtet',
            kolonner: [
                {
                    kolonneProps: [
                        {
                            tittel: 'Klokkeslett',
                            sorterbar: true
                        }
                    ],
                    mapper: (bruker: BrukerModell) =>  <TidKolonne dato={klokkeslettTilMinutter(bruker.moteStartTid)}/>,
                    id: Kolonne.MOTER_IDAG
                },
            ],
        },
        {
            tittel : 'Varighet',
            kolonner: [
                {
                kolonneProps: [
                    {
                        tittel: 'Varighet',
                        sorterbar: false
                    }
                ],
                mapper: (bruker: BrukerModell) => <TidKolonne dato={minuttDifferanse(bruker.moteSluttTid, bruker.moteStartTid)}/>,
                id: Kolonne.MOTER_IDAG
            },
            ]
        },
        {
            tittel : 'Svar fra Nav',
            kolonner: [
                {
                    kolonneProps:  [
                        {
                            tittel: 'Dato',
                            sorterbar: true
                        }
                    ],
                    mapper: (bruker: BrukerModell) => <DatoKolonne dato={bruker.venterPaSvarFraNAV ? new Date(bruker.venterPaSvarFraNAV) : null}/>,
                    id: Kolonne.VENTER_SVAR_FRA_NAV
                }
            ]
        },
        {
            tittel : 'Svar fra Bruker',
            kolonner: [
                {
                    kolonneProps:  [
                        {
                            tittel: 'Dato',
                            sorterbar: true
                        }
                    ],
                    mapper: (bruker: BrukerModell) => <DatoKolonne dato={bruker.venterPaSvarFraBruker ? new Date(bruker.venterPaSvarFraBruker) : null}/>,
                    id: Kolonne.VENTER_SVAR_FRA_BRUKER
                }
            ]
        },
        {
            tittel: 'Gjenstår',
            kolonner: [
                {
                    kolonneProps:  [
                        {
                            tittel: 'Rettighetsperiode',
                            sorterbar: true
                        }
                    ],
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
                    kolonneProps:  [
                        {
                            tittel: 'Vedtaksperiode',
                            sorterbar: true
                        }
                    ],
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
                    kolonneProps:  [
                        {
                            tittel: 'Rettighetsperiode',
                            sorterbar: true
                        }
                    ],
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
                    kolonneProps:  [
                        {
                            tittel: 'Vedtaksperiode',
                            sorterbar: true
                        }
                    ],
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
                    kolonneProps:  [
                        {
                            tittel: 'Dato',
                            sorterbar: true
                        }
                    ],
                    mapper: (bruker: BrukerModell) => <DatoKolonne dato={bruker.nyesteUtlopteAktivitet ? new Date(bruker.nyesteUtlopteAktivitet) : null}/>,
                    id: Kolonne.UTLOPTE_AKTIVITETER
                }
            ]
        },
        {
            tittel: 'Neste utløsdato aktivitet',
            kolonner: [
                {
                    kolonneProps:  [
                        {
                            tittel: 'Dato',
                            sorterbar: true
                        }
                    ],
                    mapper: (bruker: BrukerModell) => <DatoKolonne dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter || null)}/>,
                    id: Kolonne.AVTALT_AKTIVITET
                }
            ]

        },
        {
            tittel: 'Første sluttdato av valgte aktivitet',
            kolonner: [
                {
                    kolonneProps:  [
                        {
                            tittel: 'Dato',
                            sorterbar: true
                        }
                    ],
                    mapper: (bruker: BrukerModell) => <DatoKolonne dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter || null)}/>,
                    id: Kolonne.UTLOP_AKTIVITET
                }
            ]

        },
        {
            tittel: 'Veileder',
            kolonner: [
                {
                    kolonneProps: [
                        {
                            tittel: 'NAV-ident',
                            sorterbar: true
                        }
                    ],
                    mapper: (bruker: BrukerModell) =>  <VeilederId bruker={bruker}/>,
                    id: Kolonne.NAVIDENT,
                    kolonneStorrelse: '1fr',
                },
                {
                    kolonneProps: [
                        {
                            tittel: 'Veileder',
                            sorterbar: false
                        }
                    ],
                    mapper: (bruker: BrukerModell) =>  <VeilederNavn bruker={bruker} veileder={brukersVeileder(bruker)}/>,
                    id: Kolonne.VEILEDER,
                    kolonneStorrelse: '1fr',
                },
            ],

        },

    ];
};

export const checkBoksKolonne = (settMarkert: any)=>({
    tittel: '',
    kolonner: [
        {
            kolonneProps: [
                {
                    tittel: '',
                    sorterbar: false
                }
            ],
            mapper: (bruker: BrukerModell) => <CheckBox bruker={bruker} settMarkert={settMarkert} />,
            id: 'checkbokskolonne',
            kolonneStorrelse: 'auto',
        },
    ],
});

export const etikettKolonne = {
    tittel: '',
    kolonner: [
        {
            kolonneProps: [
                {
                    tittel: '',
                    sorterbar: false
                }
            ],
            mapper: (bruker: BrukerModell) => <Etiketter bruker={bruker}/>,
            id: 'etikettkolonne'
        },
    ],
};
