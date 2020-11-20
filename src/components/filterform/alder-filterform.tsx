import React, {useEffect, useState} from 'react';
import {FiltervalgModell} from '../../model-interfaces';
import {Dictionary} from '../../utils/types/types';
import Grid from '../grid/grid';
import classNames from 'classnames';
import './filterform.less';
import {logEvent} from '../../utils/frontend-logger';
import {finnSideNavn} from '../../middleware/metrics-middleware';
import VelgLukkKnapp from '../velg-lukk-knapp';
import NullstillValgKnapp from '../nullstill-valg-knapp';
import {useFeatureSelector} from '../../hooks/redux/use-feature-selector';
import {NULLSTILL_KNAPP} from '../../konstanter';

interface AlderFilterformProps {
    form: string;
    valg: Dictionary<string>;
    endreFiltervalg: (form: string, filterVerdi: string[]) => void;
    closeDropdown: () => void;
    filtervalg: FiltervalgModell;
    className?: string;
}

function AlderFilterform({endreFiltervalg, valg, closeDropdown, form, filtervalg, className}: AlderFilterformProps) {
    const [checkBoxValg, setCheckBoxValg] = useState<string[]>([]);
    const [inputAlderFra, setInputAlderFra] = useState<string>('');
    const [inputAlderTil, setInputAlderTil] = useState<string>('');
    const [feil, setFeil] = useState(false);
    const [feilTekst, setFeilTekst] = useState<string>('');
    const erNullstillFeatureTogglePa = useFeatureSelector()(NULLSTILL_KNAPP);

    const harValg = Object.keys(valg).length > 0;
    const kanVelgeFilter = checkBoxValg.length > 0 || inputAlderFra.length > 0 || inputAlderTil.length > 0;

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

    const onSubmitCustomInput = () => {
        const inputFraNummer: number = parseInt(inputAlderFra);
        const inputTilNummer: number = parseInt(inputAlderTil);

        if (inputFraNummer > inputTilNummer) {
            setFeil(true);
            setFeilTekst('Fra-alder kan ikke være større enn til-alder.');
        } else if (inputFraNummer >= 100 && inputAlderTil.length === 0) {
            setFeil(true);
            setFeilTekst('Du må skrive et tall lavere enn 100 i fra-feltet hvis til-feltet står tomt.');
        } else {
            setFeil(false);
            setFeilTekst('');
            if (inputAlderFra.length === 0 && inputAlderTil.length > 0) {
                endreFiltervalg(form, [0 + '-' + inputAlderTil]);
            } else if (inputAlderFra.length > 0 && inputAlderTil.length === 0) {
                endreFiltervalg(form, [inputAlderFra + '-' + 100]);
            } else if (inputAlderFra.length > 0 && inputAlderTil.length > 0) {
                endreFiltervalg(form, [inputAlderFra + '-' + inputAlderTil]);
            }
            closeDropdown();
        }
    };

    const submitForm = e => {
        e.preventDefault();

        if (checkBoxValg.length > 0) {
            endreFiltervalg(form, checkBoxValg);
            logEvent('portefolje.metrikker.aldersfilter', {
                checkbox: true,
                sideNavn: finnSideNavn()
            });
            closeDropdown();
        }
        if (inputAlderFra.length > 0 || inputAlderTil.length > 0) {
            onSubmitCustomInput();
            logEvent('portefolje.metrikker.aldersfilter', {
                checkbox: false,
                sideNavn: finnSideNavn()
            });
        }
        if (!kanVelgeFilter) {
            closeDropdown();
        }
    };

    const fjernTegn = e => {
        (e.key === 'e' || e.key === '.' || e.key === ',' || e.key === '-' || e.key === '+') && e.preventDefault();
    };

    const nullstillValg = () => {
        setInputAlderFra('');
        setInputAlderTil('');
        setCheckBoxValg([]);
        endreFiltervalg(form, []);
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
                        <div className="alder-container">
                            <label htmlFor="filter_alder-fra">Fra:</label>
                            <input
                                min={0}
                                type="number"
                                id="filter_alder-fra"
                                className={classNames('filter_alder', feil && 'filter_alder__validering')}
                                data-testid="filter_alder-fra"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInput(e, false)}
                                value={inputAlderFra}
                                onKeyDown={e => fjernTegn(e)}
                            />
                        </div>
                        <div className="alder-container">
                            <label htmlFor="filter_alder-til">Til:</label>
                            <input
                                min={0}
                                type="number"
                                id="filter_alder-til"
                                className={classNames('filter_alder', feil && 'filter_alder__validering')}
                                data-testid="filter_alder-til"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInput(e, true)}
                                value={inputAlderTil}
                                onKeyDown={e => fjernTegn(e)}
                            />
                        </div>
                    </div>
                    {feil && (
                        <p className="validering-tekst" data-testid="filter_alder_valideringstekst">
                            {feilTekst}
                        </p>
                    )}
                </>
            )}
            <div
                className={
                    erNullstillFeatureTogglePa ? 'filterform__under-valg__nullstill-feature' : 'filterform__under-valg'
                }
            >
                <VelgLukkKnapp harValg={kanVelgeFilter} dataTestId="checkbox-filterform" />
                {erNullstillFeatureTogglePa && (
                    <NullstillValgKnapp dataTestId="alder-filterform" nullstillValg={nullstillValg} />
                )}
            </div>
        </form>
    );
}

export default AlderFilterform;
