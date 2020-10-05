import {default as React, useRef, useState} from 'react';
import {useEventListener} from '../../hooks/use-event-listener';
import TildelVeileder from '../modal/tildel-veileder/tildel-veileder';
import {Normaltekst} from 'nav-frontend-typografi';
import SokVeileder from './sok-veileder';
import {ListevisningType} from "../../ducks/ui/listevisning";

interface ToolbarKnappProps {
    skalVises?: boolean;
    aktiv: boolean;
    tildelveileder: boolean;
    ikon: React.ReactNode;
    tittel: string;
    filtergruppe: ListevisningType
}

export default function ToolbarKnapp(props: ToolbarKnappProps) {
    const [isInputOpen, setInputOpen] = useState(false);
    const [isBtnClicked, setBtnClicked] = useState(false);
    const loggNode = useRef<HTMLDivElement>(null);   // Referanse til omsluttende div rundt loggen

    const requestSetOpenStatus = (setOpenTo: boolean) => {
        setInputOpen(setOpenTo);
    };

    const handleClickOutside = (e) => {
        if (loggNode.current && loggNode.current.contains(e.target)) {
            // Klikket er inne i komponenten
            return;
        }
        // Klikket er utenfor, oppdater staten
        if (isInputOpen) {
            requestSetOpenStatus(false);
        }
    };

    const escHandler = (event) => {
        if (event.keyCode === 27 && isInputOpen) {
            requestSetOpenStatus(false);
        }
    };

    const klikk = () => {
        setInputOpen(true);
    };

    const visChildren = () => {
        if (props.tildelveileder) {
            return (
                <TildelVeileder
                    btnOnClick={() => setBtnClicked(true)}
                    skalVises={props.skalVises}
                    filtergruppe={props.filtergruppe}
                />
            );
        } else {
            return (
                <SokVeileder
                    veileder={{}}
                    onClick={() => setBtnClicked(true)}
                    skalVises={props.skalVises}
                />
            );
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

    if (isInputOpen) {
        return (
            <div className="toolbarknapp-input"
                 ref={loggNode}
                 onClick={klikk}>
                {visChildren()}
            </div>
        );
    }

    return (
        <div className="toolbar_btnwrapper">
            <button
                type="button"
                className='toolbar_btn'
                disabled={!props.aktiv}
                onClick={klikk}
                data-testid={props.tildelveileder ? "tildel-veileder_knapp" : "sok-veileder_knapp"}
            >
                {props.ikon}
                <Normaltekst className="toolbar-knapp__tekst">{props.tittel}</Normaltekst>
            </button>
        </div>
    );
}
