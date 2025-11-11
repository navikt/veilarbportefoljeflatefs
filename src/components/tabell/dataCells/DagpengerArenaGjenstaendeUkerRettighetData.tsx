import {Kolonne} from '../../../ducks/ui/listevisning';
import {DataCellMedInnholdBasertPaFiltervalgProps} from './DataCellProps';
import {UkeDataCellType} from '../dataCellTypes/UkeDataCellType';
import {
    filtrertPaFilterMedDagpengerMedPermittering,
    filtrertPaFilterMedDagpengerUtenPermittering
} from '../../../utils/DagpengerArenaKolonneUtils';

export const DagpengerArenaGjenstaendeUkerRettighetData = ({
    bruker,
    valgteKolonner,
    filtervalg
}: DataCellMedInnholdBasertPaFiltervalgProps) => {
    const {ytelse: valgtArenaytelsesfilter, ytelseDagpengerArena} = filtervalg;

    // Bruk ulik kjelde for "ukerIgjen" basert på kva dagpengetype det er filtrert på
    const ukerIgjenBasertPaDagpengetype = () => {
        if (filtrertPaFilterMedDagpengerMedPermittering(ytelseDagpengerArena, valgtArenaytelsesfilter)) {
            return bruker.permutlopUke;
        } else if (filtrertPaFilterMedDagpengerUtenPermittering(ytelseDagpengerArena, valgtArenaytelsesfilter)) {
            return bruker.dagputlopUke;
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
