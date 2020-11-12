import React, {useEffect, useState} from 'react';
import {Dictionary} from '../../utils/types/types';
import {FiltervalgModell} from '../../model-interfaces';
import AlertStripe from 'nav-frontend-alertstriper';
import './checkbox-filterform.less';
import classNames from 'classnames';
import {Element} from 'nav-frontend-typografi';

interface DoubleCheckboxFilterformProps {
    formCol1: string;
    formCol2: string;
    valgCol1: Dictionary<string>;
    valgCol2: Dictionary<string>;
    titleCol1: string;
    titleCol2: string;
    endreFilterValg: (form: string, filterVerdi: string[]) => void;
    closeDropdown?: () => void;
    filtervalg: FiltervalgModell;
    className?: string;
    emptyCheckboxFilterFormMessage?: string;
}

function DoubleCheckboxFilterform({
    endreFilterValg,
    valgCol1,
    valgCol2,
    closeDropdown,
    formCol1,
    formCol2,
    titleCol1,
    titleCol2,
    filtervalg,
    className,
    emptyCheckboxFilterFormMessage
}: DoubleCheckboxFilterformProps) {
    const harValgCol1 = Object.keys(valgCol1).length > 0;
    const harValgCol2 = Object.keys(valgCol1).length > 0;

    const [uniqueValgCol1, setUniqueValgCol1] = useState<Dictionary<string>>(makeValgUnique(valgCol1, formCol1));
    const [uniqueValgCol2, setUniqueValgCol2] = useState<Dictionary<string>>(makeValgUnique(valgCol1, formCol2));
    const [checkBoxValgCol1, setCheckBoxValgCol1] = useState<string[]>(filtervalg[formCol1]);
    const [checkBoxValgCol2, setCheckBoxValgCol2] = useState<string[]>(filtervalg[formCol2]);

    useEffect(() => {
        setCheckBoxValgCol1(filtervalg[formCol1]);
    }, [filtervalg, formCol1]);

    useEffect(() => {
        setCheckBoxValgCol2(filtervalg[formCol2]);
    }, [filtervalg, formCol2]);

    useEffect(() => {
        setUniqueValgCol1(makeValgUnique(valgCol1, formCol1));
    }, [valgCol1, formCol1]);

    useEffect(() => {
        setUniqueValgCol2(makeValgUnique(valgCol2, formCol2));
    }, [valgCol2, formCol2]);

    const velgCheckBox = (e, typeForm) => {
        e.persist();
        const id = e.target.value.replace(`${typeForm}_`, '');
        if (typeForm === formCol1)
            return e.target.checked
                ? setCheckBoxValgCol1(prevState => [...prevState, id])
                : setCheckBoxValgCol1(prevState => prevState.filter(value => value !== id));
        return e.target.checked
            ? setCheckBoxValgCol2(prevState => [...prevState, id])
            : setCheckBoxValgCol2(prevState => prevState.filter(value => value !== id));
    };

    return (
        <form
            className="skjema checkbox-filterform"
            onSubmit={e => {
                e.preventDefault();
                endreFilterValg(formCol1, checkBoxValgCol1);
                endreFilterValg(formCol2, checkBoxValgCol2);
                if (closeDropdown) {
                    closeDropdown();
                }
            }}
        >
            {harValgCol1 && harValgCol2 && (
                <div className={classNames('checkbox-filterform__valg__double', className)}>
                    <div className={'checkbox-filterform-col1'}>
                        <Element className={'double-form-tittle'}>{titleCol1}</Element>
                        <RenderFields
                            valg={uniqueValgCol1}
                            form={formCol1}
                            velgCheckBox={e => velgCheckBox(e, formCol1)}
                            checkBoxValg={checkBoxValgCol1}
                        />
                    </div>

                    <div className={'checkbox-filterform-col2'}>
                        <Element className={'double-form-tittle'}>{titleCol2}</Element>
                        <RenderFields
                            valg={uniqueValgCol2}
                            form={formCol2}
                            velgCheckBox={e => velgCheckBox(e, formCol2)}
                            checkBoxValg={checkBoxValgCol2}
                        />
                    </div>
                </div>
            )}
            <div className="checkbox-filterform__under-valg">
                {closeDropdown ? (
                    checkBoxValgCol1.length > 0 || checkBoxValgCol2.length > 0 ? (
                        <button
                            className="knapp knapp--mini knapp--hoved"
                            type="submit"
                            data-testid="checkbox-filterform_velg-knapp"
                        >
                            Velg
                        </button>
                    ) : (
                        <button
                            className="knapp knapp--mini"
                            type="button"
                            onClick={closeDropdown}
                            data-testid="checkbox-filterform_lukk-knapp"
                        >
                            Lukk
                        </button>
                    )
                ) : (
                    <button
                        className="knapp knapp--mini knapp--hoved"
                        type="submit"
                        data-testid="checkbox-filterform_velg-knapp"
                    >
                        Velg
                    </button>
                )}

                {(!harValgCol1 || !harValgCol2) && (
                    <AlertStripe type="info" className="checkbox-filterform__alertstripe">
                        {emptyCheckboxFilterFormMessage || 'Ingen veiledere funnet'}
                    </AlertStripe>
                )}
            </div>
        </form>
    );
}

function RenderFields(props: {
    valg: Dictionary<string>;
    form: string;
    velgCheckBox: (e) => void;
    checkBoxValg: string[];
}) {
    return (
        <>
            {Object.entries(props.valg).map(([filterKey, filterValue]) => (
                <div className="skjemaelement skjemaelement--horisontal" key={filterKey}>
                    <input
                        id={filterKey}
                        type="checkbox"
                        className="skjemaelement__input checkboks"
                        value={filterKey}
                        checked={props.checkBoxValg.includes(filterKey.replace(`${props.form}_`, ''))}
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

function makeValgUnique(valg: Dictionary<string>, form: string) {
    const unique = {};
    Object.entries(valg).forEach(([filterKey, filterValue]) => {
        const NEW_KEY = form + '_' + filterKey;
        unique[NEW_KEY] = filterValue;
    });
    return unique;
}

export default DoubleCheckboxFilterform;
