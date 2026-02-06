import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {getInitialStateFromUrl} from '../../utils/url-utils';
import {pagineringSetup} from '../../ducks/paginering';
import {settSortering} from '../../ducks/portefolje';
import {useOnMount} from '../use-on-mount';
import {AppDispatch} from '../../reducer';

export function useSetStateFromUrl() {
    const dispatch = useDispatch<AppDispatch>();

    const settInitalStateFraUrl = useCallback(() => {
        const {side, sidestorrelse, sorteringsfelt, sorteringsrekkefolge} = getInitialStateFromUrl();
        dispatch(pagineringSetup({side, sidestorrelse}));
        dispatch(settSortering(sorteringsrekkefolge, sorteringsfelt));
    }, [dispatch]);

    useOnMount(() => {
        settInitalStateFraUrl();
    });
}
