import {BodyShort} from '@navikt/ds-react';

export function MineFilterFnrFeil() {
    return (
        <div className="mine-filter-meny-modal__wrapper fnr-feil">
            <BodyShort size="small">
                Fødselsnummer og navn kan ikke brukes i mine filter. <br />
                Du må fjerne fødselsnummer og navn for å lagre filteret.
            </BodyShort>
        </div>
    );
}
