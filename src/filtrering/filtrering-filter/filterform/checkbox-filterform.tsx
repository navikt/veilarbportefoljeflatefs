import React, {useEffect, useState} from 'react';
import {Dictionary} from '../../../utils/types/types';
import {FiltervalgModell} from '../../../model-interfaces';
import Grid from '../../../components/grid/grid';
import './filterform.less';
import classNames from 'classnames';
import NullstillKnapp from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import {Alert, Checkbox, CheckboxGroup} from '@navikt/ds-react';

interface CheckboxFilterformProps {
    form: string;
    valg: Dictionary<string>;
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    filtervalg: FiltervalgModell;
    gridColumns?: number;
    className?: string;
    emptyCheckboxFilterFormMessage?: string;
}

function CheckboxFilterform({
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

    const velgCheckBox = e => {
        e.persist();
        return e.target.checked
            ? endreFiltervalg(form, [...checkBoxValg, e.target.value])
            : endreFiltervalg(
                  form,
                  checkBoxValg.filter(value => value !== e.target.value)
              );
    };

    const nullstillValg = () => {
        endreFiltervalg(form, []);
    };

    return (
        <form className="skjema checkbox-filterform" data-testid="checkbox-filterform">
            {harValg && (
                <CheckboxGroup legend="" hideLegend className={classNames('checkbox-filterform__valg', className)}>
                    <Grid columns={gridColumns}>
                        {Object.entries(valg).map(([filterKey, filterValue]) => (
                            <>
                                <Checkbox
                                    key={filterKey}
                                    value={filterKey}
                                    name={valg[filterKey]}
                                    checked={checkBoxValg.includes(filterKey)}
                                    onChange={velgCheckBox}
                                    data-testid={`filter_${filterKey}`}
                                >
                                    {filterValue}
                                </Checkbox>
                            </>
                        ))}
                    </Grid>
                </CheckboxGroup>
            )}
            <NullstillKnapp
                dataTestId="checkbox-filterform"
                nullstillValg={nullstillValg}
                form={form}
                disabled={checkBoxValg.length <= 0}
            />
            {!harValg && (
                <Alert variant="info" className="checkbox-filterform__alertstripe">
                    {emptyCheckboxFilterFormMessage || 'Ingen veiledere funnet'}
                </Alert>
            )}
        </form>
    );
}

export default CheckboxFilterform;
