import {dagFraDato} from '../../utils/dato-utils';
import {Loader, Table} from '@navikt/ds-react';
import * as React from 'react';
import {MoteData} from './moteplan';
import MoteKollonne from './motekollonne';

interface MoteTabellProps {
    dato: Date;
    moter: MoteData[] | null;
    enhet: string;
}

function MoteTabell({dato, moter, enhet}: MoteTabellProps) {
    return (
        <div>
            <h3 className="moteplan_tittel">
                {dagFraDato(dato)} {dato.getDate()}. {dato.toLocaleString('default', {month: 'long'})}
            </h3>
            <Table size="small">
                <Table.Header>
                    <Table.Row className="moteplan_tabell_tittelrad">
                        <Table.HeaderCell>Klokkeslett</Table.HeaderCell>
                        <Table.HeaderCell>Deltaker</Table.HeaderCell>
                        <Table.HeaderCell>Avtalt med NAV</Table.HeaderCell>
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
                    {moter != null &&
                        moter.map((mote, key) => <MoteKollonne dato={dato} mote={mote} enhet={enhet} key={key} />)}
                </Table.Body>
            </Table>
        </div>
    );
}

export default MoteTabell;
