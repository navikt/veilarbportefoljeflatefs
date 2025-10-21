import {HeaderCellProps} from '../HeaderCellProps';
import {SorteringHeaderIkon} from '../../sortering-header-ikon';
import {ReactComponent as HuskelappIkon} from '../../../../components/ikoner/huskelapp/Huskelappikon.svg';
import {Sorteringsfelt} from '../../../../typer/kolonnesortering';

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
