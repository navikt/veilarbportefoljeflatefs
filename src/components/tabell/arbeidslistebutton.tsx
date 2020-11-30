import * as React from 'react';
import {MouseEvent} from 'react';
import classnames from 'classnames';
import './tabell.less';
import '../../enhetsportefolje/brukerliste.less';

interface ArbeidslisteButtonProps {
    className?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    apen: boolean;
    skalVises: boolean;
    dataTestid: string;
}

const cls = className => classnames('knapp', 'brukerliste__arbeidslisteknapp', className);

const arbeidslisteButton = ({className, onClick, apen, dataTestid}: ArbeidslisteButtonProps) => {
    const chevronCls = apen
        ? 'brukerliste__arbeidslisteknapp--chevron-apen'
        : 'brukerliste__arbeidslisteknapp--chevron-lukket';
    return (
        <button
            className={cls(className)}
            onClick={onClick}
            aria-expanded={apen}
            data-testid={dataTestid}
            aria-label="Chevron for arbeidliste"
        >
            <span className={chevronCls} />
        </button>
    );
};

export default (props: ArbeidslisteButtonProps) =>
    props.skalVises ? arbeidslisteButton(props) : <div className="brukerliste__arbeidslisteknapp" />;
