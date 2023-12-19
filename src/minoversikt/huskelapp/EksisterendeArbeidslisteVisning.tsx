import React from 'react';
import {Alert, BodyLong, BodyShort, Button, Heading} from '@navikt/ds-react';
import {ArbeidslisteModell} from '../../model-interfaces';
import {TrashIcon} from '@navikt/aksel-icons';

interface Props {
    arbeidsliste: ArbeidslisteModell;
    onSlett?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export const EksisterendeArbeidslisteVisning = ({arbeidsliste, onSlett}: Props) => {
    //TODO fikse datoene til DD.MM.YYYY
    return (
        <section className="eksisterendeArbeidslisteVisning">
            <Heading size="small" level="1">
                Eksisterende arbeidslisteinnhold
            </Heading>
            <Alert variant="info" size="small">
                Når du <b>lagrer</b> huskelapp første gang vil eksisterende arbeidslisteinnhold på denne personen
                automatisk slettes. Alt eksisterende arbeidslisteinnhold blir slettet <b>2.januar 2024</b>
            </Alert>
            <BodyShort size="small" as="h2">
                <b>{arbeidsliste?.overskrift}</b>
            </BodyShort>
            <BodyShort size="small">
                <i>Frist: {arbeidsliste.frist ? new Date(arbeidsliste.frist).toLocaleDateString() : 'Ingen frist'}</i>
            </BodyShort>
            <BodyLong size="small" className="navds-body-short">
                {arbeidsliste?.kommentar}
            </BodyLong>
            <BodyShort size="small" className="blokk-xxs">
                <i>
                    Oppdatert{' '}
                    {arbeidsliste.endringstidspunkt
                        ? new Date(arbeidsliste.endringstidspunkt).toLocaleDateString()
                        : ''}{' '}
                    av {arbeidsliste?.sistEndretAv?.veilederId}
                </i>
            </BodyShort>
            {onSlett && (
                <Button type="button" onClick={onSlett} variant="primary-neutral" size="xsmall" icon={<TrashIcon />}>
                    Slett
                </Button>
            )}
        </section>
    );
};
