import { default as React, useEffect, useRef, useState } from 'react';
import { ReactComponent as AlarmIcon } from './icon.svg';
import EndringsloggInnhold from './endringslogg_innhold';
import { connect } from 'react-redux';
import { ENDRINGSLOGG } from '../../konstanter';
import { sjekkFeature } from '../../ducks/features';
import TransitionContainer from './transitionContainer';
import { hentAktivBruker } from '../enhet-context/context-api';
import { logEvent } from '../../utils/frontend-logger';

// Feature kan brukes for å måle før og etter tilbakemeldingskjemaet
const sendMetrikker = (metrikker: EndringsloggMetrikker) => {
    logEvent('portefolje.endringslogg',
        { feature: 'pre_tilbakemelding', ...metrikker });
};

interface EndringsloggMetrikker {
    tidBrukt: number;
    nyeNotifikasjoner: boolean;
    hash: number;
}

function hexString(buffer) {
    const byteArray = new Uint8Array(buffer);

    const hexCodes = [...byteArray].map((value) => {
        const hexCode = value.toString(16);
        const paddedHexCode = hexCode.padStart(2, '0');
        return paddedHexCode;
    });

    return hexCodes.join('');
}

async function hentVeilederHash(versjon: string) {
    const veileder = await hentAktivBruker();
    const encoder = new TextEncoder();
    const data = encoder.encode(`${veileder} - ${versjon}`);
    const hash = await window.crypto.subtle.digest('SHA-256', data).then( (res) => hexString(res));
    return hash;
}

interface StateProps {
    harFeature: (feature: string) => boolean;
}

function useTimer(): {start: () => void, stopp: () => number} {
    const ref = useRef<number>(-1);

    function start() {
        ref.current = Date.now();
    }

    function stopp() {
        if (ref.current === -1) {
            return -1;
        }

        const ret = Date.now() - ref.current;
        ref.current = -1;
        return ret;
    }

    return {start, stopp};
}

function Endringslogg(props: StateProps) {
    const versjonsnummer = '0.1.9';
    const [open, setOpen] = useState(false);
    const loggNode = useRef<HTMLDivElement>(null);   // Referranse til omsluttende div rundt loggen
    const focusRef = useRef<HTMLDivElement>(null);
    let nyeNotifikasjoner = !harSettEndringsinlegg(versjonsnummer);

    let veilederHash =  hentVeilederHash(versjonsnummer).then( (res) => veilederHash = res);

    const {start, stopp} = useTimer();

    const setLocalstorageAndOpenStatus = (openStatus: boolean) => {
        if (openStatus) {
            start();
        } else {
            const tidBrukt = stopp();
            veilederHash.then( (res) => {
                sendMetrikker({tidBrukt, nyeNotifikasjoner, hash: res});
            });
        }

        if (open) {
            handleSettEndring(versjonsnummer);
            nyeNotifikasjoner = false;
        }

        setOpen(openStatus);
    };

    const handleClickOutside = (e) => {
        // @ts-ignore
        if (loggNode.current.contains(e.target)) {
            // Klikket er inne i komponenten
            return;
        }
        // Klikket er utenfor, oppdater staten
        if(open) {
            setLocalstorageAndOpenStatus(false);

        }
    };

    const escHandler = (event) => {
        if (event.keyCode === 27) {
            setLocalstorageAndOpenStatus(false);
        }
    };

    const klikk = (event) => {
        event.stopPropagation();
        setLocalstorageAndOpenStatus(!open);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', escHandler, false);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', escHandler, false);
        };
    }, []);

    useEffect(() => {
        if (focusRef.current) {
            focusRef.current.focus();
        }
    });

    const { harFeature } = props;
    const harRiktigFeatures = harFeature(ENDRINGSLOGG);
    if ( !harRiktigFeatures ) {
        return null;
    }

    return (
        <div ref={loggNode}>
            <EndringsloggKnapp klikk={klikk} open={open} nyeNotifikasjoner={nyeNotifikasjoner}/>
                <TransitionContainer visible={open} focusRef={focusRef}>
                    <EndringsloggHeader/>
                    <EndringsloggInnhold dato={'18. JUN. 2019'}
                                         innholdsOverskrift="Laste ned og skrive ut CV"
                                         innholdsTekst="Du kan nå laste ned brukerens CV i Detaljer og få bedre utskrift."
                                         nyeNotifikasjoner={nyeNotifikasjoner}
                    />
                    <EndringsloggInnhold dato={'06. JUN. 2019'}
                                         innholdsOverskrift="Visning av profilering i Detaljer"
                                         innholdsTekst="Nå finner du profileringsresultatet for brukeren under Registrering i Detaljer."
                                         nyeNotifikasjoner={nyeNotifikasjoner}
                    />
                    <EndringsloggInnhold dato={'29. MAR. 2019'}
                                         innholdsOverskrift="Manuell registrering"
                                         innholdsTekst="Du kan nå registrere brukere manuelt i Veilederverktøy (tannhjulet).  Arena-oppgaven «Motta person» skal ikke lenger benyttes. "
                                         nyeNotifikasjoner={nyeNotifikasjoner}
                                         linkTekst="Nyhetssak på Navet"
                                         url="https://navno.sharepoint.com/sites/intranett-prosjekter-og-utvikling/SitePages/Arena-oppgaven-%C2%ABMotta-person%C2%BB-erstattes-av-ny-l%C3%B8sning-for-manuell-registrering.aspx"
                    />
                </TransitionContainer>
        </div>
    );
}

function EndringsloggKnapp(props) {
    return (
        <div style={{float: 'right'}} onClick={props.klikk}>
            {props.nyeNotifikasjoner && <div className={'endringslogg-nye-notifikasjoner-ikon'}/>}
            <button className={`endringslogg-dropDown ${props.open && 'endringslogg-dropDown-active'}`}
                    onClick={props.klikk}>
                <AlarmIcon/>
            </button>
        </div>
    );
}

function EndringsloggHeader(props) {
    return (
        <div className={'collapse-header'}>
            Nytt i Arbeidsrettet oppfølging
        </div>
    );
}

const ENDRING_PREFIX = 'Endringslogg';

function harSettEndringsinlegg(versjon: string) {
    const senesteVersjonSett = window.localStorage.getItem(ENDRING_PREFIX);
    return senesteVersjonSett != null && senesteVersjonSett === versjon;
}

function handleSettEndring(versjon) {
    window.localStorage.setItem(ENDRING_PREFIX, versjon);
}

const mapStateToProps = (state) => ({
    harFeature: (feature: string) => sjekkFeature(state, feature)
});

export default connect(mapStateToProps)(Endringslogg);
