import React, {useEffect, useState} from 'react';
import {Dictionary} from '../../../utils/types/types';
import {FiltervalgModell} from '../../../model-interfaces';
import Grid from '../../../components/grid/grid';
import AlertStripe from 'nav-frontend-alertstriper';
import './filterform.less';
import classNames from 'classnames';
import NullstillValgKnapp from '../../../components/nullstill-valg-knapp/nullstill-valg-knapp';

interface CheckboxFilterformProps {
    form: string;
    valg: Dictionary<string>;
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    filtervalg: FiltervalgModell;
    columns?: number;
    className?: string;
    emptyCheckboxFilterFormMessage?: string;
}

function CheckboxFilterform({
    endreFiltervalg,
    valg,
    form,
    filtervalg,
    columns = 1,
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
                <div className={classNames('checkbox-filterform__valg', className)}>
                    <Grid columns={columns}>
                        {Object.entries(valg).map(([filterKey, filterValue]) => (
                            <div className="skjemaelement skjemaelement--horisontal" key={filterKey}>
                                <input
                                    id={filterKey}
                                    type="checkbox"
                                    className="skjemaelement__input checkboks"
                                    value={filterKey}
                                    checked={checkBoxValg.includes(filterKey)}
                                    onChange={velgCheckBox}
                                    data-testid={`filter_${filterKey}`}
                                />
                                <label htmlFor={filterKey} className="skjemaelement__label">
                                    {filterValue}
                                </label>
                            </div>
                        ))}
                    </Grid>
                </div>
            )}
            <NullstillValgKnapp
                dataTestId="checkbox-filterform"
                nullstillValg={nullstillValg}
                form={form}
                disabled={checkBoxValg.length <= 0}
            />
            {!harValg && (
                <AlertStripe type="info" className="checkbox-filterform__alertstripe">
                    {emptyCheckboxFilterFormMessage || 'Ingen veiledere funnet'}
                </AlertStripe>
            )}
        </form>
    );
}

export default CheckboxFilterform;
