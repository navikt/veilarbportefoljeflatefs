import {Button} from '@navikt/ds-react';

interface Props {
    antallDager: number;
    maxAntallDager: number;
    setMaxAntall: (number) => void;
}

export function SeFlereMoterKnapp({antallDager, maxAntallDager, setMaxAntall}: Props) {
    if (maxAntallDager >= antallDager) {
        return null;
    }

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setMaxAntall(maxAntallDager + 1);
        e.stopPropagation();
    };

    return (
        <Button id="se-flere-moter-knapp" variant="tertiary" size="small" onClick={onClick}>
            Se flere møter
        </Button>
    );
}
