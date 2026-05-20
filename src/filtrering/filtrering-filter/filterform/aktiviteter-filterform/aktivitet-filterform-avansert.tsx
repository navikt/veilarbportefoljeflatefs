import {Fragment, ReactNode} from 'react';
import {BodyShort, Button, Label, Radio, RadioGroup, VStack, HStack} from '@navikt/ds-react';
import {NullstillKnapp} from '../../../../components/nullstill-valg-knapp/nullstill-knapp';
import {Dictionary} from '../../../../utils/types/types';
import {Filtervalg, FiltervalgModell} from '../../../../typer/filtervalg-modell';
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
        endreFiltervalg(Filtervalg.aktiviteter, {
            ...valgteAvanserteAktiviteter,
            [aktivitetKey]: verdi
        });
    };

    return (
        <form className="aktivitetfilterform-avansert" data-testid="aktivitet-filterform">
            <div className="aktivitetfilterform-avansert__valg">
                <div className="aktivitetvalg-header">
                    <Label size="small">Ja</Label>
                    <Label size="small">Nei</Label>
                </div>
                {Object.entries(valg).map(([kode, verdi]) => (
                    <Fragment key={kode}>
                        <BodyShort size="small" className="aktivitetvalg-rad__aktivitet">
                            {verdi as string}
                        </BodyShort>
                        <RadioGroup
                            className="aktivitetvalg-rad__radio-group"
                            legend=""
                            hideLegend
                            onChange={(verdi: string) => handleChange(kode, verdi)}
                            value={valgteAvanserteAktiviteter[kode]}
                        >
                            <HStack className="aktivitetvalg-rad__radio-container" align="center">
                                <Radio
                                    id={`aktivitet-${kode}-ja`}
                                    data-testid={`aktivitet-filterform-${kode}-ja`}
                                    name={kode}
                                    size="small"
                                    value="JA"
                                >
                                    <span className="aksel-sr-only">Ja, {verdi}</span>
                                </Radio>
                                <Radio
                                    id={`aktivitet-${kode}-nei`}
                                    data-testid={`aktivitet-filterform-${kode}-nei`}
                                    name={kode}
                                    size="small"
                                    value="NEI"
                                >
                                    <span className="aksel-sr-only">Nei, {verdi}</span>
                                </Radio>
                            </HStack>
                        </RadioGroup>
                    </Fragment>
                ))}
            </div>
            <div className="aktivitet-filterform__knappegruppe">
                <Button
                    size="small"
                    variant="tertiary"
                    onClick={klikkPaForenkletLenke}
                    className="filterknapp"
                    type="button"
                    data-testid="aktiviteter_forenklet-filter_knapp"
                    aria-label="Forenklet aktivitetsfilter"
                >
                    Forenklet filter
                </Button>
                <NullstillKnapp
                    dataTestId="aktivitet-filterform"
                    nullstillValg={nullstillAvanserteAktiviteter}
                    disabled={!harAvanserteAktiviteter}
                />
            </div>
        </form>
    );
}
