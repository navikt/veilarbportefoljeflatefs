import {useEffect, useState} from 'react';
import {MultiSelect} from 'react-multi-select-component';
import classNames from 'classnames';
import {Checkbox, CheckboxGroup} from '@navikt/ds-react';
import {FiltervalgModell} from '../../../typer/filtervalg-modell';
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

    const velgTolkbehovSpraak = data => {
        setSelectedTolkbehovSpraak(data);

        endreFiltervalg(
            'tolkBehovSpraak',
            data.map(x => x.value)
        );
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
                            <CheckboxGroup
                                hideLegend
                                legend=""
                                onChange={(filtre: string[]) => endreFiltervalg('tolkebehov', filtre)}
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
                <label className="skjemaelement__label">Velg et eller flere språk</label>
                <MultiSelect
                    className="utvalgsliste"
                    options={tolkbehovSpraakSelectOptions}
                    value={selectedTolkbehovSpraak}
                    onChange={velgTolkbehovSpraak}
                    labelledBy="Select"
                    hasSelectAll={false}
                    closeOnChangedValue={false}
                    overrideStrings={{
                        allItemsAreSelected: 'Alle språk er valgt.',
                        clearSearch: 'Fjern søk',
                        clearSelected: 'Fjern valgt',
                        noOptions: 'Ingen resultater ved søk',
                        search: 'Søk',
                        selectSomeItems: 'Velg tolkebehov språk...'
                    }}
                    ItemRenderer={({checked, option, onClick, disabled}) => (
                        <div className={'navds-checkbox navds-checkbox--small'}>
                            <input
                                type="checkbox"
                                onChange={e => {
                                    e.stopPropagation();
                                    onClick();
                                }}
                                checked={checked}
                                tabIndex={-1}
                                className={'navds-checkbox__input'}
                                value={option.value}
                                aria-checked={checked}
                                id={`checkbox-tolkebehov-${option.value}`}
                            />
                            <label className={'navds-checkbox__label'} htmlFor={`checkbox-tolkebehov-${option.value}`}>
                                <div className="navds-checkbox__content">
                                    <div className="navds-body-short navds-body-short--small">{option.label}</div>
                                </div>
                            </label>
                        </div>
                    )}
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
