import {useEffect, useState} from 'react';
import classNames from 'classnames';
import {Checkbox, CheckboxGroup, Tooltip, UNSAFE_Combobox} from '@navikt/ds-react';
import {Filtervalg, FiltervalgModell} from '../../../typer/filtervalg-modell';
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

    const velgFoedeland = (value: string, isSelected: boolean) => {
        const oppdatertVerdi = isSelected
            ? [...filtervalg.foedeland, value]
            : filtervalg.foedeland.filter(v => v !== value);
        endreFiltervalg(Filtervalg.foedeland, oppdatertVerdi);
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
        endreFiltervalg(Filtervalg.landgruppe, []);
    };

    const nullstillFoedelandValg = () => {
        endreFiltervalg(Filtervalg.foedeland, []);
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
                                endreFiltervalg(Filtervalg.landgruppe, filtre);
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
                <UNSAFE_Combobox
                    label={'Velg et eller flere land'}
                    className="utvalgsliste"
                    options={foedelandSelectOptions}
                    isMultiSelect
                    selectedOptions={selectedFoedeland}
                    onToggleSelected={velgFoedeland}
                    shouldShowSelectedOptions
                    size={'small'}
                    placeholder={'Søk...'}
                />
                <NullstillKnapp
                    dataTestId="checkbox-filterform"
                    nullstillValg={nullstillValg}
                    disabled={landgrupppeValg.length <= 0 && selectedFoedeland.length <= 0}
                />
            </form>
        </>
    );
}
