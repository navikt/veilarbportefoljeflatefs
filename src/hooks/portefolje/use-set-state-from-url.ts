import {useCallback} from 'react';
import {getInitialStateFromUrl} from '../../utils/url-utils';
import {pagineringSetup} from '../../ducks/paginering';
import {settSortering} from '../../ducks/portefolje';
import {useOnMount} from '../use-on-mount';

import {useAppDispatch} from '../redux/use-app-dispatch';

export function useSetStateFromUrl() {
    const dispatch = useAppDispatch();

    const settInitalStateFraUrl = useCallback(() => {
        const {side, sidestorrelse, sorteringsfelt, sorteringsrekkefolge} = getInitialStateFromUrl();
        dispatch(pagineringSetup({side, sidestorrelse}));
        dispatch(settSortering(sorteringsrekkefolge, sorteringsfelt));
    }, [dispatch]);

    useOnMount(() => {
        settInitalStateFraUrl();
    });
}
