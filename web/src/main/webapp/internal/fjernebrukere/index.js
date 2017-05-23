var el = Sink.createElement;
var source = new Source(document);
var api = new FristillApi();

var state = {
};

function whoamiRenderer(error, data) {
    if (error) {
        return el('h2', {}, 'Feil ved innlasting av konteksdata...');
    }

    var saksbehandler = data[0];
    var enheter = data[1].enhetliste;

    return [
        el('p', {},
            el('b', {}, 'Ident: '),
            el(
                'span',
                {
                    'class': 'saksbehandlerident'
                },
                saksbehandler.ident + ' ' + saksbehandler.navn
            )
        ),
        el('p', {},
            el('b', {}, 'Enheter: '),
            enheter.map(function(enhet){
                return enhet.enhetId + ' ' + enhet.navn
            }).join(', ')
        ),
        el('div', {},
            el('h2', {}, 'Hent brukere'),
            enheter.map(function (enhet) {
                return el(
                    'button',
                    {
                        'class': 'enhetBtn',
                        'data-enhetid': enhet.enhetId,
                        'data-enhetnavn': enhet.navn
                    },
                    enhet.enhetId + ' ' + enhet.navn
                );
            })
        )
    ];
}

function brukerRenderer(error, data) {
    if (error) {
        return el('h2', {}, 'Feil ved innlasting av brukere...');
    }

    var enhet = data.enhet;
    var brukere = data.brukere.brukere;

    if (brukere.length === 0) {
        return el('h2', {}, 'Fant ingen inaktive (ISERV) brukere på enhet ' + enhet.enhetId + ' ' + enhet.navn);
    }

    return [
        el('h2', {}, 'Brukere fra ' + enhet.enhetId + ' ' + enhet.navn),
        el('form', {},
            el('table', {},
                el('thead', {},
                    el('tr', {},
                        el('th', {}, ''),
                        el('th', {}, 'Fnr'),
                        el('th', {}, 'Navn'),
                        el('th', {}, 'Enhet')
                    )
                ),
                el('tbody', {},
                    brukere.map(function (bruker) {
                        return el('tr', {},
                            el(
                                'input',
                                {
                                    'class': 'fristillcheckbox',
                                    'type': 'checkbox',
                                    'data-fnr': bruker.fnr,
                                    'data-navn': bruker.fornavn + ' ' + bruker.etternavn
                                },
                                []
                            ),
                            el('td', {}, bruker.fnr),
                            el('td', {}, bruker.fornavn + ' ' + bruker.etternavn),
                            el('td', {}, enhet.enhetId + ' ' + enhet.navn)
                        );
                    })
                )
            )
        )
    ];
}

function valgstatusRenderer(brukere) {
    if (brukere.length === 0) {
        return el('div', {}, []);
    }
    return el('div', {},
        el('h2', {}, 'Valgte brukere'),
        el('ul', {},
            brukere.map(function(bruker){
                return el('li', {}, bruker.fnr + ': ' + bruker.navn)
            })
        ),
        el(
            'button',
            {
                'class': 'fristillBtn'
            },
            'Fjern veileder tilknyttning for de ' + brukere.length + ' valgte brukerne'
        )
    );
}

function whoamiHandler(data, error) {
    var container = document.querySelector('.saksbehandler');
    if (error) {
        Sink.of(whoamiRenderer(error, null)).into(container);
    } else {
        Sink.of(whoamiRenderer(null, data)).into(container);
        state.whoami = {};
        state.whoami.me = data[0];
        state.whoami.enheter = data[1].enhetliste;
    }
}

function brukereHandler(data, error) {
    var container = document.querySelector('.brukere');

    if (error) {
        Sink.of(brukerRenderer(error, null)).into(container);
    } else {
        Sink.of(brukerRenderer(null, data)).into(container);
        state.brukere = data;
    }
    valgtHandler();
}

function valgtHandler() {
    var fnrs = Array.prototype.slice.call(document.querySelectorAll('input[type=checkbox]:checked'))
        .map(function (input) {
            return input.dataset;
        });

    var container = document.querySelector('.valgstatus');
    Sink.of(valgstatusRenderer(fnrs)).into(container);
}

function fristillHandler() {
    var fnrs = Array.prototype.slice.call(document.querySelectorAll('input[type=checkbox]:checked'));
    var fnrsStr = fnrs
        .map(function (input) {
            return input.dataset.fnr + ' ' + input.dataset.navn;
        }).join('\n');

    if (confirm('Dette vil fjerne følgende brukere fra din og enhetens portefølje.\n\n' + fnrsStr + '\n\n Er du sikker?')) {
        var me = state.whoami.me.ident;
        source.fromPromise('fjerntilordning', api.fjernTilordning(fnrs, me))
    }
}

function hentBrukere() {
    return source.fromPromise('brukere',
        api.hentBrukere(state.valgtEnhet.enhetid, state.whoami.me.ident)
            .then(function (brukere) {
                return {
                    enhet: {
                        enhetId: state.valgtEnhet.enhetid,
                        navn: state.valgtEnhet.enhetnavn
                    },
                    brukere: brukere
                }
            })
    );
}

source.listen('whoami_ERROR', whoamiHandler);
source.listen('whoami_OK', whoamiHandler);  
source.listen('brukere_ERROR', brukereHandler);
source.listen('brukere_OK', brukereHandler);
source.listen('fjerntilordning_ERROR', function() {
    alert('Fjerning av tilordning feiled...\nPrøv igjen senere, evt. kontakt brukerstøtte...');
});

source.listen('fjerntilordning_OK', function() {
    alert('Fjerning av tilordning OK...\n\n');
    hentBrukere();
});

source.listen('click', Source.Event.matches('.fristillcheckbox', valgtHandler));
source.listen('click', Source.Event.matches('.fristillBtn', fristillHandler));


source.listen('click', Source.Event.matches('.enhetBtn', function (event) {
    var enhetid = event.target.dataset.enhetid;
    var enhetnavn = event.target.dataset.enhetnavn;
    state.valgtEnhet = { enhetid: enhetid, enhetnavn: enhetnavn };

    hentBrukere();
}));

source.listen('DOMContentLoaded', function () {
    source.fromPromise('whoami', Promise.all([api.hentMe(), api.hentEnheter()]));
});