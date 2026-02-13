import {useEffect, useState} from 'react';
import classNames from 'classnames';
import {Checkbox, CheckboxGroup, UNSAFE_Combobox} from '@navikt/ds-react';
import {Filtervalg, FiltervalgModell} from '../../../typer/filtervalg-modell';
import {Grid} from '../../../components/grid/grid';
import {tolkebehov} from '../../filter-konstanter';
import {TolkebehovSpraakOptions} from '../../../ducks/tolkebehov';
import {useTolkbehovSelector} from '../../../hooks/redux/use-tolkbehovspraak-selector';
import {NullstillKnapp} from '../../../components/nullstill-valg-knapp/nullstill-knapp';

interface TolkebehovFilterformProps {
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    filtervalg: FiltervalgModell;
    gridColumns?: number;
}

export function TolkebehovFilterform({endreFiltervalg, filtervalg, gridColumns = 1}: TolkebehovFilterformProps) {
    const [tolkebehovValg, setTolkebehovValg] = useState<string[]>(filtervalg.tolkebehov);
    const [selectedTolkbehovSpraak, setSelectedTolkbehovSpraak] = useState<TolkebehovSpraakOptions[]>([]);
    const [tolkbehovSpraakSelectOptions, setTolkbehovSpraakSelectOptions] = useState<TolkebehovSpraakOptions[]>([]);
    const tolkbehovSpraakData = useTolkbehovSelector();

    const harValg = Object.keys(tolkebehov).length > 0;

    useEffect(() => {
        setTolkebehovValg(filtervalg.tolkebehov);

        if (tolkbehovSpraakData != null && tolkbehovSpraakData.size > 0) {
            let selectedValues: TolkebehovSpraakOptions[] = [];
            filtervalg.tolkBehovSpraak.forEach(x => {
                if (tolkbehovSpraakData.get(x) != null && tolkbehovSpraakData.get(x) !== undefined) {
                    selectedValues.push({label: tolkbehovSpraakData.get(x)!, value: x, checked: true});
                }
            });
            setSelectedTolkbehovSpraak(selectedValues);
        }
    }, [filtervalg, tolkbehovSpraakData]);

    const velgTolkbehovSpraak = (value: string, isSelected: boolean) => {
        const oppdatertVerdi = isSelected
            ? [...filtervalg.tolkBehovSpraak, value]
            : filtervalg.tolkBehovSpraak.filter(v => v !== value);

        endreFiltervalg(Filtervalg.tolkBehovSpraak, oppdatertVerdi);
    };

    useEffect(() => {
        let result: TolkebehovSpraakOptions[] = [];

        let selectedTolkbehovSpraak = filtervalg.tolkBehovSpraak;

        if (tolkbehovSpraakData != null && tolkbehovSpraakData.size > 0) {
            tolkbehovSpraakData.forEach((value, key) => {
                if (selectedTolkbehovSpraak.includes(key)) {
                    result.push({label: value, value: key, checked: true});
                } else {
                    result.push({label: value, value: key, checked: false});
                }
            });
            setTolkbehovSpraakSelectOptions(result);
        }
    }, [tolkbehovSpraakData, filtervalg]);

    const nullstillValg = () => {
        nullstillBehovValg();
        nullstillSpraakValg();
    };

    const nullstillBehovValg = () => {
        endreFiltervalg(Filtervalg.tolkebehov, []);
    };

    const nullstillSpraakValg = () => {
        endreFiltervalg(Filtervalg.tolkBehovSpraak, []);
    };

    return (
        <>
            <form className="skjema checkbox-filterform" data-testid="checkbox-filterform">
                {harValg && (
                    <div className={classNames('checkbox-filterform__valg', 'tolkbehov')}>
                        <Grid columns={gridColumns}>
                            <CheckboxGroup
                                hideLegend
                                legend=""
                                onChange={(filtre: string[]) => endreFiltervalg(Filtervalg.tolkebehov, filtre)}
                                size="small"
                                value={tolkebehovValg}
                            >
                                {Object.entries(tolkebehov).map(([filterKey, filterValue]) => (
                                    <Checkbox key={filterKey} value={filterKey} data-testid={`filter_${filterKey}`}>
                                        {filterValue}
                                    </Checkbox>
                                ))}
                            </CheckboxGroup>
                        </Grid>
                    </div>
                )}
                <hr />
                <UNSAFE_Combobox
                    label={'Velg et eller flere språk'}
                    className="utvalgsliste"
                    options={tolkbehovSpraakSelectOptions}
                    isMultiSelect
                    selectedOptions={selectedTolkbehovSpraak}
                    onToggleSelected={velgTolkbehovSpraak}
                    shouldShowSelectedOptions
                    size={'small'}
                    placeholder={'Søk...'}
                />
                <NullstillKnapp
                    dataTestId="checkbox-filterform"
                    nullstillValg={nullstillValg}
                    disabled={tolkebehovValg.length <= 0 && selectedTolkbehovSpraak.length <= 0}
                />
            </form>
        </>
    );
}
