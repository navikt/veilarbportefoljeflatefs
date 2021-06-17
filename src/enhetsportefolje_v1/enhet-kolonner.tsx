import * as React from 'react';
import UkeKolonne from '../components/tabell_v1/kolonner/ukekolonne';
import DatoKolonne from '../components/tabell_v1/kolonner/datokolonne';
import {Kolonne} from '../ducks/ui/listevisning';
import {BrukerModell, FiltervalgModell, VeilederModell} from '../model-interfaces';
import {
    aapRettighetsperiode,
    nesteUtlopsdatoEllerNull,
    parseDatoString,
    utledValgteAktivitetsTyper,
    utlopsdatoUker
} from '../utils/utils';
import VeilederNavn from '../components/tabell_v1/veiledernavn';
import VeilederId from '../components/tabell_v1/veilederid';
import TidKolonne from '../components/tabell_v1/kolonner/tidkolonne';
import {dagerSiden, klokkeslettTilMinutter, minuttDifferanse, oppfolgingStartetDato} from '../utils/dato-utils';
import VarighetKolonne from '../components/tabell_v1/kolonner/varighetkolonne';
import {OrNothing} from '../utils/types/types';
import './enhetsportefolje.less';
import './brukerliste.less';
import {DagerSidenKolonne} from '../components/tabell_v1/kolonner/dagersidenkolonne';
import {TekstKolonne} from '../components/tabell_v1/kolonner/tekstkolonne';
import SisteEndringKategori from '../components/tabell_v1/sisteendringkategori';
import {VisKolonne} from "./enhet-tabell";
import BrukerNavn from '../components/tabell_v1/brukernavn';
import BrukerFnr from "../components/tabell_v1/brukerfnr";

interface EnhetKolonnerProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: OrNothing<string>;
    filtervalg: FiltervalgModell;
    valgteKolonner: Kolonne[];
    brukersVeileder?: VeilederModell;
    visKolonne: ()=> VisKolonne;
}

