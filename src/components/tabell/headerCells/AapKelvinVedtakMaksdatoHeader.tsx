import {HeaderCellProps} from './HeaderCellProps';
import {SorteringHeader} from '../sortering-header';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';
import {useFeatureSelector} from '../../../hooks/redux/use-feature-selector';
import {VIS_AAP_MAKSDATO} from '../../../konstanter';

export const AapKelvinVedtakMaksdatoHeader = ({
    gjeldendeSorteringsfelt,
    valgteKolonner,
    rekkefolge,
    onClick
}: HeaderCellProps) => {
    const harFeature = useFeatureSelector();
    const visAapMaksdato = harFeature(VIS_AAP_MAKSDATO);
    return (
        <SorteringHeader
            skalVises={valgteKolonner.includes(Kolonne.AAP_KELVIN_MAKSDATO) && visAapMaksdato}
            sortering={Sorteringsfelt.AAP_KELVIN_MAKSDATO}
            erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.AAP_KELVIN_MAKSDATO}
            rekkefolge={rekkefolge}
            onClick={onClick}
            tekst="Maksdato AAP (Kelvin)"
            title="Maksdato er siste dag med mulig rett til AAP"
            className="col col-xs-2"
        />
    );
};
