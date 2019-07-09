import { default as React, useEffect, useRef, useState } from 'react';
import { Innholdstittel, Element, Normaltekst, EtikettLiten } from 'nav-frontend-typografi';
import classNames from 'classnames/dedupe';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { UnmountClosed, Collapse, CollapseProps } from 'react-collapse';
import { ReactComponent as AlarmIcon } from './alarm.svg';
import { ReactComponent as LinkIcon } from './external_link.svg';
import EndringsloggInnhold from './endringslogg_innhold';

export function Endringslogg(props) {
    const versjonsnummer = '0.1.9';
    const [open, setOpen] = useState(false);
    const loggNode = useRef<HTMLDivElement>(null);   // Referranse til omsluttende div rundt loggen
    const focusRef = useRef<HTMLDivElement>(null);
    let nyeNotifikasjoner = !harSettEndringsinlegg(versjonsnummer);

    const setLocalstorageAndOpenStatus = (openStatus: boolean) => {
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
        setLocalstorageAndOpenStatus(false);
    };

    const escFunction = (event) => {
        if (event.keyCode === 27) {
            setLocalstorageAndOpenStatus(false);
        }
    };

    const klikk = () => {
        setLocalstorageAndOpenStatus(!open);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', escFunction, false);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', escFunction, false);
        };
    }, []);

    useEffect(() => {
        if (focusRef.current) {
            focusRef.current.focus();
        }
    });

    return (
        <div ref={loggNode}>
            <div style={{float: 'right'}} onClick={klikk}>
                {nyeNotifikasjoner && <div className={'endringslogg-nye-notifikasjoner-ikon'}/>}
                <button className={`endringslogg-dropDown ${open && 'endringslogg-dropDown-active'}`} onClick={klikk}>
                    <AlarmIcon/>
                </button>
            </div>
            <TransitionGroup component={null}>
                {open && (
                    <CSSTransition classNames="collapse-container" timeout={400}>
                        <div className="collapse-container">
                            <div className="content" ref={props.focusRef} tabIndex={-1}>
                        <EndringsloggHeader/>
                        <EndringsloggInnhold dato={'18. JUN. 2019'}
                                             innholdsOverskrift="Laste ned og skrive ut CV"
                                             innholdsTekst="Når du går inn på en bruker kan du nå laste ned CV-en under fanen «Detaljer». Da får du en bedre utskrift."
                                             nyeNotifikasjoner={nyeNotifikasjoner}
                        />
                        <EndringsloggInnhold dato={'06. JUN. 2019'}
                                             innholdsOverskrift="Visning av profilering i Detaljer"
                                             innholdsTekst="Nå kan du se profileringsresultatet fra brukerens registrering. Du finner det under «Registrering» i fanen «Detaljer» når du går inn på en bruker."
                                             nyeNotifikasjoner={nyeNotifikasjoner}
                        />
                        <EndringsloggInnhold dato={'29. MAR. 2019'}
                                             innholdsOverskrift="Manuell registrering"
                                             innholdsTekst="Ny løsning for å registrere brukere manuelt i Modia. Når du går inn på en bruker finner du det i Veilederverktøy (tannhjulet). Arena-oppgaven «Motta person» skal ikke lenger benyttes. "
                                             nyeNotifikasjoner={nyeNotifikasjoner}
                                             linkTekst="Les nyhetssak på Navet om den nye manuelle registreringen i Modia"
                                             url="https://navno.sharepoint.com/sites/intranett-prosjekter-og-utvikling/SitePages/Arena-oppgaven-%C2%ABMotta-person%C2%BB-erstattes-av-ny-l%C3%B8sning-for-manuell-registrering.aspx"
                        />
                            </div>
                        </div>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
}

function EndringsloggHeader(props) {
    return (
        <div className={'collapse-header'}>
            Oppdateringer
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
