import React from 'react';
import {ReactComponent as RedigerIkon } from './rediger.svg';
import {Flatknapp } from "nav-frontend-knapper";

export function RedigerKnapp(props: {onClick: ()=> void}) {
    return (
        <Flatknapp className="veiledergruppe-knapp" onClick={props.onClick}>
            <RedigerIkon/>
            <span>Rediger gruppe</span>
        </Flatknapp>
    );
}
