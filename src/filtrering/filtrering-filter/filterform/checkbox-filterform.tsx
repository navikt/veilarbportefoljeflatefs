import {useEffect, useState} from 'react';
import classNames from 'classnames';
import {Alert, Checkbox, CheckboxGroup} from '@navikt/ds-react';
import {FiltervalgModell} from '../../../typer/filtervalg-modell';
import {CheckboxFilter, CheckboxFilterMap} from '../../filter-konstanter';
import './filterform.css';

interface CheckboxFilterformProps {
    form: string;
    valg: CheckboxFilterMap;
    filtervalg: FiltervalgModell;
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    className?: string;
    emptyCheckboxFilterFormMessage?: string;
    visNullstillKnapp?: boolean;
}

export function CheckboxFilterform({
    form,
    valg,
    filtervalg,
    endreFiltervalg,
    className,
    emptyCheckboxFilterFormMessage
}: CheckboxFilterformProps) {
    const harValg = Object.keys(valg).length > 0;
    const [checkBoxValg, setCheckBoxValg] = useState<string[]>(filtervalg[form]);

    useEffect(() => {
        setCheckBoxValg(filtervalg[form]);
    }, [filtervalg, form]);

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
                datatest-id={`filter_${filterKey}`}
            >
                {filterValue.label}
            </Checkbox>
        );
    };

    if (!harValg) {
        return (
            <Alert variant="info" className="checkbox-filterform__alertstripe" size="small">
                {emptyCheckboxFilterFormMessage ??
                    'Får ikke til å vise avhukingsbokser. Meld sak i Porten om problemet varer lenge.'}
            </Alert>
        );
    }

    return (
        <div className="checkbox-filterform">
            <div className={classNames('skjema checkbox-filterform__valg', className)}>
                <CheckboxGroup
                    hideLegend
                    legend=""
                    onChange={(filtre: string[]) => endreFiltervalg(form, filtre)}
                    size="small"
                    value={checkBoxValg}
                >
                    {Object.entries(valg).map(([filterKey, filterValue]) => (
                        <div key={filterKey}>{checkBoxKomponent([filterKey, filterValue])}</div>
                    ))}
                </CheckboxGroup>
            </div>
        </div>
    );
}
