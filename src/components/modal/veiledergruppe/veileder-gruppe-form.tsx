import React, { PropsWithChildren } from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import SokVeiledere from '../../sok-veiledere/sok-veiledere';
import { FiltervalgModell } from '../../../model-interfaces';
import ValgtVeilederGruppeListe from './valgt-veileder-gruppeliste';

interface VeilederGruppeForm {
    filterValg: FiltervalgModell;
    hanterVeilederChange: (erValgt: boolean, veilederIdent: string) => void;
    gruppeNavn: string;
    setGruppeNavn: (nyttNavn: string) => void;
    modalTittel: string;
    onSubmit: (e) => void;
    errors: any;
}

function VeilederGruppeForm(props: PropsWithChildren<VeilederGruppeForm>) {
    return (
        <form className="veiledergruppe-modal__form" onSubmit={props.onSubmit}>
            <Innholdstittel tag="h1" className="blokk-xs">
                {props.modalTittel}
            </Innholdstittel>
            <div className="veiledergruppe-modal__content">
                <Input
                    label={<p className="veiledergruppe-modal__gruppenavntekst">Gruppenavn: <i>(maks 35 tegn)</i></p>}
                    value={props.gruppeNavn}
                    bredde="XL"
                    onChange={e => props.setGruppeNavn(e.target.value)}
                    feil={props.errors.gruppeNavn && {feilmelding: props.errors.gruppeNavn}}
                    maxLength={35}
                />
                <div className="veiledergruppe-modal__sokefilter">
                    <SokVeiledere
                        erValgt={(ident) => props.filterValg.veiledere ? props.filterValg.veiledere.includes(ident) : false}
                        hanterVeilederValgt={props.hanterVeilederChange}
                    />
                </div>
                <Normaltekst className="veiledergruppe-modal__tekst">
                    Veiledere i gruppen:
                </Normaltekst>
                <ValgtVeilederGruppeListe
                    // @ts-ignore
                    valgteVeileder={props.filterValg.veiledere}
                    fjernValgtVeileder={(veilederTarget) => props.hanterVeilederChange(false, veilederTarget)}
                    feil={props.errors.filterValg && {feilmelding: props.errors.filterValg}}
                />
            </div>
            {props.children}
        </form>
    );
}

export default VeilederGruppeForm;
