import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation, useParams} from 'react-router';
import {loggSkjermMetrikker, Side} from '../../utils/metrikker/skjerm-metrikker';
import {loggSideVisning} from '../../utils/metrikker/side-visning-metrikker';
import {getInitialStateFromUrl} from '../../utils/url-utils';
import {pagineringSetup} from '../../ducks/paginering';
import {settSortering} from '../../ducks/portefolje';
import {useIdentSelector} from '../redux/use-innlogget-ident';
import {useOnMount} from '../use-on-mount';
import {logBrowserMetrikker} from '../../utils/metrikker/browser-metrikker';
import {IdentParam} from '../../model-interfaces';

export function useSetStateFromUrl() {
    const innloggetVeilederIdent = useIdentSelector();
    const dispatch = useDispatch();

    const location = useLocation();
    const {ident} = useParams<IdentParam>();

    const pathname = location.pathname;

    const settInitalStateFraUrl = useCallback(() => {
        const {side, sidestorrelse, sorteringsfelt, sorteringsrekkefolge} = getInitialStateFromUrl();
        dispatch(pagineringSetup({side, sidestorrelse}));
        dispatch(settSortering(sorteringsrekkefolge, sorteringsfelt));
    }, [dispatch]);

    function getSideFromPathName(pathName) {
        switch (pathName) {
            case `/portefolje/${ident}`:
                return Side.VEILEDER_PORTEFOLJE_OVERSIKT;
            case '/portefolje':
                return Side.MIN_OVERSIKT;
            case '/enhet':
                return Side.ENHETENS_OVERSIKT;
            default:
                return Side.MIN_OVERSIKT;
        }
    }
    /* eslint-disable react-hooks/exhaustive-deps */
    const oversiktsside = useCallback(getSideFromPathName, [pathname])(pathname);

    useOnMount(() => {
        loggSkjermMetrikker(oversiktsside);
        loggSideVisning(innloggetVeilederIdent, oversiktsside);
        logBrowserMetrikker(innloggetVeilederIdent);
        settInitalStateFraUrl();
    });
}
