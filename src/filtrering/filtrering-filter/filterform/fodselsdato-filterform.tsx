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
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    closeDropdown: () => void;
    filtervalg: FiltervalgModell;
}

function FodselsdatoFilterform({endreFiltervalg, valg, closeDropdown, form, filtervalg}: CheckboxFilterformProps) {
    const harValg = Object.keys(valg).length > 0;
    const erNullstillFeatureTogglePa = useFeatureSelector()(NULLSTILL_KNAPP);

    const [checkBoxValg, setCheckBoxValg] = useState<string[]>(filtervalg[form]);

    const velgCheckBox = e => {
        e.persist();
        return e.target.checked
            ? endreFiltervalg(form, [...checkBoxValg, e.target.value])
            : endreFiltervalg(
                  form,
                  checkBoxValg.filter(value => value !== e.target.value)
              );
    };

    useEffect(() => {
        setCheckBoxValg(filtervalg[form]);
    }, [filtervalg, form]);

    const nullstillValg = () => {
        endreFiltervalg(form, []);
        closeDropdown();
    };

    return (
        <form className="skjema checkbox-filterform">
            {harValg && (
                <div className="checkbox-filterform__valg fodselsdato__grid">
                    {Object.entries(valg).map(([filterKey, filterValue]) => (
                        <div key={filterKey} className="fodselsdato__container">
                            <input
                                id={filterKey}
                                type="checkbox"
                                className="fodselsdato__checkboks"
                                value={filterKey}
                                checked={checkBoxValg.includes(filterKey)}
                                onChange={velgCheckBox}
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
                </div>
            )}
            <div className={'filterform__under-valg'}>
                {erNullstillFeatureTogglePa && (
                    <NullstillValgKnapp
                        dataTestId="fodselsdato-filterform"
                        nullstillValg={nullstillValg}
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
export default FodselsdatoFilterform;
