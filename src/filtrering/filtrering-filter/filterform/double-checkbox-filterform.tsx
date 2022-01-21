import React, {useEffect, useState} from 'react';
import {Dictionary} from '../../../utils/types/types';
import {FiltervalgModell} from '../../../model-interfaces';
import './filterform.less';
import classNames from 'classnames';
import {utdanningBestatt, utdanningGodkjent} from '../../filter-konstanter';
import NullstillKnapp from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import {Checkbox, RadioGroup} from '@navikt/ds-react';
import Grid from '../../../components/grid/grid';

interface DoubleCheckboxFilterformProps {
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    filtervalg: FiltervalgModell;
    className?: string;
}

const formUtdanningGodkjent = 'utdanningGodkjent';
const formUtdanningBestatt = 'utdanningBestatt';
const valgGodkjent = utdanningGodkjent;
const valgBestatt = utdanningBestatt;
const harValgGodkjent = Object.keys(valgGodkjent).length > 0;
const harValgBestatt = Object.keys(valgGodkjent).length > 0;

const uniqueValgGodkjent = makeValgUnique(valgGodkjent, formUtdanningGodkjent);
const uniqueValgBestatt = makeValgUnique(valgBestatt, formUtdanningBestatt);

function DoubleCheckboxFilterform({endreFiltervalg, filtervalg, className}: DoubleCheckboxFilterformProps) {
    const [checkBoxValgGodkjent, setCheckBoxValgGodkjent] = useState<string[]>(filtervalg[formUtdanningGodkjent]);
    const [checkBoxValgBestatt, setCheckBoxValgBestatt] = useState<string[]>(filtervalg[formUtdanningBestatt]);

    useEffect(() => {
        setCheckBoxValgGodkjent(filtervalg[formUtdanningGodkjent]);
    }, [filtervalg]);

    useEffect(() => {
        setCheckBoxValgBestatt(filtervalg[formUtdanningBestatt]);
    }, [filtervalg]);

    const velgCheckBox = (e, typeForm) => {
        e.persist();
        const id = e.target.value.replace(`${typeForm}_`, '');
        if (typeForm === formUtdanningGodkjent)
            return e.target.checked
                ? endreFiltervalg(formUtdanningGodkjent, [...checkBoxValgGodkjent, id])
                : endreFiltervalg(
                      formUtdanningGodkjent,
                      checkBoxValgGodkjent.filter(value => value !== id)
                  );
        else if (typeForm === formUtdanningBestatt)
            return e.target.checked
                ? endreFiltervalg(formUtdanningBestatt, [...checkBoxValgBestatt, id])
                : endreFiltervalg(
                      formUtdanningBestatt,
                      checkBoxValgBestatt.filter(value => value !== id)
                  );
        return;
    };

    const nullstillValg = () => {
        endreFiltervalg(formUtdanningGodkjent, []);
        endreFiltervalg(formUtdanningBestatt, []);
    };

    return (
        <form>
            {harValgGodkjent && harValgBestatt && (
                <Grid columns={2} className={classNames('checkbox-filterform__valg__double', className)}>
                    <RadioGroup legend="Er utdanningen godkjent i Norge?" className="checkbox-filterform-col1">
                        <RenderFields
                            valg={uniqueValgGodkjent}
                            form={formUtdanningGodkjent}
                            velgCheckBox={e => velgCheckBox(e, formUtdanningGodkjent)}
                            checkBoxValg={checkBoxValgGodkjent}
                        />
                    </RadioGroup>

                    <RadioGroup legend="Er utdanningen bestått?" className="checkbox-filterform-col2">
                        <RenderFields
                            valg={uniqueValgBestatt}
                            form={formUtdanningBestatt}
                            velgCheckBox={e => velgCheckBox(e, formUtdanningBestatt)}
                            checkBoxValg={checkBoxValgBestatt}
                        />
                    </RadioGroup>
                </Grid>
            )}
            <NullstillKnapp
                dataTestId="double-checkbox-filterform"
                nullstillValg={nullstillValg}
                form={'utdanning-godkjent-og-bestatt'}
                disabled={!(checkBoxValgGodkjent.length > 0 || checkBoxValgBestatt.length > 0)}
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
                <Checkbox
                    key={filterKey}
                    id={filterKey}
                    value={filterKey}
                    checked={props.checkBoxValg.includes(filterKey.replace(`${props.form}_`, ''))}
                    onChange={props.velgCheckBox}
                    data-testid={`filter_${filterKey}`}
                >
                    {filterValue}
                </Checkbox>
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
