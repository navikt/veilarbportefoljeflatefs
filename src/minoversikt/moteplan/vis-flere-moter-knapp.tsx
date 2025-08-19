import {Button} from '@navikt/ds-react';

interface Props {
    totaltAntallDagerMedMoter: number;
    antallDagerSomSkalVises: number;
    setAntallDagerSomSkalVises: (number) => void;
}

export function VisFlereMoterKnapp({
    totaltAntallDagerMedMoter,
    antallDagerSomSkalVises,
    setAntallDagerSomSkalVises
}: Props) {
    /* Ikkje vis knapp om alle møtedagar allereie er synleg. */
    if (antallDagerSomSkalVises >= totaltAntallDagerMedMoter) {
        return null;
    }

    /* Viser 5 fleire dagar i møteplanen, heilt til vi viser alle møtedagane. */
    const visFlereDagerIMoteplan = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAntallDagerSomSkalVises(Math.min(totaltAntallDagerMedMoter, antallDagerSomSkalVises + 5));
        e.stopPropagation();
    };

    return (
        <Button variant="tertiary" size="small" onClick={visFlereDagerIMoteplan}>
            Vis flere møter
        </Button>
    );
}
