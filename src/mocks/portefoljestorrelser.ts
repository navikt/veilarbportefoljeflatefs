import { lagTilfeldigVeilederId } from './veiledere';
import { rnd } from './utils';
import inloggetVeileder from "./inloggetVeileder";

function lagPortefoljeStorrelse() {
    return {
        value: lagTilfeldigVeilederId(),
        count: rnd(0, 50)
    };
}

export default function lagPortefoljeStorrelser() {
    return {
        facetResults: new Array(40).fill(lagPortefoljeStorrelse()).concat(new Array(1).fill({value: inloggetVeileder.ident, count: 0}))
    };
}
