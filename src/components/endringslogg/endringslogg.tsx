import { default as React, RefObject, useRef, useState } from 'react';
import { ReactComponent as AlarmIcon } from './icon-v3.svg';
import EndringsloggInnhold from './endringslogg-innhold';
import TransitionContainer from './transition-container';
import { useEventListener } from '../../hooks/use-event-listener';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import { EndringsloggInleggMedSettStatus } from './endringslogg-custom';

interface EndringsProps {
    innhold: EndringsloggInleggMedSettStatus[];
    onOpen: () => void;
    onClose: () => void;
}

export default function Endringslogg(props: EndringsProps) {

    const [endringsloggApen, setEndringsloggApen] = useState(false);
    const overordnetNotifikasjon = props.innhold.some((element) => !element.sett);

    const loggNode = useRef<HTMLDivElement>(null);   // Referranse til omsluttende div rundt loggen
    const focusRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const setLocalstorageAndOpenStatus = (setOpenTo: boolean) => {
        if (setOpenTo) {
            props.onOpen();
        } else {
            props.onClose();
        }
        setEndringsloggApen(setOpenTo);
    };

    const handleClickOutside = (e) => {
        if (loggNode.current && loggNode.current.contains(e.target)) {
            // Klikket er inne i komponenten
            return;
        }
        // Klikket er utenfor, oppdater staten
        if (endringsloggApen) {
            setLocalstorageAndOpenStatus(false);
        }
    };

    const escHandler = (event) => {
        if (event.keyCode === 27 && endringsloggApen) {
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

    useEventListener('mousedown', handleClickOutside, [endringsloggApen]);
    useEventListener('keydown', escHandler, [endringsloggApen]);

    return (
        <div ref={loggNode} className="endringslogg">
            <EndringsloggKnapp klikk={klikk} open={endringsloggApen} nyeNotifikasjoner={overordnetNotifikasjon}
                               buttonRef={buttonRef}/>
            <TransitionContainer visible={endringsloggApen} focusRef={focusRef}>
                <EndringsloggHeader/>
                <div className={'innhold-container'}>
                    <EndringsloggInnhold innleggsListe={props.innhold}/>
                </div>
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
