import React, {useEffect, useState} from 'react';
import {Dictionary} from '../../../utils/types/types';
import {FiltervalgModell} from '../../../model-interfaces';
import AlertStripe from 'nav-frontend-alertstriper';
import './filterform.less';
import VelgLukkKnapp from '../../../components/velg-lukk-knapp';
import NullstillValgKnapp from '../../../components/nullstill-valg-knapp';
import {useFeatureSelector} from '../../../hooks/redux/use-feature-selector';
import {NULLSTILL_KNAPP} from '../../../konstanter';
import {endreFiltervalg} from '../../../ducks/filtrering';
import {useDispatch} from 'react-redux';
import {pagineringSetup} from '../../../ducks/paginering';

interface CheckboxFilterformProps {
    form: string;
    valg: Dictionary<string>;
    closeDropdown: () => void;
    filtervalg: FiltervalgModell;
}

function FodselsdatoFilterform({valg, closeDropdown, form, filtervalg}: CheckboxFilterformProps) {
    const harValg = Object.keys(valg).length > 0;
    const erNullstillFeatureTogglePa = useFeatureSelector()(NULLSTILL_KNAPP);
    const dispatch = useDispatch();

    const [checkBoxValg, setCheckBoxValg] = useState<string[]>(filtervalg[form]);

    const velgCheckBox = e => {
        e.persist();
        return e.target.checked
            ? setCheckBoxValg(prevState => [...prevState, e.target.value])
            : setCheckBoxValg(prevState => prevState.filter(value => value !== e.target.value));
    };

    useEffect(() => {
        setCheckBoxValg(filtervalg[form]);
    }, [filtervalg, form]);

    return (
        <form
            className="skjema checkbox-filterform"
            onSubmit={e => {
                e.preventDefault();
                if (checkBoxValg.length > 0) {
                    pagineringSetup({side: 1});
                    dispatch(endreFiltervalg(form, checkBoxValg));
                }
                closeDropdown();
            }}
        >
            {harValg && (
                <div className="checkbox-filterform__valg fodselsdato__grid">
                    <RenderFields valg={valg} velgCheckBox={velgCheckBox} checkBoxValg={checkBoxValg} />
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
                        dataTestId="fodselsdato-filterform"
                        nullstillValg={() => dispatch(endreFiltervalg(form, []))}
                        form={form}
                        disabled={checkBoxValg.length <= 0}
                    />
                )}
                {!harValg && (
                    <AlertStripe type="info" className="checkbox-filterform__alertstripe">
                        Ingen veiledere funnet
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
                <div key={filterKey} className="fodselsdato__container">
                    <input
                        id={filterKey}
                        type="checkbox"
                        className="fodselsdato__checkboks"
                        value={filterKey}
                        checked={props.checkBoxValg.includes(filterKey)}
                        onChange={props.velgCheckBox}
                        data-testid={`fodselsdato-filterform_dato-${filterValue}_input`}
                    />
                    <label
                        htmlFor={filterKey}
                        className="fodselsdato__label"
                        data-testid={`fodselsdato-filterform_dato-${filterValue}`}
                    >
                        {filterValue}
                    </label>
                </div>
            ))}
        </>
    );
}

export default FodselsdatoFilterform;
