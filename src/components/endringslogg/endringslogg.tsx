import { default as React, useEffect, useRef, useState } from 'react';
import { Innholdstittel, Element, Normaltekst, EtikettLiten } from 'nav-frontend-typografi';
import classNames from 'classnames/dedupe';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { UnmountClosed, Collapse, CollapseProps } from 'react-collapse';
import { ReactComponent as AlarmIcon } from './alarm.svg';
import { ReactComponent as LinkIcon } from './external_link.svg';
import EndringsloggInnhold from './endringslogg_innhold';
import { connect } from 'react-redux';
import { ENDRINGSLOGG } from '../../konstanter';
import { sjekkFeature } from '../../ducks/features';

interface StateProps {
    harFeature: (feature: string) => boolean;
}

function Endringslogg(props: StateProps) {
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
                                         innholdsTekst= "For bedre CV-utskrift kan du nå laste ned brukerens CV i Detaljer."
                                         nyeNotifikasjoner={nyeNotifikasjoner}
                    />
                    <EndringsloggInnhold dato={'06. JUN. 2019'}
                                         innholdsOverskrift="Visning av profilering i Detaljer"
                                         innholdsTekst= "Nå finner du profileringsresultatet for brukeren under Registrering i Detaljer."
                                         nyeNotifikasjoner={nyeNotifikasjoner}
                    />
                    <EndringsloggInnhold dato={'29. MAR. 2019'}
                                         innholdsOverskrift="Manuell registrering"
                                         innholdsTekst= "Du kan nå registrere brukere manuelt i Veilederverktøy (tannhjulet).  Arena-oppgaven «Motta person» skal ikke lenger benyttes. "
                                         nyeNotifikasjoner={nyeNotifikasjoner}
                                         linkTekst="Nyhetssak på Navet"
                                         url="https://navno.sharepoint.com/sites/intranett-prosjekter-og-utvikling/SitePages/Arena-oppgaven-%C2%ABMotta-person%C2%BB-erstattes-av-ny-l%C3%B8sning-for-manuell-registrering.aspx"
                    />
                </TransitionContainer>
        </div>
    );
}

function TransitionContainer(props) {
    return (
        <TransitionGroup component={null}>
            {props.visible && (
                <CSSTransition classNames="collapse-container" timeout={400}>
                    <div className="collapse-container">
                        <div className="content" ref={props.focusRef} tabIndex={-1}>
                            {props.children}
                        </div>
                    </div>
                </CSSTransition>
            )}
        </TransitionGroup>
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
