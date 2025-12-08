import {FacetResults} from '../../ducks/portefoljestorrelser';
import {veiledere} from './veiledere';
import {rnd} from '../utils';

export function lagPortefoljestorrelserForVeiledere(): {facetResults: FacetResults[]} {
    return {
        facetResults: veiledere.map(veileder => ({value: veileder.ident, count: rnd(0, 120)}))
    };
}
