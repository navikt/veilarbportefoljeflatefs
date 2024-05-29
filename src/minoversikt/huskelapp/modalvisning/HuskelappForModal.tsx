import React from 'react';
import {BodyShort, Detail, Heading} from '@navikt/ds-react';
import {toDatePrettyPrint} from '../../../utils/dato-utils';
import {HuskelappModell} from '../../../model-interfaces';
import '../huskelapp-wrapper/huskelapp-postitstyling.css';
import {HuskelappPostitWrapper} from '../huskelapp-wrapper/HuskelappPostitWrapper';

interface Props {
    huskelapp: HuskelappModell;
}

export const HuskelappForModal = ({huskelapp}: Props) => {
    return (
        <>
            <HuskelappPostitWrapper>
                <Heading level="3" size="xsmall" spacing>
                    {huskelapp?.frist ? `Frist: ${toDatePrettyPrint(huskelapp.frist)}` : 'Ingen frist satt'}
                </Heading>
                <BodyShort size="small" spacing>
                    {huskelapp?.kommentar}
                </BodyShort>
            </HuskelappPostitWrapper>
            <Detail className="huskelapp-visning-modal__endret-av">
                <i>
                    Endret {toDatePrettyPrint(huskelapp?.endretDato)} av {huskelapp?.endretAv}
                </i>
            </Detail>
        </>
    );
};
