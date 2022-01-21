import React from 'react';
import '../filterform.less';
import NullstillKnapp from '../../../../components/nullstill-valg-knapp/nullstill-knapp';
import {Dictionary} from '../../../../utils/types/types';
import {FiltervalgModell} from '../../../../model-interfaces';
import {Button, Label, RadioGroup} from '@navikt/ds-react';
import {Radio} from 'nav-frontend-skjema';

interface AktivitetFilterformProps {
    valg: Dictionary<string>;
    filtervalg: FiltervalgModell;
    endreFiltervalg: (form: string, filterVerdi: React.ReactNode) => void;
    klikkPaForenkletLenke: () => void;
    nullstillAvanserteAktiviteter: () => void;
    nullstillForenkledeAktiviteter: () => void;
    valgteAvanserteAktiviteter: any;
    harAvanserteAktiviteter: boolean;
}

function AktivitetFilterformAvansert({
    valg,
    filtervalg,
    endreFiltervalg,
    klikkPaForenkletLenke,
    nullstillForenkledeAktiviteter,
    nullstillAvanserteAktiviteter,
    valgteAvanserteAktiviteter,
    harAvanserteAktiviteter
}: AktivitetFilterformProps) {
    const handleChange = (aktivitetKey, verdi) => {
        if (filtervalg.aktiviteterForenklet && filtervalg.aktiviteterForenklet.length > 0) {
            nullstillForenkledeAktiviteter();
        }
        endreFiltervalg('aktiviteter', {
            ...valgteAvanserteAktiviteter,
            [aktivitetKey]: verdi
        });
    };

    return (
        <form className="aktivitetfilterform-avansert" data-testid="aktivitet-filterform">
            <div className="aktivitetvalg__header">
                <Label className="aktivitetvalg__header--first">Ja</Label>
                <Label>Nei</Label>
            </div>
            <div className="aktivitetfilterform-avansert__valg">
                {Object.entries(valg).map(([kode, verdi]) => [
                    <RadioGroup legend={verdi as string} className="aktivitetvalg" key={kode}>
                        <Radio
                            id={`aktivitet-${kode}-ja`}
                            name={kode}
                            label=""
                            checked={valgteAvanserteAktiviteter[kode] === 'JA'}
                            onChange={() => handleChange(kode, 'JA')}
                            key={`JA, ${verdi}`}
                            data-testid={`aktivitet-filterform-${kode}-ja`}
                        />
                        <Radio
                            id={`aktivitet-${kode}-nei`}
                            name={kode}
                            label=""
                            checked={valgteAvanserteAktiviteter[kode] === 'NEI'}
                            onChange={() => handleChange(kode, 'NEI')}
                            key={`NEI, ${verdi}`}
                            data-testid={`aktivitet-filterform-${kode}-nei`}
                        />
                    </RadioGroup>
                ])}
            </div>
            <div className="aktivitet-filterform__knappegruppe">
                <Button
                    variant="tertiary"
                    onClick={klikkPaForenkletLenke}
                    className="filterknapp"
                    data-testid="aktiviteter_forenklet-filter_knapp"
                    aria-label="Forenklet aktivitetsfilter"
                >
                    Forenklet filter
                </Button>
                <NullstillKnapp
                    dataTestId="aktivitet-filterform"
                    nullstillValg={nullstillAvanserteAktiviteter}
                    form="aktiviteter"
                    disabled={!harAvanserteAktiviteter}
                />
            </div>
        </form>
    );
}
export default AktivitetFilterformAvansert;
