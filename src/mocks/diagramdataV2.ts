import { rnd } from './utils';

interface Step {
    fra: number;
    til: number;
}
const defaultStepConfig = { min: 2, max: 52, step: 3 };
const stepConfig = {
    AAP_MAXTID: { min: 2, max: 215, step: 8 },
    AAP_UNNTAK: { min: 2, max: 104, step: 4 }
};

function stepper({ min, max, step }) {
    const arr: Step[] = [];
    let fra = 0;
    let til = min - 1;

    while (til <= max) {
        arr.push({ fra, til });
        fra = til + 1;
        til = fra + step;
    }

    if (fra < max) {
        arr.push({ fra, til: max });
    }

    return arr;
}

export default function lagDiagramData(bodyParams) {
    console.log('bodyParams', bodyParams); // tslint:disable-line
    const ytelse = bodyParams.ytelse;
    if (ytelse === 'AAP' || ytelse === 'TILTAKSPENGER') {
        return new Array(12)
            .fill(0)
            .map((_, i) => ({ fra: i + 1, til: i + 1, verdi:  rnd(0, 15) }));
    }

    const config = stepConfig[ytelse] || defaultStepConfig;
    return stepper(config)
        .map((step) => ({ ...step, verdi: rnd(2, 10 )}));
}
