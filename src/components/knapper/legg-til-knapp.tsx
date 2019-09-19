import React from 'react';
import {ReactComponent as PlussIkon} from './pluss.svg';
import { Flatknapp } from "nav-frontend-knapper";
import './veileder-gruppe.less';

export function LeggTilKnapp(props: {onClick: ()=> void}) {
    return (
        <Flatknapp className="veiledergruppe-knapp" onClick={props.onClick}>
            <PlussIkon/>
            <span>Ny Gruppe</span>
        </Flatknapp>
    );
}
