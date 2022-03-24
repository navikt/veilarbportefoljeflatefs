import * as React from 'react';
import {useRef, useState} from 'react';
import {Button, Popover} from '@navikt/ds-react';

import './motekalender.less';
import {hentMoteplan} from '../middleware/api';
import MoteTabell from './motetabell';

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

interface MotekalenderProps {
    veileder: string;
    enhet: string;
}

const MAX_ANTALL_DAGER = 5;

function Motekalender({veileder, enhet}: MotekalenderProps) {
    const [erOpen, setErOpen] = useState<boolean>(false);
    const [moter, setMoter] = useState<MoteData[] | null>(null);
    const [fetchError, setFetchError] = useState(false);
    const buttonRef = useRef(null);

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
        <div>
            <Button ref={buttonRef} variant="secondary" onClick={() => fetchMoteData()}>
                Møtekalender
            </Button>
            <Popover open={erOpen} onClose={() => setErOpen(false)} anchorEl={buttonRef.current} placement="auto">
                <Popover.Content>
                    {fetchError && 'Feil under henting av møteplan'}
                    {!fetchError &&
                        dager.map((dag, key) => <MoteTabell dato={dag} moter={moter} enhet={enhet} key={key} />)}
                </Popover.Content>
            </Popover>
        </div>
    );
}

function hentMoteplanDager(moter: MoteData[] | null): Date[] {
    if (moter === null) {
        return [new Date()];
    }
    return [...new Set(moter.map(mote => new Date(mote.dato).setHours(0, 0, 0, 0)))]
        .map(dato => new Date(dato))
        .sort()
        .slice(0, MAX_ANTALL_DAGER);
}

export default Motekalender;
