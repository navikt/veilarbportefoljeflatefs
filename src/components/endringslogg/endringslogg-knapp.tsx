import { default as React, useState } from 'react';
import Ekspanderbartpanel, { EkspanderbartpanelBase, EkspanderbartpanelProps } from 'nav-frontend-ekspanderbartpanel';
import './endringslogg.less';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { UnmountClosed, Collapse, CollapseProps } from 'react-collapse';
import { ToggleKnapp } from 'nav-frontend-toggle';
import classNames from 'classnames/dedupe';

function EndringsloggInnhold(props) {
    return (
        <div>
            <b><i>{props.dato}</i></b>
            <h4>{props.innholdsOverskrift}</h4>
            <div className="text">
            {props.innholdTekst}
            </div>
        </div>
    );
}

export function EndringsloggKnapp(props) {
    const [nyeNotifikasjoner, setNyeNotifikasjoner] = useState(false);
    const [open, setOpen] = useState(false);
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = "jul";
    let yyyy = today.getFullYear();
    let todayString = `${dd}. ${mm}. ${yyyy}`;
    return (
        <div className="endringslogg-dropDown endringslogg-container">
            <EkspanderbartpanelBase heading={<div className={classNames({'endringslogg-info-ingen-notifikasjoner': !nyeNotifikasjoner,
                'endringslogg-info-nye-notifikasjoner': nyeNotifikasjoner})}/>}>
                <EndringsloggInnhold dato={todayString}
                                     innholdsOverskrift="NY ENDRING!"
                                     innholdTekst="Dette er en test på hvordan innhold kan se ut! Det er flere nye endringer og det kommer mange flere om ikke så lenge."
                />
                <EndringsloggInnhold dato={todayString}
                                     innholdsOverskrift="Min-CV er nå printbar"
                                     innholdTekst="Dette er en test på hvordan innhold kan se ut! Det er flere nye endringer og det kommer mange flere om ikke så lenge."
                />
                <EndringsloggInnhold
                    dato={todayString}
                    innholdsOverskrift="Coachmarks er lansert!"
                    innholdTekst="Dette er en test på hvordan innhold kan se ut! Det er flere nye endringer og det kommer
                    mange flere om ikke så lenge."
                />

                <EndringsloggInnhold
                    dato={todayString}
                    innholdsOverskrift="Nytt filter på 'har sykepenger'"
                    innholdTekst="Dette er en test på hvordan innhold kan se ut! Det er flere nye endringer og det kommer
                    mange flere om ikke så lenge."
               />
            </EkspanderbartpanelBase>
        </div>
    );
}

const ENDRING_PREFIX = 'Endringslogg';
function harSettEndringsinlegg(id: string) {
    return window.localStorage.getItem(id) != null;
}

function handleSettEndring(id) {
    window.localStorage.setItem(id, 'true');
}
