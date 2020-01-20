import { useSelector } from 'react-redux';
import { AppState } from '../../../reducer';
import { Normaltekst } from 'nav-frontend-typografi';
import { Flatknapp } from 'nav-frontend-knapper';
import { ReactComponent as SlettIkon } from './remove-circle.svg';
import React from 'react';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import classNames from 'classnames';
import './modal.less';

interface ValgtVeilederGruppeListeProps {
    valgteVeileder: string[],
    fjernValgtVeileder: (veilederId: string) => void;
    feil?: SkjemaelementFeil;
}

function ValgtVeilederGruppeListe(props: ValgtVeilederGruppeListeProps) {
    const veilederePaEnheten = useSelector((state: AppState) => state.veiledere.data.veilederListe);
    const veiledere = veilederePaEnheten
        .filter(veilederPaEnhet =>
            props.valgteVeileder.includes(veilederPaEnhet.ident))
        .sort((veileder1, veiledere2) => veileder1.etternavn.localeCompare(veiledere2.etternavn));

    const splitArrayITo = [veiledere.slice(0, Math.ceil(veiledere.length / 2)), veiledere.slice(Math.ceil(veiledere.length / 2), veiledere.length)];

    return (
        <>
            <div className={classNames({'skjemaelement__input--harFeil': props.feil})}>
                <div className="veiledergruppe-modal__valgteveileder">
                    {veiledere.length === 0 ?
                        (<Normaltekst className="veiledergruppe-modal__valgteveileder__tom-liste-tekst">
                            Ingen veiledere lagt til i gruppen
                        </Normaltekst>)
                        :
                        splitArrayITo.map(listeMedVeileder =>
                            <div>
                                {listeMedVeileder.map(veileder =>
                                    <div className="veiledergruppe-modal__valgteveileder__elem">
                                        <span>{`${veileder.etternavn}, ${veileder.fornavn}`}</span>
                                        <Flatknapp
                                            className="fjern--knapp"
                                            htmlType="button"
                                            onClick={() => props.fjernValgtVeileder(veileder.ident)}>
                                            <SlettIkon/>
                                        </Flatknapp>
                                    </div>
                                )}
                            </div>
                        )}
                </div>
            </div>
            {props.feil && <div className='skjemaelement__feilmelding'>
                {props.feil.feilmelding}
            </div>}
        </>
    );
}

export default ValgtVeilederGruppeListe;
