import {useEffect, useState} from 'react';
import classNames from 'classnames';
import {Checkbox, CheckboxGroup} from '@navikt/ds-react';
import {FiltervalgModell} from '../../../typer/filtervalg-modell';
import {CheckboxFilter, CheckboxFilterMap} from '../../filter-konstanter';
import './filterform.css';

interface CheckboxFilterformProps {
    form: string;
    checkboxValg: CheckboxFilterMap;
    filtervalg: FiltervalgModell;
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    className?: string;
}

export function CheckboxFilterformValg({
    form,
    checkboxValg,
    filtervalg,
    endreFiltervalg,
    className
}: CheckboxFilterformProps) {
    const [checkboxerSomHarBlittValgt, setCheckboxerSomHarBlittValgt] = useState<string[]>(filtervalg[form]);

    useEffect(() => {
        setCheckboxerSomHarBlittValgt(filtervalg[form]);
    }, [filtervalg, form]);

    const checkboxComponent = ([filterKey, filterValue]: [string, CheckboxFilter | string]) => {
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
                datatest-id={`filter_${filterKey}`}
            >
                {filterValue.label}
            </Checkbox>
        );
    };

    return (
        <div className={classNames('skjema', className)}>
            <CheckboxGroup
                hideLegend
                legend=""
                onChange={(filtre: string[]) => endreFiltervalg(form, filtre)}
                size="small"
                value={checkboxerSomHarBlittValgt}
            >
                {Object.entries(checkboxValg).map(([filterKey, filterValue]) => (
                    <div key={filterKey}>{checkboxComponent([filterKey, filterValue])}</div>
                ))}
            </CheckboxGroup>
        </div>
    );
}
