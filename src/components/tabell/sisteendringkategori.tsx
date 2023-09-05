import * as React from 'react';
import {BrukerModell} from '../../model-interfaces';
import '../../topp-meny/lenker.css';
import {hendelserLabels} from '../../filtrering/filter-konstanter';
import {getVeilarbpersonflateUrl} from '../../utils/url-utils';
import {BodyShort} from '@navikt/ds-react';
import {oppdaterBrukerIKontekstOgNavigerTilLenke} from '../../utils/utils';
import {AksjonKnappMedPopoverFeilmelding} from '../aksjon-knapp-med-popover-feilmelding';

interface SisteEndringKategoriProps {
    className?: string;
    bruker: BrukerModell;
    enhetId: string;
    skalVises: boolean;
}

function SisteEndringKategori({className, bruker, enhetId, skalVises}: SisteEndringKategoriProps) {
    const handterKlikk = () =>
        oppdaterBrukerIKontekstOgNavigerTilLenke(
            bruker.fnr,
            getVeilarbpersonflateUrl(`/aktivitet/vis/${bruker.sisteEndringAktivitetId}#visAktivitetsplanen`, enhetId)
        );

    const sisteEndringKategori = !!bruker.sisteEndringKategori ? hendelserLabels[bruker.sisteEndringKategori] : ' ';

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
                aksjon={handterKlikk}
                knappStil="lenke lenke--frittstaende"
                knappTekst={sisteEndringKategori}
            />
        </div>
    );
}

export default SisteEndringKategori;
