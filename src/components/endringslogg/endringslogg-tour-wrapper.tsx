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
import { useTimer } from '../../hooks/use-timer';
import {
    hentSetteVersjonerRemotestorage,
    hexString,
    krypterVeilederident,
    registrerInnholdIRemoteStorage
} from './endringslogg-utils';
import { hentAktivBruker } from '../enhet-context/context-api';
import { logEvent } from '../../utils/frontend-logger';

function EndringsloggTourWrapper() {
    const harFeature = useFeatureSelector();
    const features = {
        visMoteMedNAV: harFeature(VIS_MOTER_MED_NAV),
        visEndringslogg: harFeature(ENDRINGSLOGG)
    };

    const {startTimer, stoppTimer} = useTimer();
    const [veilederIdent, setVeilderIdent] = useState('');
    const [innholdsListe, setInnholdsliste] = useState<EndringsloggInleggMedSettStatus[]>([]);

    useEffect(() => {
        hentAktivVeileder();
        hentInnhold();
    }, []);

    const hentInnhold = async () => {
        const innhold = await hentSetteVersjonerRemotestorage();
        innhold ? setInnholdsliste(getInnholdOgSettFraRemote(innhold))
            : setInnholdsliste(settDefaultSettVerdier);
    };

    const hentAktivVeileder = async () => {
        const veilederId = await hentAktivBruker();
        setVeilderIdent(veilederId);
    };

    if (innholdsListe.find((el) => el.id === ModalName.MOTE_FILTER)) {
        setInnholdsliste(innholdsListe.filter((el) => el.id !== ModalName.MOTE_FILTER));
    }

    const oppdaterSettListe = (
        (name: string) => {
            setInnholdsliste(settModalEndring(innholdsListe, name));
            registrerInnhold();
        }
    );

    const oppdaterRemoteStoreOgState = () => {
        innholdsListe.forEach((elem) => {
            if (!elem.sett) {
                oppdaterSettListe(elem.id);
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
        krypterVeilederident(veilederIdent)
            .then((res) =>
                logEvent('portefolje.endringslogg', {
                    feature: 'pre_tilbakemelding_2',
                    tidBrukt,
                    nyeNotifikasjoner: ulestFelt,
                }, {hash: hexString(res)})
            )
            .catch((e) => console.log(e)); // tslint:disable-line
        if (ulestFelt) {
            oppdaterRemoteStoreOgState();
            registrerInnhold();
        }
    };

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

interface EndringsloggMetrikker {
    tidBrukt: number;
    nyeNotifikasjoner: boolean;
    hash: string;
}

// Feature kan brukes for å måle før og etter tilbakemeldingskjemaet
const sendMetrikker = (metrikker: EndringsloggMetrikker) => {
    logEvent('portefolje.endringslogg', {
        feature: 'pre_tilbakemelding_2',
        tidBrukt: metrikker.tidBrukt,
        nyeNotifikasjoner: metrikker.nyeNotifikasjoner,
    }, {hash: metrikker.hash});
};
