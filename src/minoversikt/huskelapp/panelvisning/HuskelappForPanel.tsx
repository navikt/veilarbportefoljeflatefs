import {BodyShort, Button, Detail, Heading} from '@navikt/ds-react';
import {toDatePrettyPrint} from '../../../utils/dato-utils';
import {BrukerModell, HuskelappModell} from '../../../typer/bruker-modell';
import {HuskelappPostitWrapper} from '../huskelapp-wrapper/HuskelappPostitWrapper';
import {SlettHuskelappKnapp} from '../redigering/SlettHuskelappKnapp';
import '../huskelapp-wrapper/huskelapp-postitstyling.css';

interface Props {
    huskelapp: HuskelappModell;
    bruker: BrukerModell;
    onEndreHuskelapp: () => void;
}

export const HuskelappForPanel = ({huskelapp, bruker, onEndreHuskelapp}: Props) => (
    <HuskelappPostitWrapper>
        <Heading level="3" size="xsmall" spacing>
            {huskelapp?.frist ? `Frist: ${toDatePrettyPrint(huskelapp.frist)}` : 'Ingen frist satt'}
        </Heading>
        <BodyShort size="small" spacing className="huskelapp-visning__kommentar">
            {huskelapp?.kommentar}
        </BodyShort>
        <Detail spacing>
            <i>
                Endret {toDatePrettyPrint(huskelapp?.endretDato)} av {huskelapp?.endretAv}
            </i>
        </Detail>
        <div className="huskelapp-panelvisning__handlingsknapper">
            <SlettHuskelappKnapp bruker={bruker} size="xsmall" bekreftelsesmelding={{overskriftsnivaa: '4'}} />
            <Button type="button" size="xsmall" variant="primary" onClick={onEndreHuskelapp}>
                Endre
            </Button>
        </div>
    </HuskelappPostitWrapper>
);
