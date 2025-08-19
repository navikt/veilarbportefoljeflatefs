import {Button} from '@navikt/ds-react';

interface SeFlereMoterKnappProps {
    cssId?: string;
    antalDager: number;
    maxAntallDager: number;
    setMaxAntall: (number) => void;
}

export function SeFlereMoterKnapp({cssId, antalDager, maxAntallDager, setMaxAntall}: SeFlereMoterKnappProps) {
    if (antalDager <= maxAntallDager) {
        return <></>;
    }

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setMaxAntall(maxAntallDager + 1);
        e.stopPropagation();
    };

    return (
        <Button id={cssId} variant="tertiary" size="small" onClick={onClick}>
            Se flere møter
        </Button>
    );
}
