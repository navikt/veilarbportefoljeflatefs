import {http, HttpResponse, RequestHandler} from 'msw';
import {LagretFilter, SorteringOgId} from '../../ducks/lagret-filter';
import {veiledergrupper} from '../data/veiledergrupper';
import {mineFilter} from '../data/mine-filter';
import {withAuth} from './auth';

let customVeiledergrupper = veiledergrupper();
let customMineFilter = mineFilter();

export const veilarbfilterHandlers: RequestHandler[] = [
    http.get(
        '/veilarbfilter/api/enhet/:enhetId',
        withAuth(async () => {
            return HttpResponse.json(customVeiledergrupper);
        })
    ),
    http.put(
        '/veilarbfilter/api/enhet/:enhetId',
        withAuth(async ({request}) => {
            const oppdaterFilterRequest = (await request.json()) as LagretFilter;

            let oppdatertGruppe = {};
            customVeiledergrupper = customVeiledergrupper.map(v => {
                if (v.filterId === oppdaterFilterRequest.filterId) {
                    oppdatertGruppe = {
                        ...v,
                        filterNavn: oppdaterFilterRequest.filterNavn,
                        filterValg: oppdaterFilterRequest.filterValg
                    };
                    return oppdatertGruppe;
                }
                return v;
            }) as LagretFilter[];

            return HttpResponse.json(oppdatertGruppe);
        })
    ),
    http.post(
        '/veilarbfilter/api/enhet/:enhetId',
        withAuth(async ({request}) => {
            const opprettFilterRequest = (await request.json()) as LagretFilter;
            const filterId = Math.floor(Math.random() * 100) + 500;
            customVeiledergrupper = [...customVeiledergrupper, {...opprettFilterRequest, filterId}];

            return HttpResponse.json({...opprettFilterRequest, filterId});
        })
    ),
    http.delete(
        '/veilarbfilter/api/enhet/:enhetId/filter/:filterId',
        withAuth(async ({params}) => {
            const filterId = parseInt(params.filterId as string);

            if (!isNaN(filterId)) {
                customVeiledergrupper = customVeiledergrupper.filter(v => v.filterId !== filterId);
                return new HttpResponse(null, {status: 200});
            }

            return new HttpResponse(null, {status: 401});
        })
    ),
    http.get(
        '/veilarbfilter/api/minelagredefilter',
        withAuth(async () => {
            return HttpResponse.json(customMineFilter);
        })
    ),
    http.put(
        '/veilarbfilter/api/minelagredefilter',
        withAuth(async ({request}) => {
            const oppdaterFilterRequest = (await request.json()) as LagretFilter;

            let filterIndex = customMineFilter.findIndex(elem => elem.filterId === oppdaterFilterRequest.filterId);
            customMineFilter[filterIndex] = {...oppdaterFilterRequest, aktiv: true};
            return HttpResponse.json(customMineFilter[filterIndex]);
        })
    ),
    http.post(
        '/veilarbfilter/api/minelagredefilter',
        withAuth(async ({request}) => {
            const opprettFilterRequest = (await request.json()) as LagretFilter;
            const filterId = Math.floor(Math.random() * 100) + 500;
            customMineFilter = [...customMineFilter, {...opprettFilterRequest, filterId, aktiv: true}];

            return HttpResponse.json({...opprettFilterRequest, filterId, aktiv: true});
        })
    ),
    http.delete(
        '/veilarbfilter/api/minelagredefilter/:filterId',
        withAuth(async ({params}) => {
            const filterId = parseInt(params.filterId as string);

            if (!isNaN(filterId)) {
                customMineFilter = customMineFilter.filter(v => v.filterId !== filterId);
                return new HttpResponse(null, {status: 200});
            }

            return new HttpResponse(null, {status: 401});
        })
    ),
    http.post(
        '/veilarbfilter/api/minelagredefilter/lagresortering',
        withAuth(async ({request}) => {
            const sorteringer = (await request.json()) as SorteringOgId[];
            sorteringer.forEach(elem => {
                const customMineFilterElem = customMineFilter.find(filter => elem.filterId === filter.filterId);
                if (customMineFilterElem) {
                    customMineFilterElem.sortOrder = elem.sortOrder;
                }
            });

            return HttpResponse.json(customMineFilter);
        })
    )
];
