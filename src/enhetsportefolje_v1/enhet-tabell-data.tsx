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
import {VisKolonne} from './enhet-tabell';
import BrukerNavn from '../components/tabell_v1/brukernavn';
import BrukerFnr from '../components/tabell_v1/brukerfnr';
import {Checkbox} from 'nav-frontend-skjema';
import Etiketter from '../components/tabell_v1/etiketter';
import {useLayoutEffect} from 'react';
import {useFeatureSelector} from '../hooks/redux/use-feature-selector';
import {VEDTAKSTOTTE} from '../konstanter';

interface EnhetKolonnerProps {
    bruker: BrukerModell;
    enhetId: OrNothing<string>;
    filtervalg: FiltervalgModell;
    valgteKolonner: Kolonne[];
    brukersVeileder?: VeilederModell;
    kolonneSkalVises: () => VisKolonne;
    forrigeBruker: OrNothing<string>;
    settMarkert: (bruker: string, markert: boolean) => void;
}

function EnhetTabellData({
    bruker,
    enhetId,
    filtervalg,
    valgteKolonner,
    brukersVeileder,
    kolonneSkalVises,
    forrigeBruker,
    settMarkert
}: EnhetKolonnerProps) {
    const {ytelse} = filtervalg;
    const skalVise: VisKolonne = kolonneSkalVises();
    const varForrigeBruker = bruker.fnr === forrigeBruker;
    const erVedtaksStotteFeatureTogglePa = useFeatureSelector()(VEDTAKSTOTTE);
    const utlopsdatoUkerIgjen = utlopsdatoUker(bruker.utlopsdato);
    const venterPaSvarFraBruker = bruker.venterPaSvarFraBruker ? new Date(bruker.venterPaSvarFraBruker) : null;
    const venterPaSvarFraNAV = bruker.venterPaSvarFraNAV ? new Date(bruker.venterPaSvarFraNAV) : null;
    const nyesteUtlopteAktivitet = bruker.nyesteUtlopteAktivitet ? new Date(bruker.nyesteUtlopteAktivitet) : null;
    const valgteAktivitetstyper = utledValgteAktivitetsTyper(bruker.aktiviteter, filtervalg.aktiviteter);
    const moteStartTid = klokkeslettTilMinutter(bruker.moteStartTid);
    const varighet = minuttDifferanse(bruker.moteSluttTid, bruker.moteStartTid);
    const rettighetsPeriode = aapRettighetsperiode(ytelse, bruker.aapmaxtidUke, bruker.aapUnntakUkerIgjen);
    const avtaltAktivitetOgTiltak: boolean = skalVise.iAvtaltAktivitet
        ? false
        : !!valgteAktivitetstyper &&
          filtervalg.tiltakstyper.length === 0 && valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET);
    const forenkletAktivitetOgTiltak =
        valgteKolonner.includes(Kolonne.UTLOP_AKTIVITET) &&
        (filtervalg.tiltakstyper.length > 0 || filtervalg.aktiviteterForenklet.length > 0);
    const sisteEndringTidspunkt = bruker.sisteEndringTidspunkt ? new Date(bruker.sisteEndringTidspunkt) : null;

    const scrollToLastPos = () => {
        const xPos = parseInt(localStorage.getItem('xPos') || '0');
        const yPos = parseInt(localStorage.getItem('yPos') || '0');
        window.scrollTo(xPos, yPos);
    };

    useLayoutEffect(() => {
        if (varForrigeBruker) {
            scrollToLastPos();
        }
    }, [varForrigeBruker]);

    return (
        <div role="row" className={`brukerliste--rad ${varForrigeBruker && 'varForrigeBruker'}`}>
            <div role="cell" className="brukerliste__gutter-left">
                <Checkbox
                    checked={bruker.markert}
                    disabled={bruker.fnr === ''}
                    onChange={() => settMarkert(bruker.fnr, !bruker.markert)}
                    label=""
                    role="checkbox"
                    className="brukerliste__checkbox"
                />
            </div>
            <div className="brukerliste__innhold flex flex--center">
                <BrukerNavn
                    role="cell"
                    className="col col-xs-2"
                    bruker={bruker}
                    enhetId={enhetId}
                    labelledBy="etternavn"
                />
                <BrukerFnr role="cell" className="col col-xs-2" bruker={bruker} labelledBy="fødselsnummer" />
                <DatoKolonne
                    role="cell"
                    className="col col-xs-2"
                    skalVises={valgteKolonner.includes(Kolonne.OPPFOLGINGSTARTET)}
                    dato={oppfolgingStartetDato(bruker.oppfolgingStartdato)}
                    labelledBy="oppfolging-startet"
                />
                <VeilederNavn
                    role="cell"
                    className="col col-xs-2"
                    bruker={bruker}
                    skalVises={skalVise.veilederNavn}
                    veileder={brukersVeileder}
                    labelledBy="veileder"
                />
                <VeilederId
                    role="cell"
                    className="col col-xs-2"
                    bruker={bruker}
                    skalVises={skalVise.veilederIdent}
                    labelledBy="navident"
                />
                <UkeKolonne
                    role="cell"
                    className="col col-xs-2"
                    ukerIgjen={bruker.dagputlopUke}
                    minVal={2}
                    skalVises={skalVise.rettighetsperiodeTilDagpenger}
                    labelledBy="ytelse-utlopsdato"
                />
                <UkeKolonne
                    role="cell"
                    className="col col-xs-2"
                    ukerIgjen={bruker.permutlopUke}
                    minVal={2}
                    skalVises={skalVise.rettighetsperiodeTilDagpengerMedPermittering}
                    labelledBy="ytelse-utlopsdato-navn"
                />
                <UkeKolonne
                    role="cell"
                    className="col col-xs-2"
                    ukerIgjen={utlopsdatoUkerIgjen}
                    minVal={2}
                    skalVises={skalVise.vedtaksPeriodeTilAAP}
                    labelledBy="ytelse-utlopsdato-navn"
                />
                <UkeKolonne
                    role="cell"
                    className="col col-xs-2"
                    ukerIgjen={rettighetsPeriode}
                    minVal={2}
                    skalVises={skalVise.rettighetsPeriodeTilAAP}
                    labelledBy="rettighetsperiode-gjenstaende"
                />
                <UkeKolonne
                    role="cell"
                    className="col col-xs-2"
                    ukerIgjen={utlopsdatoUkerIgjen}
                    minVal={2}
                    skalVises={skalVise.rettighetsperiodeTilTiltakPenger}
                    labelledBy="ytelse-utlopsdato"
                />
                <DatoKolonne
                    role="cell"
                    className="col col-xs-2"
                    dato={venterPaSvarFraBruker}
                    skalVises={skalVise.datoTilVenterPaSvarFraBruker}
                    labelledBy="venter-pa-svar-fra-bruker"
                />
                <DatoKolonne
                    role="cell"
                    className="col col-xs-2"
                    dato={venterPaSvarFraNAV}
                    skalVises={skalVise.datoTilVenterPaSvarFraNav}
                    labelledBy="venter-pa-svar-fra-nav"
                />
                <DatoKolonne
                    role="cell"
                    className="col col-xs-2"
                    dato={nyesteUtlopteAktivitet}
                    skalVises={skalVise.datoTilUtlopteAktiviteter}
                    labelledBy="utlopte-aktiviteter"
                />
                <DatoKolonne
                    role="cell"
                    className="col col-xs-2"
                    dato={nesteUtlopsdatoEllerNull(bruker.aktiviteter || undefined)}
                    skalVises={skalVise.iAvtaltAktivitet}
                    labelledBy="i-avtalt-aktivitet"
                />
                <DatoKolonne
                    role="cell"
                    className="col col-xs-2"
                    dato={parseDatoString(bruker.nesteUtlopsdatoAktivitet)}
                    skalVises={avtaltAktivitetOgTiltak || forenkletAktivitetOgTiltak}
                    labelledBy="valgte-aktiviteter"
                />
                <TidKolonne
                    role="cell"
                    className="col col-xs-2"
                    dato={moteStartTid}
                    skalVises={skalVise.moteKlokkeslett}
                    labelledBy="moter-idag"
                />
                <VarighetKolonne
                    role="cell"
                    className="col col-xs-2"
                    dato={varighet}
                    skalVises={skalVise.moteVarighet}
                    labelledBy="varighet-mote"
                />
                <TekstKolonne
                    role="cell"
                    tekst={bruker.vedtakStatus}
                    skalVises={skalVise.vedtakStatus}
                    className="col col-xs-2"
                    labelledBy="vedtakstatus"
                />
                <DagerSidenKolonne
                    role="cell"
                    className="col col-xs-2"
                    dato={dagerSiden(bruker.vedtakStatusEndret)}
                    skalVises={skalVise.vedtakStatusEndret}
                    labelledBy="vedtakstatus-endret"
                />
                <TekstKolonne
                    role="cell"
                    tekst={!!bruker.ansvarligVeilederForVedtak ? bruker.ansvarligVeilederForVedtak : ' '}
                    skalVises={skalVise.ansvarligVeilderForVedtak}
                    className="col col-xs-2"
                    labelledBy="ansvarlig-veileder-for-vedtak"
                />
                <SisteEndringKategori
                    role="cell"
                    bruker={bruker}
                    enhetId={enhetId}
                    skalVises={skalVise.sisteEndring}
                    className="col col-xs-2"
                    labelledBy="siste-endring"
                />
                <DatoKolonne
                    role="cell"
                    className="col col-xs-2"
                    dato={sisteEndringTidspunkt}
                    skalVises={skalVise.sisteEndringsDato}
                    labelledBy="dato-siste-endring"
                />
            </div>
            <div role="cell" aria-labelledby="etiketter" className="brukerliste__gutter-right">
                <Etiketter bruker={bruker} erVedtakStotteFeatureTogglePa={erVedtaksStotteFeatureTogglePa} />
            </div>
        </div>
    );
}

export default EnhetTabellData;
