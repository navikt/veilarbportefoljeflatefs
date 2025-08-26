import {useRef, useState} from 'react';
import {Alert, Button, Popover} from '@navikt/ds-react';
import {CalendarIcon} from '@navikt/aksel-icons';
import {hentMoteplan} from '../../middleware/api';
import {MoteTabell} from './motetabell';
import {VisFlereMoterKnapper} from './vis-flere-moter-knapper';
import {MoteplanModell} from '../../typer/moteplan';
import './moteplan.css';

interface MoteplanProps {
    veileder: string;
    enhet: string;
}

export function Moteplan({veileder, enhet}: MoteplanProps) {
    const [antallDagerSomSkalVises, setAntallDagerSomSkalVises] = useState<number>(5);
    const [erOpen, setErOpen] = useState<boolean>(false);
    const [moter, setMoter] = useState<MoteplanModell[] | null>(null);
    const [fetchError, setFetchError] = useState(false);
    const buttonRef = useRef(null);
    const ingenMoter = moter?.length === 0;

    const dager: Date[] = hentMoteplanDager(moter);

    const fetchMoteData = () => {
        if (!erOpen) {
            hentMoteplan(veileder, enhet)
                .then(data => setMoter(data))
                .catch(error => setFetchError(true));
        }
        setErOpen(!erOpen);
    };

    return (
        <>
            <Button
                className="moteplan_knapp"
                ref={buttonRef}
                variant="tertiary"
                onClick={() => fetchMoteData()}
                icon={<CalendarIcon aria-hidden={true} fontSize="1.6rem" />}
            >
                Møteplan
            </Button>
            <Popover
                className="moteplan_popover"
                open={erOpen}
                onClose={() => setErOpen(false)}
                anchorEl={buttonRef.current}
                placement="bottom-end"
            >
                <Popover.Content className="moteplan_content">
                    {fetchError && (
                        <Alert variant="error" size="small">
                            Kunne ikke hente møteplan.
                        </Alert>
                    )}
                    {!fetchError && ingenMoter && (
                        <Alert variant="success" size="small">
                            Ingen møter
                        </Alert>
                    )}
                    {!fetchError && !ingenMoter && (
                        <ol>
                            {dager.slice(0, antallDagerSomSkalVises).map(dag => (
                                <MoteTabell dato={dag} moter={moter} enhetId={enhet} key={dag.toISOString()} />
                            ))}
                        </ol>
                    )}
                    <VisFlereMoterKnapper
                        totaltAntallDagerMedMoter={dager.length}
                        antallDagerSomSkalVises={antallDagerSomSkalVises}
                        setAntallDagerSomSkalVises={setAntallDagerSomSkalVises}
                    />
                </Popover.Content>
            </Popover>
        </>
    );
}

const sorterStigendePaDato = (a: Date, b: Date) => {
    return a.valueOf() - b.valueOf();
};

function hentMoteplanDager(moter: MoteplanModell[] | null): Date[] {
    if (moter === null) {
        return [];
    }
    return [...new Set(moter.map(mote => new Date(mote.dato).setHours(0, 0, 0, 0)))]
        .map(dato => new Date(dato))
        .sort(sorterStigendePaDato);
}
