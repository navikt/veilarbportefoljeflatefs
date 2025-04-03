import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import {SorteringHeader} from '../sortering-header';

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
