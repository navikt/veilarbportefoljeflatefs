import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {InnholdscelleProps} from './InnholdscelleProps';
import {BarnUnder18AarModell} from '../../../typer/bruker-modell';

export const BarnUnder18Aar = ({bruker, valgteKolonner}: InnholdscelleProps) => {
    const barnAlderTilStr = (dataOmBarn: BarnUnder18AarModell[]) => {
        const lf = new Intl.ListFormat('no');
        const dataOmBarnSorted = dataOmBarn
            .map(x => x.alder)
            .sort((a, b) => (a < b ? -1 : 1))
            .map(x => String(x));
        return ' (' + lf.format(dataOmBarnSorted) + ' år)';
    };

    const brukerBarnUnder18AarInfo = (dataOmBarn: BarnUnder18AarModell[]) => {
        if (dataOmBarn === null || dataOmBarn === undefined || (Array.isArray(dataOmBarn) && dataOmBarn.length === 0)) {
            return '-';
        }
        return dataOmBarn.length + barnAlderTilStr(dataOmBarn);
    };

    return (
        <TekstKolonne
            tekst={brukerBarnUnder18AarInfo(bruker.barnUnder18AarData)}
            skalVises={valgteKolonner.includes(Kolonne.BARN_UNDER_18_AAR)}
            className="col col-xs-2"
        />
    );
};
