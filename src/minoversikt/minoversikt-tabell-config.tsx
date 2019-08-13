import React from 'react';
import { BrukerModell, VeilederModell } from '../model-interfaces';
import BrukerNavn from '../components/tabell/brukernavn';
import { Kolonne } from '../ducks/ui/listevisning';
import BrukerFnr from '../components/tabell/brukerfnr';
import { ytelsevalg } from '../filtrering/filter-konstanter';
import { Ytelse } from '../ducks/filtrering';
import ArbeidslisteOverskrift from "../components/tabell/arbeidslisteoverskrift";
import UkeKolonne from "../components/ukekolonne";
import {aapRettighetsperiode, nesteUtlopsdatoEllerNull, utlopsdatoUker} from "../utils/utils";
import Etiketter from "../components/tabell/etiketter";
import TidKolonne from "../components/tidkolonne";
import DatoKolonne from "../components/datokolonne";
import { klokkeslettTilMinutter, minuttDifferanse } from '../utils/dato-utils';
import CheckBox from '../components/tabell/checkbox';
import {Arbeidslisteikon} from '../components/tabell/arbeidslisteikon';
import {ArbeidslisteButton} from "../components/tabell/arbeidslistebutton";

export const lagTabellKolonneConfig = (enhetId: string, ytelse: null | Ytelse) =>  {
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
                },
            ],
        },
        {
            tittel: 'Arbeidsliste',
            kolonner: [
                {
                    kolonneProps: [
                        {
                            tittel: 'Dato',
                            sorterbar: true
                        },
                    ],
                    mapper: (bruker: BrukerModell) => <ArbeidslisteOverskrift bruker={bruker}/>,
                    id: Kolonne.ARBEIDSLISTE,
                }
                ]
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
            ],
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
            tittel: 'Startdato aktivitet',
            kolonner: [
                {
                    kolonneProps:  [
                        {
                            tittel: 'Dato',
                            sorterbar: true
                        }
                    ],
                    mapper: (bruker: BrukerModell) => <DatoKolonne dato={bruker.aktivitetStart ? new Date(bruker.aktivitetStart) : null}/>,
                    id: Kolonne.START_DATO_AKTIVITET
                }
            ]

        },

        {
            tittel: 'Neste startdato aktivitet',
            kolonner: [
                {
                    kolonneProps:  [
                        {
                            tittel: 'Dato',
                            sorterbar: true
                        }
                    ],
                    mapper: (bruker: BrukerModell) => <DatoKolonne dato={bruker.nesteAktivitetStart ? new Date(bruker.nesteAktivitetStart) : null}/>,
                    id: Kolonne.NESTE_START_DATO_AKTIVITET
                }
            ]

        },

        {
            tittel: 'Startdato aktivitet passert',
            kolonner: [
                {
                    kolonneProps:  [
                        {
                            tittel: 'Dato',
                            sorterbar: true
                        }
                    ],
                    mapper: (bruker: BrukerModell) => <DatoKolonne dato={bruker.forrigeAktivitetStart ? new Date(bruker.forrigeAktivitetStart) : null}/>,
                    id: Kolonne.FORRIGE_START_DATO_AKTIVITET
                }
            ]

        },

    ];
};

export const checkBoksKolonne = (settMarkert: (felt: string, markert: boolean) => void) =>({
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
            kolonneStorrelse: 'auto'
        },
    ],
});


export const arbeidslisteKolonne = {
    tittel: '',
    kolonner: [
        {
            kolonneProps: [
                {
                    tittel: '',
                    sorterbar: false
                }
            ],
            mapper: (bruker: BrukerModell) => <Arbeidslisteikon bruker={bruker}/>,
            id: 'arbeidslistekolonne',
            kolonneStorrelse: 'auto'
        },
    ],
};

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
            id: 'etikettkolonne',
            kolonneStorrelse: '2fr'
        },
    ],
};


export const arbeidslisteKnapp = {
    tittel: '',
    kolonner: [
        {
            kolonneProps: [
                {
                    tittel: '',
                    sorterbar: false
                }
            ],
            mapper: (bruker: BrukerModell, apen: boolean, onClick: ()=> void) => <ArbeidslisteButton bruker={bruker} apen={apen} onClick={onClick}
            />,
            id: 'arbeidslisteKnapp'
        },
    ],
};
