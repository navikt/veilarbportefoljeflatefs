import {default as React, useRef, useState} from 'react';
import {useEventListener} from '../../hooks/use-event-listener';
import TildelVeileder from '../modal/tildel-veileder/tildel-veileder';
import SokVeileder from './sok-veileder';
import {OversiktType} from '../../ducks/ui/listevisning';
import {BodyShort, Button} from '@navikt/ds-react';
import {oppdaterBrukerfeil} from '../../ducks/brukerfeilmelding';
import {useDispatch} from 'react-redux';

interface ToolbarKnappProps {
    skalVises?: boolean;
    aktiv: boolean;
    tildelveileder: boolean;
    ikon: React.ReactNode;
    tittel: string;
    testid: string;
    oversiktType: OversiktType;
}

export default function ToolbarKnapp(props: ToolbarKnappProps) {
    const [isInputOpen, setInputOpen] = useState(false);
    const [isBtnClicked, setBtnClicked] = useState(false);
    const loggNode = useRef<HTMLDivElement>(null); // Referanse til omsluttende div rundt loggen
    const dispatch = useDispatch();
    const requestSetOpenStatus = (setOpenTo: boolean) => {
        setInputOpen(setOpenTo);
    };

    const handleClickOutside = e => {
        if (loggNode.current?.contains(e.target)) {
            // Klikket er inne i komponenten
            return;
        }
        // Klikket er utenfor, oppdater staten
        if (isInputOpen) {
            requestSetOpenStatus(false);
        }
    };

    const escHandler = event => {
        if (event.keyCode === 27 && isInputOpen) {
            requestSetOpenStatus(false);
        }
    };

    const klikk = () => {
        if (!props.aktiv) {
            dispatch(oppdaterBrukerfeil());
        } else {
            setInputOpen(true);
        }
    };

    const visChildren = () => {
        if (props.tildelveileder) {
            return (
                <TildelVeileder
                    btnOnClick={() => setBtnClicked(true)}
                    skalVises={props.skalVises}
                    oversiktType={props.oversiktType}
                />
            );
        } else {
            return <SokVeileder veileder={{}} onClick={() => setBtnClicked(true)} skalVises={props.skalVises} />;
        }
    };

    useEventListener('mousedown', handleClickOutside);
    useEventListener('keydown', escHandler);

    if (!props.skalVises) {
        return null;
    }

    if (isBtnClicked) {
        setBtnClicked(false);
        setInputOpen(false);
    }

    return (
        <>
            {isInputOpen && (
                <div className="toolbarknapp-input" ref={loggNode} onClick={klikk}>
                    {visChildren()}
                </div>
            )}
            <Button
                variant="tertiary"
                type="button"
                className="toolbar_btn"
                icon={props.ikon}
                onClick={klikk}
                data-testid={props.testid}
            >
                <BodyShort size="small" className="toolbar-knapp__tekst">
                    {props.tittel}
                </BodyShort>
            </Button>
        </>
    );
}
