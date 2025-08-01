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

interface BarnUnder18Props {
    valg: Dictionary<string>;
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    closeDropdown: () => void;
    filtervalg: FiltervalgModell;
    className?: string;
}

export function BarnUnder18FilterForm({endreFiltervalg, valg, closeDropdown, filtervalg, className}: BarnUnder18Props) {
    const [checkBoxValg, setCheckBoxValg] = useState<string[]>([]);
    const [inputAlderFra, setInputAlderFra] = useState<string>('');
    const [inputAlderTil, setInputAlderTil] = useState<string>('');
    const [feil, setFeil] = useState(false);
    const [feilTekst, setFeilTekst] = useState<string>('');
    const harValg = Object.keys(valg).length > 0;
    const kanVelgeFilter = checkBoxValg.length > 0 || inputAlderFra.length > 0 || inputAlderTil.length > 0;
    let filterFormBarnAlder = 'barnUnder18AarAlder';
    let filterFormHarBarnUnder18 = 'barnUnder18Aar';

    useEffect(() => {
        /* Sikrar at vi nullar filtervalga når ein har kryssa ut filtervalg-etiketten. */
        if (filtervalg[filterFormHarBarnUnder18].length === 0 && filtervalg[filterFormBarnAlder].length === 0) {
            setCheckBoxValg([]);
        }
        if (filtervalg[filterFormBarnAlder].length === 0) {
            setInputAlderFra('');
            setInputAlderTil('');
        }

        filtervalg[filterFormHarBarnUnder18].forEach(barnFilterValg => {
            if (
                Object.entries(valg)
                    .map(([filterKey]) => filterKey)
                    .includes(barnFilterValg)
            ) {
                setCheckBoxValg(filtervalg[filterFormHarBarnUnder18]);
            }
        });
        if (filtervalg[filterFormBarnAlder] != null && filtervalg[filterFormBarnAlder].length > 0) {
            const [alderFra, alderTil] = filtervalg[filterFormBarnAlder][0].split('-');
            alderFra && setInputAlderFra(alderFra);
            alderTil && setInputAlderTil(alderTil);
        }
    }, [filtervalg, filterFormBarnAlder, filterFormHarBarnUnder18, valg]);

    const submitCheckBoxValg = (checkboxValg: string[]) => {
        setFeil(false);
        setCheckBoxValg(checkboxValg);
        if (checkboxValg.length > 0) {
            setInputAlderFra('');
            setInputAlderTil('');
            endreFiltervalg(filterFormBarnAlder, []);
        }
        endreFiltervalg(filterFormHarBarnUnder18, checkboxValg);

        logEvent('portefolje.metrikker.barn_under_18_filter', {
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

    const endreFiltervalgForGyldigeVerdier = () => {
        if (inputAlderFra.length === 0 && inputAlderTil.length > 0) {
            endreFiltervalg(filterFormBarnAlder, [0 + '-' + inputAlderTil]);
        } else if (inputAlderFra.length > 0 && inputAlderTil.length === 0) {
            endreFiltervalg(filterFormBarnAlder, [inputAlderFra + '-' + 18]);
        } else if (inputAlderFra.length > 0 && inputAlderTil.length > 0) {
            endreFiltervalg(filterFormBarnAlder, [inputAlderFra + '-' + inputAlderTil]);
        }
    };

    const onSubmitCustomInput = e => {
        const inputFraNummer: number = parseInt(inputAlderFra);
        const inputTilNummer: number = parseInt(inputAlderTil);
        e.preventDefault();

        endreFiltervalg(filterFormHarBarnUnder18, []);
        if (!kanVelgeFilter) {
            closeDropdown();
        } else {
            if (inputFraNummer > inputTilNummer) {
                setFeil(true);
                setFeilTekst('Fra-alder kan ikke være større enn til-alder.');
            } else if (inputFraNummer >= 18 && inputAlderTil.length === 0) {
                setFeil(true);
                setFeilTekst('Du må skrive et tall lavere enn 18 i fra-feltet.');
            } else if (inputTilNummer > 18) {
                setFeil(true);
                setFeilTekst('Du kan ikke skrive større tall enn 18 i til-feltet.');
            } else {
                setFeil(false);
                setFeilTekst('');
                endreFiltervalgForGyldigeVerdier();
                closeDropdown();
            }
            logEvent('portefolje.metrikker.barn_under_18_filter', {
                alder: inputAlderFra + '-' + inputAlderTil,
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
        endreFiltervalg(filterFormHarBarnUnder18, []);
        endreFiltervalg(filterFormBarnAlder, []);
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <form
            className="skjema checkbox-filterform"
            onSubmit={e => {
                onSubmitCustomInput(e);
            }}
            data-testid="barn-under-18-filterform"
        >
            {harValg && (
                <>
                    <div className={classNames('checkbox-filterform__valg', className)}>
                        <CheckboxGroup hideLegend legend="" value={checkBoxValg} onChange={submitCheckBoxValg}>
                            <Grid columns={1}>
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
                    <label className="skjemaelement__label">Alder på barn</label>
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
                form={filterFormBarnAlder}
                disabled={!kanVelgeFilter}
            />
        </form>
    );
}
