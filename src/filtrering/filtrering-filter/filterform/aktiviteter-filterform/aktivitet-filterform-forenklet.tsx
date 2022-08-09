import React from 'react';
import '../filterform.css';
import NullstillKnapp from '../../../../components/nullstill-valg-knapp/nullstill-knapp';
import {Dictionary} from '../../../../utils/types/types';
import {Button} from '@navikt/ds-react';
import {Checkbox} from 'nav-frontend-skjema';

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
            <div className="aktivitetfilterform-forenklet__valg">
                {Object.entries(valg).map(([filterKey, filterValue]) => (
                    <Checkbox
                        key={filterKey}
                        className="aktivitetvalg"
                        label={filterValue}
                        onChange={e => velgCheckBox(e)}
                        value={filterKey}
                        checked={valgteForenkledeAktiviteter.includes(filterKey)}
                        data-testid={`aktivitet-forenklet_${filterKey}`}
                    />
                ))}
            </div>
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
