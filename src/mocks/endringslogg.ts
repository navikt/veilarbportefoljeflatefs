export let endringsloggListe = {};

export function f(b: any) {
    // console.log("endringslogg", endringslogg);
    // console.log("b", b);

    // Object.assign(endringslogg, JSON.parse(b.body));
    return Object.assign(endringsloggListe, b);

}
