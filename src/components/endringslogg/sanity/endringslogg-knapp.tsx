import {default as React, RefObject} from 'react';
import {ReactComponent as AlarmIcon} from '../icon-v3.svg';

interface EndringsloggKnappProps {
    buttonRef: RefObject<HTMLButtonElement>;
    open: boolean;
    nyeNotifikasjoner: boolean;
    klikk: (e?: any) => void;
}

export default function EndringsloggKnapp(props: EndringsloggKnappProps) {
    return (
        <button
            ref={props.buttonRef}
            className={`endringslogg-knapp endringslogg-dropDown ${props.open && 'endringslogg-dropDown-active'}`}
            onClick={props.klikk}
            data-testid="endringslogg-knapp"
        >
            <AlarmIcon />
            {props.nyeNotifikasjoner && (
                <div className="ring-container">
                    <div className="ringring" />
                    <div className="circle" data-testid="endringslogg_nye-notifikasjoner" />
                </div>
            )}
        </button>
    );
}
