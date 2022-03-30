import * as React from 'react';

import moment from 'moment';
import {Link, Table} from '@navikt/ds-react';
import {setFraBrukerIUrl} from '../../utils/url-utils';
import classnames from 'classnames';
import {MoteData} from './motekalender';
import {nameCapitalization} from '../../utils/utils';

interface MoteKollonneProps {
    dato: Date;
    mote: MoteData;
    enhet: string;
}

function MoteKollonne({dato, mote, enhet}: MoteKollonneProps) {
    const moteDato = new Date(mote.dato);
    if (!moment(dato).isSame(moteDato, 'day')) {
        return <></>;
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

            <Table.DataCell>
                {mote.deltaker.fnr && (
                    <Link
                        onClick={() => {
                            setFraBrukerIUrl(mote.deltaker.fnr);
                        }}
                        href={`${window.location.origin}/veilarbpersonflatefs/${mote.deltaker.fnr}/?enhet=${enhet}`}
                        className={classnames('lenke_siste-endring')}
                    >
                        {nameCapitalization(mote.deltaker.etternavn)}, {nameCapitalization(mote.deltaker.fornavn)}
                    </Link>
                )}
            </Table.DataCell>
            <Table.DataCell>{mote.avtaltMedNav ? 'Avtalt med NAV' : ' '}</Table.DataCell>
        </Table.Row>
    );
}

export default MoteKollonne;
