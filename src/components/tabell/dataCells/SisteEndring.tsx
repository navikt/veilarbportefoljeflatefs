import {BodyShort} from '@navikt/ds-react';
import {hendelserLabels} from '../../../filtrering/filter-konstanter';
import {getVeilarbpersonflateUrl} from '../../../utils/url-utils';
import {oppdaterBrukerIKontekstOgNavigerTilLenke} from '../../../utils/utils';
import {AksjonKnappMedPopoverFeilmelding} from '../../aksjon-knapp-med-popover-feilmelding/aksjon-knapp-med-popover-feilmelding';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {InnholdscelleMedLenkeProps} from './InnholdscelleProps';

export function SisteEndring({bruker, enhetId, valgteKolonner}: InnholdscelleMedLenkeProps) {
    const handterKlikk = () =>
        oppdaterBrukerIKontekstOgNavigerTilLenke(
            bruker.fnr,
            getVeilarbpersonflateUrl(`/aktivitet/vis/${bruker.sisteEndringAktivitetId}#visAktivitetsplanen`, enhetId)
        );

    const sisteEndringKategori = bruker.sisteEndringKategori ? hendelserLabels[bruker.sisteEndringKategori] : ' ';

    const skalVises = valgteKolonner.includes(Kolonne.SISTE_ENDRING);
    if (!skalVises) {
        return null;
    }

    if (bruker.sisteEndringAktivitetId === undefined || bruker.sisteEndringAktivitetId === null) {
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
