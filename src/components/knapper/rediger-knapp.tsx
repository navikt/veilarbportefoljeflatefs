import React from 'react';
import { ReactComponent as RedigerIkon } from './rediger.svg';
import hiddenIf from '../hidden-if/hidden-if';
import './knapper.less';

function RedigerKnapp(props: { onClick: () => void }) {
    return (
        <button className="rediger-knapp" aria-describedby="Rediger veiledergruppe" onClick={props.onClick}>
            <RedigerIkon/>
        </button>
    );
}

export default hiddenIf(RedigerKnapp);
