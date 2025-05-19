import {HeadercelleProps} from './HeadercelleProps';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const Fnr = ({gjeldendeSorteringsfelt, rekkefolge, onClick}: HeadercelleProps) => (
    <SorteringHeader
        sortering={Sorteringsfelt.FODSELSNUMMER}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.FODSELSNUMMER}
        rekkefolge={rekkefolge}
        onClick={onClick}
        tekst="Fødselsnr."
        title="Fødselsnummer"
        className="col col-xs-2-5"
    />
);
