import React from 'react';
import cls from 'classnames';
import {toDatePrettyPrint} from '../../../utils/dato-utils';
import {HuskelappModell} from '../../../model-interfaces';
import {BodyShort, Detail, Heading} from '@navikt/ds-react';
import '../huskelapp-postitstyling.css';

interface Props {
    huskelapp: HuskelappModell;
    className?: string;
}

export const HuskelappForModal = ({huskelapp, className}: Props) => (
    <div className={cls('huskelapp__postit huskelapp__innhold', className)}>
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
    </div>
);
