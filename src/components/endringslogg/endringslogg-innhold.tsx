import classNames from 'classnames/dedupe';
import {default as React} from 'react';
import {EndringsloggInnleggMedSettStatus} from './utils/endringslogg-custom';
import './endringslogg.less';
import './collapse-container-transition.less';
import {BodyShort, Detail, Heading, Link} from '@navikt/ds-react';
import {ExternalLink} from '@navikt/ds-icons';

interface EndringsloggInnleggProps {
    dato: string;
    innholdsTekst?: string;
    innholdsOverskrift: string;
    nyeNotifikasjoner: boolean;
    children: React.ReactNode;
}

interface EndringsloggInnholdProps {
    innleggsListe: EndringsloggInnleggMedSettStatus[];
}

export function EndringsloggLinkMedIkon(props: {linkTekst: string; url: string; className?: string}) {
    return (
        <Link className={classNames('endringslogg-link', props.className)} target="_blank" href={props.url}>
            <BodyShort size="small">{props.linkTekst ? props.linkTekst : props.url}</BodyShort>
            <ExternalLink className="linkikon" />
        </Link>
    );
}

export default function EndringsloggInnhold(props: EndringsloggInnholdProps) {
    const content = props.innleggsListe.map((endring, index) => {
        return (
            <EndringsloggInnlegg
                key={index}
                dato={endring.dato}
                innholdsTekst={endring.tekst}
                innholdsOverskrift={endring.tittel}
                nyeNotifikasjoner={!endring.sett}
                children={endring.children}
            />
        );
    });

    return <>{content}</>;
}

function EndringsloggInnlegg(props: EndringsloggInnleggProps) {
    return (
        <div className="endringslogg-rad endringslogg-skille">
            <div className="endringslogg-datolinje">
                <div
                    role={props.nyeNotifikasjoner ? 'alert' : ''}
                    aria-label={props.nyeNotifikasjoner ? 'Nye endringer i Arbeidsrettet oppfølging' : ''}
                    className={classNames('endringslogg-info-kolonne', {
                        'endringslogg-info-nye-notifikasjoner ': props.nyeNotifikasjoner
                    })}
                />
                <Detail size="small">{props.dato}</Detail>
            </div>
            <div className="endringslogg-innhold endringslogg-kolonne">
                <Heading size="small" level="2">
                    {props.innholdsOverskrift}
                </Heading>
                {props.innholdsTekst && <BodyShort size="small"> {props.innholdsTekst} </BodyShort>}
                {props.children}
            </div>
        </div>
    );
}
