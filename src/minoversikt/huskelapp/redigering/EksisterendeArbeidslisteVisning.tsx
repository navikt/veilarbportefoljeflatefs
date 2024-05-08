import React from 'react';
import {Alert, BodyLong, BodyShort, Button, Heading} from '@navikt/ds-react';
import {ArbeidslisteModell} from '../../../model-interfaces';
import {TrashIcon} from '@navikt/aksel-icons';
import {toDatePrettyPrint} from '../../../utils/dato-utils';

interface Props {
    arbeidsliste: ArbeidslisteModell;
    onSlett?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const EksisterendeArbeidslisteVisning = ({arbeidsliste, onSlett}: Props) => (
    <section className="eksisterende-arbeidslistevisning">
        <Heading size="small" level="1" className="blokk-xxs">
            Eksisterende arbeidslisteinnhold
        </Heading>
        <Alert variant="info" size="small" className="blokk-xxs">
            Når du <b>lagrer</b> huskelapp første gang vil eksisterende arbeidslisteinnhold på denne personen automatisk
            slettes. Alt eksisterende arbeidslisteinnhold blir slettet <b>{'< en dato for sletting >'}</b>
        </Alert>
        <BodyShort size="small" as="h2" className="blokk-xxs">
            <b>{arbeidsliste?.overskrift}</b>
        </BodyShort>
        <BodyShort size="small" className="blokk-xxs">
            <i>Arbeidsliste frist: {arbeidsliste.frist ? toDatePrettyPrint(arbeidsliste.frist) : 'Ingen frist'}</i>
        </BodyShort>
        <BodyLong size="small" className="navds-body-short blokk-xxs">
            {arbeidsliste?.kommentar}
        </BodyLong>
        <BodyShort size="small" className="blokk-xxs">
            <i>
                Oppdatert {arbeidsliste.endringstidspunkt ? toDatePrettyPrint(arbeidsliste.endringstidspunkt) : ''} av{' '}
                {arbeidsliste.sistEndretAv?.veilederId}
            </i>
        </BodyShort>
        {onSlett && (
            <Button type="button" onClick={onSlett} variant="tertiary" size="xsmall" icon={<TrashIcon />}>
                Slett
            </Button>
        )}
    </section>
);
