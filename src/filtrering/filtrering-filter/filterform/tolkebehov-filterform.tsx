import {FiltervalgModell} from '../../../model-interfaces';
import * as React from 'react';
import {useEffect, useState} from 'react';
import classNames from 'classnames';
import Grid from '../../../components/grid/grid';
import NullstillKnapp from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import {MultiSelect} from 'react-multi-select-component';
import {tolkebehov} from '../../filter-konstanter';
import {TolkebehovSpraakOptions} from '../../../ducks/tolkebehov';
import {useTolkbehovSelector} from '../../../hooks/redux/use-tolkbehovspraak-selector';

interface FoedelandFilterformProps {
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    filtervalg: FiltervalgModell;
    gridColumns?: number;
    emptyCheckboxFilterFormMessage?: string;
}

function TolkebehovFilterform({endreFiltervalg, filtervalg, gridColumns = 1}: FoedelandFilterformProps) {
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

    const velgTolkbehovSpraak = data => {
        //nullstillBehovValg();
        setSelectedTolkbehovSpraak(data);

        let selectedValues: string[] = [];
        data.forEach(x => selectedValues.push(x.value));
        endreFiltervalg('tolkBehovSpraak', selectedValues);
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

    const velgTolkbehov = e => {
        //nullstillSpraakValg();
        e.persist();
        return e.target.checked
            ? endreFiltervalg('tolkebehov', [...tolkebehovValg, e.target.value])
            : endreFiltervalg(
                  'tolkebehov',
                  tolkebehovValg.filter(value => value !== e.target.value)
              );
    };

    const nullstillValg = () => {
        nullstillBehovValg();
        nullstillSpraakValg();
    };

    const nullstillBehovValg = () => {
        endreFiltervalg('tolkebehov', []);
    };

    const nullstillSpraakValg = () => {
        endreFiltervalg('tolkBehovSpraak', []);
    };

    return (
        <>
            <form className="skjema checkbox-filterform" data-testid="checkbox-filterform">
                {harValg && (
                    <div className={classNames('checkbox-filterform__valg', 'tolkbehov')}>
                        <Grid columns={gridColumns}>
                            {Object.entries(tolkebehov).map(([filterKey, filterValue]) => (
                                <div className="skjemaelement skjemaelement--horisontal" key={filterKey}>
                                    <input
                                        id={filterKey}
                                        type="checkbox"
                                        className="skjemaelement__input checkboks"
                                        value={filterKey}
                                        name={tolkebehov[filterKey]}
                                        checked={tolkebehovValg.includes(filterKey)}
                                        onChange={velgTolkbehov}
                                        data-testid={`filter_${filterKey}`}
                                    />
                                    <label htmlFor={filterKey} className="skjemaelement__label">
                                        {filterValue}
                                    </label>
                                </div>
                            ))}
                        </Grid>
                    </div>
                )}
                <hr />
                <label className="skjemaelement__label">Velg et eller flere språk</label>
                <MultiSelect
                    className="utvalgsliste"
                    options={tolkbehovSpraakSelectOptions}
                    value={selectedTolkbehovSpraak}
                    onChange={velgTolkbehovSpraak}
                    labelledBy="Select"
                    hasSelectAll={false}
                    overrideStrings={{
                        allItemsAreSelected: 'Alle språk er valgt.',
                        clearSearch: 'Fjern søk',
                        clearSelected: 'Fjern valgt',
                        noOptions: 'Ingen resultater ved søk',
                        search: 'Søk',
                        selectSomeItems: 'Velg tolkebehov språk...'
                    }}
                />
                <NullstillKnapp
                    dataTestId="checkbox-filterform"
                    nullstillValg={nullstillValg}
                    form={'tolkbehov'}
                    disabled={tolkebehovValg.length <= 0 && selectedTolkbehovSpraak.length <= 0}
                />
            </form>
        </>
    );
}

export default TolkebehovFilterform;
