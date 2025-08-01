import {useEffect, useState} from 'react';
import classNames from 'classnames';
import {BodyShort, Button, Checkbox, CheckboxGroup, TextField} from '@navikt/ds-react';
import {FiltervalgModell} from '../../../typer/filtervalg-modell';
import {Dictionary} from '../../../utils/types/types';
import {Grid} from '../../../components/grid/grid';
import {logEvent} from '../../../utils/frontend-logger';
import {finnSideNavn} from '../../../middleware/metrics-middleware';
import {NullstillKnapp} from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import './filterform.css';

interface AlderFilterformProps {
    form: string;
    valg: Dictionary<string>;
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    closeDropdown: () => void;
    filtervalg: FiltervalgModell;
    className?: string;
}

export function AlderFilterform({
    endreFiltervalg,
    valg,
    closeDropdown,
    form,
    filtervalg,
    className
}: AlderFilterformProps) {
    const [checkBoxValg, setCheckBoxValg] = useState<string[]>([]);
    const [inputAlderFra, setInputAlderFra] = useState<string>('');
    const [inputAlderTil, setInputAlderTil] = useState<string>('');
    const [feil, setFeil] = useState(false);
    const [feilTekst, setFeilTekst] = useState<string>('');
    const harValg = Object.keys(valg).length > 0;
    const kanVelgeFilter = checkBoxValg.length > 0 || inputAlderFra.length > 0 || inputAlderTil.length > 0;

    useEffect(() => {
        /* Sikrar at vi nullar checkbox-valg når ein har kryssa ut siste checkbox-valg. */
        if (filtervalg[form].length === 0) {
            setCheckBoxValg([]);
        }

        filtervalg[form].forEach(alder => {
            if (
                Object.entries(valg)
                    .map(([filterKey]) => filterKey)
                    .includes(alder)
            ) {
                setInputAlderTil('');
                setInputAlderFra('');
                setCheckBoxValg(filtervalg[form]);
            } else {
                const [alderFra, alderTil] = alder.split('-');
                alderFra && setInputAlderFra(alderFra);
                alderTil && setInputAlderTil(alderTil);
            }
        });
    }, [filtervalg, form, valg]);

    const submitCheckBoxValg = (checkboxValg: string[]) => {
        setInputAlderTil('');
        setInputAlderFra('');
        setFeil(false);

        setCheckBoxValg(checkboxValg);
        endreFiltervalg(form, checkboxValg);

        logEvent('portefolje.metrikker.aldersfilter', {
            checkbox: true,
            sideNavn: finnSideNavn()
        });
    };

    const onChangeInput = (e, til) => {
        setFeil(false);
        setCheckBoxValg([]);
        if (til) {
            setInputAlderTil(e.target.value);
        } else {
            setInputAlderFra(e.target.value);
        }
    };

    const onSubmitCustomInput = e => {
        const inputFraNummer: number = parseInt(inputAlderFra);
        const inputTilNummer: number = parseInt(inputAlderTil);
        endreFiltervalg(form, []);
        e.preventDefault();
        if (!kanVelgeFilter) {
            closeDropdown();
        } else {
            if (inputFraNummer > inputTilNummer) {
                setFeil(true);
                setFeilTekst('Fra-alder kan ikke være større enn til-alder.');
            } else if (inputFraNummer >= 100 && inputAlderTil.length === 0) {
                setFeil(true);
                setFeilTekst('Du må skrive et tall lavere enn 100 i fra-feltet hvis til-feltet står tomt.');
            } else {
                setFeil(false);
                setFeilTekst('');
                if (inputAlderFra.length === 0 && inputAlderTil.length > 0) {
                    endreFiltervalg(form, [0 + '-' + inputAlderTil]);
                } else if (inputAlderFra.length > 0 && inputAlderTil.length === 0) {
                    endreFiltervalg(form, [inputAlderFra + '-' + 100]);
                } else if (inputAlderFra.length > 0 && inputAlderTil.length > 0) {
                    endreFiltervalg(form, [inputAlderFra + '-' + inputAlderTil]);
                }
                closeDropdown();
            }
            logEvent('portefolje.metrikker.aldersfilter', {
                checkbox: false,
                sideNavn: finnSideNavn()
            });
        }
    };

    const fjernTegn = e => {
        (e.key === 'e' || e.key === '.' || e.key === ',' || e.key === '-' || e.key === '+') && e.preventDefault();
    };

    const nullstillValg = () => {
        setInputAlderFra('');
        setInputAlderTil('');
        setCheckBoxValg([]);
        endreFiltervalg(form, []);
    };

    return (
        <form
            className="skjema checkbox-filterform"
            onSubmit={e => {
                onSubmitCustomInput(e);
            }}
            data-testid="alder-filterform"
        >
            {harValg && (
                <>
                    <div className={classNames('checkbox-filterform__valg', className)}>
                        <CheckboxGroup hideLegend legend="" value={checkBoxValg} onChange={submitCheckBoxValg}>
                            <Grid columns={2}>
                                {Object.entries(valg).map(([filterKey, filterValue]) => (
                                    <Checkbox
                                        data-testid={`filter_${filterKey}`}
                                        key={filterKey}
                                        size="small"
                                        value={filterKey}
                                    >
                                        {filterValue}
                                    </Checkbox>
                                ))}
                            </Grid>
                        </CheckboxGroup>
                    </div>
                    <hr className="alder-border" />
                    <div className={classNames('alder-input', feil && 'alder-input__validering')}>
                        <div className="alder-container alder-container__fra">
                            <TextField
                                label="Fra:"
                                value={inputAlderFra}
                                onChange={e => onChangeInput(e, false)}
                                size="small"
                                onKeyDown={e => fjernTegn(e)}
                                type="number"
                                min={0}
                                id="filter_alder-fra"
                                className={classNames('filter_alder', feil && 'filter_alder__validering')}
                                data-testid="filter_alder-fra"
                            />
                        </div>
                        <div className="alder-container alder-container__til">
                            <TextField
                                label="Til:"
                                value={inputAlderTil}
                                onChange={e => onChangeInput(e, true)}
                                size="small"
                                onKeyDown={e => fjernTegn(e)}
                                type="number"
                                min={0}
                                id="filter_alder-til"
                                className={classNames('filter_alder', feil && 'filter_alder__validering')}
                                data-testid="filter_alder-til"
                            />
                        </div>
                        <Button
                            variant="primary"
                            size="small"
                            type="submit"
                            className="alder-velg-knapp"
                            data-testid="checkbox-filterform_velg-knapp"
                            disabled={!(inputAlderFra.length > 0 || inputAlderTil.length > 0)}
                        >
                            Velg
                        </Button>
                    </div>
                    {feil && (
                        <BodyShort
                            size="small"
                            className="validering-tekst"
                            data-testid="filter_alder_valideringstekst"
                        >
                            {feilTekst}
                        </BodyShort>
                    )}
                </>
            )}
            <NullstillKnapp
                dataTestId="alder-filterform"
                nullstillValg={nullstillValg}
                form={form}
                disabled={!kanVelgeFilter}
            />
        </form>
    );
}
