import React from 'react';
import {BodyShort, Button, Detail, Heading} from '@navikt/ds-react';
import {toDatePrettyPrint} from '../../../utils/dato-utils';
import {HuskelappModell} from '../../../model-interfaces';
import '../huskelapp-wrapper/huskelapp-postitstyling.css';
import {HuskelappPostitWrapper} from '../huskelapp-wrapper/HuskelappPostitWrapper';
import {TrashIcon} from '@navikt/aksel-icons';

interface Props {
    huskelapp: HuskelappModell;
    onSlettHuskelapp: () => void;
    onEndreHuskelapp: () => void;
}

export const HuskelappForPanel = ({huskelapp, onSlettHuskelapp, onEndreHuskelapp}: Props) => (
    <HuskelappPostitWrapper>
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
        <div className="huskelapp-handlingsknapper">
            <Button
                type="button"
                size="xsmall"
                variant="secondary"
                onClick={onSlettHuskelapp}
                icon={<TrashIcon aria-hidden={true} />}
            >
                Slett
            </Button>
            <Button type="button" size="xsmall" variant="primary" onClick={onEndreHuskelapp}>
                Endre
            </Button>
        </div>
    </HuskelappPostitWrapper>
);
