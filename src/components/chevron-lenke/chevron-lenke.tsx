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
    onClick?: () => void;
}

const ChevronLenke: React.FunctionComponent<ChevronLenkeProps> = (props: ChevronLenkeProps) => {
    const { retning, tekst, onClick, hide } = props;
    return (
        <button className={cls("chevron-lenke", {'chevron-lenke--hide': hide})} onClick={onClick}>
            {retning === Retning.VENSTRE ?
                (
                    <>
                        <VenstreChevron />
                        <span className="chevron-lenke__tekst">{tekst}</span>
                    </>
                )
                :
                (
                    <>
                        <span className="chevron-lenke__tekst">{tekst}</span>
                        <HoyreChevron />
                    </>
                )
            }
        </button>
    );
};

export default ChevronLenke;
