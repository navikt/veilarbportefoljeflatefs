import {delay, http, HttpResponse, RequestHandler} from 'msw';
import innloggetVeileder from '../data/innloggetVeileder';
import me from '../data/me';
import {faker} from '@faker-js/faker/locale/nb_NO';
import {foedelandListMockData} from '../data/foedeland';
import {tolkebehovSpraakMockData} from '../data/tolkebehovSpraak';
import {geografiskBostedListMockData} from '../data/geografiskBosted';
import {statustallEnhet, statustallVeileder} from '../data/statustall';
import {
    brukere,
    hentArbeidsliste,
    hentArbeidslisteForBruker,
    hentHuskelappForBruker,
    hentMockPlan,
    testperson_uten_arbeidsliste
} from '../data/portefolje';
import lagPortefoljeStorrelser from '../data/portefoljestorrelser';
import tiltak from '../data/tiltak';
import {ArbeidslisteDataModell} from '../../model-interfaces';
import {withAuth} from './auth';
import {DEFAULT_DELAY_MILLISECONDS} from '../constants';
import {EndreHuskelapp, LagreHuskelapp} from '../../ducks/huskelapp';
import {rnd} from '../utils';

function lagPortefoljeForVeileder(queryParams, alleBrukere) {
    const enhetportefolje = lagPortefolje(queryParams, innloggetVeileder.enheter[0].enhetId, alleBrukere);
    enhetportefolje.brukere.forEach(bruker => (bruker.veilederId = me.ident));
    return enhetportefolje;
}

function lagPortefolje(queryParams, enhet, alleBrukere) {
    const {fra, antall} = queryParams;
    const maybeFra = parseInt(fra, 10);
    const maybeAntal = parseInt(antall, 10);

    const fraInt = isNaN(maybeFra) ? 0 : maybeFra;
    const antallInt = isNaN(maybeAntal) ? alleBrukere.length : maybeAntal;

    const filtrerteBrukere = alleBrukere.slice(fraInt, fraInt + antallInt).map((bruker, index) => {
        if (index < 2) {
            bruker.fnr = '';
            bruker.fornavn = '';
            bruker.etternavn = '';
            bruker.kjonn = '';
            bruker.fodselsdato = null;
            bruker.diskresjonskode = index === 0 ? '6' : '7';
            bruker.oppfolgingStartdato = faker.date.between(new Date('2015-01-01'), new Date());
            bruker.erPermittertEtterNiendeMars = true;
        } else if (index === 2) {
            return testperson_uten_arbeidsliste;
        }
        return bruker;
    });

    return {
        enhet,
        antallTotalt: alleBrukere.length,
        antallReturnert: antallInt,
        fraIndex: fraInt,
        brukere: filtrerteBrukere
    };
}

