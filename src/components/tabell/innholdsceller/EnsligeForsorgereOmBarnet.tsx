import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {InnholdscelleProps} from './InnholdscelleProps';
import {oppfolingsdatoEnsligeForsorgere} from '../../../utils/enslig-forsorger';

export const EnsligeForsorgereOmBarnet = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <TekstKolonne
        tekst={oppfolingsdatoEnsligeForsorgere(bruker.ensligeForsorgereOvergangsstonad?.yngsteBarnsFodselsdato)}
        skalVises={valgteKolonner.includes(Kolonne.ENSLIGE_FORSORGERE_OM_BARNET)}
        className="col col-xs-3"
    />
);
