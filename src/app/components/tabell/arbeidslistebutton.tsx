import * as React from 'react';
import { MouseEvent } from 'react';
import * as classnames from 'classnames';

interface ArbeidslisteButtonProps {
    className?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    apen: boolean;
    skalVises: boolean;
}

const cls = (className) => classnames('brukerliste__arbeidslisteknapp', className);

const arbeidslisteButton = ({ className, onClick, apen}: ArbeidslisteButtonProps) => {
    const chevronCls = apen ? 'brukerliste__arbeidslisteknapp--chevron-apen' : 'brukerliste__arbeidslisteknapp--chevron-lukket';
    return <button
            className={cls(className)}
            onClick={onClick}
            aria-expanded={apen}
        >
            <span className={chevronCls}/>
        </button>;
};

export default (props: ArbeidslisteButtonProps) => props.skalVises ? arbeidslisteButton(props) : <div className="brukerliste__arbeidslisteknapp"/>;
