import {RequestHandler} from 'msw';
import {authHandlers} from './auth';
import {modiacontextholderHandlers} from './modiacontextholder';
import {poaoEndringsloggHandlers} from './poao-endringslogg';
import {poaoSanityHandlers} from './poao-sanity';
import {veilarbfilterHandlers} from './veilarbfilter';
import {veilarboppfolgingHandlers} from './veilarboppfolging';
import {veilarbportefoljeHandlers} from './veilarbportefolje';
import {veilarbportefoljeflatefsHandlers} from './veilarbportefoljeflatefs';
import {veilarbveilederHandlers} from './veilarbveileder';

export const allHandlers: RequestHandler[] = [
    ...authHandlers,
    ...modiacontextholderHandlers,
    ...poaoEndringsloggHandlers,
    ...poaoSanityHandlers,
    ...veilarbfilterHandlers,
    ...veilarboppfolgingHandlers,
    ...veilarbportefoljeHandlers,
    ...veilarbportefoljeflatefsHandlers,
    ...veilarbveilederHandlers
];
