import {useEffect, useState} from 'react';
import classNames from 'classnames';
import {Alert, Checkbox, CheckboxGroup} from '@navikt/ds-react';
import {FiltervalgModell} from '../../../typer/filtervalg-modell';
import {Grid} from '../../../components/grid/grid';
import {NullstillKnapp} from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import {CheckboxFilter, CheckboxFilterMap} from '../../filter-konstanter';
import './filterform.css';

interface CheckboxFilterformProps {
    form: string;
    valg: CheckboxFilterMap;
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    filtervalg: FiltervalgModell;
    gridColumns?: number;
    className?: string;
    emptyCheckboxFilterFormMessage?: string;
}

export function CheckboxFilterform({
    endreFiltervalg,
    valg,
    form,
    filtervalg,
    gridColumns = 1,
    className,
    emptyCheckboxFilterFormMessage
}: CheckboxFilterformProps) {
    const harValg = Object.keys(valg).length > 0;
    const [checkBoxValg, setCheckBoxValg] = useState<string[]>(filtervalg[form]);

    useEffect(() => {
        setCheckBoxValg(filtervalg[form]);
    }, [filtervalg, form]);

    const nullstillValg = () => {
        endreFiltervalg(form, []);
    };

    const checkBoxKomponent = ([filterKey, filterValue]: [string, CheckboxFilter | string]) => {
        return typeof filterValue === 'string' ? (
            <Checkbox data-testid={`filter_${filterKey}`} value={filterKey}>
                {filterValue}
            </Checkbox>
        ) : (
            <Checkbox
                className={filterValue.className}
                data-testid={`filter_${filterKey}`}
                indeterminate={filterValue.indeterminate?.()}
                value={filterKey}
            >
                {filterValue.label}
            </Checkbox>
        );
    };

    return (
        <form className="skjema checkbox-filterform" data-testid="checkbox-filterform">
            {harValg && (
                <div className={classNames('checkbox-filterform__valg', className)}>
                    <Grid columns={gridColumns}>
                        <CheckboxGroup
                            hideLegend
                            legend=""
                            onChange={(filtre: string[]) => endreFiltervalg(form, filtre)}
                            size="small"
                            value={checkBoxValg}
                        >
                            {Object.entries(valg).map(([filterKey, filterValue]: [string, CheckboxFilter | string]) => (
                                <div key={filterKey}>{checkBoxKomponent([filterKey, filterValue])}</div>
                            ))}
                        </CheckboxGroup>
                    </Grid>
                </div>
            )}
            <NullstillKnapp
                dataTestId="checkbox-filterform"
                nullstillValg={nullstillValg}
                form={form}
                disabled={checkBoxValg?.length <= 0}
            />
            {!harValg && (
                <Alert variant="info" className="checkbox-filterform__alertstripe" size="small">
                    {emptyCheckboxFilterFormMessage ?? 'Ingen veiledere funnet'}
                </Alert>
            )}
        </form>
    );
}
