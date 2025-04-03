import {useDispatch} from 'react-redux';
import {usePortefoljeSelector} from '../redux/use-portefolje-selector';
import {OversiktType} from '../../ducks/ui/listevisning';
import {STIGENDE, SYNKENDE} from '../../konstanter';
import {settSortering} from '../../ducks/portefolje';

export function useSetPortefoljeSortering(listevisningType: OversiktType) {
    const {sorteringsfelt, sorteringsrekkefolge} = usePortefoljeSelector(listevisningType);
    const dispatch = useDispatch();

    function settSorteringogHentPortefolje(felt) {
        let valgtRekkefolge = '';

        if (felt !== sorteringsfelt) {
            valgtRekkefolge = STIGENDE;
        } else {
            valgtRekkefolge = sorteringsrekkefolge === STIGENDE ? SYNKENDE : STIGENDE;
        }

        dispatch(settSortering(valgtRekkefolge, felt));
    }

    return settSorteringogHentPortefolje;
}
