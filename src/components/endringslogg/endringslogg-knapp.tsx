import { default as React, useEffect, useState } from 'react';
import Ekspanderbartpanel, { EkspanderbartpanelBase, EkspanderbartpanelProps } from 'nav-frontend-ekspanderbartpanel';
import './endringslogg.less';
import { Innholdstittel, Element, Normaltekst, EtikettLiten } from 'nav-frontend-typografi';
import classNames from 'classnames/dedupe';

function EndringsloggInnhold(props) {
    let linkTag: any;
    if (props.url !== undefined) {
        if (props.linkTekst !== undefined) {
            linkTag = <><a href={props.url} target="_blank" >{props.linkTekst}</a><i> (Åpnes i ny fane)</i></>
        } else {
            linkTag = <><a href={props.url} target="_blank" >{props.url}</a><i> (Åpnes i ny fane)</i></>
        }
    }
        return (
            <div className="endringslogg-rad">
                <div className="endringslogg-skille">
                    <div className={classNames({'endringslogg-info-ingen-notifikasjoner endringslogg-kolonne ': !props.nyeNotifikasjoner,
                            'endringslogg-info-nye-notifikasjoner endringslogg-kolonne endringslogg-info-kolonne ': props.nyeNotifikasjoner})}/>
                    <div className="endringslogg-innhold endringslogg-kolonne">
                        <EtikettLiten>{props.dato}</EtikettLiten>
                        <div className="endringslogg-indent">
                        <Element> {props.innholdsOverskrift} </Element>
                        <Normaltekst> {props.innholdTekst} </Normaltekst>

                        {linkTag}
                        </div>
                    </div>
                </div>
            </div>
        );
}

function getDatoStreng(dato: Date){
    let dd = String(dato.getDate()).padStart(2, '0');
    let mm = "jul"; // TODO: Endre dette til å ikke være hardkodet
    let yyyy = dato.getFullYear();
    return `${dd}. ${mm}. ${yyyy}`;
}

export function EndringsloggKnapp(props) {
    const versjonsnummer = '0.1.6';
    const [nyeNotifikasjoner, setNyeNotifikasjoner] = useState(!harSettEndringsinlegg(versjonsnummer));
    const [open, setOpen] = useState(false);
    const datoStreng = getDatoStreng(new Date());
    let navURL = 'https://design.nav.no';
    let navURLTeskt = 'Teknisk Informasjon';

    return (
        <>
        <button className="endringslogg-dropDown endringslogg-container">
            Oppdateringer
        </button>
        <div className={"collapse-container"}>
        <div className={"collapse-header"}>Oppdateringer</div>
            <EndringsloggInnhold style={{backgroundColor: "black"}}dato={datoStreng}
                                 innholdsOverskrift="NY ENDRING!"
                                 innholdTekst="Dette er en test på hvordan innhold kan se ut! Det er flere nye endringer og det kommer mange flere om ikke så lenge."
                                 nyeNotifikasjoner={nyeNotifikasjoner}
            />
        </div>
        </>
            /*<EkspanderbartpanelBase onClick={() => {
                if(open){
                    handleSettEndring(versjonsnummer);
                    setNyeNotifikasjoner(false);
                }
                setOpen(!open);
            }} heading={<><div className={classNames({'endringslogg-info-ingen-notifikasjoner': !nyeNotifikasjoner,
                'endringslogg-info-nye-notifikasjoner': nyeNotifikasjoner})}/><div className="endringslogg-title">Oppdateringer</div></>}>
                <EndringsloggInnhold dato={datoStreng}
                                     innholdsOverskrift="NY ENDRING!"
                                     innholdTekst="Dette er en test på hvordan innhold kan se ut! Det er flere nye endringer og det kommer mange flere om ikke så lenge."
                                     nyeNotifikasjoner={nyeNotifikasjoner}
                />
                <EndringsloggInnhold dato={datoStreng}
                                     innholdsOverskrift="Min-CV er nå printbar"
                                     innholdTekst="Dette er en test på hvordan innhold kan se ut! Det er flere nye endringer og det kommer mange flere om ikke så lenge."
                                     nyeNotifikasjoner={nyeNotifikasjoner}
                />
                <EndringsloggInnhold
                    dato={datoStreng}
                    innholdsOverskrift="Coachmarks er lansert!"
                    innholdTekst="Dette er en test på hvordan innhold kan se ut! Det er flere nye endringer og det kommer
                    mange flere om ikke så lenge."
                    nyeNotifikasjoner={false}
                    url={navURL}
                    linkTekst={navURLTeskt}
                />

                <EndringsloggInnhold
                    dato={datoStreng}
                    innholdsOverskrift="Nytt filter på 'har sykepenger'"
                    innholdTekst="Dette er en test på hvordan innhold kan se ut! Det er flere nye endringer og det kommer
                    mange flere om ikke så lenge."
                    nyeNotifikasjoner={false}
                    url={navURL}
               />
            </EkspanderbartpanelBase>*/
    );
}

const ENDRING_PREFIX = 'Endringslogg';
function harSettEndringsinlegg(versjon: string) {
    const senesteVersjonSett = window.localStorage.getItem(ENDRING_PREFIX);
    return senesteVersjonSett != null && senesteVersjonSett === versjon;
}

function handleSettEndring(versjon) {
    window.localStorage.setItem(ENDRING_PREFIX, versjon);
}
