import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {DataCellProps} from './DataCellProps';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {Innsatsgruppe} from '../../../typer/bruker-modell';
import dayjs from 'dayjs';

export const AapArenaVurderingsfristData = ({bruker, valgteKolonner}: DataCellProps) => {
    const vurderingsfristAAP = aapVurderingsfrist(
        bruker.ytelser.ytelserArena.innsatsgruppe,
        bruker.ytelser.ytelserArena.ytelse,
        bruker.ytelser.ytelserArena.utlopsdato,
        bruker.ytelser.ytelserArena.aapordinerutlopsdato
    );

    return (
        <TekstDataCellType
            className="col col-xs-2"
            skalVises={valgteKolonner.includes(Kolonne.YTELSE_ARENA_VURDERINGSFRIST_AAP)}
            tekst={vurderingsfristAAP || '–'}
        />
    );
};

function aapVurderingsfrist(
    innsatsgruppe: Innsatsgruppe | null,
    brukerYtelse: string | undefined,
    utlopsdatoVedtak?: string,
    utlopsdatoOrdinerRettighet?: string
): string | undefined {
    const iDag = dayjs();

    if (brukerYtelse === 'AAP_MAXTID') {
        // makstid == ordinær rettighetsperiode
        if (utlopsdatoOrdinerRettighet) {
            // Hvis utlopsdatoOrdinerRettighet eksisterer så er brukeren BATT (filtreres backend)
            // 5 ukers frist er spesifisert av servicerutinen for AAP, på ordinær er den ikke nøyaktig på det vi får fra Arena, så setter den til 40 dager
            const vurderingsfrist = dayjs(utlopsdatoOrdinerRettighet).subtract(40, 'day');
            if (!vurderingsfrist.isValid()) {
                return undefined;
            }

            const vurderingsfristFormatert = vurderingsfrist.format('DD.MM.YYYY');
            return vurderingsfrist.isAfter(iDag) ? vurderingsfristFormatert : `Utløpt: ${vurderingsfristFormatert}`;
        }

        if (innsatsgruppe === Innsatsgruppe.BATT) {
            // Hvis bruker er BATT, så har vi ikke fått melding fra Arena som oppretter en ordinerutlopsdato
            return 'Mangler data';
        }
        return 'Ikke spesielt tilpasset innsats';
    }

    if (brukerYtelse === 'AAP_UNNTAK') {
        if (!utlopsdatoVedtak) {
            return undefined;
        }

        // 35 dager/5 ukers frist er spesifisert av servicerutinen for AAP
        const vurderingsfrist = dayjs(utlopsdatoVedtak).subtract(35, 'day');

        if (!vurderingsfrist.isValid()) {
            return undefined;
        }

        const vurderingsfristFormatert = vurderingsfrist.format('DD.MM.YYYY');
        return vurderingsfrist.isAfter(iDag) ? vurderingsfristFormatert : `Utløpt: ${vurderingsfristFormatert}`;
    }

    return undefined;
}
