import React, {PropsWithChildren} from 'react';
import {Normaltekst} from 'nav-frontend-typografi';
import {Input} from 'nav-frontend-skjema';
import {FiltervalgModell} from '../../../model-interfaces';
import ValgtVeiledergruppeListe from './valgt-veiledergruppe-liste';
import {useFocus} from '../../../hooks/use-focus';
import './modal.less';
import SokVeiledereVeiledergrupper from './søk-veiledere-veiledergrupper';

interface VeiledergruppeFormProps {
    filterValg: FiltervalgModell;
    hanterVeilederChange: (erValgt: boolean, veilederIdent: string) => void;
    gruppeNavn: string;
    setGruppeNavn: (nyttNavn: string) => void;
    modalTittel: string;
    onSubmit: (e) => void;
    errors: any;
}

function VeiledergruppeForm(props: PropsWithChildren<VeiledergruppeFormProps>) {
    const {focusRef} = useFocus();
    return (
        <form className="veiledergruppe-modal__form" onSubmit={props.onSubmit} data-testid="veiledergruppe_modal_form">
            <Input
                label={
                    <p className="veiledergruppe-modal__gruppenavntekst">
                        Gruppenavn: <i>(maks 35 tegn)</i>
                    </p>
                }
                value={props.gruppeNavn}
                bredde="XL"
                onChange={e => props.setGruppeNavn(e.target.value)}
                feil={props.errors.gruppeNavn}
                maxLength={35}
                inputRef={inputRef => (focusRef.current = inputRef)}
                data-testid="veiledergruppe_modal_gruppenavn-input"
            />
            <div className="veiledergruppe-modal__sokefilter">
                <SokVeiledereVeiledergrupper
                    erValgt={ident => (props.filterValg.veiledere ? props.filterValg.veiledere.includes(ident) : false)}
                    hanterVeilederValgt={props.hanterVeilederChange}
                />
            </div>
            <Normaltekst
                className="veiledergruppe-modal__tekst"
                data-testid={`veiledergruppe_modal_antall-valgte-veiledere_${props.filterValg.veiledere.length}`}
            >
                Veiledere i gruppen: <i> ({props.filterValg.veiledere.length} stk)</i>
            </Normaltekst>
            <ValgtVeiledergruppeListe
                valgteVeileder={props.filterValg.veiledere}
                fjernValgtVeileder={veilederTarget => props.hanterVeilederChange(false, veilederTarget)}
                feil={props.errors.filterValg}
            />
            {props.children}
        </form>
    );
}

export default VeiledergruppeForm;
