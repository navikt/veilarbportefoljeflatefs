import React, {useEffect, useState} from 'react';
import {Dictionary} from '../../../utils/types/types';
import {FiltervalgModell} from '../../../model-interfaces';
import Grid from '../../../components/grid/grid';
import './filterform.css';
import classNames from 'classnames';
import NullstillKnapp from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import {Alert, Tooltip, Checkbox, CheckboxGroup} from '@navikt/ds-react';
import { kebabCase } from "../../../utils/utils";

interface CheckboxFilterformProps {
    form: string;
    valg: Dictionary<string>;
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    filtervalg: FiltervalgModell;
    gridColumns?: number;
    className?: string;
    emptyCheckboxFilterFormMessage?: string;
    tooltips?: Dictionary<string>;
}

function CheckboxFilterform({
    endreFiltervalg,
    valg,
    form,
    filtervalg,
    gridColumns = 1,
    className,
    emptyCheckboxFilterFormMessage,
    tooltips
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
                <div className={classNames('checkbox-filterform__valg', className)}>
                    <Grid columns={gridColumns}>
                        <CheckboxGroup legend="" value={checkBoxValg} size="small">
                        {Object.entries(valg).map(([filterKey, filterValue]) =>
                            tooltips && tooltips[filterKey] ? (
                                <Tooltip
                                    content={tooltips[filterKey]}
                                    placement="right"
                                    offset={-130}
                                    maxChar={999}
                                    key={`tooltip-${filterKey}`}
                                >
                                    <Checkbox key={filterKey} value={filterKey} onChange={velgCheckBox} data-testid={`filter_${filterKey}`}>
                                        {filterValue}
                                    </Checkbox>

                                </Tooltip>
                            ) : (
                              <Checkbox key={filterKey} value={filterKey} onChange={velgCheckBox} data-testid={`filter_${filterKey}`}>
                                  {filterValue}
                              </Checkbox>
                            )
                        )}
                        </CheckboxGroup>
                    </Grid>
                </div>
            )}
            <NullstillKnapp
                dataTestId="checkbox-filterform"
                nullstillValg={nullstillValg}
                form={form}
                disabled={checkBoxValg.length <= 0}
            />
            {!harValg && (
                <Alert variant="info" className="checkbox-filterform__alertstripe" size="small">
                    {emptyCheckboxFilterFormMessage || 'Ingen veiledere funnet'}
                </Alert>
            )}
        </form>
    );
}

export default CheckboxFilterform;
