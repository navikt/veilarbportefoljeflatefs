import {ReactNode} from 'react';
import {BodyShort, Button, Label, Radio, RadioGroup} from '@navikt/ds-react';
import {NullstillKnapp} from '../../../../components/nullstill-valg-knapp/nullstill-knapp';
import {Dictionary} from '../../../../utils/types/types';
import {FiltervalgModell} from '../../../../typer/filtervalg-modell';
import '../filterform.css';

interface AktivitetFilterformProps {
    valg: Dictionary<string>;
    filtervalg: FiltervalgModell;
    endreFiltervalg: (form: string, filterVerdi: ReactNode) => void;
    klikkPaForenkletLenke: (e: any) => void;
    nullstillAvanserteAktiviteter: () => void;
    nullstillForenkledeAktiviteter: () => void;
    valgteAvanserteAktiviteter: any;
    harAvanserteAktiviteter: boolean;
}

export function AktivitetFilterformAvansert({
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
                        <RadioGroup
                            legend=""
                            hideLegend
                            onChange={(verdi: string) => handleChange(kode, verdi)}
                            value={valgteAvanserteAktiviteter[kode]}
                        >
                            <Radio data-testid={`aktivitet-filterform-${kode}-ja`} name={kode} size="small" value="JA">
                                {/* Radio har (per 18.08.22) ikke støtte for å skjule label - gjør derfor dette manuelt */}
                                <span className="navds-sr-only">Ja, {verdi}</span>
                            </Radio>
                            <Radio
                                data-testid={`aktivitet-filterform-${kode}-nei`}
                                name={kode}
                                size="small"
                                value="NEI"
                            >
                                {/* Radio har (per 18.08.22) ikke støtte for å skjule label - gjør derfor dette manuelt */}
                                <span className="navds-sr-only">Nei, {verdi}</span>
                            </Radio>
                        </RadioGroup>
                    </div>
                ])}
            </div>
            <div className="aktivitet-filterform__knappegruppe">
                <Button
                    size="small"
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
