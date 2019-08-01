import Endringslogg from './endringslogg';
import TourModalLocalStorage from '../tour-modal/tour-modal-local-storage';
import { default as React, useEffect, useState } from 'react';
import {
    EndringsloggInnleggMedSettStatus,
    getInnholdOgSettFraRemote,
    setHarSettAlt,
    settModalEndring
} from './endringslogg-custom';
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
} from './endringslogg-utils';
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
        hentInnhold();
    }, []);

    const hentInnhold = async () => {
        let innhold = await hentSetteVersjonerRemotestorage();
        if(innhold !== null && innhold.length === 0) {
            innhold = await syncLocalStorageIfInUse();
        }
        innhold ? setInnholdsliste(getInnholdOgSettFraRemote(innhold))
            : setInnholdsliste(setHarSettAlt);
    };

    const registrerInnhold = async () => {
        await registrerInnholdIRemoteStorage(innholdsListe);
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
            setInnholdsliste(setHarSettAlt);
            registrerInnhold();
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
                        setInnholdsliste(settModalEndring(innholdsListe, name));
                        registrerInnhold();
                    }
                }
            />
        </>
    );
}

export default EndringsloggTourWrapper;
