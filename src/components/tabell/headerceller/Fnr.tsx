import {HeadercelleProps} from './HeadercelleProps';
import {Sorteringsfelt} from '../../../model-interfaces';
import SorteringHeader from '../sortering-header';

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
