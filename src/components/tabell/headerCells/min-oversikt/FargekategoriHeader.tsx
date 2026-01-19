import {HeaderCellProps} from '../HeaderCellProps';
import {SorteringHeaderIkon} from '../../sortering-header-ikon';
import FargekategoriIkonTomtBokmerke from '../../../../components/ikoner/fargekategorier/Fargekategoriikon_bokmerke.svg?react';
import {Sorteringsfelt} from '../../../../typer/kolonnesortering';

/* Dette er header for fargekategori-ikon-kolonna.
 *  Per 2025-10-21 har ikkje tilsvarande data-celle ein eigen komponent */
export const FargekategoriHeader = ({gjeldendeSorteringsfelt, rekkefolge, onClick}: HeaderCellProps) => (
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
