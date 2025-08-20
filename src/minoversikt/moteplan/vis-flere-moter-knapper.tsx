import {Button} from '@navikt/ds-react';
import {trackAmplitude} from '../../amplitude/amplitude';

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
    const knappetekstVisFlereMoter = 'Vis flere møter';
    const knappetekstVisAlle = 'Vis alle';

    /* Viser 5 fleire dagar i møteplanen, heilt til vi viser alle møtedagane. */
    const visFlereDagerIMoteplan = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAntallDagerSomSkalVises(Math.min(totaltAntallDagerMedMoter, antallDagerSomSkalVises + 5));
        trackAmplitude({
            name: 'knapp klikket',
            data: {
                knapptekst: knappetekstVisFlereMoter,
                effekt: 'Viser flere planlagte møter i Møteplanen'
            }
        });
    };

    const visAlleDagerIMoteplan = () => {
        setAntallDagerSomSkalVises(totaltAntallDagerMedMoter);
        trackAmplitude({
            name: 'knapp klikket',
            data: {
                knapptekst: knappetekstVisAlle,
                effekt: 'Viser alle planlagte i Møteplanen'
            }
        });
    };

    return (
        <div className="vis-flere-moter-knapper">
            <Button variant="tertiary" size="small" onClick={visFlereDagerIMoteplan}>
                {knappetekstVisFlereMoter}
            </Button>
            <Button variant="tertiary" size="small" onClick={visAlleDagerIMoteplan}>
                {knappetekstVisAlle}
            </Button>
        </div>
    );
};
