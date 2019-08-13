import * as React from 'react';
import { MouseEvent } from 'react';
import classnames from 'classnames';
import {BrukerModell} from "../../model-interfaces";

interface ArbeidslisteButtonProps {
    className?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    apen: boolean;
    bruker: BrukerModell;
}

const cls = (className) => classnames('brukerliste__arbeidslisteknapp', className);

export const ArbeidslisteButton = ({ className, onClick, apen, bruker}: ArbeidslisteButtonProps) => {
    const chevronCls = apen ? 'brukerliste__arbeidslisteknapp--chevron-apen' : 'brukerliste__arbeidslisteknapp--chevron-lukket';
    if(bruker.arbeidsliste.arbeidslisteAktiv) {
        return <button
            className={cls(className)}
            onClick={onClick}
            aria-expanded={apen}
        >
            <span className={chevronCls}/>
        </button>;
    }
    return <div className="brukerliste__arbeidslisteknapp"/>;
};
