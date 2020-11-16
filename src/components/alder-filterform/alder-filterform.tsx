import React, {useEffect, useState} from 'react';
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
    className?: string;
}

function AlderFilterform({endreFiltervalg, valg, closeDropdown, form, filtervalg, className}: AlderFilterformProps) {
    const [checkBoxValg, setCheckBoxValg] = useState<string[]>([]);
    const [inputAlderFra, setInputAlderFra] = useState<string>('');
    const [inputAlderTil, setInputAlderTil] = useState<string>('');
    const [feil, setFeil] = useState(false);

    const harValg = Object.keys(valg).length > 0;

    useEffect(() => {
        const alderValg = filtervalg[form];
        const konstAlderVerdi = Object.entries(valg).map(([filterKey]) => filterKey);
        alderValg.forEach(alder => {
            if (konstAlderVerdi.includes(alder)) {
                setCheckBoxValg(prevState => [...prevState, alder]);
            } else {
                const [alderFra, alderTil] = alder.split('-');
                alderFra && setInputAlderFra(alderFra);
                alderTil && setInputAlderTil(alderTil);
            }
        });
    }, [filtervalg, form, valg]);

    const velgCheckBox = e => {
        setInputAlderTil('');
        setInputAlderFra('');
        setFeil(false);
        e.persist();
        return e.target.checked
            ? setCheckBoxValg(prevState => [...prevState, e.target.value])
            : setCheckBoxValg(prevState => prevState.filter(value => value !== e.target.value));
    };

    const onChangeInput = (e, til) => {
        setFeil(false);
        setCheckBoxValg([]);
        if (til) {
            setInputAlderTil(e.target.value);
        } else {
            setInputAlderFra(e.target.value);
        }
    };

    const onSubmitInput = () => {
        const inputFraNummer: number = parseInt(inputAlderFra);
        const inputTilNummer: number = parseInt(inputAlderTil);
        if (inputFraNummer > inputTilNummer) {
            setFeil(true);
        } else {
            setFeil(false);
            if (inputAlderFra.length === 0 && inputAlderTil.length > 0) {
                endreFiltervalg(form, [0 + '-' + inputAlderTil]);
            }
            if (inputAlderFra.length > 0 && inputAlderTil.length === 0) {
                endreFiltervalg(form, [inputAlderFra + '-' + 70]);
            }
            if (inputAlderFra.length > 0 && inputAlderTil.length > 0) {
                endreFiltervalg(form, [inputAlderFra + '-' + inputAlderTil]);
            }
            if (closeDropdown) {
                closeDropdown();
            }
        }
    };

    const submitForm = e => {
        e.preventDefault();
        if (checkBoxValg.length) {
            endreFiltervalg(form, checkBoxValg);
            if (closeDropdown) {
                closeDropdown();
            }
        } else {
            onSubmitInput();
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
                        <Grid columns={2}>
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
                    <p className="skilletekst">----------------------------------</p>
                    <div className={classNames('alder-input', feil && 'alder-input__validering')}>
                        <div className="alder-container_fra">
                            <label htmlFor="filter_alder-fra">Fra:</label>
                            <input
                                min={0}
                                type="number"
                                id="filter_alder-fra"
                                className={classNames('filter_alder', feil && 'filter_alder__validering')}
                                data-testid="filter_alder-fra"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInput(e, false)}
                                value={inputAlderFra}
                            />
                        </div>
                        <div className="alder-container_til">
                            <label htmlFor="filter_alder-til">Til:</label>
                            <input
                                min={0}
                                type="number"
                                id="filter_alder-til"
                                className={classNames('filter_alder', feil && 'filter_alder__validering')}
                                data-testid="filter_alder-til"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInput(e, true)}
                                value={inputAlderTil}
                            />
                        </div>
                    </div>
                    {feil && <p className="validering-tekst"> Fra-alder kan ikke være større enn til-alder.</p>}
                </>
            )}
            <div className="checkbox-filterform__under-valg">
                {checkBoxValg.length > 0 || inputAlderFra.length > 0 || inputAlderTil.length > 0 ? (
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
