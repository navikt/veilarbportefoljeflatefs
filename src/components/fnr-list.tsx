import React from 'react';
import './modal-liste.less';

export interface Fnr {
 brukerFnr: string
}

interface FnrList {
    listeMedFnr: Fnr[]
}

export function FnrList(props: FnrList) {
    const listElements = props.listeMedFnr.map((tilordning) => (
        <li key={tilordning.brukerFnr} className="fnr__listitem">{tilordning.brukerFnr}</li>
    ));

    const className = listElements.length >= 18 ? 'blokk-s modal-liste__lang' : 'blokk-s modal-liste';

    return (
        <ul className={className}>
            {listElements}
        </ul>
    );
}
