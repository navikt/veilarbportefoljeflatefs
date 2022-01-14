import React from 'react';
import '../filterform.less';
import NullstillValgKnapp from '../../../../components/nullstill-valg-knapp/nullstill-valg-knapp';
import {Dictionary} from '../../../../utils/types/types';
import {Button, Checkbox, CheckboxGroup} from '@navikt/ds-react';

interface AktivitetFilterformProps {
    valg: Dictionary<string>;
    endreFiltervalg: (form: string, filterVerdi: React.ReactNode) => void;
    klikkPaAvansertLenke: () => void;
    nullstillAvanserteAktiviteter: () => void;
    nullstillForenkledeAktiviteter: () => void;
    valgteForenkledeAktiviteter: string[];
    harAvanserteAktiviteter: boolean;
}

function AktivitetFilterformForenklet({
    valg,
    endreFiltervalg,
    klikkPaAvansertLenke,
    nullstillAvanserteAktiviteter,
    nullstillForenkledeAktiviteter,
    valgteForenkledeAktiviteter,
    harAvanserteAktiviteter
}: AktivitetFilterformProps) {
    const velgCheckBox = e => {
        e.persist();
        if (harAvanserteAktiviteter) {
            nullstillAvanserteAktiviteter();
        }
        return e.target.checked
            ? endreFiltervalg('aktiviteterForenklet', [...valgteForenkledeAktiviteter, e.target.value])
            : endreFiltervalg(
                  'aktiviteterForenklet',
                  valgteForenkledeAktiviteter.filter(value => value !== e.target.value)
              );
    };

    return (
        <form className="skjema aktivitetfilterform-forenklet" data-testid="aktivitet-filterform-forenklet">
            <CheckboxGroup legend="" hideLegend className="aktivitetfilterform-forenklet__valg">
                {Object.entries(valg).map(([filterKey, filterValue]) => (
                    <Checkbox
                        key={filterKey}
                        className="aktivitetvalg"
                        onChange={e => velgCheckBox(e)}
                        value={filterKey}
                        checked={valgteForenkledeAktiviteter.includes(filterKey)}
                        data-testid={`aktivitet-forenklet_${filterKey}`}
                    >
                        {filterValue}
                    </Checkbox>
                ))}
            </CheckboxGroup>
            <div className="aktivitet-filterform__knappegruppe">
                <div className="filterknapp-container">
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={klikkPaAvansertLenke}
                        className="filterknapp"
                        data-testid="aktiviteter_avansert-filter_knapp"
                        aria-label="Avansert aktivitetsfilter"
                    >
                        Avansert filter
                    </Button>
                </div>
                <NullstillValgKnapp
                    dataTestId="aktivitet-filterform-forenklet"
                    nullstillValg={nullstillForenkledeAktiviteter}
                    form="aktiviteterForenklet"
                    disabled={valgteForenkledeAktiviteter.length <= 0}
                />
            </div>
        </form>
    );
}
export default AktivitetFilterformForenklet;
