import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellMedInnholdBasertPaFiltervalgProps} from './DataCellProps';
import {UkeDataCellType} from '../dataCellTypes/UkeDataCellType';
import {
    filtrertPaDagpengerArenaFilterMedPermittering,
    filtrertPaDagpengerArenaFilterUtenPermittering
} from '../../../utils/dagpengerArenaKolonneUtils';

export const DagpengerArenaGjenstaendeUkerRettighetData = ({
    bruker,
    valgteKolonner,
    filtervalg
}: DataCellMedInnholdBasertPaFiltervalgProps) => {
    const {ytelseDagpengerArena} = filtervalg;

    // Bruk ulik kjelde for "ukerIgjen" basert på kva dagpengetype det er filtrert på
    const ukerIgjenBasertPaDagpengetype = () => {
        if (filtrertPaDagpengerArenaFilterMedPermittering(ytelseDagpengerArena)) {
            return bruker.ytelser.ytelserArena.permutlopUke;
        } else if (filtrertPaDagpengerArenaFilterUtenPermittering(ytelseDagpengerArena)) {
            return bruker.ytelser.ytelserArena.dagputlopUke;
        }
    };

    return (
        <UkeDataCellType
            className="col col-xs-2"
            ukerIgjen={ukerIgjenBasertPaDagpengetype()}
            minVal={2}
            skalVises={valgteKolonner.includes(Kolonne.YTELSE_ARENA_GJENSTAENDE_UKER_RETTIGHET_DAGPENGER)}
        />
    );
};
