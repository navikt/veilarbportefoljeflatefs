import Endringslogg from './endringslogg';
import {default as React, useEffect, useState} from 'react';
import {EndringsloggInnleggMedSettStatus, mapRemoteToState, setHarSettAlt} from './utils/endringslogg-custom';
import {useIdentSelector} from '../../hooks/redux/use-enheter-ident';
import {useTimer} from '../../hooks/use-timer';
import {
    hentSetteVersjonerLocalstorage,
    hentSetteVersjonerRemotestorage,
    hexString,
    krypterVeilederident,
    registrerInnholdIRemoteStorage,
    slettersjonerLocalstorage
} from './utils/endringslogg-utils';
import {logEvent} from '../../utils/frontend-logger';
import {registrerSettInnlegg} from './utils/endringslogg-api';

function EndringsloggTourWrapper() {
    const veilederIdent = useIdentSelector();

    const {startTimer, stoppTimer} = useTimer();
    const [innholdsListe, setInnholdsliste] = useState<EndringsloggInnleggMedSettStatus[]>([]);

    useEffect(() => {
        const listeEndringsVersjoner = hentSetteVersjonerLocalstorage();
        if(listeEndringsVersjoner.length > 0 ) {
            registrerSettInnlegg(listeEndringsVersjoner.join(','))
                .then(() => hentSetteVersjonerRemotestorage()
                    .then(resp => {
                        setInnholdsliste(mapRemoteToState(resp));
                        slettersjonerLocalstorage();
                    }))
                .catch(() => setInnholdsliste(setHarSettAlt))
        } else {
            hentSetteVersjonerRemotestorage()
                .then(resp => setInnholdsliste(mapRemoteToState(resp)))
                .catch(() => setInnholdsliste(setHarSettAlt));
        }
    }, []);


    const registrerInnholdRemote = async (innhold: EndringsloggInnleggMedSettStatus[]) => {
        await registrerInnholdIRemoteStorage(innhold);
    };

    const onClose = () => {
        const ulestFelt = innholdsListe.some((element) => !element.sett);
        const tidBrukt = stoppTimer();
        if(veilederIdent) {
            krypterVeilederident(veilederIdent)
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

    return (
        <Endringslogg
            innhold={innholdsListe}
            onOpen={startTimer}
            onClose={onClose}
        />
    );
}

export default EndringsloggTourWrapper;
