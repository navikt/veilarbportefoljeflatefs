import React, {PropsWithChildren} from 'react';
import {FiltervalgModell} from '../../../model-interfaces';
import ValgtVeiledergruppeListe from './valgt-veiledergruppe-liste';
import './veiledergruppe-modal.css';
import SokVeiledereVeiledergrupper from './søk-veiledere-veiledergrupper';
import {BodyShort, TextField} from '@navikt/ds-react';

interface VeiledergruppeFormProps {
    filterValg: FiltervalgModell;
    hanterVeilederChange: (veilederIdent: string[]) => void;
    gruppeNavn: string;
    setGruppeNavn: (nyttNavn: string) => void;
    modalTittel: string;
    onSubmit: (e) => void;
    errors: any;
}

function VeiledergruppeForm(props: PropsWithChildren<VeiledergruppeFormProps>) {
    return (
        <form className="veiledergruppe-modal__form" onSubmit={props.onSubmit} data-testid="veiledergruppe_modal_form">
            <TextField
                label={
                    <span className="veiledergruppe-modal__gruppenavntekst">
                        Gruppenavn: <i>(maks 35 tegn)</i>
                    </span>
                }
                value={props.gruppeNavn}
                onChange={e => props.setGruppeNavn(e.target.value)}
                error={props.errors.gruppeNavn}
                maxLength={35}
                data-testid="veiledergruppe_modal_gruppenavn-input"
            />
            <div className="veiledergruppe-modal__sokefilter">
                <SokVeiledereVeiledergrupper
                    handterVeiledereValgt={props.hanterVeilederChange}
                    valgteVeiledere={props.filterValg.veiledere}
                />
            </div>
            <BodyShort
                size="small"
                className="veiledergruppe-modal__tekst"
                data-testid={`veiledergruppe_modal_antall-valgte-veiledere_${props.filterValg.veiledere.length}`}
            >
                <strong>
                    Veiledere i gruppen: <i> ({props.filterValg.veiledere.length} stk)</i>
                </strong>
            </BodyShort>
            <ValgtVeiledergruppeListe
                valgteVeileder={props.filterValg.veiledere}
                fjernValgtVeileder={veilederTarget =>
                    props.hanterVeilederChange(
                        props.filterValg.veiledere.filter(veileder => veileder !== veilederTarget)
                    )
                }
                feil={props.errors.filterValg}
            />
            {props.children}
        </form>
    );
}

export default VeiledergruppeForm;
