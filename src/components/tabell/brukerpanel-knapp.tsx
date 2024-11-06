import {MouseEvent} from 'react';
import {Button} from '@navikt/ds-react';
import {ChevronDownIcon, ChevronUpIcon} from '@navikt/aksel-icons';
import './tabell.css';
import '../../enhetsportefolje/brukerliste.css';

interface BrukerpanelKnappProps {
    apen: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const BrukerpanelKnapp = ({apen, onClick}: BrukerpanelKnappProps) => (
    <Button
        size="small"
        className="brukerliste__brukerpanelknapp"
        variant="tertiary"
        onClick={onClick}
        icon={apen ? <ChevronUpIcon title="Vis mindre" /> : <ChevronDownIcon title="Vis mer" />}
        aria-expanded={apen}
    />
);
