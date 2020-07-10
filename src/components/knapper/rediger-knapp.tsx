import React from 'react';
import { ReactComponent as RedigerIkon } from './rediger.svg';
import hiddenIf from '../hidden-if/hidden-if';
import './knapper.less';

function RedigerKnapp(props: {aria: string, onClick: () => void }) {
    return (
        <button className="rediger-knapp" title={props.aria} aria-describedby={props.aria} onClick={props.onClick}>
            <RedigerIkon/>
        </button>
    );
}

export default hiddenIf(RedigerKnapp);
