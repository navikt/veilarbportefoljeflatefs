import * as React from 'react';
import {Innholdstittel, Element} from 'nav-frontend-typografi';
import './tilbakemelding-modal.less';
import {useState} from 'react';
import {Checkbox, Textarea} from 'nav-frontend-skjema';
import {Hovedknapp} from 'nav-frontend-knapper';
import classNames from "classnames";
import TilbakemeldingTakkModal from "./tilbakemelding-takk-modal";

export interface TilbakemeldingCheckboxProps {
    checkboxIndexListe: number[];
    kommentar: string;
}

interface TilbakemeldingModalProps {
    open: boolean;
    onTilbakemeldingCheckboxSendt: (tilbakemelding: TilbakemeldingCheckboxProps, checkboxStatusListe: any) => void;
}

export enum CheckboxVerdier {
    PARTNER_NAVN = 'Partner/ektefelles navn',
    PARTNER_ALDER = 'Partner/ektefelles alder',
    PARTNER_FODSELSDATO = 'Partner/ektefelles fødselsdato',
    PARTNER_FODSELSNUMMER = 'Partner/ektefelles fulle fødselsnummer',
    BARNETS_NAVN = 'Barnets navn',
    BARNETS_ALDER = 'Barnets alder',
    BARNETS_FODSELSDATO = 'Barnets fødselsdato',
    BARNETS_FODSELSNUMMER = 'Barnets fulle fødselsnummer',
    BARNETS_KJONN = 'Barnets kjønn'
}

function FamiliemedlemCheckboxValg({open, onTilbakemeldingCheckboxSendt}: TilbakemeldingModalProps) {
    const [kommentar, setKommentar] = useState('');
    const [harBlittVist, setHarBlittVist] = useState(false);
    const [harSendt, setHarSendt] = useState(false);
    const [checkboxIndexListe, setcheckboxIndexListe] = useState<number[]>([]);
    const [showFadeOutAnimation, setShowFadeOutAnimation] = useState(false);

    const KOMMENTAR_MAX_CHAR = 750;
    const KOMMENTAR_ROWS = 5;

    const ikkeVisIgjen = false;

    const checkboxStatus: any = {};

    function hentCheckboksStatusListe(value: number[]) {
        checkboxStatus.partner_navn = value.includes(1);
        checkboxStatus.partner_alder =  value.includes(2);
        checkboxStatus.partner_fodselsdato = value.includes(3);
        checkboxStatus.partner_fodselsnummer = value.includes(4);
        checkboxStatus.barnets_navn = value.includes(5);
        checkboxStatus.barnets_alder = value.includes(6);
        checkboxStatus.barnets_fodselsdato = value.includes(7);
        checkboxStatus.barnets_fodselsnummer = value.includes(8);
        checkboxStatus.barnets_kjonn = value.includes(9);

        return checkboxStatus;
    }

    const handleCheckboxFormSubmitted = e => {
        e.preventDefault();
        if ((checkboxIndexListe.length > 0) || (kommentar !== undefined && kommentar !== null && kommentar !== '')) {
            setHarSendt(true);
            onTilbakemeldingCheckboxSendt({checkboxIndexListe, kommentar}, hentCheckboksStatusListe(checkboxIndexListe));
        } else {
            setShowFadeOutAnimation(true);
        }
    };

    const handleCheckboxChanged = (verdi: number, el: any) => {
        if (el.target.checked) {
            checkboxIndexListe.push(verdi);
        } else {
            let index = checkboxIndexListe.indexOf(verdi);
            checkboxIndexListe.splice(index,1);
        }
        setcheckboxIndexListe([...checkboxIndexListe]);
    };

    const handleKommentarChanged = (value: string) => {
        if (value.length <= KOMMENTAR_MAX_CHAR) {
            setKommentar(value);
        }
    };

    if (open && !harBlittVist) {
        setHarBlittVist(true);
    }

    // Make sure that the animation will trigger when closing instead of returning null (no animation)
    if ((!open && !harBlittVist) || ikkeVisIgjen) {
        return null;
    }

    const CheckboxValg = () => {
        return (
            <>
                {
                    Object.keys(CheckboxVerdier).map((key, index) => {
                        return (
                            <Checkbox
                                checked={checkboxIndexListe.includes(index+1)}
                                label={CheckboxVerdier[key]}
                                value={CheckboxVerdier[key]}
                                key={index}
                                onChange={e => handleCheckboxChanged(index+1, e)}
                                className="tilbakemelding-modal__checkbox-element"
                            />
                        )
                    })
                }
            </>
        );
    };

    const renderCheckboxValg = () => {
        return (
            <div className={classNames({ 'tilbakemelding-modal__innhold-fade-out': showFadeOutAnimation })}>
                <Innholdstittel className="blokk-xxs tilbakemelding-modal__tittel">Hva trenger du å vite om brukerens familie?</Innholdstittel>
                <Element className="blokk-xxs">Vi skal alltid prøve å begrense mengden informasjon vi har om brukerne våre. Hvor mye informasjon om brukers familie trenger du minimum for oppfølging mot arbeid?</Element>
                <form
                    className="tilbakemelding-modal__ekspander"
                    onSubmit={handleCheckboxFormSubmitted}
                    data-widget="accessible-autocomplete"
                >
                    <CheckboxValg />
                    <div className="tilbakemelding-modal__kommentar">
                        <Textarea
                            className="tilbakemelding-modal__kommentar-felt"
                            label="Hva bruker du disse opplysningene til?"
                            rows={KOMMENTAR_ROWS}
                            maxLength={KOMMENTAR_MAX_CHAR}
                            value={kommentar}
                            onChange={(e) => handleKommentarChanged(e.target.value)}
                        />
                    </div>
                    <Hovedknapp role="submit" className="knapp--hoved">
                        Send
                    </Hovedknapp>
                </form>
            </div>
        );
    };

    return (
        <div
            className={classNames(
                'tilbakemelding-modal',
                {'tilbakemelding-modal--slide-in': open},
                {'tilbakemelding-modal--slide-out': !open}
            )}
        >
            <div
                className={classNames('tilbakemelding-modal__innhold', {
                    'tilbakemelding-modal__innhold--takk': harSendt
                })}
            >
                { harSendt ? <TilbakemeldingTakkModal /> : renderCheckboxValg() }
            </div>
        </div>
    );
}

export default FamiliemedlemCheckboxValg;
