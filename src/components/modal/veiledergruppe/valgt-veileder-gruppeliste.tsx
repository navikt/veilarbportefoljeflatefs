import { useSelector } from 'react-redux';
import { AppState } from '../../../reducer';
import { Normaltekst } from 'nav-frontend-typografi';
import { Flatknapp } from 'nav-frontend-knapper';
import { ReactComponent as SlettIkon } from './remove-circle.svg';
import React from 'react';
import {SkjemaGruppe} from "nav-frontend-skjema";

interface ValgtVeilederGruppeListeProps {
    valgteVeileder: string[],
    fjernValgtVeileder: (veilederId: string) => void;
}

function ValgtVeilederGruppeListe(props: ValgtVeilederGruppeListeProps) {
    const veilederePaEnheten = useSelector((state: AppState) => state.veiledere.data.veilederListe);

    const veiledere = veilederePaEnheten
        .filter(veilederPaEnhet =>
            props.valgteVeileder.includes(veilederPaEnhet.ident))
        .sort((veileder1, veiledere2) => veileder1.etternavn.localeCompare(veiledere2.etternavn));

    const splitArrayITo = [veiledere.slice(0, Math.ceil(veiledere.length / 2)), veiledere.slice(Math.ceil(veiledere.length / 2), veiledere.length)];

    if (veiledere.length === 0) {
        return (
            <SkjemaGruppe className="veiledergruppe-modal__valgteveileder">
                <Normaltekst className="veiledergruppe-modal__valgteveileder__tom-liste-tekst">
                    Ingen veiledere lagt til i gruppen
                </Normaltekst>
            </SkjemaGruppe>
        );
    }

    return (
        <div className="veiledergruppe-modal__valgteveileder">
            {splitArrayITo.map(listeMedVeileder =>
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
    );
}

export default ValgtVeilederGruppeListe;
