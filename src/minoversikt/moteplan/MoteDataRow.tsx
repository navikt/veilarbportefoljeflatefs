import {Table} from '@navikt/ds-react';
import {getVeilarbpersonflateUrl} from '../../utils/url-utils';
import {capitalize, oppdaterBrukerIKontekstOgNavigerTilLenke} from '../../utils/utils';
import {AksjonKnappMedPopoverFeilmelding} from '../../components/aksjon-knapp-med-popover-feilmelding/aksjon-knapp-med-popover-feilmelding';
import {MoteplanModell} from '../../typer/moteplan';
import {formaterVarighetSomTimerOgMinutt} from '../../utils/dato-utils';
import dayjs from 'dayjs';

interface MoteKollonneProps {
    dato: Date;
    mote: MoteplanModell;
    enhetId: string;
}

export function MoteDataRow({dato, mote, enhetId}: MoteKollonneProps) {
    const moteDato = dayjs(mote.dato);

    const handterKlikk = () =>
        oppdaterBrukerIKontekstOgNavigerTilLenke(
            mote.deltaker.fnr,
            getVeilarbpersonflateUrl('#visAktivitetsplanen', enhetId)
        );

    if (!dayjs(dato).isSame(moteDato, 'day')) {
        return <></>;
    }
    return (
        <Table.Row>
            <Table.DataCell className="moteplan_tabell_klokkeslett">{moteDato.format('HH:mm')}</Table.DataCell>
            <Table.DataCell className="moteplan_tabell_varighet">
                {formaterVarighetSomTimerOgMinutt(mote.varighetMinutter)}
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
                {mote.avtaltMedNav ? 'Avtalt med Nav' : '-'}
            </Table.DataCell>
        </Table.Row>
    );
}
