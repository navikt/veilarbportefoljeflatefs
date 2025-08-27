import moment from 'moment';
import {Table} from '@navikt/ds-react';
import {getVeilarbpersonflateUrl} from '../../utils/url-utils';
import {capitalize, oppdaterBrukerIKontekstOgNavigerTilLenke} from '../../utils/utils';
import {AksjonKnappMedPopoverFeilmelding} from '../../components/aksjon-knapp-med-popover-feilmelding/aksjon-knapp-med-popover-feilmelding';
import {MoteplanModell} from '../../typer/moteplan';
import {formaterVarighetSomTimerOgMinutt} from '../../utils/dato-utils';

interface MoteKollonneProps {
    dato: Date;
    mote: MoteplanModell;
    enhetId: string;
}

export function MoteKollonne({dato, mote, enhetId}: MoteKollonneProps) {
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
