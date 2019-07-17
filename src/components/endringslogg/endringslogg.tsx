import { default as React, useEffect, useRef, useState, RefObject } from 'react';
import { ReactComponent as AlarmIcon } from './icon-v3.svg';
import EndringsloggInnhold from './endringslogg-innhold';
import { connect } from 'react-redux';
import { ENDRINGSLOGG, VIS_MOTER_MED_NAV } from '../../konstanter';
import { sjekkFeature } from '../../ducks/features';
import TransitionContainer from './transition-container';
import { logEvent } from '../../utils/frontend-logger';
import {
    registrerHarLestEndringslogg,
    krypterVeilederident,
    hexString,
    hentEndringsloggFraLocalstorage
} from './endringslogg-utils';
import { useTimer } from '../../hooks/use-timer';
import { useEventListener } from '../../hooks/use-event-listener';
import { Undertittel } from 'nav-frontend-typografi';
import { hentAktivBruker } from '../enhet-context/context-api';
import { ModalName } from '../tour-modal/tour-modal';

// Feature kan brukes for å måle før og etter tilbakemeldingskjemaet
const sendMetrikker = (metrikker: EndringsloggMetrikker) => {
    logEvent('portefolje.endringslogg', {
        feature: 'pre_tilbakemelding_3',
        tidBrukt: metrikker.tidBrukt,
        nyeNotifikasjoner: metrikker.nyeNotifikasjoner
    }, {hash: metrikker.hash});
};

interface EndringsloggMetrikker {
    tidBrukt: number;
    nyeNotifikasjoner: boolean;
    hash: string;
}

interface StateProps {
    harFeature: (feature: string) => boolean;
}

export function Endringslogg(props: StateProps) {
    const {harFeature} = props;
    const feature = harFeature(VIS_MOTER_MED_NAV);
    const versjoner: string[] = [];
    const legacyVersion = '0.1.9';
    const {start, stopp} = useTimer();

    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [veilederIdent, setVeilderIdent] = useState('');
    const [overordnetNotifikasjon, setOverordnetNotifikasjon] = useState(false);

    const loggNode = useRef<HTMLDivElement>(null);   // Referranse til omsluttende div rundt loggen
    const focusRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        hentAktivVeileder();
    }, []);

    const hentAktivVeileder = async () => {
        const veilederId = await hentAktivBruker();
        setVeilderIdent(veilederId);
    };

    const setLocalstorageAndOpenStatus = (setOpenTo: boolean) => {
        if (setOpenTo) {
            start();
        } else {
            const tidBrukt = stopp();
            krypterVeilederident(veilederIdent, legacyVersion)
                .then((res) => sendMetrikker({tidBrukt, nyeNotifikasjoner: overordnetNotifikasjon, hash: hexString(res)}))
                .catch((e) => console.log(e)); // tslint:disable-line
            setOverordnetNotifikasjon(false);
            versjoner.forEach((elem) => registrerHarLestEndringslogg(elem));
        }
        setOpen(setOpenTo);
    };

    const handleClickOutside = (e) => {
        if (modalOpen || loggNode.current && loggNode.current.contains(e.target)) {
            // Klikket er inne i komponenten
            return;
        }
        // Klikket er utenfor, oppdater staten
        if (open) {
            setLocalstorageAndOpenStatus(false);
        }
    };

    const escHandler = (event) => {
        if (event.keyCode === 27 && open && !modalOpen) {
            setLocalstorageAndOpenStatus(false);
            if (buttonRef.current) {
                buttonRef.current.focus();
            }
        }
    };

    const klikk = (event) => {
        event.stopPropagation();
        setLocalstorageAndOpenStatus(!open);
        if (!open) {
            if (buttonRef.current) {
                buttonRef.current.focus();
            }
        }
    };

    useEventListener('mousedown', handleClickOutside, [open, modalOpen]);
    useEventListener('keydown', escHandler, [open, modalOpen]);

    const locSto = hentEndringsloggFraLocalstorage();
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
            <EndringsloggKnapp klikk={klikk} open={open} nyeNotifikasjoner={overordnetNotifikasjon}
                               buttonRef={buttonRef}/>
            <TransitionContainer visible={open} focusRef={focusRef}>
                <EndringsloggHeader/>
                {feature && <EndringsloggInnhold dato={'16. JUL. 2019'}
                                                 innholdsOverskrift="NAV møte filter"
                                                 innholdsTekst="Vi har flyttet et filter. Det er nå lett å få oversikt over brukere sine møter med NAV."
                                                 nyeNotifikasjoner={!finnesILocalstorage('0.2.0')}
                                                 modalProps={{modal: ModalName.MOTE_FILTER, modalOpen, setModalOpen}}
                />}

                <EndringsloggInnhold dato={'18. JUN. 2019'}
                                     innholdsOverskrift="Laste ned og skrive ut CV"
                                     innholdsTekst="Du kan nå laste ned brukerens CV i Detaljer og få bedre utskrift."
                                     nyeNotifikasjoner={!finnesILocalstorage('0.1.9')}
                                     modalProps={{modal: ModalName.LAST_NED_CV, modalOpen, setModalOpen}}
                />
                <EndringsloggInnhold dato={'06. JUN. 2019'}
                                     innholdsOverskrift="Visning av profilering i Detaljer"
                                     innholdsTekst="Nå finner du profileringsresultatet for brukeren under Registrering i Detaljer."
                                     nyeNotifikasjoner={!finnesILocalstorage('0.1.9')}
                />
                <EndringsloggInnhold dato={'29. MAR. 2019'}
                                     innholdsOverskrift="Manuell registrering"
                                     innholdsTekst="Du kan nå registrere brukere manuelt i Veilederverktøy (tannhjulet).  Arena-oppgaven «Motta person» skal ikke lenger benyttes. "
                                     nyeNotifikasjoner={!finnesILocalstorage('0.1.9')}
                                     linkTekst="Nyhetssak på Navet"
                                     url="https://navno.sharepoint.com/sites/intranett-prosjekter-og-utvikling/SitePages/Arena-oppgaven-%C2%ABMotta-person%C2%BB-erstattes-av-ny-l%C3%B8sning-for-manuell-registrering.aspx"
                />
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
