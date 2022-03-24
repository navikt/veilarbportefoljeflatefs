import * as React from 'react';
import {useRef, useState} from 'react';
import {Button, Link, Loader, Popover, Table} from '@navikt/ds-react';
import moment from 'moment';
import './motekalender.less';
import {hentMoteplan} from '../middleware/api';
import {setFraBrukerIUrl} from '../utils/url-utils';
import classnames from 'classnames';

interface MoteData {
    dato: string;
    deltaker: Deltaker;
    avtaltMedNav: boolean;
}

interface Deltaker {
    fornavn: string;
    etternavn: string;
    fnr: string;
}

interface MotekalenderProps {
    veileder: string;
    enhet: string | null;
}

const MAX_ANTALL_DAGER = 5;

export function Motekalender({veileder, enhet}: MotekalenderProps) {
    const [erOpen, setErOpen] = useState<boolean>(false);
    const [moter, setMoter] = useState<MoteData[] | null>(null);
    const buttonRef = useRef(null);

    const dager: Date[] = hentMoteplanDager(moter);

    if (enhet === null) {
        return <></>;
    }
    return (
        <div>
            <Button
                ref={buttonRef}
                variant="secondary"
                onClick={() => {
                    if (!erOpen) {
                        retriveMoteData(enhet, veileder, setMoter);
                    } else {
                        setMoter(null);
                    }
                    setErOpen(!erOpen);
                }}
            >
                Møtekalender
            </Button>
            <Popover open={erOpen} onClose={() => setErOpen(false)} anchorEl={buttonRef.current} placement="auto">
                <Popover.Content className="motekalender_popover">
                    {dager.map((dag, i) => genererKalender(dag, moter, enhet, i))}
                </Popover.Content>
            </Popover>
        </div>
    );
}

function genererKalender(dato: Date, moter: MoteData[] | null, enhet: string, i: number) {
    return (
        <div key={i}>
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
                <Table.Body>
                    {moter === null && (
                        <Table.Row>
                            <Table.DataCell>
                                <Loader />
                            </Table.DataCell>
                        </Table.Row>
                    )}
                    {moter != null && moter.map((mote, i) => genererKollonne(dato, mote, enhet, i))}
                </Table.Body>
            </Table>
        </div>
    );
}

function genererKollonne(dato: Date, mote: MoteData, enhet: string, key: number) {
    const moteDato = new Date(mote.dato);
    if (!moment(dato).isSame(moteDato, 'day')) {
        return;
    }
    return (
        <Table.Row key={key}>
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

            <Table.DataCell>
                <Link
                    onClick={() => {
                        setFraBrukerIUrl(mote.deltaker.fnr);
                    }}
                    href={`${window.location.origin}/veilarbpersonflatefs/${mote.deltaker.fnr}/?enhet=${enhet}`}
                    className={classnames('lenke_siste-endring')}
                >
                    {mote.deltaker.etternavn}
                </Link>
            </Table.DataCell>
            <Table.DataCell>{mote.avtaltMedNav ? 'Avtalt med NAV' : ' '}</Table.DataCell>
        </Table.Row>
    );
}

function hentMoteplanDager(moter: MoteData[] | null): Date[] {
    if (moter === null) {
        return [new Date()];
    }
    return [...new Set(moter.map(x => new Date(x.dato).setHours(0, 0, 0, 0)))]
        .map(x => new Date(x))
        .sort()
        .slice(0, MAX_ANTALL_DAGER);
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

function retriveMoteData(enhet: string, veileder: string, setMoter: (value: MoteData[]) => void) {
    hentMoteplan(veileder, enhet)
        .then(data => setMoter(data))
        .catch(error => console.error('kunne ikke hente moteplan', error));
}

export default Motekalender;
