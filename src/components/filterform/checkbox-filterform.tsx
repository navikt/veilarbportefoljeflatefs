import React, {useEffect, useState} from 'react';
import {Dictionary} from '../../utils/types/types';
import {FiltervalgModell} from '../../model-interfaces';
import Grid from '../grid/grid';
import AlertStripe from 'nav-frontend-alertstriper';
import './filterform.less';
import classNames from 'classnames';
import VelgLukkKnapp from '../velg-lukk-knapp';
import NullstillValgKnapp from '../nullstill-valg-knapp';
import {useFeatureSelector} from '../../hooks/redux/use-feature-selector';
import {NULLSTILL_KNAPP} from '../../konstanter';
import {endreFiltervalg} from '../../ducks/filtrering';
import {useDispatch} from 'react-redux';

interface CheckboxFilterformProps {
    form: string;
    valg: Dictionary<string>;
    closeDropdown: () => void;
    filtervalg: FiltervalgModell;
    columns?: number;
    className?: string;
    emptyCheckboxFilterFormMessage?: string;
}

function CheckboxFilterform({
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
    const erNullstillFeatureTogglePa = useFeatureSelector()(NULLSTILL_KNAPP);
    const dispatch = useDispatch();

    useEffect(() => {
        setCheckBoxValg(filtervalg[form]);
    }, [filtervalg, form]);

    const velgCheckBox = e => {
        e.persist();
        return e.target.checked
            ? setCheckBoxValg(prevState => [...prevState, e.target.value])
            : setCheckBoxValg(prevState => prevState.filter(value => value !== e.target.value));
    };

    return (
        <form
            className="skjema checkbox-filterform"
            onSubmit={e => {
                e.preventDefault();
                if (checkBoxValg.length > 0) {
                    dispatch(endreFiltervalg(form, checkBoxValg));
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
            <div
                className={
                    erNullstillFeatureTogglePa ? 'filterform__under-valg__nullstill-feature' : 'filterform__under-valg'
                }
            >
                <VelgLukkKnapp harValg={checkBoxValg.length > 0} dataTestId="checkbox-filterform" />
                {erNullstillFeatureTogglePa && (
                    <NullstillValgKnapp
                        dataTestId="checkbox-filterform"
                        nullstillValg={() => dispatch(endreFiltervalg(form, []))}
                        form={form}
                    />
                )}
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

export default CheckboxFilterform;
