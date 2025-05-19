import {PropsWithChildren} from 'react';
import {BodyShort, TextField} from '@navikt/ds-react';
import {FiltervalgModell} from '../../../typer/filtervalg-modell';
import {ValgtVeiledergruppeListe} from './valgt-veiledergruppe-liste';
import {SokVeiledereVeiledergrupper} from './søk-veiledere-veiledergrupper';
import './veiledergruppe-modal.css';

interface VeiledergruppeFormProps {
    filterValg: FiltervalgModell;
    handterVeilederChange: (veilederIdent: string[]) => void;
    gruppeNavn: string;
    setGruppeNavn: (nyttNavn: string) => void;
    onSubmit: (e) => void;
    errors: any;
}

export function VeiledergruppeForm({
    filterValg,
    handterVeilederChange,
    gruppeNavn,
    setGruppeNavn,
    onSubmit,
    errors,
    children
}: PropsWithChildren<VeiledergruppeFormProps>) {
    return (
        <form className="veiledergruppe-modal__form" onSubmit={onSubmit} data-testid="veiledergruppe_modal_form">
            <TextField
                label={
                    <span className="veiledergruppe-modal__gruppenavntekst">
                        Gruppenavn: <i>(maks 35 tegn)</i>
                    </span>
                }
                value={gruppeNavn}
                onChange={e => setGruppeNavn(e.target.value)}
                error={errors.gruppeNavn}
                maxLength={35}
                data-testid="veiledergruppe_modal_gruppenavn-input"
            />
            <div className="veiledergruppe-modal__sokefilter">
                <SokVeiledereVeiledergrupper
                    handterVeiledereValgt={handterVeilederChange}
                    valgteVeiledere={filterValg.veiledere}
                />
            </div>
            <BodyShort
                size="small"
                className="veiledergruppe-modal__tekst"
                data-testid={`veiledergruppe_modal_antall-valgte-veiledere_${filterValg.veiledere.length}`}
            >
                <strong>
                    Veiledere i gruppen: <i> ({filterValg.veiledere.length} stk)</i>
                </strong>
            </BodyShort>
            <ValgtVeiledergruppeListe
                valgteVeileder={filterValg.veiledere}
                fjernValgtVeileder={veilederTarget =>
                    handterVeilederChange(filterValg.veiledere.filter(veileder => veileder !== veilederTarget))
                }
                feil={errors.filterValg}
            />
            {children}
        </form>
    );
}
