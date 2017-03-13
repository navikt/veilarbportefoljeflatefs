const menyValgliste = [
    {
        url: '/mia/ledigestillinger',
        tekst: 'Arbeidsmarkedet'
    },
    {
        url: '/veilarbportefoljeflatefs/enhet',
        tekst: 'Enhetsportefølje'
    },
    {
        url: '/veilarbportefoljeflatefs/portefolje',
        tekst: 'Veilederportefølje'
    },
    {
        url: '/modiabrukerdialog/person',
        tekst: 'Modia'
    }
];


const konverterTilHtml = (menyvalg) => {
    const url = menyvalg.url;
    return (`<li><a charset="UTF-8" href=${url}>${menyvalg.tekst}</a></li>`);
};

export default () => {
    const listeHtml = menyValgliste.map(valg => konverterTilHtml(valg))
        .reduce((acc, val) => acc + val);
    return `<ul>${listeHtml}</ul>`;
};
