import React, { useState } from 'react';
import SubmitKnapp from './../submit-knapp';
import { AktiviteterValg, FiltreringAktiviteterValg } from '../../ducks/filtrering';
import './aktivitet-filterform.less';

const aktivitetInitialState: FiltreringAktiviteterValg = {
    'BEHANDLING': AktiviteterValg.NA,
    'EGEN': AktiviteterValg.NA,
    'GRUPPEAKTIVITET': AktiviteterValg.NA,
    'IJOBB': AktiviteterValg.NA,
    'MOTE': AktiviteterValg.NA,
    'SOKEAVTALE': AktiviteterValg.NA,
    'STILLING': AktiviteterValg.NA,
    'TILTAK': AktiviteterValg.NA,
    'UTDANNINGAKTIVITET': AktiviteterValg.NA
};

function AktivitetFilterform(props) {

    const [valgteAktiviteter, setValgteAktiviteter] = useState<FiltreringAktiviteterValg>(Object.assign({}, aktivitetInitialState, props.filtervalg.aktiviteter));

    const handleRadioChange = (aktivitetKey, verdi) => {
        setValgteAktiviteter(prevState => ({...prevState, [aktivitetKey]: verdi}));
    };

    const fields = Object.entries(props.valg)
        .map(([kode, verdi]) => [
            <div key={`skjemaelement skjemaelement--horisontal aktivitet-${kode}`} className="aktivitetvalg blokk-xxs">
                <span className="aktivitetvalg__tekst">{verdi as string}</span>
                <div className="radioknapp-gruppe">
                    <input
                        id={`aktivitet-${kode}-ja`}
                        name={kode}
                        value="JA"
                        type="radio"
                        checked={valgteAktiviteter[kode] === 'JA'}
                        className="skjemaelement__input radioknapp"
                        onChange={() => handleRadioChange(kode, 'JA')}
                        key={`Ja, ${verdi}`}
                    />
                    <label
                        htmlFor={`aktivitet-${kode}-ja`}
                        className="skjemaelement__label aktivitet_radioknapp_label"
                    >
                        <span className="sr-only">Ja, {verdi}</span>
                    </label>
                    <input
                        id={`aktivitet-${kode}-nei`}
                        name={kode}
                        value="NEI"
                        type="radio"
                        checked={valgteAktiviteter[kode] === 'NEI'}
                        className="skjemaelement__input radioknapp"
                        onChange={() => handleRadioChange(kode, 'NEI')}
                        key={`NEJ, ${verdi}`}
                    />
                    <label
                        htmlFor={`aktivitet-${kode}-nei`}
                        className="skjemaelement__label aktivitet_radioknapp_label"
                    >
                        <span className="sr-only">Nei, {verdi}</span>
                    </label>
                </div>
            </div>
        ]);

    return (
        <form className="skjema aktivitetfilterform" onSubmit={() => {
            props.onSubmit('aktiviteter', valgteAktiviteter);
            props.closeDropdown();
        }}>
            <div className="aktivitetvalg__header blokk-xxs">
                <span className="aktivitetvalg__header--first">Ja</span>
                <span>Nei</span>
            </div>
            <div className="aktivitetfilterform__valg">
                {fields}
            </div>
            <div className="aktivitetfilter_knapper blokk-xxs">
                <SubmitKnapp pristine={false} closeDropdown={props.closeDropdown}/>
                <button
                    type="button"
                    className="knapp knapp--standard knapp--mini"
                    onClick={() => setValgteAktiviteter(aktivitetInitialState)}
                >
                    Fjern aktiviteter
                </button>
            </div>
        </form>
    );
}

export default AktivitetFilterform;
