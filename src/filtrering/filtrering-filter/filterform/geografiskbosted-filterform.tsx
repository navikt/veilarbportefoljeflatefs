import {useEffect, useState} from 'react';
import {isEmptyArray} from 'formik';
import {MultiSelect} from 'react-multi-select-component';
import classNames from 'classnames';
import {Checkbox, CheckboxGroup} from '@navikt/ds-react';
import {FiltervalgModell} from '../../../typer/filtervalg-modell';
import {Grid} from '../../../components/grid/grid';
import {NullstillKnapp} from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import {useGeografiskbostedSelector} from '../../../hooks/redux/use-geografiskbosted-selector';
import {GeografiskBostedOptions} from '../../../ducks/geografiskBosted';

interface GeografiskBostedFilterformProps {
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    filtervalg: FiltervalgModell;
    gridColumns?: number;
}

export function GeografiskBostedFilterform({
    endreFiltervalg,
    filtervalg,
    gridColumns = 1
}: GeografiskBostedFilterformProps) {
    const [visGeografiskBosted, setVisGeografiskBosted] = useState<string[]>(filtervalg.visGeografiskBosted);
    const [selectedGeografiskBosted, setSelectedGeografiskBosted] = useState<GeografiskBostedOptions[]>([]);
    const [geografiskBostedOptions, setGeografiskBostedOptions] = useState<GeografiskBostedOptions[]>([]);
    const geografiskbostedListData = useGeografiskbostedSelector();

    useEffect(() => {
        setVisGeografiskBosted(filtervalg.visGeografiskBosted);

        if (!isEmptyArray(geografiskbostedListData)) {
            let selectedValues: GeografiskBostedOptions[] = [];
            filtervalg.geografiskBosted
                .filter(bostedKode => geografiskbostedListData.get(bostedKode) != null)
                .filter(bostedKode => geografiskbostedListData.get(bostedKode) !== undefined)
                .forEach(bostedKode => {
                    selectedValues.push({
                        label: geografiskbostedListData.get(bostedKode)!,
                        value: bostedKode,
                        checked: true
                    });
                });
            setSelectedGeografiskBosted(selectedValues);
        }
    }, [filtervalg, geografiskbostedListData]);

    const velgGeografiskBosted = data => {
        endreFiltervalg(
            'geografiskBosted',
            data.map(x => x.value)
        );
    };

    useEffect(() => {
        if (geografiskbostedListData.size > 0) {
            setGeografiskBostedOptions(
                Array.from(geografiskbostedListData).map((bostedKodeNavn: [string, string]) => ({
                    value: bostedKodeNavn[0],
                    label: bostedKodeNavn[1]
                }))
            );
        }
    }, [geografiskbostedListData]);

    const nullstillValg = () => {
        endreFiltervalg('geografiskBosted', []);
        endreFiltervalg('visGeografiskBosted', []);
    };

    return (
        <form className="skjema checkbox-filterform" data-testid="checkbox-filterform">
            <div className={classNames('checkbox-filterform__valg', 'landgruppe')}>
                <Grid columns={gridColumns}>
                    <CheckboxGroup
                        hideLegend
                        legend=""
                        onChange={(filtre: string[]) => {
                            endreFiltervalg('visGeografiskBosted', filtre);
                        }}
                        size="small"
                        value={visGeografiskBosted}
                    >
                        <div>
                            <Checkbox key="visGeografiskBosted" value="1" data-testid={`filter_vis_geografisk_bosted`}>
                                Vis geografisk bosted
                            </Checkbox>
                        </div>
                    </CheckboxGroup>
                </Grid>
            </div>
            <hr />
            <label className="skjemaelement__label">Velg en eller flere</label>
            <MultiSelect
                className="utvalgsliste"
                options={geografiskBostedOptions}
                value={selectedGeografiskBosted}
                onChange={velgGeografiskBosted}
                labelledBy="Select"
                hasSelectAll={false}
                overrideStrings={{
                    allItemsAreSelected: 'Alle bosteder er valgt.',
                    clearSearch: 'Fjern søk',
                    clearSelected: 'Fjern valgt',
                    noOptions: 'Ingen resultater ved søk',
                    search: 'Søk',
                    selectSomeItems: 'Velg bosted...'
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
                            id={`checkbox-bosted-${option.value}`}
                        />
                        <label className={'navds-checkbox__label'} htmlFor={`checkbox-bosted-${option.value}`}>
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
                disabled={visGeografiskBosted.length <= 0 && selectedGeografiskBosted.length <= 0}
            />
        </form>
    );
}
