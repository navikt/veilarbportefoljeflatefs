import React from 'react';
import '../filterform.css';
import NullstillKnapp from '../../../../components/nullstill-valg-knapp/nullstill-knapp';
import {Dictionary} from '../../../../utils/types/types';
import {Button, Checkbox, CheckboxGroup} from '@navikt/ds-react';

interface AktivitetFilterformProps {
    valg: Dictionary<string>;
    endreFiltervalg: (form: string, filterVerdi: React.ReactNode) => void;
    klikkPaAvansertLenke: (e: any) => void;
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
    const velgCheckBox = (filtre: string[]) => {
        if (harAvanserteAktiviteter) {
            nullstillAvanserteAktiviteter();
        }
        endreFiltervalg('aktiviteterForenklet', filtre);
    };

    return (
        <form className="skjema aktivitetfilterform-forenklet" data-testid="aktivitet-filterform-forenklet">
            <CheckboxGroup
                hideLegend
                legend=""
                size="small"
                onChange={velgCheckBox}
                value={valgteForenkledeAktiviteter}
            >
                {Object.entries(valg).map(([filterKey, filterValue]) => (
                    <Checkbox
                        className="aktivitetvalg"
                        data-testid={`aktivitet-forenklet_${filterKey}`}
                        key={filterKey}
                        value={filterKey}
                    >
                        {filterValue}
                    </Checkbox>
                ))}
            </CheckboxGroup>
            <div className="aktivitet-filterform__knappegruppe">
                <Button
                    variant="tertiary"
                    onClick={klikkPaAvansertLenke}
                    className="filterknapp"
                    data-testid="aktiviteter_avansert-filter_knapp"
                    aria-label="Avansert aktivitetsfilter"
                >
                    Avansert filter
                </Button>
                <NullstillKnapp
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
