import {PropsWithChildren, useEffect} from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import {hentFeaturesFraUnleash} from '../ducks/features';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../reducer';
import {hentInnloggetVeileder} from '../ducks/innlogget-veileder';
import {hentSystemmeldinger} from '../ducks/systemmeldinger';
import {hentBrukerIKontekst} from '../ducks/bruker-i-kontekst';

function InitialDataProvider({children}: PropsWithChildren<{}>) {
    const innloggetVeilederState = useSelector((state: AppState) => state.innloggetVeileder);
    const brukerIKontekstState = useSelector((state: AppState) => state.brukerIKontekst);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hentFeaturesFraUnleash());
        dispatch(hentInnloggetVeileder());
        dispatch(hentSystemmeldinger());
        dispatch(hentBrukerIKontekst());
    }, [dispatch]);

    return <Innholdslaster avhengigheter={[innloggetVeilederState, brukerIKontekstState]}>{children}</Innholdslaster>;
}

export default InitialDataProvider;
