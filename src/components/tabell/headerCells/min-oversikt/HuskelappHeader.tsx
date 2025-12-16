import {HeaderCellProps} from '../HeaderCellProps';
import {SorteringHeaderIkon} from '../../sortering-header-ikon';
import HuskelappIkon from '../../../../components/ikoner/huskelapp/Huskelappikon.svg?react';
import {Sorteringsfelt} from '../../../../typer/kolonnesortering';

/* Dette er header for huskelapp-ikon-knapp-kolonna.
 *  Per 2025-10-21 har ikkje tilsvarande data-celle ein eigen komponent */
export const HuskelappHeader = ({gjeldendeSorteringsfelt, rekkefolge, onClick}: HeaderCellProps) => (
    <SorteringHeaderIkon
        ikon={<HuskelappIkon aria-hidden />}
        sortering={Sorteringsfelt.HUSKELAPP}
        erValgt={gjeldendeSorteringsfelt === Sorteringsfelt.HUSKELAPP}
        rekkefolge={rekkefolge}
        onClick={onClick}
        title="Huskelapp-sortering"
        headerId="huskelapp"
        className="huskelapp__sorteringsheader"
    />
);
