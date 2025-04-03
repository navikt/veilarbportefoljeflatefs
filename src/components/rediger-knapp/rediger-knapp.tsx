import {useState} from 'react';
import {Button} from '@navikt/ds-react';
import {PencilFillIcon, PencilIcon} from '@navikt/aksel-icons';

interface Props {
    aria: string;
    onClick: () => void;
    dataTestid?: string;
}

export function RedigerKnapp({aria, onClick, dataTestid}: Props) {
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
            icon={hover ? <PencilFillIcon title="Rediger" /> : <PencilIcon title="Rediger" />}
        ></Button>
    );
}
