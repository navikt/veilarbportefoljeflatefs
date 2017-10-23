import { lagTilfeldigVeilederId } from './veiledere';
import { rnd } from './utils';

function lagPortefoljeStorrelse() {
    return {
        value: lagTilfeldigVeilederId(),
        count: rnd(0, 50)
    };
}

export default function lagPortefoljeStorrelser() {
    return {
        facetResults: new Array(40).fill(lagPortefoljeStorrelse())
    };
}
