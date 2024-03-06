import {BodyShort} from '@navikt/ds-react';
import cls from 'classnames';
import {toDatePrettyPrint} from '../../utils/dato-utils';
import React from 'react';
import {HuskelappModell} from '../../model-interfaces';

interface Props {
    huskelapp: HuskelappModell;
    className?: string;
    children?: React.ReactNode;
}

export const Huskelapp = ({huskelapp, className, children: actionButtons}: Props) => (
    <div className={cls('HuskelappPostIt', className)}>
        <BodyShort size="small">
            <b>{huskelapp?.frist ? `Frist: ${toDatePrettyPrint(huskelapp.frist)}` : 'Ingen frist satt'}</b>
        </BodyShort>
        <BodyShort size="small">{huskelapp?.kommentar}</BodyShort>
        <BodyShort size="small">
            <i>
                Endret {toDatePrettyPrint(huskelapp?.endretDato)} av {huskelapp?.endretAv}
            </i>
        </BodyShort>
        {actionButtons}
    </div>
);
