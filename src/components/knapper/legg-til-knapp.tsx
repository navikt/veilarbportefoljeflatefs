import React from 'react';
import {ReactComponent as PlussIkon} from './add-circle.svg';
import { Flatknapp } from "nav-frontend-knapper";
import './knapper.less';

export function LeggTilKnapp(props: {onClick: ()=> void}) {
    return (
        <Flatknapp className="veiledergruppe-knapp" onClick={props.onClick}>
            <PlussIkon className="ny-gruppe-knapp"/>
            <span> Ny gruppe</span>
        </Flatknapp>
    );
}
