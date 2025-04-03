import {BodyShort, Button} from '@navikt/ds-react';
import {Visningstype} from './mine-filter-modal';

interface Props {
    setValgtVisningstype: (visningstype: Visningstype) => void;
    sisteFilterNavn;
}

export function Meny({setValgtVisningstype, sisteFilterNavn}: Props) {
    return (
        <div className="mine-filter-meny-modal__wrapper">
            <Button
                size="small"
                className="ny-knapp"
                data-testid="lagre-nytt-filter_modal_knapp"
                onClick={() => setValgtVisningstype(Visningstype.LAGRE_NYTT)}
            >
                Lagre som nytt filter
            </Button>

            <BodyShort size="small" className="tekst" data-testid="mine-filter_modal_oppdater-filter-tekst">
                Oppdater <strong>"{sisteFilterNavn}"</strong> ved å klikke på knappen under.
            </BodyShort>

            <Button
                size="small"
                variant="secondary"
                className="eksisterende-knapp"
                data-testid="oppdater-eksisterende-filter_modal_knapp"
                onClick={() => setValgtVisningstype(Visningstype.OPPDATER)}
            >
                Oppdater eksisterende filter
            </Button>
        </div>
    );
}
