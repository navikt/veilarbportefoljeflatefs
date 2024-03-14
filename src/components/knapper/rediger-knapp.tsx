import React, {useState} from 'react';
import hiddenIf from '../hidden-if/hidden-if';
import './knapper.css';
import {Edit, EditFilled} from '@navikt/ds-icons';
import {Button} from '@navikt/ds-react';

interface Props {
    aria: string;
    onClick: () => void;
    dataTestid?: string;
}

function RedigerKnapp({aria, onClick, dataTestid}: Props) {
    const [hover, setHover] = useState(false);

    return (
        <Button
            variant="tertiary"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            title={aria}
            aria-describedby={aria}
            onClick={onClick}
            data-testid={dataTestid}
            size="small"
            icon={hover ? <EditFilled /> : <Edit />}
        ></Button>
    );
}

export default hiddenIf(RedigerKnapp);
