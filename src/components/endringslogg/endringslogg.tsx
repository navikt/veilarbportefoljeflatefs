import { default as React, useEffect, useRef, useState, RefObject } from 'react';
import { ReactComponent as AlarmIcon } from './icon-v3.svg';
import EndringsloggInnhold, { LinkTag } from './endringslogg-innhold';
import { ENDRINGSLOGG, VIS_MOTER_MED_NAV } from '../../konstanter';
import { sjekkFeature } from '../../ducks/features';
import TransitionContainer from './transition-container';
import { logEvent } from '../../utils/frontend-logger';
import {
    registrerHarLestEndringslogg,
    krypterVeilederident,
    hexString,
    hentSetteVersjonerLocalstorage
} from './endringslogg-utils';
import { useTimer } from '../../hooks/use-timer';
import { useEventListener } from '../../hooks/use-event-listener';
import { hentAktivBruker } from '../enhet-context/context-api';
import TourModal, { fullfortModal, ModalName } from '../tour-modal/tour-modal';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { connect } from 'react-redux';
import TourModalButton from '../tour-modal/tour-modal-button'

// Feature kan brukes for å måle før og etter tilbakemeldingskjemaet
const sendMetrikker = (metrikker: EndringsloggMetrikker) => {
    logEvent('portefolje.endringslogg', {
        feature: 'pre_tilbakemelding_3',
        tidBrukt: metrikker.tidBrukt,
        nyeNotifikasjoner: metrikker.nyeNotifikasjoner,
        stepperVarApen: metrikker.stepperVarApen
    }, {hash: metrikker.hash});
};

interface EndringsloggMetrikker {
    tidBrukt: number;
    nyeNotifikasjoner: boolean;
    hash: string;
    stepperVarApen: boolean;
}

interface StateProps {
    harFeature: (feature: string) => boolean;
}

