import React, {useState} from 'react';
import hiddenIf from '../hidden-if/hidden-if';
import './knapper.less';
import {Edit, EditFilled} from '@navikt/ds-icons';

function RedigerKnapp(props: {aria: string; onClick: () => void; dataTestid?: string}) {
    const [hover, setHover] = useState(false);

    return (
        <button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="rediger-knapp"
            title={props.aria}
            aria-describedby={props.aria}
            onClick={props.onClick}
            data-testid={props.dataTestid}
        >
            <>{hover ? <EditFilled /> : <Edit />}</>
        </button>
    );
}

export default hiddenIf(RedigerKnapp);
