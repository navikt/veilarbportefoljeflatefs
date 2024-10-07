import * as React from 'react';
import moment from 'moment';
import {Table} from '@navikt/ds-react';
import {getVeilarbpersonflateUrl} from '../../utils/url-utils';
import {MoteData} from './moteplan';
import {capitalize, oppdaterBrukerIKontekstOgNavigerTilLenke} from '../../utils/utils';
import {AksjonKnappMedPopoverFeilmelding} from '../../components/aksjon-knapp-med-popover-feilmelding/aksjon-knapp-med-popover-feilmelding';

interface MoteKollonneProps {
    dato: Date;
    mote: MoteData;
    enhetId: string;
}

function MoteKollonne({dato, mote, enhetId}: MoteKollonneProps) {
    const moteDato = new Date(mote.dato);

    const handterKlikk = () =>
        oppdaterBrukerIKontekstOgNavigerTilLenke(
            mote.deltaker.fnr,
            getVeilarbpersonflateUrl('#visAktivitetsplanen', enhetId)
        );

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
                    <AksjonKnappMedPopoverFeilmelding
                        klikkAksjon={handterKlikk}
                        knappStil="juster-tekst-venstre"
                        knappTekst={`${capitalize(mote.deltaker.etternavn)}, ${capitalize(mote.deltaker.fornavn)}`}
                    />
                )}
            </Table.DataCell>
            <Table.DataCell className="moteplan_tabell_status">
                {mote.avtaltMedNav ? 'Avtalt med NAV' : '-'}
            </Table.DataCell>
        </Table.Row>
    );
}

export default MoteKollonne;
