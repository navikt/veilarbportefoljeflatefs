import React, {useState} from 'react';
import classNames from 'classnames';
import Grid from '../grid/grid';
import {Checkbox} from "nav-frontend-skjema";

function CheckboxFilterformNy({ filterId, onSubmit, valg, closeDropdown, filtervalg, kolonner = 1 }) {
    const initialValues = Object.keys(valg).reduce((acc, v) => ({
        ...acc,
        [v]: filtervalg[filterId].includes(v)
    }), {});

    console.log("initialValues", initialValues);

    const [valgteFilterValg, setValgteFilterValg] = useState<string[]>([]);


    const createHandleOnSubmit = () => {
        closeDropdown();
        if(valgteFilterValg) {
            onSubmit(filterId, valgteFilterValg);
        }
    };

    const hanterChange = (event) => {
        const veilederTarget = event.target.value;
        event.target.checked
            ? setValgteFilterValg([veilederTarget, ...valgteFilterValg])
            : setValgteFilterValg(valgteFilterValg.filter(veileder => veileder !== veilederTarget))
    };

    const harValg = valgteFilterValg.length > 0;
    return (
        <div className = "skjema checkbox-filterform">
            <div className="checkbox-filterform__valg">
                <Grid columns={kolonner}>
                   <div/>
                </Grid>
            </div>
            <div className="checkbox-filterform__under-valg">
                <div
                    className={classNames('checkbox-filterform__valg-knapp', 'knapperad', 'blokk-xxs')}
                >
                    <button onClick={createHandleOnSubmit}
                            className={classNames('knapp', 'knapp--mini', {'knapp--hoved': harValg})}>
                        {harValg ? "Velg" : "Lukk"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CheckboxFilterformNy;
