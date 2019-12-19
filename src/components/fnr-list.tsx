import React from "react";

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

    return (
        <ul className="blokk-s">
            {listElements}
        </ul>
    );
}

//cherrypick