function EnhetKolonner({className, bruker, enhetId, filtervalg, valgteKolonner, brukersVeileder, visKolonne}: EnhetKolonnerProps) {
    const {ytelse} = filtervalg;
    const utlopsdatoUkerIgjen = utlopsdatoUker(bruker.utlopsdato);
    const venterPaSvarFraBruker = bruker.venterPaSvarFraBruker ? new Date(bruker.venterPaSvarFraBruker) : null;
    const venterPaSvarFraNAV = bruker.venterPaSvarFraNAV ? new Date(bruker.venterPaSvarFraNAV) : null;
    const nyesteUtlopteAktivitet = bruker.nyesteUtlopteAktivitet ? new Date(bruker.nyesteUtlopteAktivitet) : null;
    const valgteAktivitetstyper = utledValgteAktivitetsTyper(bruker.aktiviteter, filtervalg.aktiviteter);
    const moteStartTid = klokkeslettTilMinutter(bruker.moteStartTid);
    const varighet = minuttDifferanse(bruker.moteSluttTid, bruker.moteStartTid);
    const rettighetsPeriode = aapRettighetsperiode(ytelse, bruker.aapmaxtidUke, bruker.aapUnntakUkerIgjen);
    const skalVise : VisKolonne = visKolonne();
    const avtaltAktivitetOgTiltak: boolean = skalVise.iAvtaltAktivitet ? false : !!valgteAktivitetstyper &&
                                            (filtervalg.tiltakstyper.length === 0 && valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET));
    const forenkletAktivitetOgTiltak = valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET) &&
                                       (filtervalg.tiltakstyper.length > 0 || filtervalg.aktiviteterForenklet.length > 0);
    const sisteEndringTidspunkt = bruker.sisteEndringTidspunkt ? new Date(bruker.sisteEndringTidspunkt) : null;

    console.log("oppfolging startet: ", valgteKolonner.includes(Kolonne.OPPFOLGINGSTARTET));
    return (
        <>
            <BrukerNavn role="cell" className="col col-xs-2" bruker={bruker} enhetId={enhetId}/>
            <BrukerFnr role="cell" className="col col-xs-2" bruker={bruker} />
            <DatoKolonne
                role="cell"
                className="col col-xs-2"
                skalVises={valgteKolonner.includes(Kolonne.OPPFOLGINGSTARTET)}
                dato={oppfolgingStartetDato(bruker.oppfolgingStartdato)}
            />
            <VeilederNavn
                role="cell"
                className="col col-xs-2"
                bruker={bruker}
                skalVises={skalVise.veilederNavn}
                veileder={brukersVeileder}
            />
            <VeilederId
                role="cell"
                className="col col-xs-2"
                bruker={bruker}
                skalVises={skalVise.veilederIdent}
            />
            <UkeKolonne
                role="cell"
                className="col col-xs-2"
                ukerIgjen={bruker.dagputlopUke}
                minVal={2}
                skalVises={skalVise.rettighetsperiodeTilDagpenger}
            />
            <UkeKolonne
                role="cell"
                className="col col-xs-2"
                ukerIgjen={bruker.permutlopUke}
                minVal={2}
                skalVises={skalVise.rettighetsperiodeTilDagpengerMedPermittering}
            />
            <UkeKolonne
                role="cell"
                className="col col-xs-2"
                ukerIgjen={utlopsdatoUkerIgjen}
                minVal={2}
                skalVises={skalVise.vedtaksPeriodeTilAAP}
            />
            <UkeKolonne
                role="cell"
                className="col col-xs-2"
                ukerIgjen={rettighetsPeriode}
                minVal={2}
                skalVises={skalVise.rettighetsPeriodeTilAAP}
            />
            <UkeKolonne
                role="cell"
                className="col col-xs-2"
                ukerIgjen={utlopsdatoUkerIgjen}
                minVal={2}
                skalVises={skalVise.rettighetsperiodeTilTiltakPenger}
            />
            <DatoKolonne
                role="cell"
                className="col col-xs-2"
                dato={venterPaSvarFraBruker}
                skalVises={skalVise.datoTilVenterPaSvarFraBruker}
            />
            <DatoKolonne
                role="cell"
                className="col col-xs-2"
                dato={venterPaSvarFraNAV}
                skalVises={skalVise.datoTilVenterPaSvarFraNav
                }
            />
            <DatoKolonne
                role="cell"
                className="col col-xs-2"
                dato={nyesteUtlopteAktivitet}
                skalVises={skalVise.datoTilUtlopteAktiviteter
                }
            />
            <DatoKolonne
                role="cell"
                className="col col-xs-2"
                dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter || undefined)}
                skalVises={skalVise.iAvtaltAktivitet}
            />
            <DatoKolonne
                role="cell"
                className="col col-xs-2"
                dato={parseDatoString(bruker.nesteUtlopsdatoAktivitet)}
                skalVises={avtaltAktivitetOgTiltak || forenkletAktivitetOgTiltak}
            />
            <TidKolonne
                role="cell"
                className="col col-xs-2"
                dato={moteStartTid}
                skalVises={skalVise.moteKlokkeslett}
            />
            <VarighetKolonne
                role="cell"
                className="col col-xs-2"
                dato={varighet}
                skalVises={skalVise.moteVarighet}
            />
            <TekstKolonne
                tekst={bruker.vedtakStatus}
                skalVises={skalVise.vedtakStatus}
                className="col col-xs-2"
            />
            <DagerSidenKolonne
                role="cell"
                className="col col-xs-2"
                dato={dagerSiden(bruker.vedtakStatusEndret)}
                skalVises={skalVise.vedtakStatusEndret}
            />
            <TekstKolonne
                role="cell"
                tekst={!!bruker.ansvarligVeilederForVedtak ? bruker.ansvarligVeilederForVedtak : ' '}
                skalVises={skalVise.ansvarligVeilderForVedtak}
                className="col col-xs-2"
            />
            <SisteEndringKategori
                role="cell"
                bruker={bruker}
                enhetId={enhetId}
                skalVises={skalVise.sisteEndring}
                className="col col-xs-2"
            />
            <DatoKolonne
                role="cell"
                className="col col-xs-2"
                dato={sisteEndringTidspunkt}
                skalVises={skalVise.sisteEndringTidsfunkt}
            />
        </>
    );
}

export default EnhetKolonner;
