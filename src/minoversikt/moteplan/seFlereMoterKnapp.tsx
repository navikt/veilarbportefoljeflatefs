import * as React from 'react';
import {Button} from '@navikt/ds-react';

interface SeFlereMoterKnappProps {
    cssId?: string;
    antalDager: number;
    maxAntallDager: number;
    setMaxAntall: (number) => void;
}

export default function SeFlereMoterKnapp({cssId, antalDager, maxAntallDager, setMaxAntall}: SeFlereMoterKnappProps) {
    if (antalDager <= maxAntallDager) {
        return <></>;
    }

    return (
        <Button
            id={cssId}
            variant="tertiary"
            size="small"
            onClick={e => {
                setMaxAntall(maxAntallDager + 1);
                e.stopPropagation();
            }}
        >
            Se flere møter
        </Button>
    );
}
