import * as React from 'react';
import {useRef, useState} from 'react';
import {Button, Loader, Popover, Table} from '@navikt/ds-react';
import moment from 'moment';
import './motekalender.less';
import {useWindowWidth} from '../hooks/use-window-width';
import {hentMoteplan} from '../middleware/api';

interface MoteData {
    dato: string;
    deltaker: string;
    avtaltMedNav: boolean;
}

interface MotekalenderProps {
    veileder: string;
}

export function Motekalender({veileder}: MotekalenderProps) {
    const [erOpen, setErOpen] = useState<boolean>(false);
    const [moter, setMoter] = useState<MoteData[] | null>(null);
    const buttonRef = useRef(null);
    const windowWidth = useWindowWidth();

    let dager: Date[] = [new Date(), new Date(), new Date(), new Date()];
    dager.forEach((dag, i) => dag.setDate(dag.getDate() + i));

    if (windowWidth < 950) {
        dager = dager.slice(0, 2);
    } else if (windowWidth < 1300) {
        dager = dager.slice(0, 3);
    }

    return (
        <div>
            <Button
                ref={buttonRef}
                variant="secondary"
                onClick={() => {
                    if (!erOpen) {
                        retriveMoteData(veileder, setMoter);
                    } else {
                        setMoter(null);
                    }
                    setErOpen(!erOpen);
                }}
            >
                Møtekalender
            </Button>
            <Popover
                className="motekalender_popover"
                open={erOpen}
                onClose={() => setErOpen(false)}
                anchorEl={buttonRef.current}
                placement="auto"
            >
                {dager.map(dag => genererKalender(dag, moter))}
            </Popover>
        </div>
    );
}

function genererKalender(dato: Date, moter: MoteData[] | null) {
    return (
        <div>
            <h3 className="motekalender_tittel">
                {dagFraDato(dato)}, {dato.getDate()}/{dato.getMonth()}
            </h3>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Klokkeslett</Table.HeaderCell>
                        <Table.HeaderCell>Deltaker</Table.HeaderCell>
                        <Table.HeaderCell>Møtestatus</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                {moter == null && (
                    <Table.Body>
                        <Table.Row>
                            <Table.DataCell>
                                <Loader />
                            </Table.DataCell>
                        </Table.Row>
                    </Table.Body>
                )}
                {moter != null && <Table.Body> {moter.map(mote => genererKollonne(dato, mote))} </Table.Body>}
            </Table>
        </div>
    );
}

function genererKollonne(dato: Date, mote: MoteData) {
    const moteDato = new Date(mote.dato);
    if (!moment(dato).isSame(moteDato, 'day')) {
        return;
    }
    return (
        <Table.Row>
            <Table.DataCell>
                {moteDato
                    .getHours()
                    .toString()
                    .padStart(2, '0')}
                :
                {moteDato
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')}
            </Table.DataCell>
            <Table.DataCell>{mote.deltaker}</Table.DataCell>
            <Table.DataCell>{mote.avtaltMedNav ? 'Avtalt med NAV' : ''}</Table.DataCell>
        </Table.Row>
    );
}

function dagFraDato(dato: Date): string {
    const i = dato.getDay();
    switch (i) {
        case 0:
            return 'Søndag';
        case 1:
            return 'Mandag';
        case 2:
            return 'Tirsdag';
        case 3:
            return 'Onsdag';
        case 4:
            return 'Torsdag';
        case 5:
            return 'Fredag';
        case 6:
            return 'Lørdag';
        default:
            return '...';
    }
}

function retriveMoteData(veileder: string, setMoter: (value: MoteData[]) => void) {
    hentMoteplan(veileder)
        .then(data => setMoter(data))
        .catch(error => console.error('kunne ikke hente moteplan', error));
}

export default Motekalender;
