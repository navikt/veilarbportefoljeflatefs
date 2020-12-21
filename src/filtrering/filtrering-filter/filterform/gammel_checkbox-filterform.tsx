import * as React from 'react';
import {Dictionary} from '../../../utils/types/types';
import {useEffect, useState} from 'react';
import Grid from '../../../components/grid/grid';
import {FiltervalgModell} from '../../../model-interfaces';
import VelgLukkKnapp from '../../../components/velg-lukk-knapp';
import AlertStripe from 'nav-frontend-alertstriper';
import NullstillValgKnapp from '../../../components/nullstill-valg-knapp/nullstill-valg-knapp';
import classNames from 'classnames';

interface CheckboxFilterformProps {
    form: string;
    valg: Dictionary<string>;
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    closeDropdown: () => void;
    filtervalg: FiltervalgModell;
    columns?: number;
    className?: string;
    emptyCheckboxFilterFormMessage?: string;
}

function GammelCheckboxFilterform({
    endreFiltervalg,
    valg,
    closeDropdown,
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
            ? setCheckBoxValg(prevState => [...prevState, e.target.value])
            : setCheckBoxValg(prevState => prevState.filter(value => value !== e.target.value));
    };

    const nullstillValg = () => {
        endreFiltervalg(form, []);
    };

    return (
        <form
            className="skjema checkbox-filterform"
            onSubmit={e => {
                e.preventDefault();
                if (checkBoxValg.length > 0) {
                    endreFiltervalg(form, checkBoxValg);
                }
                closeDropdown();
            }}
        >
            {harValg && (
                <div className={classNames('checkbox-filterform__valg', className)}>
                    <Grid columns={columns}>
                        <RenderFields valg={valg} velgCheckBox={velgCheckBox} checkBoxValg={checkBoxValg} />
                    </Grid>
                </div>
            )}
            <div className='filterform__gammel'>
            <VelgLukkKnapp harValg={checkBoxValg.length > 0} dataTestId="checkbox-filterform" />
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
            </div>
        </form>
    );
}

function RenderFields(props: {valg: Dictionary<string>; velgCheckBox: (e) => void; checkBoxValg: string[]}) {
    return (
        <>
            {Object.entries(props.valg).map(([filterKey, filterValue]) => (
                <div className="skjemaelement skjemaelement--horisontal" key={filterKey}>
                    <input
                        id={filterKey}
                        type="checkbox"
                        className="skjemaelement__input checkboks"
                        value={filterKey}
                        checked={props.checkBoxValg.includes(filterKey)}
                        onChange={props.velgCheckBox}
                        data-testid={`filter_${filterKey}`}
                    />
                    <label htmlFor={filterKey} className="skjemaelement__label">
                        {filterValue}
                    </label>
                </div>
            ))}
        </>
    );
}

export default GammelCheckboxFilterform;
