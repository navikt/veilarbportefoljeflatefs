import {HeadercelleProps} from '../HeadercelleProps';
import {SorteringHeaderIkon} from '../../sortering-header-ikon';
import {ReactComponent as HuskelappIkon} from '../../../../components/ikoner/huskelapp/Huskelappikon.svg';
import {Sorteringsfelt} from '../../../../typer/kolonnesortering';

export const Huskelapp = ({gjeldendeSorteringsfelt, rekkefolge, onClick}: HeadercelleProps) => (
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
