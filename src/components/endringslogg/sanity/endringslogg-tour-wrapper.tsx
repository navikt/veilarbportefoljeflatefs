import {default as React, useEffect, useState} from 'react';
import {useIdentSelector} from '../../../hooks/redux/use-inlogget-ident';
import {EndringsloggInnleggMedSettStatus, mapRemoteToState, setHarSettAlt} from '../utils/endringslogg-custom';
import {useSelector} from 'react-redux';
import {
    hentSetteVersjonerRemotestorage,
    hexString,
    krypterVeilederident,
    registrerInnholdIRemoteStorage
} from '../utils/endringslogg-utils';
import {logEvent} from '../../../utils/frontend-logger';
import {AppState} from '../../../reducer';
import {useTimer} from '../../../hooks/use-timer';
import EndringsloggInnholdSanity from './endringslogg-innhold';

function EndringsloggTourWrapperSanity() {
    const veilederIdent = useIdentSelector()!.ident;
    const {startTimer, stoppTimer} = useTimer();
    const [innholdsListe, setInnholdsliste] = useState<EndringsloggInnleggMedSettStatus[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const alleFeatureToggles = useSelector((state: AppState) => state.features);

    useEffect(() => {
        hentSetteVersjonerRemotestorage()
            .then(resp => {
                setInnholdsliste(mapRemoteToState(resp, alleFeatureToggles));
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                setInnholdsliste(setHarSettAlt);
            });
    }, [alleFeatureToggles]);

    const registrerInnholdRemote = async (innhold: EndringsloggInnleggMedSettStatus[]) => {
        await registrerInnholdIRemoteStorage(innhold);
    };

    const onClose = () => {
        const ulestFelt = innholdsListe.some(element => !element.sett);
        const tidBrukt = stoppTimer();
        if (veilederIdent) {
            krypterVeilederident(veilederIdent)
                .then(res =>
                    logEvent(
                        'portefolje.endringslogg',
                        {
                            feature: 'mine-filter', //Husk å endre denne ved bytte
                            tidBrukt,
                            nyeNotifikasjoner: true
                        },
                        {hash: hexString(res)}
                    )
                )
                .catch(e => console.log(e)); // tslint:disable-line
        }
        const newList = setHarSettAlt(innholdsListe);
        setInnholdsliste(newList);
        registrerInnholdRemote(newList);
    };

    if (isLoading) {
        return null;
    }

    return <EndringsloggInnholdSanity onOpen={startTimer} onClose={onClose} />;
}

export default EndringsloggTourWrapperSanity;
