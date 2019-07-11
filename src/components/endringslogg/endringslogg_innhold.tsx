import classNames from 'classnames/dedupe';
import { EtikettLiten, Normaltekst,Undertittel } from 'nav-frontend-typografi';
import { default as React } from 'react';
import { ReactComponent as LinkIcon } from './external_link.svg';

interface EndringsloggInnholdProps extends LinkInnholdProps {
    dato: string;
    innholdsTekst: string;
    innholdsOverskrift: string;
    nyeNotifikasjoner: boolean;
}

interface LinkInnholdProps {
    url?: string;
    linkTekst?: string;
}

function LinkTag(props: LinkInnholdProps) {
    return (
        props.url ? (
                <a className="endringslogg-link" href={props.url} target="_blank">
                    {props.linkTekst ? props.linkTekst : props.url}
                    <LinkIcon/>
                </a>
            )
            : null
    );
}

export default function EndringsloggInnhold(props: EndringsloggInnholdProps) {
    return (
        <div className="endringslogg-rad endringslogg-skille">
            <div className="endringslogg-datolinje">
                <div role={props.nyeNotifikasjoner ? 'alert' : ''}
                     aria-label={props.nyeNotifikasjoner ? 'Nye endringer i Arbeidsrettet oppfølging' : ''}
                     className={classNames('endringslogg-info-kolonne', {
                    'endringslogg-info-nye-notifikasjoner ': props.nyeNotifikasjoner
                })}/>
                <EtikettLiten>{props.dato}</EtikettLiten>
            </div>
            <div className="endringslogg-innhold endringslogg-kolonne">
                <Undertittel tag="h4" > {props.innholdsOverskrift} </Undertittel>
                <Normaltekst> {props.innholdsTekst} </Normaltekst>
                <LinkTag url={props.url} linkTekst={props.linkTekst}/>
            </div>
        </div>
    );
}
