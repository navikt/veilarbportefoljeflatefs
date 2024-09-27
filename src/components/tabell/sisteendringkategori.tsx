import * as React from 'react';
import {useDispatch} from 'react-redux';
import {BodyShort} from '@navikt/ds-react';
import {BrukerModell} from '../../model-interfaces';
import {hendelserLabels} from '../../filtrering/filter-konstanter';
import {getVeilarbpersonflateUrl} from '../../utils/url-utils';
import {oppdaterBrukerIKontekstOgNavigerTilLenke} from '../../utils/utils';
import {AksjonKnappMedPopoverFeilmelding} from '../aksjon-knapp-med-popover-feilmelding/aksjon-knapp-med-popover-feilmelding';

interface SisteEndringKategoriProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: string;
    skalVises: boolean;
}

function SisteEndringKategori({className, bruker, enhetId, skalVises}: SisteEndringKategoriProps) {
    const dispatchForSidenavigeringMidlertidigFiks = useDispatch();

    const handterKlikk = () =>
        oppdaterBrukerIKontekstOgNavigerTilLenke(
            bruker.fnr,
            getVeilarbpersonflateUrl(`/aktivitet/vis/${bruker.sisteEndringAktivitetId}#visAktivitetsplanen`, enhetId),
            dispatchForSidenavigeringMidlertidigFiks
        );

    const sisteEndringKategori = bruker.sisteEndringKategori ? hendelserLabels[bruker.sisteEndringKategori] : ' ';

    if (!skalVises) {
        return null;
    }

    if (bruker.sisteEndringAktivitetId === undefined || bruker.sisteEndringAktivitetId === null) {
        return (
            <BodyShort size="small" className={className}>
                {sisteEndringKategori}
            </BodyShort>
        );
    }

    return (
        <div className={className}>
            <AksjonKnappMedPopoverFeilmelding
                klikkAksjon={handterKlikk}
                knappStil="juster-tekst-venstre"
                knappTekst={sisteEndringKategori}
            />
        </div>
    );
}

export default SisteEndringKategori;
