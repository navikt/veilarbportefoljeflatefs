import {Kolonne} from '../../../ducks/ui/valgte-kolonner';
import {DataCellProps} from './DataCellProps';
import {DatoDataCellType} from '../dataCellTypes/DatoDataCellType';
import {useFeatureSelector} from '../../../hooks/redux/use-feature-selector';
import {BRUK_V3_AV_ARBEIDSSOEKERREGISTERET} from '../../../konstanter';

export const UtdanningOgSituasjonSistEndretData = ({bruker, valgteKolonner}: DataCellProps) => {
    const brukV3AvArbeidssoekerregisteret = useFeatureSelector()(BRUK_V3_AV_ARBEIDSSOEKERREGISTERET);

    const brukersUtdanningOgSituasjonSistEndret = brukV3AvArbeidssoekerregisteret
        ? (bruker.arbeidssoekerregisteret?.utdanningOgSituasjonSistEndret ?? null)
        : bruker.utdanningOgSituasjonSistEndret || null;

    return (
        <DatoDataCellType
            dato={brukersUtdanningOgSituasjonSistEndret}
            skalVises={valgteKolonner.includes(Kolonne.UTDANNING_OG_SITUASJON_SIST_ENDRET)}
            className="col col-xs-2"
        />
    );
};
