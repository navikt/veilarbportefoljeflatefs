import React, {useEffect, useState} from 'react';
import {Dictionary} from '../../../utils/types/types';
import {FiltervalgModell} from '../../../model-interfaces';
import './filterform.css';
import classNames from 'classnames';
import {utdanningBestatt, utdanningGodkjent} from '../../filter-konstanter';
import NullstillKnapp from '../../../components/nullstill-valg-knapp/nullstill-knapp';
import {Checkbox, CheckboxGroup, Label} from '@navikt/ds-react';
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

    const velgCheckBox = (valg: string[], typeForm) => {
        endreFiltervalg(
            typeForm,
            valg.map(v => v.replace(`${typeForm}_`, ''))
        );
    };

    const nullstillValg = () => {
        endreFiltervalg(formUtdanningGodkjent, []);
        endreFiltervalg(formUtdanningBestatt, []);
    };

    return (
        <form className="skjema checkbox-filterform">
            {harValgGodkjent && harValgBestatt && (
                <Grid columns={2} className={classNames('checkbox-filterform__valg__double', className)}>
                    <div
                        className="checkbox-filterform-col1"
                        role="group"
                        aria-labelledby="double-filterform-label-col1"
                    >
                        <Label id="double-filterform-label-col1" className="double-form-title" size="small">
                            {'Er utdanningen godkjent i Norge?'}
                        </Label>
                        <RenderFields
                            valg={uniqueValgGodkjent}
                            form={formUtdanningGodkjent}
                            velgCheckBox={(valg: string[]) => velgCheckBox(valg, formUtdanningGodkjent)}
                            checkBoxValg={checkBoxValgGodkjent}
                        />
                    </div>

                    <div
                        className="checkbox-filterform-col2"
                        role="group"
                        aria-labelledby="double-filterform-label-col2"
                    >
                        <Label id="double-filterform-label-col2" className="double-form-title" size="small">
                            {'Er utdanningen bestått?'}
                        </Label>{' '}
                        <RenderFields
                            valg={uniqueValgBestatt}
                            form={formUtdanningBestatt}
                            velgCheckBox={(valg: string[]) => velgCheckBox(valg, formUtdanningBestatt)}
                            checkBoxValg={checkBoxValgBestatt}
                        />
                    </div>
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
    velgCheckBox: (valg: string[]) => void;
    checkBoxValg: string[];
}) {
    return (
        <CheckboxGroup
            hideLegend
            legend=""
            onChange={props.velgCheckBox}
            value={props.checkBoxValg.map(valg => `${props.form}_${valg}`)}
        >
            {Object.entries(props.valg).map(([filterKey, filterValue]) => (
                <Checkbox data-testid={`filter_${filterKey}`} key={filterKey} value={filterKey} size="small">
                    {filterValue}
                </Checkbox>
            ))}
        </CheckboxGroup>
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
