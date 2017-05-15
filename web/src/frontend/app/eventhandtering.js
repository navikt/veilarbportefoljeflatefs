/* eslint-disable no-undef*/
const handlePersonsokSubmit = (fnr) => {
    window.location.pathname = `veilarbpersonflatefs/${fnr}`;
};

const handleChangeEnhet = (enhet, type) => {
    if (type !== 'init') {
        window.location.search = (`?enhet=${enhet}&clean`);
    }
};

function finnMiljoStreng() {
    const host = window.location.host;
    const bindestrekIndex = host.indexOf('-');
    if (bindestrekIndex === -1) {
        return '';
    }
    const dotIndex = host.indexOf('.');
    return host.substring(bindestrekIndex + 1, dotIndex);
}
export function erstattMiljoPlaceholder(lenke) {
    const miljoStreng = finnMiljoStreng();
    if (miljoStreng) {
        return lenke.replace('{{miljoStreng}}', `-${miljoStreng}`);
    }
    return lenke.replace('{{miljoStreng}}', miljoStreng);
}


const getConfig = (initiellEnhet = undefined) => {
    const modiaUrl = erstattMiljoPlaceholder('https://modapp{{miljoStreng}}.adeo.no/modiabrukerdialog');
    const miaUrl = erstattMiljoPlaceholder('https://modapp{{miljoStreng}}.adeo.no/mia');

    const lenker =
        {
            lenker: [
                [miaUrl, 'Arbeidsmarkedet'],
                [`/veilarbportefoljeflatefs/enhet?enhet=${initiellEnhet}&clean`, 'Enhetens oversikt'],
                [`/veilarbportefoljeflatefs/portefolje?enhet=${initiellEnhet}&clean`, 'Min oversikt'],
                [modiaUrl, 'Modia']
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
            applicationName: 'Arbeidsrettet oppfølging'
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
