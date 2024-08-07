import React, {useRef, useState} from 'react';
import {Alert, Button, Popover} from '@navikt/ds-react';
import {CalendarIcon} from '@navikt/aksel-icons';
import {hentMoteplan} from '../../middleware/api';
import MoteTabell from './motetabell';
import SeFlereMoterKnapp from './seFlereMoterKnapp';
import './moteplan.css';

export interface MoteData {
    dato: string;
    deltaker: Deltaker;
    avtaltMedNav: boolean;
}

export interface Deltaker {
    fornavn: string;
    etternavn: string;
    fnr: string;
}

interface MoteplanProps {
    veileder: string;
    enhet: string;
}

function Moteplan({veileder, enhet}: MoteplanProps) {
    const [maxAntallDager, setMaxAntallDager] = useState<number>(5);
    const [erOpen, setErOpen] = useState<boolean>(false);
    const [moter, setMoter] = useState<MoteData[] | null>(null);
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
                icon={<CalendarIcon fontSize="1.6rem" />}
            >
                Møteplan
            </Button>
            <Popover
                className="moteplan_popover"
                open={erOpen}
                onClose={() => setErOpen(false)}
                anchorEl={buttonRef.current}
                /* Placement kan bli "left-start" igjen når vi oppdaterer @navikt/ds-react til nyare enn v5.6.5
                 * og kan ta i bruk "flip"-prop. - Ingrid, 2024-02-22 */
                placement="bottom"
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
                            {dager.slice(0, maxAntallDager).map(dag => (
                                <MoteTabell dato={dag} moter={moter} enhetId={enhet} key={dag.toISOString()} />
                            ))}
                        </ol>
                    )}
                    <SeFlereMoterKnapp
                        cssId={'seFlereMoterKnapp'}
                        antalDager={dager.length}
                        maxAntallDager={maxAntallDager}
                        setMaxAntall={setMaxAntallDager}
                    />
                </Popover.Content>
            </Popover>
        </>
    );
}

const sorterStigendePaDato = (a: Date, b: Date) => {
    return a.valueOf() - b.valueOf();
};

function hentMoteplanDager(moter: MoteData[] | null): Date[] {
    if (moter === null) {
        return [new Date()];
    }
    return [...new Set(moter.map(mote => new Date(mote.dato).setHours(0, 0, 0, 0)))]
        .map(dato => new Date(dato))
        .sort(sorterStigendePaDato);
}

export default Moteplan;
