import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellProps} from './DataCellProps';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {Innsatsgruppe} from '../../../typer/bruker-modell';
import {dateGreater, toDateString} from '../../../utils/dato-utils';

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
    const iDag = new Date();
    if (brukerYtelse === 'AAP_MAXTID') {
        // makstid == ordinær rettighetsperiode
        if (utlopsdatoOrdinerRettighet) {
            // Hvis utlopsdatoOrdinerRettighet eksisterer så er brukeren BATT (filtreres backend)
            const vurderingsfrist = new Date(utlopsdatoOrdinerRettighet);
            vurderingsfrist.setDate(vurderingsfrist.getDate() - 40); // 5 ukers frist er spesifisert av servicerutinen for AAP, på ordinær er den ikke nøyaktig på det vi får fra Arena, så setter den til 40 dager
            return dateGreater(vurderingsfrist, iDag)
                ? toDateString(vurderingsfrist)
                : `Utløpt: ${toDateString(vurderingsfrist)}`;
        } else if (innsatsgruppe === Innsatsgruppe.BATT) {
            // Hvis bruker er BATT, så har vi ikke fått melding fra Arena som oppretter en ordinerutlopsdato
            return 'Mangler data';
        } else {
            return 'Ikke spesielt tilpasset innsats';
        }
    } else if (brukerYtelse === 'AAP_UNNTAK') {
        if (!utlopsdatoVedtak) {
            return undefined;
        }
        const vurderingsfrist = new Date(utlopsdatoVedtak);
        vurderingsfrist.setDate(vurderingsfrist.getDate() - 35); // 35 dager/5 ukers frist er spesifisert av servicerutinen for AAP
        return dateGreater(vurderingsfrist, iDag)
            ? toDateString(vurderingsfrist)
            : `Utløpt: ${toDateString(vurderingsfrist)}`;
    }
}
