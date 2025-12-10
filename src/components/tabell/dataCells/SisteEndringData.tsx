import {BodyShort} from '@navikt/ds-react';
import {hendelserLabels} from '../../../filtrering/filter-konstanter';
import {getVeilarbpersonflateUrl} from '../../../utils/url-utils';
import {oppdaterBrukerIKontekstOgNavigerTilLenke} from '../../../utils/utils';
import {AksjonKnappMedPopoverFeilmelding} from '../../aksjon-knapp-med-popover-feilmelding/aksjon-knapp-med-popover-feilmelding';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellMedLenkeProps} from './DataCellProps';

export function SisteEndringData({bruker, enhetId, valgteKolonner}: DataCellMedLenkeProps) {
    const handterKlikk = () =>
        oppdaterBrukerIKontekstOgNavigerTilLenke(
            bruker.fnr,
            getVeilarbpersonflateUrl(
                `/aktivitet/vis/${bruker.sisteEndringAvBruker?.aktivitetId}#visAktivitetsplanen`,
                enhetId
            )
        );

    const sisteEndringKategori = bruker.sisteEndringAvBruker?.kategori
        ? hendelserLabels[bruker.sisteEndringAvBruker?.kategori]
        : ' ';

    const skalVises = valgteKolonner.includes(Kolonne.SISTE_ENDRING);
    if (!skalVises) {
        return null;
    }

    if (bruker.sisteEndringAvBruker?.aktivitetId === null) {
        return (
            <BodyShort size="small" className="col col-xs-2">
                {sisteEndringKategori}
            </BodyShort>
        );
    }

    return (
        <div className="col col-xs-2">
            <AksjonKnappMedPopoverFeilmelding
                klikkAksjon={handterKlikk}
                knappStil="juster-tekst-venstre"
                knappTekst={sisteEndringKategori}
            />
        </div>
    );
}