export function Endringslogg(props: StateProps) {
    const {harFeature} = props;
    const feature = harFeature(VIS_MOTER_MED_NAV);
    const versjoner: string[] = [];
    const {start, stopp} = useTimer();

    const [endringsloggApen, setEndringsloggApen] = useState(false);
    const [stepperApen, setStepperApen] = useState(false);
    const [stepperVarApenMetrikk, setStepperVarApenMetrikk] = useState(false);
    const [veilederIdent, setVeilderIdent] = useState('');
    const [overordnetNotifikasjon, setOverordnetNotifikasjon] = useState(false);

    const loggNode = useRef<HTMLDivElement>(null);   // Referranse til omsluttende div rundt loggen
    const focusRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        hentAktivVeileder();
    }, []);

    useEffect(() => {
        if(!stepperVarApenMetrikk && stepperApen) {
            setStepperVarApenMetrikk(true);
        }
    }, [stepperApen]);

    const hentAktivVeileder = async () => {
        const veilederId = await hentAktivBruker();
        setVeilderIdent(veilederId);
    };

    const setLocalstorageAndOpenStatus = (setOpenTo: boolean) => {
        if (setOpenTo) {
            start();
        } else {
            const tidBrukt = stopp();
            krypterVeilederident(veilederIdent)
                .then((res) => sendMetrikker({tidBrukt, nyeNotifikasjoner: overordnetNotifikasjon, stepperVarApen: stepperVarApenMetrikk, hash: hexString(res)}))
                .catch((e) => console.log(e)); // tslint:disable-line
            setOverordnetNotifikasjon(false);
            versjoner.forEach((elem) => registrerHarLestEndringslogg(elem));
            if(stepperVarApenMetrikk) {
                setStepperVarApenMetrikk(false);
            }
        }
        setEndringsloggApen(setOpenTo);
    };

    const handleClickOutside = (e) => {
        if (stepperApen || loggNode.current && loggNode.current.contains(e.target)) {
            // Klikket er inne i komponenten
            return;
        }
        // Klikket er utenfor, oppdater staten
        if (endringsloggApen) {
            setLocalstorageAndOpenStatus(false);
        }
    };

    const escHandler = (event) => {
        if (event.keyCode === 27 && endringsloggApen && !stepperApen) {
            setLocalstorageAndOpenStatus(false);
            if (buttonRef.current) {
                buttonRef.current.focus();
            }
        }
    };

    const klikk = (event) => {
        event.stopPropagation();
        setLocalstorageAndOpenStatus(!endringsloggApen);
        if (!endringsloggApen) {
            if (buttonRef.current) {
                buttonRef.current.focus();
            }
        }
    };

    useEventListener('mousedown', handleClickOutside, [endringsloggApen, stepperApen]);
    useEventListener('keydown', escHandler, [endringsloggApen, stepperApen]);

    const locSto = hentSetteVersjonerLocalstorage();
    const finnesILocalstorage = (versjon) => {
        if (!locSto.some((ver) => ver === versjon)) {
            if (!overordnetNotifikasjon) {
                setOverordnetNotifikasjon(true);
            }

            if (!versjoner.some((ver) => ver === versjon)) {
                versjoner.push(versjon);
            }
            return false;
        }
        return true;
    };

    const harRiktigFeatures = harFeature(ENDRINGSLOGG);
    if (!harRiktigFeatures) {
        return null;
    }

    return (
        <div ref={loggNode} className="endringslogg">
            <EndringsloggKnapp klikk={klikk} open={endringsloggApen} nyeNotifikasjoner={overordnetNotifikasjon}
                               buttonRef={buttonRef}/>
            <TransitionContainer visible={endringsloggApen} focusRef={focusRef}>
                <EndringsloggHeader/>
                {feature &&
                <EndringsloggInnhold dato={'16. JUL. 2019'}
                                     innholdsOverskrift="NAV møte filter"
                                     innholdsTekst="Vi har flyttet et filter. Det er nå lett å få oversikt over brukere sine møter med NAV."
                                     nyeNotifikasjoner={!finnesILocalstorage('0.2.0') && !fullfortModal(ModalName.MOTE_FILTER)}>
                    <TourModalButton modal={ModalName.MOTE_FILTER} setModalOpen={setStepperApen}
                           modalOpen={stepperApen}/>
                </EndringsloggInnhold>
                }

                <EndringsloggInnhold dato={'18. JUN. 2019'}
                                     innholdsOverskrift="Laste ned og skrive ut CV"
                                     innholdsTekst="Du kan nå laste ned brukerens CV i Detaljer og få bedre utskrift."
                                     nyeNotifikasjoner={!finnesILocalstorage('0.1.9') && !fullfortModal(ModalName.LAST_NED_CV)}>
                    <TourModalButton modal={ModalName.LAST_NED_CV} setModalOpen={setStepperApen}
                           modalOpen={stepperApen}/>
                </EndringsloggInnhold>

                <EndringsloggInnhold dato={'06. JUN. 2019'}
                                     innholdsOverskrift="Visning av profilering i Detaljer"
                                     innholdsTekst="Nå finner du profileringsresultatet for brukeren under Registrering i Detaljer."
                                     nyeNotifikasjoner={!finnesILocalstorage('0.1.9')}
                />
                <EndringsloggInnhold dato={'29. MAR. 2019'}
                                     innholdsOverskrift="Manuell registrering"
                                     innholdsTekst="Du kan nå registrere brukere manuelt i Veilederverktøy (tannhjulet).  Arena-oppgaven «Motta person» skal ikke lenger benyttes. "
                                     nyeNotifikasjoner={!finnesILocalstorage('0.1.9')}>
                    <LinkTag linkTekst={'Nyhetssak på Navet'}
                             url={'https://navno.sharepoint.com/sites/intranett-prosjekter-og-utvikling/SitePages/Arena-oppgaven-%C2%ABMotta-person%C2%BB-erstattes-av-ny-l%C3%B8sning-for-manuell-registrering.aspx'}/>
                </EndringsloggInnhold>
            </TransitionContainer>
        </div>
    );
}

interface EndringsloggKnappProps {
    buttonRef: RefObject<HTMLButtonElement>;
    open: boolean;
    nyeNotifikasjoner: boolean;
    klikk: (e?: any) => void;
}

function EndringsloggKnapp(props: EndringsloggKnappProps) {
    return (
        <button ref={props.buttonRef}
                className={`endringslogg-knapp endringslogg-dropDown ${props.open && 'endringslogg-dropDown-active'}`}
                onClick={props.klikk}>
            <AlarmIcon/>
            {props.nyeNotifikasjoner && <div className={'endringslogg-nye-notifikasjoner-ikon'}/>}
        </button>
    );
}

function EndringsloggHeader() {
    return (
        <Undertittel className="collapse-header" tag="h2">
            Nytt i Arbeidsrettet oppfølging
        </Undertittel>
    );
}

const mapStateToProps = (state) => ({
    harFeature: (feature: string) => sjekkFeature(state, feature)
});

export default connect(mapStateToProps)(Endringslogg);
