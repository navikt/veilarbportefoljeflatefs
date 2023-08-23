import * as React from 'react';
import {useRef, useState} from 'react';
import moment from 'moment';
import {Button, Popover, Table} from '@navikt/ds-react';
import {getPersonUrl} from '../../utils/url-utils';
import {MoteData} from './moteplan';
import {capitalize} from '../../utils/utils';
import {settBrukerIKontekst} from '../../middleware/api';
import {useEventListener} from '../../hooks/use-event-listener';
import PopoverContent from '@navikt/ds-react/esm/popover/PopoverContent';
import {ReactComponent as XMarkOctagonIcon} from '../../components/ikoner/x_mark_octagon_icon.svg';

interface MoteKollonneProps {
    dato: Date;
    mote: MoteData;
    enhetId: string;
}

function MoteKollonne({dato, mote, enhetId}: MoteKollonneProps) {
    const [laster, setLaster] = useState(false);
    const [harFeil, setHarFeil] = useState(false);
    const [linkPopoverApen, setLinkPopoverApen] = useState(false);

    const feilmeldingKnappRef = useRef<HTMLButtonElement>(null);
    const popoverContainerRef = useRef<HTMLDivElement>(null);

    const moteDato = new Date(mote.dato);
    const url = getPersonUrl('#visAktivitetsplanen', enhetId);

    useEventListener('mousedown', fjernFeilmeldingDersomKlikketUtenfor);

    function fjernFeilmeldingDersomKlikketUtenfor(event) {
        // Klikk skjedde på selve feilmeldingen eller inne i popover-en - ikke fjern feilmelding
        if (
            feilmeldingKnappRef.current?.contains(event.target) ||
            popoverContainerRef.current?.contains(event.target)
        ) {
            return;
        }

        if (harFeil) {
            setHarFeil(false);
        }
    }

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
                    <>
                        <Button
                            className="juster-tekst-venstre"
                            variant="tertiary-neutral"
                            size="xsmall"
                            onClick={() => setLinkPopoverApen(true)}
                            ref={feilmeldingKnappRef}
                            icon={<XMarkOctagonIcon />}
                        >
                            Feil i baksystem
                        </Button>
                        <Popover
                            ref={popoverContainerRef}
                            anchorEl={feilmeldingKnappRef.current}
                            open={linkPopoverApen}
                            onClose={() => setLinkPopoverApen(false)}
                            placement="bottom"
                            strategy="fixed"
                        >
                            <PopoverContent>
                                Fikk ikke kontakt med baksystemet. <br /> Prøv å åpne aktivitetsplanen og søk opp
                                personen.
                            </PopoverContent>
                        </Popover>
                    </>
                )}
            </Table.DataCell>
            <Table.DataCell className="moteplan_tabell_status">
                {mote.avtaltMedNav ? 'Avtalt med NAV' : '-'}
            </Table.DataCell>
        </Table.Row>
    );
}

export default MoteKollonne;
