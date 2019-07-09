import { default as React, useEffect, useRef, useState } from 'react';
import { Innholdstittel, Element, Normaltekst, EtikettLiten } from 'nav-frontend-typografi';
import classNames from 'classnames/dedupe';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { UnmountClosed, Collapse, CollapseProps } from 'react-collapse';
import  {ReactComponent as AlarmIcon} from './alarm.svg';

interface EndringsloggInnholdProps {
    url?: string;
    linkTekst?: string;
    dato: string;
    innholdsTekst: string;
    innholdsOverskrift: string;
    nyeNotifikasjoner: boolean;
}

function EndringsloggInnhold(props: EndringsloggInnholdProps) {
    let linkTag: any;
    if (props.url !== undefined) {
        if (props.linkTekst !== undefined) {
            linkTag = <><a href={props.url} target="_blank">{props.linkTekst}</a><i> (Åpnes i ny fane)</i></>;
        } else {
            linkTag = <><a href={props.url} target="_blank">{props.url}</a><i> (Åpnes i ny fane)</i></>;
        }
    }
    return (
        <div className="endringslogg-rad">
            <div className="endringslogg-skille">
                <div className="endringslogg-datolinje">
                <div className={classNames({
                    'endringslogg-info-ingen-notifikasjoner endringslogg-info-kolonne': !props.nyeNotifikasjoner,
                    'endringslogg-info-nye-notifikasjoner endringslogg-info-kolonne ': props.nyeNotifikasjoner
                })}/>
                    <EtikettLiten>{props.dato}</EtikettLiten>
                </div>
                <div className="endringslogg-innhold endringslogg-kolonne">
                    <div className="endringslogg-indent">
                        <Element> {props.innholdsOverskrift} </Element>
                        <Normaltekst> {props.innholdsTekst} </Normaltekst>
                        {linkTag}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function EndringsloggKnapp(props) {
    const versjonsnummer = '0.1.9';
    let nyeNotifikasjoner = !harSettEndringsinlegg(versjonsnummer);
    const [open, setOpen] = useState(false);

    // Referranse til ytre div
    const ytreNode = useRef(null);

    const handleClickOutside = (e) => {
        // @ts-ignore
        if (ytreNode.current.contains(e.target)) {
            // Klikket er inne i komponenten
            return;
        }
        // Klikket er utenfor, oppdater staten
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);
    return (
        <div ref={ytreNode}>
            <div style={{float:'right'}}onClick={
                () => {
                    if(open) {
                        handleSettEndring(versjonsnummer);
                        nyeNotifikasjoner = false;
                    }
                    setOpen(!open);
                }
            }>
                {nyeNotifikasjoner && <div className={'endringslogg-nye-notifikasjoner-ikon'}></div>}
            
            
            <button c-label="Åpner liste med systemoppdateringer." className={`endringslogg-dropDown ${open && 'endringslogg-dropDown-active'}`} onClick={
                () => {
                    if(open) {
                        handleSettEndring(versjonsnummer);
                        nyeNotifikasjoner = false;
                    }
                    setOpen(!open);
                }
            }>
                <AlarmIcon/>
            </button>
            </div>
            <TransitionGroup component={null}>
                {open && (
                    <CSSTransition classNames="collapse-container" timeout={400}>
                        <div className="collapse-container">
                            <div className={'collapse-header'}>
                                Oppdateringer
                            </div>
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
                            />
                        </div>
                    </CSSTransition>
                )}
            </TransitionGroup>
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
