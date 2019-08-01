import Endringslogg from './endringslogg';
import TourModalLocalStorage from '../tour-modal/tour-modal-local-storage';
import { default as React, useEffect, useState } from 'react';
import {
    EndringsloggInnleggMedSettStatus,
    mapRemoteToState,
    setHarSettAlt,
    settModalEndring
} from './utils/endringslogg-custom';
import { ENDRINGSLOGG, VIS_MOTER_MED_NAV } from '../../konstanter';
import { ModalName } from '../tour-modal/tour-modal';
import { useFeatureSelector } from '../../hooks/redux/use-feature-selector';
import { useIdentSelector } from '../../hooks/redux/use-enheter-ident';
import { useTimer } from '../../hooks/use-timer';
import {
    hentSetteVersjonerRemotestorage,
    hexString,
    krypterVeilederident,
    registrerInnholdIRemoteStorage,
    syncLocalStorageIfInUse
} from './utils/endringslogg-utils';
import { logEvent } from '../../utils/frontend-logger';

function EndringsloggTourWrapper() {
    const harFeature = useFeatureSelector();
    const veilederIdent = useIdentSelector();
    const features = {
        visMoteMedNAV: harFeature(VIS_MOTER_MED_NAV),
        visEndringslogg: harFeature(ENDRINGSLOGG)
    };

    const {startTimer, stoppTimer} = useTimer();
    const [innholdsListe, setInnholdsliste] = useState<EndringsloggInnleggMedSettStatus[]>([]);

    useEffect(() => {
        hentInnholdRemote();
    }, []);

    const hentInnholdRemote = async () => {
        let innhold = await hentSetteVersjonerRemotestorage();
        if(innhold !== null && innhold.length === 0) {
            innhold = await syncLocalStorageIfInUse();
        }
        innhold ? setInnholdsliste(mapRemoteToState(innhold))
            : setInnholdsliste(setHarSettAlt);
    };

    const registrerInnholdRemote = async (innhold: EndringsloggInnleggMedSettStatus[]) => {
        await registrerInnholdIRemoteStorage(innhold);
    };

    const onOpen = () => {
        startTimer();
    };

    const onClose = () => {
        const ulestFelt = innholdsListe.some((element) => !element.sett);
        const tidBrukt = stoppTimer();
        if(veilederIdent) {
            krypterVeilederident(veilederIdent)
                .then((res) =>
                    logEvent('portefolje.endringslogg', {
                        feature: 'pre_tilbakemelding_2',
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

    if (!features.visMoteMedNAV) {
        if (innholdsListe.find((el) => el.versjonId === ModalName.MOTE_FILTER)) {
            setInnholdsliste(innholdsListe.filter((el) => el.versjonId !== ModalName.MOTE_FILTER));
        }
    }

    return (
        <>
            {features.visEndringslogg &&
            <Endringslogg
                innhold={innholdsListe}
                onOpen={onOpen}
                onClose={onClose}
            />
            }
            <TourModalLocalStorage
                onTourComplete={
                    (name: string) => {
                        const newList = settModalEndring(innholdsListe, name);
                        setInnholdsliste(newList);
                        registrerInnholdRemote(newList);
                    }
                }
            />
        </>
    );
}

export default EndringsloggTourWrapper;
