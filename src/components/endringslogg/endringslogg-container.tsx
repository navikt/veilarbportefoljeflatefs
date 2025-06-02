import {RefObject, useRef, useState} from 'react';
import classNames from 'classnames';
import {Heading, Label} from '@navikt/ds-react';
import {EndringsloggIkon} from './icons/endringslogg-icon';
import {EndringsloggContent} from './endringslogg-content';
import {TransitionContainer} from './transition-container';
import {useEventListener} from './hooks/use-event-listener';
import {EndringsloggEntryWithSeenStatus} from './utils/endringslogg-custom';
import './endringslogg.css';

interface EndringsloggContainerProps {
    content: EndringsloggEntryWithSeenStatus[];
    onOpen: () => void;
    onClose: () => void;
    appName: string;
    errorMessage?: string;
}

export const EndringsloggContainer = ({
    content,
    onOpen,
    onClose,
    appName,
    errorMessage
}: EndringsloggContainerProps) => {
    const [endringsloggApen, setEndringsloggApen] = useState(false);
    const overordnetNotifikasjon = content.some(element => !element.seen);

    const loggNode = useRef<HTMLDivElement>(null); // Referanse til omsluttende div rundt loggen
    const buttonRef = useRef<HTMLButtonElement>(null);

    const requestSetOpenStatus = (setOpenTo: boolean) => {
        if (setOpenTo) {
            onOpen();
        } else {
            onClose();
        }
        setEndringsloggApen(setOpenTo);
    };

    const handleClickOutside = (event: any) => {
        if (
            loggNode.current?.contains(event.target) ||
            document.body.classList.contains('navds-modal__document-body')
        ) {
            // Klikket er inne i komponenten, eller modalen vises
            return;
        }
        // Klikket er utenfor, oppdater staten
        if (endringsloggApen) {
            requestSetOpenStatus(false);
        }
    };

    const escHandler = (event: any) => {
        if (event.keyCode === 27 && endringsloggApen) {
            requestSetOpenStatus(false);
            if (buttonRef.current) {
                buttonRef.current.focus();
            }
        }
    };

    const click = (event: any) => {
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
        <div ref={loggNode} className={'endringslogg'}>
            <EndringsloggIconButton
                onClick={click}
                open={endringsloggApen}
                newNotifications={overordnetNotifikasjon}
                buttonRef={buttonRef}
                name={appName}
            />
            <TransitionContainer visible={endringsloggApen}>
                <Heading size="small" level="1" className={'collapse-header'}>
                    Nytt i {appName}
                </Heading>
                <div className={'innhold-container'} data-testid="endringslogg-innhold">
                    <EndringsloggContent innleggsListe={content} />
                    {errorMessage && <Label>{errorMessage}</Label>}
                </div>
            </TransitionContainer>
        </div>
    );
};

interface EndringsloggIconButtonProps {
    buttonRef: RefObject<HTMLButtonElement>;
    open: boolean;
    newNotifications: boolean;
    onClick: (e?: any) => void;
    name: string;
}

const EndringsloggIconButton = ({buttonRef, open, newNotifications, onClick, name}: EndringsloggIconButtonProps) => {
    return (
        <button
            aria-label={`Endringslogg for ${name}`}
            ref={buttonRef}
            className={classNames(
                'endringslogg-knapp',
                'endringslogg-dropDown',
                open && 'endringslogg-dropDown-active'
            )}
            onClick={onClick}
            data-testid="endringslogg-knapp"
        >
            <EndringsloggIkon />
            {newNotifications && (
                <div className={'ring-container'}>
                    <div className={'ringring'} />
                    <div className={'circle'} data-testid="endringslogg_nye-notifikasjoner" />
                </div>
            )}
        </button>
    );
};
