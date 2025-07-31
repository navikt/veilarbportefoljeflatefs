import {useEffect, useState} from 'react';
import {MultiSelect} from 'react-multi-select-component';
import classNames from 'classnames';
import {Checkbox, CheckboxGroup, Tooltip} from '@navikt/ds-react';
import {FiltervalgModell} from '../../../typer/filtervalg-modell';
import {Grid} from '../../../components/grid/grid';
import {NullstillKnapp} from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import {useFoedelandSelector} from '../../../hooks/redux/use-foedeland-selector';
import {FoedelandOptions} from '../../../ducks/foedeland';
import {landgruppe, landgruppeTooltips} from '../../filter-konstanter';

interface FoedelandFilterformProps {
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    filtervalg: FiltervalgModell;
    gridColumns?: number;
}

export function FoedelandFilterform({endreFiltervalg, filtervalg, gridColumns = 1}: FoedelandFilterformProps) {
    const [landgrupppeValg, setLandgrupppeValg] = useState<string[]>(filtervalg.landgruppe);
    const [selectedFoedeland, setSelectedFoedeland] = useState<FoedelandOptions[]>([]);
    const [foedelandSelectOptions, setFoedelandSelectOptions] = useState<FoedelandOptions[]>([]);
    const foedelandListData = useFoedelandSelector();

    useEffect(() => {
        setLandgrupppeValg(filtervalg.landgruppe);

        if (foedelandListData != null && foedelandListData.size > 0) {
            let selectedValues: FoedelandOptions[] = [];
            filtervalg.foedeland.forEach(x => {
                if (foedelandListData.get(x) != null && foedelandListData.get(x) !== undefined) {
                    selectedValues.push({label: foedelandListData.get(x)!, value: x, checked: true});
                }
            });
            setSelectedFoedeland(selectedValues);
        }
    }, [filtervalg, foedelandListData]);

    const velgFoedeland = data => {
        nullstillLandgruppeValg();
        endreFiltervalg(
            'foedeland',
            data.map(x => x.value)
        );
    };

    useEffect(() => {
        if (foedelandListData != null && foedelandListData.size > 0) {
            let result: FoedelandOptions[] = [];

            foedelandListData.forEach((value, key) => {
                result.push({label: value, value: key});
            });
            setFoedelandSelectOptions(result);
        }
    }, [foedelandListData]);

    const nullstillValg = () => {
        nullstillLandgruppeValg();
        nullstillFoedelandValg();
    };

    const nullstillLandgruppeValg = () => {
        endreFiltervalg('landgruppe', []);
    };

    const nullstillFoedelandValg = () => {
        endreFiltervalg('foedeland', []);
    };

    return (
        <>
            <form className="skjema checkbox-filterform" data-testid="checkbox-filterform">
                <div className={classNames('checkbox-filterform__valg', 'landgruppe')}>
                    <Grid columns={gridColumns}>
                        <CheckboxGroup
                            hideLegend
                            legend=""
                            onChange={(filtre: string[]) => {
                                nullstillFoedelandValg();
                                endreFiltervalg('landgruppe', filtre);
                            }}
                            size="small"
                            value={landgrupppeValg}
                        >
                            {Object.entries(landgruppe).map(([filterKey, filterValue]) => (
                                <Tooltip
                                    describesChild // Gjer at innhaldet vert lese opp, ikkje berre tooltip-teksten. Fungerer ikkje med skjermleser grunna div-en inni, og div-en trengs for at det skal fungere for visuelle brukarar, per 2025-07-30. - Ingrid
                                    content={landgruppeTooltips[filterKey]}
                                    placement="right"
                                    offset={-130}
                                    maxChar={999}
                                    key={`tooltip-${filterKey}`}
                                >
                                    <div>
                                        <Checkbox key={filterKey} value={filterKey} data-testid={`filter_${filterKey}`}>
                                            {filterValue}
                                        </Checkbox>
                                    </div>
                                </Tooltip>
                            ))}
                        </CheckboxGroup>
                    </Grid>
                </div>
                <hr />
                <label className="skjemaelement__label">Velg et eller flere land</label>
                <MultiSelect
                    className="utvalgsliste"
                    options={foedelandSelectOptions}
                    value={selectedFoedeland}
                    onChange={velgFoedeland}
                    labelledBy="Select"
                    hasSelectAll={false}
                    overrideStrings={{
                        allItemsAreSelected: 'Alle land er valgt.',
                        clearSearch: 'Fjern søk',
                        clearSelected: 'Fjern valgt',
                        noOptions: 'Ingen resultater ved søk',
                        search: 'Søk',
                        selectSomeItems: 'Velg land...'
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
                                id={`checkbox-foedeland-${option.value}`}
                            />
                            <label className={'navds-checkbox__label'} htmlFor={`checkbox-foedeland-${option.value}`}>
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
                    form={'landgruppe'}
                    disabled={landgrupppeValg.length <= 0 && selectedFoedeland.length <= 0}
                />
            </form>
        </>
    );
}
