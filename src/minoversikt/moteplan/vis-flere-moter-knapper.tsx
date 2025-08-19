import {Button} from '@navikt/ds-react';

interface Props {
    totaltAntallDagerMedMoter: number;
    antallDagerSomSkalVises: number;
    setAntallDagerSomSkalVises: (number) => void;
}

export const VisFlereMoterKnapper = ({
    totaltAntallDagerMedMoter,
    antallDagerSomSkalVises,
    setAntallDagerSomSkalVises
}: Props) => {
    /* Ikkje vis knappar om alle møtedagar allereie er synlege. */
    if (antallDagerSomSkalVises >= totaltAntallDagerMedMoter) {
        return null;
    }

    /* Viser 5 fleire dagar i møteplanen, heilt til vi viser alle møtedagane. */
    const visFlereDagerIMoteplan = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAntallDagerSomSkalVises(Math.min(totaltAntallDagerMedMoter, antallDagerSomSkalVises + 5));
    };

    const visAlleDagerIMoteplan = () => {
        setAntallDagerSomSkalVises(totaltAntallDagerMedMoter);
    };

    return (
        <div className="vis-flere-moter-knapper">
            <Button variant="tertiary" size="small" onClick={visFlereDagerIMoteplan}>
                Vis flere møter
            </Button>
            <Button variant="tertiary" size="small" onClick={visAlleDagerIMoteplan}>
                Vis alle
            </Button>
        </div>
    );
};
