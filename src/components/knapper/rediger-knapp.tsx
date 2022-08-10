import React, {useState} from 'react';
import hiddenIf from '../hidden-if/hidden-if';
import './knapper.css';
import {Edit, EditFilled} from '@navikt/ds-icons';
import {Button} from '@navikt/ds-react';

function RedigerKnapp(props: {aria: string; onClick: () => void; dataTestid?: string}) {
    const [hover, setHover] = useState(false);

    return (
        <Button
            variant="tertiary"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            title={props.aria}
            aria-describedby={props.aria}
            onClick={props.onClick}
            data-testid={props.dataTestid}
        >
            {hover ? <EditFilled /> : <Edit />}
        </Button>
    );
}

export default hiddenIf(RedigerKnapp);
