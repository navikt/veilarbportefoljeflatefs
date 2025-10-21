import {HeaderCellProps} from './HeaderCellProps';
import {SorteringHeader} from '../sortering-header';
import {Sorteringsfelt} from '../../../typer/kolonnesortering';

export const NavnHeader = ({gjeldendeSorteringsfelt, rekkefolge, onClick}: HeaderCellProps) => (
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
