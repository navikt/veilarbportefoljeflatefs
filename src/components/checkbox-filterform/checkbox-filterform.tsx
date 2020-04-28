import React, { useEffect, useState } from 'react';
import { Dictionary } from '../../utils/types/types';
import { FiltervalgModell } from '../../model-interfaces';
import Grid from '../grid/grid';
import AlertStripe from 'nav-frontend-alertstriper';
import './checkbox-filterform.less';
import classNames from 'classnames';

interface CheckboxFilterformProps {
    form: string,
    valg: Dictionary<string>
    endreFilterValg: (form: string, filterVerdi: string[]) => void;
    closeDropdown?: () => void;
    filtervalg: FiltervalgModell;
    columns?: number;
    className?: string;
}

function CheckboxFilterform({endreFilterValg, valg, closeDropdown, form, filtervalg, columns = 1, className}: CheckboxFilterformProps) {
    const harValg = Object.keys(valg).length > 0;

    const [checkBoxValg, setCheckBoxValg] = useState<string[]>(filtervalg[form]);

    useEffect(() => {
        setCheckBoxValg(filtervalg[form]);
    }, [filtervalg, form]);

    const velgCheckBox = (e) => {
        e.persist();
        return (
            e.target.checked
                ? setCheckBoxValg(prevState => [...prevState, e.target.value])
                : setCheckBoxValg(prevState => prevState.filter(value => value !== e.target.value))
        );
    };

    return (
        <form className="skjema checkbox-filterform" onSubmit={(e) => {
            e.preventDefault();
            endreFilterValg(form, checkBoxValg);
            if (closeDropdown) {
                closeDropdown();
            }
        }}>
            {harValg &&
            <div className={classNames('checkbox-filterform__valg', className)}>
                <Grid columns={columns}>
                    <RenderFields valg={valg} velgCheckBox={velgCheckBox} checkBoxValg={checkBoxValg}/>
                </Grid>
            </div>
            }
            <div className="checkbox-filterform__under-valg">
                {closeDropdown ?
                    checkBoxValg.length > 0
                        ? <button className="knapp knapp--mini knapp--hoved" type="submit">
                            Velg
                        </button>
                        : <button className="knapp knapp--mini" type="button" onClick={closeDropdown}>
                            Lukk
                        </button>
                    : <button className="knapp knapp--mini knapp--hoved" type="submit">
                        Velg
                    </button>}

                {!harValg && <AlertStripe type="info" className="checkbox-filterform__alertstripe">
                    Ingen veiledere funnet
                </AlertStripe>}
            </div>
        </form>
    );
}

function RenderFields(props: { valg: Dictionary<string>, velgCheckBox: (e) => void, checkBoxValg: string[] }) {
    return (
        <>
            {Object.entries(props.valg)
                .map(([filterKey, filterValue]) =>
                    <div className="skjemaelement skjemaelement--horisontal" key={filterKey}>
                        <input
                            id={filterKey}
                            type="checkbox"
                            className="skjemaelement__input checkboks"
                            value={filterKey}
                            checked={props.checkBoxValg && props.checkBoxValg.includes(filterKey)}
                            onChange={props.velgCheckBox}
                        />
                        <label htmlFor={filterKey} className="skjemaelement__label">{filterValue}</label>
                    </div>
                )
            }
        </>
    );
}

export default CheckboxFilterform;
