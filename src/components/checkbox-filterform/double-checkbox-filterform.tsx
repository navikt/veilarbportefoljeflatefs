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
    const [checkBoxValgCol1, setCheckBoxValgCol1] = useState<string[]>(filtervalg[formCol1]);
    const [checkBoxValgCol2, setCheckBoxValgCol2] = useState<string[]>(filtervalg[formCol2]);

    useEffect(() => {
        setCheckBoxValgCol1(filtervalg[formCol1]);
    }, [filtervalg, formCol1]);

    useEffect(() => {
        setCheckBoxValgCol1(filtervalg[formCol2]);
    }, [filtervalg, formCol2]);

    const velgCheckBox1 = e => {
        e.persist();
        return e.target.checked
            ? setCheckBoxValgCol1(prevState => [...prevState, e.target.value])
            : setCheckBoxValgCol1(prevState => prevState.filter(value => value !== e.target.value));
    };

    const velgCheckBox2 = e => {
        e.persist();
        return e.target.checked
            ? setCheckBoxValgCol2(prevState => [...prevState, e.target.value])
            : setCheckBoxValgCol2(prevState => prevState.filter(value => value !== e.target.value));
    };

    return (
        <form
            className="skjema checkbox-filterform"
            onSubmit={e => {
                e.preventDefault();
                endreFilterValg(formCol1, checkBoxValgCol1);
                if (closeDropdown) {
                    closeDropdown();
                }
            }}
        >
            {harValgCol1 && harValgCol2 && (
                <div className={classNames('checkbox-filterform__valg__double', className)}>
                    <div className={'checkbox-filterform-col1'}>
                        <Element>{titleCol1}</Element>
                        <RenderFields valg={valgCol1} velgCheckBox={velgCheckBox1} checkBoxValg={checkBoxValgCol1} />
                    </div>

                    <div className={'checkbox-filterform-col2'}>
                        <Element>{titleCol2}</Element>
                        <RenderFields valg={valgCol2} velgCheckBox={velgCheckBox2} checkBoxValg={checkBoxValgCol2} />
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

export default DoubleCheckboxFilterform;
