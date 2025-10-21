import {HeaderCellProps} from './HeaderCellProps';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const FnrHeader = ({gjeldendeSorteringsfelt, rekkefolge, onClick}: HeaderCellProps) => (
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
