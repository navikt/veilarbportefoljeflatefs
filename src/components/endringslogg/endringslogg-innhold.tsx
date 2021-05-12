import classNames from 'classnames/dedupe';
import {EtikettLiten, Normaltekst, Undertittel} from 'nav-frontend-typografi';
import {default as React} from 'react';
import {ReactComponent as LinkIcon} from './external-link.svg';
import Lenke from 'nav-frontend-lenker';
import {EndringsloggInnleggMedSettStatus} from './utils/endringslogg-custom';
import './endringslogg.less';
import './collapse-container-transition.less';

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
        <Lenke className={classNames('endringslogg-link', props.className)} target="_blank" href={props.url}>
            {props.linkTekst ? props.linkTekst : props.url}
            <LinkIcon className="linkikon" />
        </Lenke>
    );
}

export default function EndringsloggInnhold(props: EndringsloggInnholdProps) {
    const content = props.innleggsListe.map((endring, index) => {
        return (
            endring.erEndringsloggFeaturePa && (
                <EndringsloggInnlegg
                    key={index}
                    dato={endring.dato}
                    innholdsTekst={endring.tekst}
                    innholdsOverskrift={endring.tittel}
                    nyeNotifikasjoner={!endring.sett}
                    children={endring.children}
                />
            )
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
                <EtikettLiten>{props.dato}</EtikettLiten>
            </div>
            <div className="endringslogg-innhold endringslogg-kolonne">
                <Undertittel> {props.innholdsOverskrift} </Undertittel>
                {props.innholdsTekst && <Normaltekst> {props.innholdsTekst} </Normaltekst>}
                {props.children}
            </div>
        </div>
    );
}
