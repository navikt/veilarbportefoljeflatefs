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
    const trengerTalespraktolk = harTalespraktolkBehov(bruker.tolkebehov, filtervalg);
    const trengerTegnspraktolk = harTegnspraktolkBehov(bruker.tolkebehov, filtervalg);

    if (trengerTalespraktolk && trengerTegnspraktolk) {
        return 'Talespråktolk, tegnspråktolk';
    } else if (trengerTalespraktolk) {
        return 'Talespråktolk';
    } else if (trengerTegnspraktolk) {
        return 'Tegnspråktolk';
    }
    return '-';
}

function harTalespraktolkBehov(tolkebehov: Tolkebehov, filtervalg: FiltervalgModell): boolean {
    const filtrertPaTalespraktolkOgHarBehov =
        filtervalg.tolkebehov.includes('TALESPRAAKTOLK') && tolkebehov.talespraaktolk.length > 0;
    const filtrertPaBrukersTalesprak = filtervalg.tolkBehovSpraak.includes(tolkebehov.talespraaktolk);

    if (filtrertPaTalespraktolkOgHarBehov || filtrertPaBrukersTalesprak) {
        return true;
    }

    return false;
}

function harTegnspraktolkBehov(tolkebehov: Tolkebehov, filtervalg: FiltervalgModell) {
    const filtrertPaTegnspraktolkOgHarBehov =
        filtervalg.tolkebehov.includes('TEGNSPRAAKTOLK') && tolkebehov.tegnspraaktolk.length > 0;
    const filtrertPaBrukersTegnsprak = filtervalg.tolkBehovSpraak.includes(tolkebehov.tegnspraaktolk);

    if (filtrertPaTegnspraktolkOgHarBehov || filtrertPaBrukersTegnsprak) {
        return true;
    }

    return false;
}
