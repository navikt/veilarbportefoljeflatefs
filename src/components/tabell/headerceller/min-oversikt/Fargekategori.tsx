import {HeadercelleProps} from '../HeadercelleProps';
import {SorteringHeaderIkon} from '../../sortering-header-ikon';
import {ReactComponent as FargekategoriIkonTomtBokmerke} from '../../../../components/ikoner/fargekategorier/Fargekategoriikon_bokmerke.svg';
import {Sorteringsfelt} from '../../../../typer/kolonnesortering';

export const Fargekategori = ({gjeldendeSorteringsfelt, rekkefolge, onClick}: HeadercelleProps) => (
    <SorteringHeaderIkon
        ikon={<FargekategoriIkonTomtBokmerke aria-hidden />}
        sortering={Sorteringsfelt.FARGEKATEGORI}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.FARGEKATEGORI}
        rekkefolge={rekkefolge}
        onClick={onClick}
        title="Fargekategori-sortering"
        headerId="fargekategori"
    />
);
