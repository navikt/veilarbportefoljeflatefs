import {innloggetVeileder, lagTilfeldigVeilederId} from './veiledere';
import {rnd} from '../utils';

function lagPortefoljeStorrelse() {
    return {
        value: lagTilfeldigVeilederId(),
        count: rnd(0, 50)
    };
}

export function lagPortefoljeStorrelser() {
    return {
        facetResults: new Array(40)
            .fill(lagPortefoljeStorrelse())
            .concat(new Array(1).fill({value: innloggetVeileder.ident, count: rnd(0, 50)}))
    };
}
