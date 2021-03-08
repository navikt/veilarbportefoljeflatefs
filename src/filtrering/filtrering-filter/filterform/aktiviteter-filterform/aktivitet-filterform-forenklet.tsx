import React from 'react';
import '../filterform.less';
import NullstillValgKnapp from '../../../../components/nullstill-valg-knapp/nullstill-valg-knapp';
import {Dictionary} from '../../../../utils/types/types';
import {Checkbox} from 'nav-frontend-skjema';

interface AktivitetFilterformProps {
    valg: Dictionary<string>;
    endreFiltervalg: (form: string, filterVerdi: any) => void;
    klikkPaAvansertLenke: () => void;
    nullstillAvanserteAktiviteter: () => void;
    nullstillForenkledeAktiviteter: () => void;
    valgteForenkledeAktiviteter: string[];
}

function AktivitetFilterformForenklet({
    valg,
    endreFiltervalg,
                                          klikkPaAvansertLenke,
    nullstillAvanserteAktiviteter,
    nullstillForenkledeAktiviteter,
    valgteForenkledeAktiviteter
}: AktivitetFilterformProps) {
    const velgCheckBox = e => {
        nullstillAvanserteAktiviteter();

        e.persist();
        return e.target.checked
            ? endreFiltervalg('aktiviteterForenklet', [...valgteForenkledeAktiviteter, e.target.value])
            : endreFiltervalg(
                  'aktiviteterForenklet',
                  valgteForenkledeAktiviteter.filter(value => value !== e.target.value)
              );
    };

    return (
        <form className="skjema aktivitetfilterform-forenklet" data-testid="aktivitet-filterform">
            <div className="aktivitetfilterform__valg">
                {Object.entries(valg).map(([filterKey, filterValue]) => (
                    <Checkbox
                        key={filterKey}
                        id={filterKey}
                        className="aktivitetvalg blokk-xxs"
                        label={filterValue}
                        onChange={e => velgCheckBox(e)}
                        value={filterKey}
                        checked={valgteForenkledeAktiviteter.includes(filterKey)}
                    />
                ))}
            </div>
            <div className="aktivitet-filterform__knappegruppe">
                <div className="filterknapp-container">
                    <button type="button" onClick={klikkPaAvansertLenke} className="filterknapp">
                        Avansert filter
                    </button>
                </div>
                <NullstillValgKnapp
                    dataTestId="aktivitet-filterform"
                    nullstillValg={nullstillForenkledeAktiviteter}
                    form="aktiviteter"
                    disabled={valgteForenkledeAktiviteter.length <= 0}
                />
            </div>
        </form>
    );
}
export default AktivitetFilterformForenklet;
