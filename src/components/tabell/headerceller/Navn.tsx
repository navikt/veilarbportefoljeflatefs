import {HeadercelleProps} from './HeadercelleProps';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const Navn = ({gjeldendeSorteringsfelt, rekkefolge, onClick}: HeadercelleProps) => (
    <SorteringHeader
        sortering={Sorteringsfelt.ETTERNAVN}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.ETTERNAVN}
        onClick={onClick}
        rekkefolge={rekkefolge}
        tekst="Etternavn"
        title="Etternavn"
        className="col col-xs-2"
    />
);
