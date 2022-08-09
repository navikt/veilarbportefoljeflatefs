import * as React from 'react';
import {MouseEvent} from 'react';
import classnames from 'classnames';
import './tabell.css';
import '../../enhetsportefolje/brukerliste.css';
import {Button} from '@navikt/ds-react';
import {Collapse, Expand} from '@navikt/ds-icons';

interface ArbeidslisteButtonProps {
    className?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    apen: boolean;
    skalVises: boolean;
    dataTestid: string;
}

const arbeidslisteButton = ({className, onClick, apen, dataTestid, skalVises}: ArbeidslisteButtonProps) =>
    skalVises ? (
        <Button
            variant="tertiary"
            className={classnames('knapp brukerliste__arbeidslisteknapp', className)}
            onClick={onClick}
            aria-expanded={apen}
            data-testid={dataTestid}
            aria-label="Chevron for arbeidliste"
        >
            {apen ? <Collapse className="collapse" /> : <Expand className="expand" />}
        </Button>
    ) : (
        <div className="brukerliste__arbeidslisteknapp" />
    );

export default arbeidslisteButton;
