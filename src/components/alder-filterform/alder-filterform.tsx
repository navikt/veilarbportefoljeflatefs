import React, {useState} from 'react';
import {FiltervalgModell} from '../../model-interfaces';
import {Dictionary} from '../../utils/types/types';
import Grid from '../grid/grid';
import classNames from 'classnames';
import './alder-filterform.less';

interface AlderFilterformProps {
    form: string;
    valg: Dictionary<string>;
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    closeDropdown?: () => void;
    filtervalg: FiltervalgModell;
    columns?: number;
    className?: string;
}

function AlderFilterform({
    endreFiltervalg,
    valg,
    closeDropdown,
    form,
    filtervalg,
    columns = 1,
    className
}: AlderFilterformProps) {

    console.log('form', form);
    console.log('filtervalg', filtervalg[form]);
    const [checkBoxValg, setCheckBoxValg] = useState<string[]>(filtervalg[form]);
    const [inputAlderFra, setInputAlderFra] = useState<string[]>([]);
    const [inputAlderTil, setInputAlderTil] = useState<string[]>([]);
    const [inputValg, setInputValg] = useState<string[]>(filtervalg[form]);

    // const input = `${inputAlderFra}-${inputAlderTil}`;

    console.log('checkbox', checkBoxValg);
    console.log('valg', inputValg);

    const [inputDirty, setInputDirty] = useState(inputAlderFra === [''] || inputAlderTil === ['']);
    const harValg = Object.keys(valg).length > 0 || inputDirty;

    const velgCheckBox = e => {
        if (inputDirty) {
            setInputAlderTil([]);
            setInputAlderFra([]);
        }
        e.persist();
        setCheckBoxValg(filtervalg[form]);
        return e.target.checked
            ? setCheckBoxValg(prevState => [...prevState, e.target.value])
            : setCheckBoxValg(prevState => prevState.filter(value => value !== e.target.value));
    };

    const setDirty = () => {
        if (inputAlderFra.length > 0 || inputAlderTil.length > 0) {
            setInputDirty(true);
        } else {
            setInputAlderFra([]);
            setInputAlderTil([]);
            setInputDirty(false);
        }
    };

    const changeInput = (e, til) => {
        setDirty();
        if (checkBoxValg.length > 0) {
            setCheckBoxValg([]);
        }
        // setInputValg(inputAlderFra, inputAlderTil)
        if (til) {
            setInputAlderTil([e.target.value]);
        } else {
            setInputAlderFra([e.target.value]);
        }
    };

    const submitForm = e => {
        e.preventDefault();
        checkBoxValg.length > 0 && endreFiltervalg(form, checkBoxValg);
        if (closeDropdown) {
            closeDropdown();
        }
    };

    return (
        <form
            className="skjema checkbox-filterform"
            onSubmit={e => {
                submitForm(e);
            }}
        >
            {harValg && (
                <>
                    <div className={classNames('checkbox-filterform__valg', className)}>
                        <Grid columns={columns}>
                            {Object.entries(valg).map(([filterKey, filterValue]) => (
                                <div className="skjemaelement skjemaelement--horisontal" key={filterKey}>
                                    <input
                                        id={filterKey}
                                        type="checkbox"
                                        className="skjemaelement__input checkboks"
                                        value={filterKey}
                                        checked={checkBoxValg.includes(filterKey)}
                                        onChange={velgCheckBox}
                                        data-testid={`filter_${filterKey}`}
                                    />
                                    <label htmlFor={filterKey} className="skjemaelement__label">
                                        {filterValue}
                                    </label>
                                </div>
                            ))}
                        </Grid>
                    </div>

                    <p className="filter-alder__tekst"> ------ eller ------ </p>

                    <div className="alder-input">
                        <div className="alder-container_fra">
                            {console.log(inputAlderFra)}
                            <label htmlFor="filter_alder-fra">Fra:</label>
                            <input
                                min={0}
                                type="number"
                                id="filter_alder-fra"
                                className="filter_alder-fra"
                                data-testid="filter_alder-fra"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeInput(e, false)}
                                value={inputAlderFra}
                            />
                        </div>
                        <div className="alder-container_til">
                            {console.log(inputAlderTil)}
                            <label htmlFor="filter_alder-til">Til:</label>
                            <input
                                min={0}
                                type="number"
                                id="filter_alder-til"
                                className="filter_alder-til"
                                data-testid="filter_alder-til"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeInput(e, true)}
                                value={inputAlderTil}
                            />
                        </div>
                    </div>
                </>
            )}
            <div className="checkbox-filterform__under-valg">
                {checkBoxValg.length > 0 || inputDirty ? (
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
                )}
            </div>
        </form>
    );
}

export default AlderFilterform;
