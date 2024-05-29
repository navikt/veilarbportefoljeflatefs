import * as React from 'react';
import {MouseEvent} from 'react';
import classnames from 'classnames';
import {Button} from '@navikt/ds-react';
import {ChevronDownIcon, ChevronUpIcon} from '@navikt/aksel-icons';
import './tabell.css';
import '../../enhetsportefolje/brukerliste.css';

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
            size="small"
            className={classnames('knapp brukerliste__arbeidslisteknapp', className)}
            variant="tertiary"
            onClick={onClick}
            icon={
                apen ? (
                    <ChevronUpIcon title="Vis mindre" className="collapse-testid" />
                ) : (
                    <ChevronDownIcon title="Vis mer" className="expand-testid" />
                )
            }
            aria-expanded={apen}
            data-testid={dataTestid}
        ></Button>
    ) : (
        <div className="brukerliste__arbeidslisteknapp" />
    );

export default arbeidslisteButton;
