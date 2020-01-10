import Endringslogg from './endringslogg';
import {default as React, useEffect, useState} from 'react';
import {EndringsloggInnleggMedSettStatus, mapRemoteToState, setHarSettAlt} from './utils/endringslogg-custom';
import {useIdentSelector} from '../../hooks/redux/use-inlogget-ident';
import {useTimer} from '../../hooks/use-timer';
import {
    hentSetteVersjonerRemotestorage,
    hexString,
    krypterVeilederident,
    registrerInnholdIRemoteStorage,
} from './utils/endringslogg-utils';
import {logEvent} from '../../utils/frontend-logger';

function EndringsloggTourWrapper() {
    const veilederIdent = useIdentSelector();

    const {startTimer, stoppTimer} = useTimer();
    const [innholdsListe, setInnholdsliste] = useState<EndringsloggInnleggMedSettStatus[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        hentSetteVersjonerRemotestorage()
            .then(resp => {
                setInnholdsliste(mapRemoteToState(resp));
                setIsLoading(false)
            })
            .catch(() => {
                setInnholdsliste(setHarSettAlt);
                setIsLoading(false)
            })
    },[]);


    const registrerInnholdRemote = async (innhold: EndringsloggInnleggMedSettStatus[]) => {
        await registrerInnholdIRemoteStorage(innhold);
    };

    const onClose = () => {
        const ulestFelt = innholdsListe.some((element) => !element.sett);
        const tidBrukt = stoppTimer();
        if(veilederIdent) {
            krypterVeilederident(veilederIdent.ident)
                .then((res) =>
                    logEvent('portefolje.endringslogg', {
                        feature: 'veiledergrupper',
                        tidBrukt,
                        nyeNotifikasjoner: ulestFelt,
                    }, {hash: hexString(res)})
                )
                .catch((e) => console.log(e)); // tslint:disable-line
        }
        if (ulestFelt) {
            const newList = setHarSettAlt();
            setInnholdsliste(newList);
            registrerInnholdRemote(newList);
        }
    };


    if(isLoading) {
        return null
    }

    return (
        <Endringslogg
            innhold={innholdsListe}
            onOpen={startTimer}
            onClose={onClose}
        />
    );
}

export default EndringsloggTourWrapper;
