import * as React from 'react';
import {Button} from '@navikt/ds-react';
import {Back, Next} from '@navikt/ds-icons';
import cls from 'classnames';
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
    const clsPar = {'chevron-lenke--hide': hide};
    return (
        <Button className={cls(clsPar)} onClick={onClick} data-testid={dataTestId}>
            {retning === Retning.VENSTRE ? (
                <>
                    <Back />
                    {tekst}
                </>
            ) : (
                <>
                    {tekst}
                    <Next />
                </>
            )}
        </Button>
    );
}

export default ChevronLenke;
