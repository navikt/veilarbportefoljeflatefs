import * as React from 'react';
import {useState} from 'react';

import moment from 'moment';
import {Alert, Button, Table} from '@navikt/ds-react';
import {getPersonUrl} from '../../utils/url-utils';
import {MoteData} from './moteplan';
import {capitalize} from '../../utils/utils';
import {settBrukerIKontekst} from '../../middleware/api';

interface MoteKollonneProps {
    dato: Date;
    mote: MoteData;
    enhetId: string;
}

function MoteKollonne({dato, mote, enhetId}: MoteKollonneProps) {
    const [laster, setLaster] = useState(false);
    const [harFeil, setHarFeil] = useState(false);

    const moteDato = new Date(mote.dato);
    const url = getPersonUrl(null, '#visAktivitetsplanen', enhetId);

    const oppdaterBrukerIKontekstOgNavigerTilLenke = async () => {
        setHarFeil(false);
        setLaster(true);

        try {
            await settBrukerIKontekst(mote.deltaker.fnr);
            window.location.href = url;
        } catch (e) {
            setHarFeil(true);
            console.error('Klarte ikke å sette bruker i kontekst. Konsekvens: kan ikke navigere til lenke.');
        } finally {
            setLaster(false);
        }
    };

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
                    <Button
                        loading={laster}
                        onClick={oppdaterBrukerIKontekstOgNavigerTilLenke}
                        size="xsmall"
                        variant="tertiary"
                    >
                        {capitalize(mote.deltaker.etternavn)}, {capitalize(mote.deltaker.fornavn)}
                    </Button>
                )}
                {mote.deltaker.fnr && harFeil && (
                    <Alert inline variant="error">
                        Det skjedde en feil.
                    </Alert>
                )}
            </Table.DataCell>
            <Table.DataCell className="moteplan_tabell_status">
                {mote.avtaltMedNav ? 'Avtalt med NAV' : '-'}
            </Table.DataCell>
        </Table.Row>
    );
}

export default MoteKollonne;
