import * as React from 'react';
import {EndringsloggData} from './endringslogg-groq1';
import {Normaltekst, Undertekst, Undertittel} from 'nav-frontend-typografi';
import classNames from 'classnames/dedupe';
import Lenke from 'nav-frontend-lenker';
import {ReactComponent as LinkIcon} from '../external-link.svg';

function EndringsloggPreview(props: {post: EndringsloggData}) {
    return (
        <div className="endringslogg-rad endringslogg-skille">
            <div className="endringslogg-datolinje">
                <div className={classNames('endringslogg-info-kolonne', 'endringslogg-info-nye-notifikasjoner ')} />
                <Undertekst>{props.post.date}</Undertekst>
            </div>
            <div className="endringslogg-innhold endringslogg-kolonne">
                <Undertittel> {props.post.title} </Undertittel>
                <Normaltekst> {props.post.body} </Normaltekst>
                {props.post.link && (
                    <Lenke className={classNames('endringslogg-link')} target="_blank" href={props.post.link}>
                        {props.post.link}
                        <LinkIcon className="linkikon" />
                    </Lenke>
                )}
            </div>
        </div>
    );
}

export default EndringsloggPreview;
