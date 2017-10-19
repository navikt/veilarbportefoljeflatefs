import {lagTilfeldigVeilederId} from './veiledere';
import {rnd} from './utils';

function lagPortefoljeStorrelse() {
    return {
        value: lagTilfeldigVeilederId(),
        count: rnd(0, 100)
    }
}

export default function lagPortefoljeStorrelser() {
    return {
        facetResults: new Array(40).map(() => lagPortefoljeStorrelse())
    };
}
