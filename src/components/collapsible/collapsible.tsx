import {default as React, useState} from 'react';
import './collapsible.less';
import {ReactComponent as ExpandIcon} from '../ikoner/squared-plus.svg';
import {ReactComponent as CollapseIcon} from '../ikoner/squared-minus.svg';

interface CollapsibleProps {
    apen?: boolean;
    titel?: string;
    children: React.ReactNode;
}

export function Collapsible(props: CollapsibleProps) {
    const [apen, setApen] = useState(props.apen || false);

    function togglePanel(e) {
        setApen(!apen);
    }

    return (
        <div className="collapsible">
            <div onClick={e => togglePanel(e)} className="collapsible__header">
                <>
                    {apen ? <CollapseIcon className="toggleIkon" /> : <ExpandIcon className="toggleIkon" />}
                    {props.titel}
                </>
            </div>
            <div className="collapsible__content">
                <div hidden={!apen}>{props.children}</div>
            </div>
        </div>
    );
}
