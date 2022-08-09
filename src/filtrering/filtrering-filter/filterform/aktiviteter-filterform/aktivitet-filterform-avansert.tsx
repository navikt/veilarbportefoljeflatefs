import React from 'react';
import '../filterform.css';
import NullstillKnapp from '../../../../components/nullstill-valg-knapp/nullstill-knapp';
import {Dictionary} from '../../../../utils/types/types';
import {FiltervalgModell} from '../../../../model-interfaces';
import {BodyShort, Button, Label} from '@navikt/ds-react';

interface AktivitetFilterformProps {
    valg: Dictionary<string>;
    filtervalg: FiltervalgModell;
    endreFiltervalg: (form: string, filterVerdi: React.ReactNode) => void;
    klikkPaForenkletLenke: (e: any) => void;
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
            <div className="aktivitetfilterform-avansert__valg">
                <div className="aktivitetvalg__header">
                    <Label className="aktivitetvalg__header--first" size="small">
                        Ja
                    </Label>
                    <Label size="small">Nei</Label>
                </div>
                {Object.entries(valg).map(([kode, verdi]) => [
                    <div key={kode} className="aktivitetvalg">
                        <BodyShort size="small">{verdi as string}</BodyShort>
                        <div className="radioknapp-gruppe">
                            <input
                                id={`aktivitet-${kode}-ja`}
                                name={kode}
                                value="JA"
                                type="radio"
                                checked={valgteAvanserteAktiviteter[kode] === 'JA'}
                                className="skjemaelement__input radioknapp"
                                onChange={() => handleChange(kode, 'JA')}
                                key={`Ja, ${verdi}`}
                                data-testid={`aktivitet-filterform-${kode}-ja`}
                            />
                            <label
                                htmlFor={`aktivitet-${kode}-ja`}
                                className="skjemaelement__label aktivitet_radioknapp_label"
                            >
                                <span className="sr-only">Ja, {verdi}</span>
                            </label>
                            <input
                                id={`aktivitet-${kode}-nei`}
                                name={kode}
                                value="NEI"
                                type="radio"
                                checked={valgteAvanserteAktiviteter[kode] === 'NEI'}
                                className="skjemaelement__input radioknapp"
                                onChange={() => handleChange(kode, 'NEI')}
                                key={`NEI, ${verdi}`}
                                data-testid={`aktivitet-filterform-${kode}-nei`}
                            />
                            <label
                                htmlFor={`aktivitet-${kode}-nei`}
                                className="skjemaelement__label aktivitet_radioknapp_label"
                            >
                                <span className="sr-only">Nei, {verdi}</span>
                            </label>
                        </div>
                    </div>
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
