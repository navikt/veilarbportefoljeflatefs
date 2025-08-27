import {Heading, Loader, Table} from '@navikt/ds-react';
import {MoteKollonne} from './motekollonne';
import {MoteplanModell} from '../../typer/moteplan';

interface MoteTabellProps {
    dato: Date;
    moter: MoteplanModell[] | null;
    enhetId: string;
}

export function MoteTabell({dato, moter, enhetId}: MoteTabellProps) {
    return (
        <li>
            <Heading className="moteplan_tittel" size="small" level="2">
                {dato.toLocaleString(['no'], {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})}
            </Heading>
            <Table size="small">
                <Table.Header>
                    <Table.Row className="moteplan_tabell_tittelrad">
                        <Table.HeaderCell>Klokkeslett</Table.HeaderCell>
                        <Table.HeaderCell>Varighet</Table.HeaderCell>
                        <Table.HeaderCell>Deltaker</Table.HeaderCell>
                        <Table.HeaderCell>Avtalt med Nav</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {moter === null && (
                        <Table.Row>
                            <Table.DataCell>
                                <Loader />
                            </Table.DataCell>
                        </Table.Row>
                    )}
                    {moter?.map(mote => <MoteKollonne dato={dato} mote={mote} enhetId={enhetId} key={mote.dato} />)}
                </Table.Body>
            </Table>
        </li>
    );
}
