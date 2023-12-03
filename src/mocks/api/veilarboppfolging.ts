import {http, HttpResponse, RequestHandler} from 'msw';

function tildel(body: any) {
    return {feilendeTilordninger: []}; //uten feilende brukere
    //return {feilendeTilordninger: [body[0]]}; //noen feilende brukere
    //return {feilendeTilordninger: body}; //alle feilende brukere
}

export const veilarboppfolgingHandlers: RequestHandler[] = [
    http.post('/veilarboppfolging/api/tilordneveileder', async ({request}) => {
        const opprettTilordningRequest = await request.json();

        return HttpResponse.json(tildel(opprettTilordningRequest));
    })
];
