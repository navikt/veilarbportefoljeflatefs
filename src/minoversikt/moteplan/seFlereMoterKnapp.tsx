import {Button} from '@navikt/ds-react';

interface Props {
    totaltAntallDagerMedMoter: number;
    antallDagerSomSkalVises: number;
    setAntallDagerSomSkalVises: (number) => void;
}

export function SeFlereMoterKnapp({
    totaltAntallDagerMedMoter,
    antallDagerSomSkalVises,
    setAntallDagerSomSkalVises
}: Props) {
    if (antallDagerSomSkalVises >= totaltAntallDagerMedMoter) {
        return null;
    }

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAntallDagerSomSkalVises(antallDagerSomSkalVises + 1);
        e.stopPropagation();
    };

    return (
        <Button id="se-flere-moter-knapp" variant="tertiary" size="small" onClick={onClick}>
            Se flere møter
        </Button>
    );
}
