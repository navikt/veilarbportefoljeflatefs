const handlePersonsokSubmit = (fnr) => {
    window.location.pathname = `veilarbpersonflatefs/${fnr}`;
};

const handleChangeEnhet = (enhet) => {
    window.location.search = (`?enhet=${enhet}`);
};

const getConfig = (initiellEnhet = undefined) => {
    const lenker =
        {
            lenker: [
                ['/mia', 'Arbeidsmarkedet'],
                [`/veilarbportefoljeflatefs/enhet?enhet=${initiellEnhet}`, 'Enhetsportefolje'],
                [`/veilarbportefoljeflatefs/portefolje?enhet=${initiellEnhet}`, 'Veilederportefølje'],
                ['/modiabrukerdialog', 'Modia']
            ],
            tittel: ''
        };

    const config = {
        config: {
            toggles: {
                visEnhet: false,
                visEnhetVelger: true,
                visSokefelt: true,
                visVeileder: true
            },
            handleChangeEnhet,
            handlePersonsokSubmit,
            initiellEnhet,
            egendefinerteLenker: lenker,
            applicationName: 'Oppfølging'
        }
    };
    return config;
};

export default () => {
    if (window.renderDecoratorHead) {
        window.renderDecoratorHead(getConfig());
    } else {
        window.location.href = 'feilsider/500.html';
    }
};


export const settEnhetIDekorator = (initiellEnhet) => {
    window.renderDecoratorHead(getConfig(initiellEnhet));
};
