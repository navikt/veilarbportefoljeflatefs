import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {DataCellMedInnholdBasertPaFiltervalgProps} from './DataCellProps';
import {FiltervalgModell} from '../../../typer/filtervalg-modell';
import {BrukerModell} from '../../../typer/bruker-modell';

export const TolkebehovData = ({bruker, valgteKolonner, filtervalg}: DataCellMedInnholdBasertPaFiltervalgProps) => (
    <TekstDataCellType
        tekst={tolkBehov(filtervalg, bruker)}
        skalVises={valgteKolonner.includes(Kolonne.TOLKEBEHOV)}
        className="col col-xs-2"
    />
);

function tolkBehov(filtervalg: FiltervalgModell, bruker: BrukerModell) {
    const behov: string[] = [];

    const filtrertPaTalespraktolkOgHarBehov =
        filtervalg.tolkebehov.includes('TALESPRAAKTOLK') && bruker.tolkebehov.talespraaktolk.length > 0;
    const filtrertPaBrukersTalesprak = filtervalg.tolkBehovSpraak.includes(bruker.tolkebehov.talespraaktolk);

    if (filtrertPaTalespraktolkOgHarBehov || filtrertPaBrukersTalesprak) {
        behov.push('Talespråktolk');
    }

    const filtrertPaTegnspraktolkOgHarBehov =
        filtervalg.tolkebehov.includes('TEGNSPRAAKTOLK') && bruker.tolkebehov.tegnspraaktolk.length > 0;
    const filtrertPaBrukersTegnsprak = filtervalg.tolkBehovSpraak.includes(bruker.tolkebehov.tegnspraaktolk);

    if (filtrertPaTegnspraktolkOgHarBehov || filtrertPaBrukersTegnsprak) {
        if (behov.length > 0) {
            behov.push('tegnspråktolk');
        } else {
            behov.push('Tegnspråktolk');
        }
    }

    // Teoretisk umogleg, brukarar utan behov bør ikkje dukke opp i resultatlista ?? - Ingrid, 2025-12-16
    if (behov.length === 0) {
        return '-';
    }

    return behov.join(', ');
}
