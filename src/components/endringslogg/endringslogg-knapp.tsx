import { default as React, useEffect, useRef, useState } from 'react';
import './endringslogg.less';
import { Innholdstittel, Element, Normaltekst, EtikettLiten } from 'nav-frontend-typografi';
import classNames from 'classnames/dedupe';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { UnmountClosed, Collapse, CollapseProps } from 'react-collapse';

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
            linkTag = <><br/> <a href={props.url} target="_blank">{props.linkTekst}</a><i> (åpnes i ny fane)</i></>;
        } else {
            linkTag = <> <br/><a href={props.url} target="_blank">{props.url}</a><i> (åpnes i ny fane)</i></>;
        }
    }
    return (
        <div className="endringslogg-rad" aria-label={'Endringsloggrad'}>
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
        if(open) {
            handleSettEndring(versjonsnummer);
            nyeNotifikasjoner = false;
        }
        setOpen(false);
    };

    const escFunction = (event) => {
        if(event.keyCode === 27) {
            if(open) {
                handleSettEndring(versjonsnummer);
                nyeNotifikasjoner = false;
            }
            setOpen(false);
        }
    };

    const klikk = () => {
        if(open) {
            handleSettEndring(versjonsnummer);
            nyeNotifikasjoner = false;
        }
        setOpen(!open);
    };

    useEffect(() => {
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', escFunction, false);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', escFunction, false);

        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);
    return (
        <div ref={ytreNode}>
            <div style={{float:'right'}}>
                {nyeNotifikasjoner && <div className={'endringslogg-nye-notifikasjoner-ikon'} onClick={klikk}></div>}
            <button className={`endringslogg-dropDown ${open && 'endringslogg-dropDown-active'}`} onClick={klikk}/>
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
                                                 linkTekst="Les nyhetssak på Navet om den nye manuelle registreringen i Modia"
                                                 url="https://navno.sharepoint.com/sites/intranett-prosjekter-og-utvikling/SitePages/Arena-oppgaven-%C2%ABMotta-person%C2%BB-erstattes-av-ny-l%C3%B8sning-for-manuell-registrering.aspx"
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
