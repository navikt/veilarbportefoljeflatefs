import React from 'react';
import './modal-liste.css';

export interface Fnr {
    brukerFnr: string;
}

interface FnrListProps {
    listeMedFnr: Fnr[];
}

export function FnrList(props: FnrListProps) {
    const listElements = props.listeMedFnr.map(tilordning => (
        <li key={tilordning.brukerFnr} className="fnr__listitem">
            {tilordning.brukerFnr}
        </li>
    ));

    const className = listElements.length >= 18 ? 'modal-liste__lang' : 'modal-liste';

    return <ul className={className}>{listElements}</ul>;
}
