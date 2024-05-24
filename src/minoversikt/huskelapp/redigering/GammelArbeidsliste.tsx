import React from 'react';
import {BodyLong, BodyShort, Button, Heading, List} from '@navikt/ds-react';
import {TrashIcon} from '@navikt/aksel-icons';
import {ArbeidslisteModell} from '../../../model-interfaces';
import {toDatePrettyPrint} from '../../../utils/dato-utils';

interface Props {
    arbeidsliste: ArbeidslisteModell;
    onSlett?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const GammelArbeidsliste = ({arbeidsliste, onSlett}: Props) => (
    <section className="gammel-arbeidsliste">
        <Heading size="small" level="2">
            Gammel arbeidsliste
        </Heading>
        <List size="small">
            <List.Item>Kopier det du vil ha med fra gammel arbeidsliste, og legg i ny huskelapp.</List.Item>
            <List.Item>
                Gammel arbeidsliste slettes automatisk når du lagrer ny huskelapp, fargekategori beholdes.
            </List.Item>
        </List>
        <div className="gammel-arbeidsliste-innhold">
            <Heading level="3" size="xsmall">
                {arbeidsliste?.overskrift ? arbeidsliste?.overskrift : 'Arbeidsliste uten tittel'}
            </Heading>
            <BodyLong size="small" spacing={true}>
                {arbeidsliste?.kommentar}
            </BodyLong>
            <BodyShort size="small" spacing={true}>
                <i>Arbeidslistefrist: {arbeidsliste.frist ? toDatePrettyPrint(arbeidsliste.frist) : 'Ingen frist'}</i>
            </BodyShort>
        </div>
        <BodyShort size="small">
            <i>
                Oppdatert {arbeidsliste.endringstidspunkt ? toDatePrettyPrint(arbeidsliste.endringstidspunkt) : ''} av{' '}
                {arbeidsliste.sistEndretAv?.veilederId}
            </i>
        </BodyShort>
        {onSlett && (
            <Button
                type="button"
                onClick={onSlett}
                variant="tertiary"
                size="xsmall"
                icon={<TrashIcon aria-hidden={true} />}
            >
                Slett
            </Button>
        )}
    </section>
);
