import Endringslogg from './endringslogg';
import TourModalLocalStorage from '../tour-modal/tour-modal-local-storage';

import { default as React, useState, useEffect } from 'react';
import { getInnholdOgSett, settModalEndring } from './endringslogg-custom';
import { registrerHarLestEndringslogg } from './endringslogg-utils';
import { ENDRINGSLOGG, VIS_MOTER_MED_NAV } from '../../konstanter';
import { ModalName } from '../tour-modal/tour-modal';
import { useFeatureSelector } from '../../hooks/redux/use-feature-selector';
import { useTimer } from '../../hooks/use-timer';
import { hexString, krypterVeilederident } from './endringslogg-utils';
import { hentAktivBruker } from '../enhet-context/context-api';
import { logEvent } from '../../utils/frontend-logger';
import { sjekkFeature } from '../../ducks/features';

function EndringsloggTourWrapper() {
    const harFeature = useFeatureSelector();

    const visMoteMedNAV = harFeature(VIS_MOTER_MED_NAV);
    const {startTimer, stoppTimer} = useTimer();
    const [veilederIdent, setVeilderIdent] = useState('');
    const [innholdsListe, setInnholdsliste] = useState(getInnholdOgSett());

    if (!visMoteMedNAV) {
        if (innholdsListe.find((el) => el.id === ModalName.MOTE_FILTER)) {
            setInnholdsliste(innholdsListe.filter((el) => el.id !== ModalName.MOTE_FILTER));
        }
    }

    const oppdaterSettListe = ((name: string) => setInnholdsliste(settModalEndring(innholdsListe, name)));

    const oppdaterLocalstorageOgState = () => {
        innholdsListe.forEach((elem) => {
            if(!elem.sett) {
                oppdaterSettListe(elem.id);
                registrerHarLestEndringslogg(elem.id);
            }
        });
    };

    useEffect(() => {
        hentAktivVeileder();
    }, []);

    const hentAktivVeileder = async () => {
        const veilederId = await hentAktivBruker();
        setVeilderIdent(veilederId);
    };

    const onOpen= () => {
        startTimer();
    };

    const onClose= () => {
        const ulestFelt = innholdsListe.some((element) => !element.sett);
        const tidBrukt = stoppTimer();
        krypterVeilederident(veilederIdent)
            .then((res) => sendMetrikker({
                tidBrukt,
                nyeNotifikasjoner: ulestFelt,
                hash: hexString(res)
            }))
            .catch((e) => console.log(e)); // tslint:disable-line
        if (ulestFelt) {
            oppdaterLocalstorageOgState();
        }
    };

    const visEndringslogg = harFeature(ENDRINGSLOGG);
    return (
        <>
            {visEndringslogg &&
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

const mapStateToProps = (state) => ({
    harFeature: (feature: string) => sjekkFeature(state, feature)
});

