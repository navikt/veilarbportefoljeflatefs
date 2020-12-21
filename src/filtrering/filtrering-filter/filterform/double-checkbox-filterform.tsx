import React, {useEffect, useState} from 'react';
import {Dictionary} from '../../../utils/types/types';
import {FiltervalgModell} from '../../../model-interfaces';
import './filterform.less';
import classNames from 'classnames';
import {Element} from 'nav-frontend-typografi';
import {utdanningBestatt, utdanningGodkjent} from '../../filter-konstanter';
import NullstillValgKnapp from '../../../components/nullstill-valg-knapp/nullstill-valg-knapp';

interface DoubleCheckboxFilterformProps {
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    filtervalg: FiltervalgModell;
    className?: string;
}

const formCol1 = 'utdanningGodkjent';
const formCol2 = 'utdanningBestatt';
const valgCol1 = utdanningGodkjent;
const valgCol2 = utdanningBestatt;
const harValgCol1 = Object.keys(valgCol1).length > 0;
const harValgCol2 = Object.keys(valgCol1).length > 0;

const uniqueValgCol1 = makeValgUnique(valgCol1, formCol1);
const uniqueValgCol2 = makeValgUnique(valgCol2, formCol2);

function DoubleCheckboxFilterform({endreFiltervalg, filtervalg, className}: DoubleCheckboxFilterformProps) {
    const [checkBoxValgCol1, setCheckBoxValgCol1] = useState<string[]>(filtervalg[formCol1]);
    const [checkBoxValgCol2, setCheckBoxValgCol2] = useState<string[]>(filtervalg[formCol2]);

    useEffect(() => {
        setCheckBoxValgCol1(filtervalg[formCol1]);
    }, [filtervalg]);

    useEffect(() => {
        setCheckBoxValgCol2(filtervalg[formCol2]);
    }, [filtervalg]);

    const velgCheckBox = (e, typeForm) => {
        e.persist();
        const id = e.target.value.replace(`${typeForm}_`, '');
        if (typeForm === formCol1)
            return e.target.checked
                ? endreFiltervalg(formCol1, [...checkBoxValgCol1, id])
                : endreFiltervalg(
                      formCol1,
                      checkBoxValgCol1.filter(value => value !== id)
                  );
        else if (typeForm === formCol2)
            return e.target.checked
                ? endreFiltervalg(formCol2, [...checkBoxValgCol2, id])
                : endreFiltervalg(
                      formCol2,
                      checkBoxValgCol2.filter(value => value !== id)
                  );
        return;
    };

    const nullstillValg = () => {
        endreFiltervalg(formCol1, []);
        endreFiltervalg(formCol2, []);
    };

    return (
        <form className="skjema checkbox-filterform">
            {harValgCol1 && harValgCol2 && (
                <div className={classNames('checkbox-filterform__valg__double', className)}>
                    <div
                        className="checkbox-filterform-col1"
                        role="group"
                        aria-labelledby="double-filterform-label-col1"
                    >
                        <Element id="double-filterform-label-col1" className="double-form-title">
                            {'Er utdanningen godkjent i Norge?'}
                        </Element>
                        <RenderFields
                            valg={uniqueValgCol1}
                            form={formCol1}
                            velgCheckBox={e => velgCheckBox(e, formCol1)}
                            checkBoxValg={checkBoxValgCol1}
                        />
                    </div>
                    <div
                        className="checkbox-filterform-col2"
                        role="group"
                        aria-labelledby="double-filterform-label-col2"
                    >
                        <Element id="double-filterform-label-col2" className="double-form-title">
                            {'Er utdanningen bestått?'}
                        </Element>
                        <RenderFields
                            valg={uniqueValgCol2}
                            form={formCol2}
                            velgCheckBox={e => velgCheckBox(e, formCol2)}
                            checkBoxValg={checkBoxValgCol2}
                        />
                    </div>
                </div>
            )}
                <NullstillValgKnapp
                    dataTestId="double-checkbox-filterform"
                    nullstillValg={nullstillValg}
                    form={'utdanning-godkjent-og-bestatt'}
                    disabled={!(checkBoxValgCol1.length > 0 || checkBoxValgCol2.length > 0)}
                />
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
