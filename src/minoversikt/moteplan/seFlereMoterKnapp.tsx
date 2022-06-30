import * as React from 'react';
import {Button} from '@navikt/ds-react';

interface SeFlereMoterKnappProps {
    className?: string;
    antalDager: number;
    maxAntallDager: number;
    setMaxAntall: (number) => void;
}

export default function SeFlereMoterKnapp({
    className,
    antalDager,
    maxAntallDager,
    setMaxAntall
}: SeFlereMoterKnappProps) {
    if (antalDager <= maxAntallDager) {
        return <></>;
    }

    return (
        <Button
            className={className}
            variant="tertiary"
            size="medium"
            onClick={e => {
                setMaxAntall(maxAntallDager + 1);
                e.stopPropagation();
            }}
        >
            Se flere møter
        </Button>
    );
}
