import Endringslogg from './endringslogg';
import TourModalLocalStorage from '../tour-modal/tour-modal-local-storage';
import { default as React, useEffect, useState } from 'react';
import {
    EndringsloggInnleggMedSettStatus,
    mapRemoteToState,
    setHarSettAlt,
    settModalEndring
} from './utils/endringslogg-custom';
import {ENDRINGSLOGG, USE_VEILARBREMOTESTORAGE, VIS_MOTER_MED_NAV} from '../../konstanter';
import { ModalName } from '../tour-modal/tour-modal';
import { useFeatureSelector } from '../../hooks/redux/use-feature-selector';
import { useIdentSelector } from '../../hooks/redux/use-enheter-ident';
import { useTimer } from '../../hooks/use-timer';
import {
    hentSetteVersjonerRemotestorage,
    hexString,
    krypterVeilederident,
    registrerInnholdIRemoteStorage,
    hentSetteVersjonerLocalstorage, registrerHarLestEndringslogg
} from './utils/endringslogg-utils';
import { logEvent } from '../../utils/frontend-logger';
import { registrerSettInnlegg } from './utils/endringslogg-api';

function EndringsloggTourWrapper() {
    const harFeature = useFeatureSelector();
    const veilederIdent = useIdentSelector();
    const features = {
        visMoteMedNAV: harFeature(VIS_MOTER_MED_NAV),
        visEndringslogg: harFeature(ENDRINGSLOGG),
        brukRemoteStorage: harFeature(USE_VEILARBREMOTESTORAGE)
    };

    const {startTimer, stoppTimer} = useTimer();
    const [innholdsListe, setInnholdsliste] = useState<EndringsloggInnleggMedSettStatus[]>([]);

    useEffect(() => {
        if(features.brukRemoteStorage) {
            hentInnholdRemote();
        } else {
            hentFraLocalStorage();
        }
    }, []);

    const hentInnholdRemote = async () => {
        try {
            let innhold = await hentSetteVersjonerRemotestorage();
            if (innhold.length === 0) {
                innhold = hentSetteVersjonerLocalstorage();
                if (innhold.length !== 0) {
                    registrerSettInnlegg(innhold.join(','));
                }
            }
            setInnholdsliste(mapRemoteToState(innhold));
        } catch (e) {
            setInnholdsliste(setHarSettAlt);
        }

    };

    const hentFraLocalStorage = ()=>  {
        let innhold = hentSetteVersjonerLocalstorage();
        if (innhold.length !== 0) {
            registrerSettInnlegg(innhold.join(','));
        }
        setInnholdsliste(mapRemoteToState(innhold));
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
            if(features.brukRemoteStorage){
                registrerInnholdRemote(newList);
            }
            else {
                const versjonIdListe = newList.map(elem => elem.versjonId);
                const fjernVersjonsIDDuplikater = versjonIdListe.filter((v,i) => versjonIdListe.indexOf(v) === i);
                registrerHarLestEndringslogg(fjernVersjonsIDDuplikater);
            }
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
