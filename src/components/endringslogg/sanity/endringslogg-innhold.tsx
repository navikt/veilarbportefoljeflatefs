import {default as React, useRef, useState} from 'react';
import PreviewWrapper from './endringslogg-groq';
import TransitionContainer from '../utils/transition-container';
import {useEventListener} from '../../../hooks/use-event-listener';
import Undertittel from 'nav-frontend-typografi/lib/undertittel';
import '../endringslogg.less';
import EndringsloggKnapp from './endringslogg-knapp';

interface EndringsloggInnholdProps {
    onOpen: () => void;
    onClose: () => void;
}

export default function EndringsloggInnholdSanity(props: EndringsloggInnholdProps) {
    const [endringsloggApen, setEndringsloggApen] = useState(false);
    const loggNode = useRef<HTMLDivElement>(null); // Referanse til omsluttende div rundt loggen
    const buttonRef = useRef<HTMLButtonElement>(null);

    const requestSetOpenStatus = (setOpenTo: boolean) => {
        if (setOpenTo) {
            props.onOpen();
        } else {
            props.onClose();
        }
        setEndringsloggApen(setOpenTo);
    };

    const handleClickOutside = e => {
        if (loggNode.current && loggNode.current.contains(e.target)) {
            // Klikket er inne i komponenten
            return;
        }
        // Klikket er utenfor, oppdater staten
        if (endringsloggApen) {
            requestSetOpenStatus(false);
        }
    };

    const escHandler = event => {
        if (event.keyCode === 27 && endringsloggApen) {
            requestSetOpenStatus(false);
            if (buttonRef.current) {
                buttonRef.current.focus();
            }
        }
    };

    const klikk = event => {
        event.stopPropagation();
        requestSetOpenStatus(!endringsloggApen);
        if (!endringsloggApen) {
            if (buttonRef.current) {
                buttonRef.current.focus();
            }
        }
    };

    useEventListener('mousedown', handleClickOutside);
    useEventListener('keydown', escHandler);

    return (
        <div ref={loggNode} className="endringslogg">
            <EndringsloggKnapp klikk={klikk} open={endringsloggApen} nyeNotifikasjoner={true} buttonRef={buttonRef} />
            <TransitionContainer visible={endringsloggApen}>
                <Undertittel className="collapse-header" tag="h2">
                    Nytt i Arbeidsrettet oppfølging
                </Undertittel>
                <div className={'innhold-container'} data-testid="endringslogg-innhold">
                    <PreviewWrapper />
                </div>
            </TransitionContainer>
        </div>
    );
}


