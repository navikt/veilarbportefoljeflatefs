import {FetchMockHandler} from '../index';
import FetchMock from 'yet-another-fetch-mock';
import {jsonResponse} from '../utils';
import {veiledergrupper} from '../data/veiledergrupper';
import {LagretFilter, SorteringOgId} from '../../ducks/lagret-filter';
import {mineFilter} from '../data/mine-filter';

let customVeiledergrupper = veiledergrupper();
let customMineFilter = mineFilter();

export const veilarbfilterHandlers: FetchMockHandler[] = [
    (fetchMock: FetchMock) => fetchMock.get('/veilarbfilter/api/enhet/:enhetId', jsonResponse(customVeiledergrupper)),
    (fetchMock: FetchMock) =>
        fetchMock.put('/veilarbfilter/api/enhet/:enhetId', ({body}, res, ctx) => {
            let oppdatertGruppe = {};
            customVeiledergrupper = customVeiledergrupper.map(v => {
                if (v.filterId === body.filterId) {
                    oppdatertGruppe = {...v, filterNavn: body.filterNavn, filterValg: body.filterValg};
                    return oppdatertGruppe;
                }
                return v;
            }) as LagretFilter[];
            return res(ctx.json(oppdatertGruppe));
        }),
    (fetchMock: FetchMock) =>
        fetchMock.post('/veilarbfilter/api/enhet/:enhetId', (req, res, ctx) => {
            const filterId = Math.floor(Math.random() * 100) + 500;
            customVeiledergrupper = [...customVeiledergrupper, {...req.body, filterId}];
            return res(ctx.json({...req.body, filterId}));
        }),
    (fetchMock: FetchMock) =>
        fetchMock.delete('/veilarbfilter/api/enhet/:enhetId/filter/:filterId', (req, res, ctx) => {
            const filterId = parseInt(req.pathParams.filterId);
            if (!isNaN(filterId)) {
                customVeiledergrupper = customVeiledergrupper.filter(v => v.filterId !== filterId);
                return res(ctx.status(200));
            }
            return res(ctx.status(401));
        }),
    (fetchMock: FetchMock) => fetchMock.get('/veilarbfilter/api/minelagredefilter', jsonResponse(customMineFilter)),
    (fetchMock: FetchMock) =>
        fetchMock.put('/veilarbfilter/api/minelagredefilter', ({body}, res, ctx) => {
            let filterIndex = customMineFilter.findIndex(elem => elem.filterId === body.filterId);
            const aktiv = true;
            customMineFilter[filterIndex] = {...body, aktiv};
            return res(ctx.json(customMineFilter[filterIndex]));
        }),
    (fetchMock: FetchMock) =>
        fetchMock.post('/veilarbfilter/api/minelagredefilter', (req, res, ctx) => {
            const filterId = Math.floor(Math.random() * 100) + 500;
            const aktiv = true;
            customMineFilter = [...customMineFilter, {...req.body, filterId, aktiv}];
            return res(ctx.json({...req.body, filterId, aktiv}));
        }),
    (fetchMock: FetchMock) =>
        fetchMock.delete('/veilarbfilter/api/minelagredefilter/:filterId', (req, res, ctx) => {
            const filterId = parseInt(req.pathParams.filterId);
            if (!isNaN(filterId)) {
                customMineFilter = customMineFilter.filter(v => v.filterId !== filterId);
                return res(ctx.status(200));
            }
            return res(ctx.status(401));
        }),
    (fetchMock: FetchMock) =>
        fetchMock.post('/veilarbfilter/api/minelagredefilter/lagresortering', (req, res, ctx) => {
            const sorteringer = req.body as SorteringOgId[];
            sorteringer.forEach(elem => {
                const customMineFilterElem = customMineFilter.find(filter => elem.filterId === filter.filterId);
                if (customMineFilterElem) {
                    customMineFilterElem.sortOrder = elem.sortOrder;
                }
            });
            return res(ctx.json(customMineFilter), ctx.status(200));
        })
];
