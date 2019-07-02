import { default as React, useState } from 'react';
import Ekspanderbartpanel, { EkspanderbartpanelProps } from 'nav-frontend-ekspanderbartpanel';
import './endringslogg.less';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { UnmountClosed, Collapse, CollapseProps } from 'react-collapse';
import NavFrontendChevron from 'nav-frontend-chevron';

function EndringsloggInnhold(props) {
    const [open, setOpen] = useState(false);
    return (
        <>
        <div className="endringslogg-innhold">
            <label className="label" style={{marginRight: '1em'}}>
                <input className="input"
                       type="checkbox"
                       checked={open}
                       onChange={({target: {checked}}) => setOpen(checked)} />
            </label>
            <h4>{props.innholdsOverskrift}</h4>
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
    const [open, setOpen] = useState(false);
    return (
        <div className="endringslogg-dropDown endringslogg-container">
            <div className="endringslogg-info">
            </div>
            <Ekspanderbartpanel tittel="Oppdateringer" tittelProps="normaltekst" border>
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
            </Ekspanderbartpanel>
        </div>
    );
}
