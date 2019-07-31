import Endringslogg from './endringslogg';
import TourModalLocalStorage from '../tour-modal/tour-modal-local-storage';
import { default as React, useEffect, useState } from 'react';
import {
    EndringsloggInleggMedSettStatus,
    getInnholdOgSettFraRemote,
    settDefaultSettVerdier,
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
    registrerInnholdIRemoteStorage
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
    const [innholdsListe, setInnholdsliste] = useState<EndringsloggInleggMedSettStatus[]>([]);

    useEffect(() => {
        hentInnhold();
    }, []);

    const hentInnhold = async () => {
        const innhold = await hentSetteVersjonerRemotestorage();
        innhold ? setInnholdsliste(getInnholdOgSettFraRemote(innhold))
            : setInnholdsliste(settDefaultSettVerdier);
    };

    const oppdaterSettListe = (
        (name: string) => {
            setInnholdsliste(settModalEndring(innholdsListe, name));
            registrerInnhold();
        }
    );

    const oppdaterRemoteStoreOgState = () => {
        innholdsListe.forEach((elem) => {
            if (!elem.sett) {
                oppdaterSettListe(elem.versjonId);
            }
        });
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
            oppdaterRemoteStoreOgState();
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
                onTourComplete={oppdaterSettListe}
            />
        </>
    );
}

export default EndringsloggTourWrapper;
