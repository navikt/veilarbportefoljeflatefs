import * as React from 'react';
import cls from 'classnames';
import { HoyreChevron, VenstreChevron } from 'nav-frontend-chevron';
import './chevron-lenke.less';

export enum Retning {
    HOYRE, VENSTRE
}

interface ChevronLenkeProps {
    retning: Retning;
    tekst: string;
    hide?: boolean;
    onClick(event: React.MouseEvent<HTMLButtonElement>): void;
}

function ChevronLenke (props: ChevronLenkeProps){
    const { retning, tekst, onClick, hide } = props;
    const clsPar = ["chevron-lenke",{'chevron-lenke--hide':hide}]
    if(retning === Retning.VENSTRE){
        return(
            <button className={cls(clsPar)} onClick={onClick}>
                <VenstreChevron/>
                <span className="chevron-lenke__tekst">{tekst}</span>
            </button>
        )
    }else{
        return(
            <button className={cls(clsPar)} onClick={onClick}>
                <span className="chevron-lenke__tekst">{tekst}</span>
                <HoyreChevron/>
            </button>
        )
    }
}
export default ChevronLenke;
