import React, { PropsWithChildren } from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import SokVeiledere from '../../sok-veiledere/sok-veiledere';
import { FiltervalgModell } from '../../../model-interfaces';
import { useSelector } from 'react-redux';
import { AppState } from '../../../reducer';
import { Flatknapp } from 'nav-frontend-knapper';
import { ReactComponent as SlettIkon } from './remove-circle.svg';

interface VeilederGruppeForm {
    filterValg: FiltervalgModell;
    hanterVeilederChange: (erValgt: boolean, veilederIdent: string) => void;
    gruppeNavn: string;
    setGruppeNavn: (nyttNavn: string) => void;
    modalTittel: string;
    onSubmit: (e) => void;
    errors: any;
}

export function VeilederGruppeForm(props: PropsWithChildren<VeilederGruppeForm>) {
    return (
        <form className="veiledergruppe-modal__form" onSubmit={props.onSubmit}>
            <Innholdstittel tag="h1" className="blokk-xs">
                {props.modalTittel}
            </Innholdstittel>
            <div className="veiledergruppe-modal__content">
                <Input
                    label="Gruppenavn:"
                    value={props.gruppeNavn}
                    bredde="L"
                    onChange={e => props.setGruppeNavn(e.target.value)}
                    feil={props.errors.gruppeNavn ? {feilmelding: props.errors.gruppeNavn} : undefined}
                    maxLength={35}
                />
                <div className="veiledergruppe-modal__sokefilter">
                    <SokVeiledere
                        erValgt={(ident) => props.filterValg.veiledere ? props.filterValg.veiledere.includes(ident) : false}
                        hanterVeilederValgt={props.hanterVeilederChange}
                    />
                </div>
                <Normaltekst>
                    Valgte veiledere:
                </Normaltekst>
                <ValgtVeilederGruppeListe
                    // @ts-ignore
                    valgteVeileder={props.filterValg.veiledere}
                    fjernValgtVeileder={(veilederTarget) => props.hanterVeilederChange(false, veilederTarget)}
                />
            </div>
            {props.children}
        </form>
    );
}

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
            <div className="veiledergruppe-modal__valgteveileder">
                <Normaltekst className="veiledergruppe-modal__valgteveileder__tom-liste-tekst">
                    Ingen veiledere lagt til i gruppen
                </Normaltekst>
            </div>
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
