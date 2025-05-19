import {HeadercelleProps} from './HeadercelleProps';
import {Kolonne} from '../../../ducks/ui/listevisning';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const SisteEndringDato = ({gjeldendeSorteringsfelt, valgteKolonner, rekkefolge, onClick}: HeadercelleProps) => (
    // Dette er siste endring frå under "Hendelser", i aktiviteter personen sjølv har oppretta.
    <SorteringHeader
        skalVises={valgteKolonner.includes(Kolonne.SISTE_ENDRING_DATO)}
        sortering={Sorteringsfelt.SISTE_ENDRING_DATO}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.SISTE_ENDRING_DATO}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Dato siste endring"
        title="Dato personen sist gjorde endring i aktiviteter/mål"
        className="col col-xs-2"
    />
);
