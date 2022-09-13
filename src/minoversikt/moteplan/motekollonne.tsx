import * as React from 'react';

import moment from 'moment';
import {Link, Table} from '@navikt/ds-react';
import {getPersonUrl, setFraBrukerIUrl} from '../../utils/url-utils';
import {MoteData} from './moteplan';
import {capitalize} from '../../utils/utils';

interface MoteKollonneProps {
    dato: Date;
    mote: MoteData;
    enhetId: string;
}

function MoteKollonne({dato, mote, enhetId}: MoteKollonneProps) {
    const moteDato = new Date(mote.dato);
    if (!moment(dato).isSame(moteDato, 'day')) {
        return <></>;
    }
    return (
        <Table.Row>
            <Table.DataCell className="moteplan_tabell_klokkeslett">
                {moteDato.getHours().toString().padStart(2, '0')}:{moteDato.getMinutes().toString().padStart(2, '0')}
            </Table.DataCell>

            <Table.DataCell className="moteplan_tabell_deltaker">
                {mote.deltaker.fnr && (
                    <Link
                        onClick={() => {
                            setFraBrukerIUrl(mote.deltaker.fnr);
                        }}
                        href={getPersonUrl(mote.deltaker.fnr, '#visAktivitetsplanen', enhetId)}
                    >
                        {capitalize(mote.deltaker.etternavn)}, {capitalize(mote.deltaker.fornavn)}
                    </Link>
                )}
            </Table.DataCell>
            <Table.DataCell className="moteplan_tabell_status">
                {mote.avtaltMedNav ? 'Avtalt med NAV' : '-'}
            </Table.DataCell>
        </Table.Row>
    );
}

export default MoteKollonne;
