import classNames from 'classnames/dedupe';
import { EtikettLiten, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { default as React } from 'react';
import { ReactComponent as LinkIcon } from './external-link.svg';
import Lenke from 'nav-frontend-lenker';

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
    if (!props.url) {
        return null;
    }

    return (
        <Lenke className="endringslogg-link" target="_blank" href={props.url}>
            {props.linkTekst ? props.linkTekst : props.url}
            <LinkIcon/>
        </Lenke>

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
                <Undertittel tag="h3"> {props.innholdsOverskrift} </Undertittel>
                <Normaltekst> {props.innholdsTekst} </Normaltekst>
                <LinkTag url={props.url} linkTekst={props.linkTekst}/>
            </div>
        </div>
    );
}
