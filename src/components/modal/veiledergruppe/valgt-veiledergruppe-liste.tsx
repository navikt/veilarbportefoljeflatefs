import {useSelector} from 'react-redux';
import {AppState} from '../../../reducer';
import {Normaltekst} from 'nav-frontend-typografi';
import {Flatknapp} from 'nav-frontend-knapper';
import {ReactComponent as SlettIkon} from './remove-circle.svg';
import React from 'react';
import classNames from 'classnames';
import './modal.less';
import {SkjemaelementFeilmelding} from 'nav-frontend-skjema';

interface ValgtVeiledergruppeListeProps {
    valgteVeileder: string[];
    fjernValgtVeileder: (veilederId: string) => void;
    feil?: string;
}

function ValgtVeiledergruppeListe(props: ValgtVeiledergruppeListeProps) {
    const veilederePaEnheten = useSelector((state: AppState) => state.veiledere.data.veilederListe);
    const veiledere = veilederePaEnheten
        .filter(veilederPaEnhet => props.valgteVeileder.includes(veilederPaEnhet.ident))
        .sort((veileder1, veiledere2) => veileder1.etternavn.localeCompare(veiledere2.etternavn));

    const splitArrayITo = [
        veiledere.slice(0, Math.ceil(veiledere.length / 2)),
        veiledere.slice(Math.ceil(veiledere.length / 2), veiledere.length)
    ];

    return (
        <>
            <div
                className={classNames('veiledergruppe-modal__valgteveileder', {
                    'skjemaelement__input--harFeil': props.feil
                })}
                data-testid="veiledergruppe_modal_valgte-veiledere_wrapper"
            >
                {veiledere.length === 0 ? (
                    <Normaltekst className="veiledergruppe-modal__valgteveileder__tom-liste-tekst">
                        Ingen veiledere lagt til i gruppen
                    </Normaltekst>
                ) : (
                    splitArrayITo.map((listeMedVeileder, index) => (
                        <div key={index}>
                            {listeMedVeileder.map(veileder => (
                                <div key={veileder.ident} className="veiledergruppe-modal__valgteveileder__elem">
                                    <span>{`${veileder.etternavn}, ${veileder.fornavn}`}</span>
                                    <Flatknapp
                                        className="fjern--knapp"
                                        htmlType="button"
                                        onClick={() => props.fjernValgtVeileder(veileder.ident)}
                                        data-testid="veiledergruppe_modal_valgt-veileder_fjern-knapp"
                                    >
                                        <SlettIkon />
                                    </Flatknapp>
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
            <SkjemaelementFeilmelding>{props.feil}</SkjemaelementFeilmelding>
        </>
    );
}

export default ValgtVeiledergruppeListe;
