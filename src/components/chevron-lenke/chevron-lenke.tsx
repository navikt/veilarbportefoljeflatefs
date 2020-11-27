import * as React from 'react';
import cls from 'classnames';
import {HoyreChevron, VenstreChevron} from 'nav-frontend-chevron';
import './chevron-lenke.less';

export enum Retning {
    HOYRE,
    VENSTRE
}

interface ChevronLenkeProps {
    retning: Retning;
    tekst: string;
    hide?: boolean;
    dataTestId: string;

    onClick(event: React.MouseEvent<HTMLButtonElement>): void;
}

function ChevronLenke(props: ChevronLenkeProps) {
    const {retning, tekst, onClick, hide, dataTestId} = props;
    const clsPar = ['chevron-lenke', {'chevron-lenke--hide': hide}];
    return (
        <button className={cls(clsPar)} onClick={onClick} data-testid={dataTestId} role="button">
            {retning === Retning.VENSTRE ? (
                <>
                    <VenstreChevron />
                    <span className="chevron-lenke__tekst">{tekst}</span>
                </>
            ) : (
                <>
                    <span className="chevron-lenke__tekst">{tekst}</span>
                    <HoyreChevron />
                </>
            )}
        </button>
    );
}

export default ChevronLenke;
