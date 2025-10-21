import {Kolonne} from '../../../ducks/ui/listevisning';
import {TekstKolonne} from '../kolonner/tekstkolonne';
import {InnholdscelleProps} from './InnholdscelleProps';
import {mapOmAktivitetsPlikt} from '../../../utils/enslig-forsorger';

export const EnsligeForsorgereAktivitetsplikt = ({bruker, valgteKolonner}: InnholdscelleProps) => (
    <TekstKolonne
        tekst={mapOmAktivitetsPlikt(bruker.ensligeForsorgereOvergangsstonad?.harAktivitetsplikt)}
        skalVises={valgteKolonner.includes(Kolonne.ENSLIGE_FORSORGERE_AKIVITETSPLIKT)}
        className="col col-xs-2"
    />
);
