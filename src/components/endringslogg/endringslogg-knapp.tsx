import { default as React, useState } from 'react';
import Ekspanderbartpanel, { EkspanderbartpanelBase, EkspanderbartpanelProps } from 'nav-frontend-ekspanderbartpanel';
import './endringslogg.less';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { UnmountClosed, Collapse, CollapseProps } from 'react-collapse';
import { ToggleKnapp } from 'nav-frontend-toggle';
import classNames from 'classnames/dedupe';

function EndringsloggInnhold(props) {
    const [open, setOpen] = useState(false);
    return (
        <>
        <div className="endringslogg-innhold">
            {/*<label className="label" style={{marginRight: '1em'}}>
                <input className="input"
                       type="checkbox"
                       checked={open}
                       onChange={({target: {checked}}) => setOpen(checked)} />
            </label>
            <h4 onClick={()=>setOpen(!open)}>{props.innholdsOverskrift}</h4>*/}
            <ToggleKnapp kompakt={true} onClick={(pressed) => setOpen(!open)}>{props.innholdsOverskrift}</ToggleKnapp>
        </div>
        <Collapse isOpened={open}>
            <div className="text">
            {props.children}
            </div>
        </Collapse>
        </>
    );
}

export function EndringsloggKnapp(props) {
    const [nyeNotifikasjoner, setNyeNotifikasjoner] = useState(false);
    return (
        <div className="endringslogg-dropDown endringslogg-container">
            <EkspanderbartpanelBase heading={<div className={classNames({'endringslogg-info-ingen-notifikasjoner': !nyeNotifikasjoner,
                                                                         'endringslogg-info-nye-notifikasjoner': nyeNotifikasjoner})}/>}>
               <EndringsloggInnhold innholdsOverskrift="NY ENDRING!">
                       Dette er en test på hvordan innhold kan se ut! Det er flere nye endringer og det kommer
                       mange flere om ikke så lenge.
               </EndringsloggInnhold>
                <EndringsloggInnhold innholdsOverskrift="Min-CV er nå printbar">
                    Dette er en test på hvordan innhold kan se ut! Det er flere nye endringer og det kommer
                    mange flere om ikke så lenge.
                </EndringsloggInnhold>
                <EndringsloggInnhold innholdsOverskrift="Coachmarks er lansert!">
                    Dette er en test på hvordan innhold kan se ut! Det er flere nye endringer og det kommer
                    mange flere om ikke så lenge.
                </EndringsloggInnhold>
                <EndringsloggInnhold innholdsOverskrift="Nytt filter på 'har sykepenger'">
                    Dette er en test på hvordan innhold kan se ut! Det er flere nye endringer og det kommer
                    mange flere om ikke så lenge.
                </EndringsloggInnhold>
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
