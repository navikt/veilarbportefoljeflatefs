import {Button} from '@navikt/ds-react';

interface Props {
    totaltAntallDagerMedMoter: number;
    antallDagerSomSkalVises: number;
    setAntallDagerSomSkalVises: (number) => void;
}

export const VisAlleMoterKnapp = ({
    totaltAntallDagerMedMoter,
    antallDagerSomSkalVises,
    setAntallDagerSomSkalVises
}: Props) => {
    /* Ikkje vis knapp om alle møtedagar allereie er synleg. */
    if (antallDagerSomSkalVises >= totaltAntallDagerMedMoter) {
        return null;
    }

    const visAlleMoter = () => {
        setAntallDagerSomSkalVises(totaltAntallDagerMedMoter);
    };

    return (
        <Button variant="tertiary" size="small" className="se-flere-moter-knapp" onClick={visAlleMoter}>
            Vis alle
        </Button>
    );
};
