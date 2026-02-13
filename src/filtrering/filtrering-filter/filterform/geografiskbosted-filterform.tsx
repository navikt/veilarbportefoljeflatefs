import {useEffect, useState} from 'react';
import {isEmptyArray} from 'formik';
import classNames from 'classnames';
import {Checkbox, CheckboxGroup, UNSAFE_Combobox} from '@navikt/ds-react';
import {Filtervalg, FiltervalgModell} from '../../../typer/filtervalg-modell';
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

        if (isEmptyArray(geografiskbostedListData)) {
            setSelectedGeografiskBosted([]);
            return;
        }

        const selectedValues: GeografiskBostedOptions[] = filtervalg.geografiskBosted.flatMap(bostedKode => {
            const label = geografiskbostedListData.get(bostedKode);
            return label ? [{label, value: bostedKode, checked: true}] : [];
        });

        setSelectedGeografiskBosted(selectedValues);
    }, [filtervalg.geografiskBosted, filtervalg.visGeografiskBosted, geografiskbostedListData]);

    const velgGeografiskBosted = (value: string, isSelected: boolean) => {
        const oppdatertVerdi = isSelected
            ? [...filtervalg.geografiskBosted, value]
            : filtervalg.geografiskBosted.filter(v => v !== value);

        endreFiltervalg(Filtervalg.geografiskBosted, oppdatertVerdi);
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
        endreFiltervalg(Filtervalg.geografiskBosted, []);
        endreFiltervalg(Filtervalg.visGeografiskBosted, []);
    };

    return (
        <form className="skjema checkbox-filterform" data-testid="checkbox-filterform">
            <div className={classNames('checkbox-filterform__valg', 'landgruppe')}>
                <Grid columns={gridColumns}>
                    <CheckboxGroup
                        hideLegend
                        legend=""
                        onChange={(filtre: string[]) => {
                            endreFiltervalg(Filtervalg.visGeografiskBosted, filtre);
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
            <UNSAFE_Combobox
                label={'Velg et eller flere bosteder'}
                className="utvalgsliste"
                options={geografiskBostedOptions}
                isMultiSelect
                selectedOptions={selectedGeografiskBosted}
                onToggleSelected={velgGeografiskBosted}
                shouldShowSelectedOptions
                size={'small'}
                placeholder={'Søk...'}
            />
            <NullstillKnapp
                dataTestId="checkbox-filterform"
                nullstillValg={nullstillValg}
                disabled={visGeografiskBosted.length <= 0 && selectedGeografiskBosted.length <= 0}
            />
        </form>
    );
}