export const veilarbportefoljeHandlers: RequestHandler[] = [
    http.get(
        '/veilarbportefolje/api/enhet/:enhetId/statustall',
        withAuth(async () => {
            await delay(DEFAULT_DELAY_MILLISECONDS);

            return HttpResponse.json(statustallVeileder);
        })
    ),
    http.get(
        '/veilarbportefolje/api/enhet/:enhetId/portefolje/statustall',
        withAuth(async () => {
            await delay(DEFAULT_DELAY_MILLISECONDS);

            return HttpResponse.json(statustallEnhet);
        })
    ),
    http.post(
        '/veilarbportefolje/api/enhet/:enhetId/portefolje',
        withAuth(async ({params, request}) => {
            const queryParams = new URL(request.url).searchParams;
            const portfolje = lagPortefolje(
                {fra: queryParams.get('fra'), antall: queryParams.get('antall')},
                params.enhetId as string,
                brukere
            );

            return HttpResponse.json(portfolje);
        })
    ),
    http.get(
        '/veilarbportefolje/api/enhet/:enhetId/portefoljestorrelser',
        withAuth(async () => {
            return HttpResponse.json(lagPortefoljeStorrelser());
        })
    ),
    http.post(
        '/veilarbportefolje/api/veileder/:ident/portefolje',
        withAuth(async ({request}) => {
            const queryParams = new URL(request.url).searchParams;
            const portefolje = lagPortefoljeForVeileder(
                {fra: queryParams.get('fra'), antall: queryParams.get('antall')},
                brukere
            );

            return HttpResponse.json(portefolje);
        })
    ),
    http.get(
        '/veilarbportefolje/api/veileder/:veileder/statustall',
        withAuth(async () => {
            await delay(DEFAULT_DELAY_MILLISECONDS);

            return HttpResponse.json(statustallVeileder);
        })
    ),
    http.get(
        '/veilarbportefolje/api/veileder/:veileder/portefolje/statustall',
        withAuth(async () => {
            await delay(DEFAULT_DELAY_MILLISECONDS);

            return HttpResponse.json(statustallVeileder);
        })
    ),
    http.get(
        '/veilarbportefolje/api/enhet/:enhetId/tiltak',
        withAuth(async () => {
            return HttpResponse.json(tiltak);
        })
    ),
    http.get(
        '/veilarbportefolje/api/veileder/:veileder/hentArbeidslisteForVeileder',
        withAuth(async () => {
            return HttpResponse.json(hentArbeidsliste());
        })
    ),
    http.post(
        '/veilarbportefolje/api/v2/hent-arbeidsliste',
        withAuth(async ({request}) => {
            const hentArbeidslisteRequest = (await request.json()) as {fnr: string};

            return HttpResponse.json(hentArbeidslisteForBruker({fodselsnummer: hentArbeidslisteRequest.fnr}));
        })
    ),
    http.get(
        '/veilarbportefolje/api/veileder/:veileder/moteplan',
        withAuth(async () => {
            return HttpResponse.json(hentMockPlan());
        })
    ),
    http.post(
        '/veilarbportefolje/api/arbeidsliste',
        withAuth(async ({request}) => {
            const opprettArbeidslisteRequest = (await request.json()) as ArbeidslisteDataModell[];

            return HttpResponse.json({
                error: [],
                data: opprettArbeidslisteRequest.map(arbeidsliste => arbeidsliste.fnr)
            });
        })
    ),
    http.put(
        '/veilarbportefolje/api/v2/arbeidsliste',
        withAuth(async ({request}) => {
            const oppdaterArbeidslisteRequest = (await request.json()) as ArbeidslisteDataModell & {overskrift: string};

            return HttpResponse.json({
                sistEndretAv: {
                    veilederId: 'Z990007'
                },
                endringstidspunkt: '2018-06-21T10:39:17.153Z',
                kommentar: `${oppdaterArbeidslisteRequest.kommentar}`,
                overskrift: `${oppdaterArbeidslisteRequest.overskrift}`,
                frist: `${oppdaterArbeidslisteRequest.frist}`,
                kategori: `${oppdaterArbeidslisteRequest.kategori}`,
                isOppfolgendeVeileder: true,
                arbeidslisteAktiv: null,
                harVeilederTilgang: true
            });
        })
    ),
    http.post(
        '/veilarbportefolje/api/arbeidsliste/delete',
        withAuth(async ({request}) => {
            const slettArbeidslisterRequest = (await request.json()) as {fnr: string}[];

            await delay(DEFAULT_DELAY_MILLISECONDS);

            return HttpResponse.json({
                error: [],
                data: slettArbeidslisterRequest.map(arbeidsliste => arbeidsliste.fnr)
            });
        })
    ),
    http.get(
        '/veilarbportefolje/api/enhet/:enhetId/foedeland',
        withAuth(async () => {
            await delay(DEFAULT_DELAY_MILLISECONDS);

            return HttpResponse.json(foedelandListMockData());
        })
    ),
    http.get(
        '/veilarbportefolje/api/enhet/:enhetId/tolkSpraak',
        withAuth(async () => {
            await delay(DEFAULT_DELAY_MILLISECONDS);

            return HttpResponse.json(tolkebehovSpraakMockData());
        })
    ),
    http.get(
        '/veilarbportefolje/api/enhet/:enhetId/geografiskbosted',
        withAuth(async () => {
            await delay(DEFAULT_DELAY_MILLISECONDS);

            return HttpResponse.json(geografiskBostedListMockData());
        })
    ),
    http.put(
        '/veilarbportefolje/api/v1/fargekategori',
        withAuth(async () => {
            return HttpResponse.json({
                fnr: '11111111111',
                fargekategori: 'FARGEKATEGORI_A'
            });
        })
    ),
    http.post(
        '/veilarbportefolje/api/v1/hent-huskelapp-for-bruker',
        withAuth(async ({request}) => {
            const hentHuskelappRequest = (await request.json()) as {fnr: string; enhetId: string};
            const randomize = rnd(0, 1);

            return randomize > 0.5
                ? HttpResponse.json(hentHuskelappForBruker(hentHuskelappRequest.fnr, hentHuskelappRequest.enhetId))
                : new HttpResponse(null, {status: 200});
        })
    ),
    http.post(
        '/veilarbportefolje/api/v1/huskelapp',
        withAuth(async ({request}) => {
            (await request.json()) as LagreHuskelapp;

            return HttpResponse.json('458b42ca-0f31-4041-a549-3a250a9ec291');
        })
    ),
    http.put(
        '/veilarbportefolje/api/v1/huskelapp',
        withAuth(async ({request}) => {
            const oppdaterHuskelappRequest = (await request.json()) as EndreHuskelapp;

            return HttpResponse.json({
                huskelappId: '458b42ca-0f31-4041-a549-3a250a9ec291',
                frist: oppdaterHuskelappRequest.frist,
                kommentar: oppdaterHuskelappRequest.kommentar,
                endretDato: '2018-06-21T10:39:17.153Z',
                endretAv: 'Z990007'
            });
        })
    ),
    http.delete(
        '/veilarbportefolje/api/v1/huskelapp',
        withAuth(async ({request}) => {
            const slettHuskelappRequest = (await request.json()) as string;

            await delay(DEFAULT_DELAY_MILLISECONDS);

            return HttpResponse.json({
                error: [],
                data: slettHuskelappRequest
            });
        })
    )
];
