import React from 'react';
import cls from 'classnames';
import {BodyShort, Detail, Heading} from '@navikt/ds-react';
import {toDatePrettyPrint} from '../../../utils/dato-utils';
import {HuskelappModell} from '../../../model-interfaces';
import '../huskelapp-wrapper/huskelapp-postitstyling.css';
import {HuskelappPostitWrapper} from '../huskelapp-wrapper/HuskelappPostitWrapper';

interface Props {
    huskelapp: HuskelappModell;
    className?: string;
    children: React.ReactNode;
}

export const HuskelappForPanel = ({huskelapp, className, children: actionButtons}: Props) => (
    <HuskelappPostitWrapper className={cls('huskelapp-i-panel', className)}>
        <Heading level="3" size="xsmall" spacing>
            {huskelapp?.frist ? `Frist: ${toDatePrettyPrint(huskelapp.frist)}` : 'Ingen frist satt'}
        </Heading>
        <BodyShort size="small" spacing>
            {huskelapp?.kommentar}
        </BodyShort>
        <Detail spacing>
            <i>
                Endret {toDatePrettyPrint(huskelapp?.endretDato)} av {huskelapp?.endretAv}
            </i>
        </Detail>
        {actionButtons}
    </HuskelappPostitWrapper>
);
