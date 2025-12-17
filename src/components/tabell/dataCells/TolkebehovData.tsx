import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstDataCellType} from '../dataCellTypes/TekstDataCellType';
import {DataCellMedInnholdBasertPaFiltervalgProps} from './DataCellProps';
import {FiltervalgModell} from '../../../typer/filtervalg-modell';
import {BrukerModell, Tolkebehov} from '../../../typer/bruker-modell';

export const TolkebehovData = ({bruker, valgteKolonner, filtervalg}: DataCellMedInnholdBasertPaFiltervalgProps) => (
    <TekstDataCellType
        tekst={tolkebehovTekst(filtervalg, bruker)}
        skalVises={valgteKolonner.includes(Kolonne.TOLKEBEHOV)}
        className="col col-xs-2"
    />
);

function tolkebehovTekst(filtervalg: FiltervalgModell, bruker: BrukerModell) {
    const behov: string[] = [];

    if (trengerTalespraktolk(bruker.tolkebehov, filtervalg)) {
        behov.push('Talespråktolk');
    }

    if (trengerTegnspraktolk(bruker.tolkebehov, filtervalg)) {
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

function trengerTalespraktolk(tolkebehov: Tolkebehov, filtervalg: FiltervalgModell): boolean {
    const filtrertPaTalespraktolkOgHarBehov =
        filtervalg.tolkebehov.includes('TALESPRAAKTOLK') && tolkebehov.talespraaktolk.length > 0;
    const filtrertPaBrukersTalesprak = filtervalg.tolkBehovSpraak.includes(tolkebehov.talespraaktolk);

    if (filtrertPaTalespraktolkOgHarBehov || filtrertPaBrukersTalesprak) {
        return true;
    }

    return false;
}

function trengerTegnspraktolk(tolkebehov: Tolkebehov, filtervalg: FiltervalgModell) {
    const filtrertPaTegnspraktolkOgHarBehov =
        filtervalg.tolkebehov.includes('TEGNSPRAAKTOLK') && tolkebehov.tegnspraaktolk.length > 0;
    const filtrertPaBrukersTegnsprak = filtervalg.tolkBehovSpraak.includes(tolkebehov.tegnspraaktolk);

    if (filtrertPaTegnspraktolkOgHarBehov || filtrertPaBrukersTegnsprak) {
        return true;
    }

    return false;
}
