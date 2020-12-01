import React, {useState} from 'react';
import {AktiviteterValg, FiltreringAktiviteterValg} from '../../ducks/filtrering';
import './filterform.less';
import VelgLukkKnapp from '../velg-lukk-knapp';
import NullstillValgKnapp from '../nullstill-valg-knapp';
import {Dictionary} from '../../utils/types/types';
import {FiltervalgModell} from '../../model-interfaces';

interface AktivitetFilterformProps {
    valg: Dictionary<string>;
    filtervalg: FiltervalgModell;
    endreFiltervalg: (form: string, filterVerdi: any) => void;
    closeDropdown: () => void;
}

const aktivitetInitialState: FiltreringAktiviteterValg = {
    BEHANDLING: AktiviteterValg.NA,
    EGEN: AktiviteterValg.NA,
    GRUPPEAKTIVITET: AktiviteterValg.NA,
    IJOBB: AktiviteterValg.NA,
    MOTE: AktiviteterValg.NA,
    SOKEAVTALE: AktiviteterValg.NA,
    STILLING: AktiviteterValg.NA,
    TILTAK: AktiviteterValg.NA,
    UTDANNINGAKTIVITET: AktiviteterValg.NA
};

function AktivitetFilterform(props: AktivitetFilterformProps) {
    const [valgteAktiviteter, setValgteAktiviteter] = useState<FiltreringAktiviteterValg>(
        Object.assign({}, aktivitetInitialState, props.filtervalg.aktiviteter)
    );

    const handleRadioChange = (aktivitetKey, verdi) => {
        setValgteAktiviteter(prevState => ({
            ...prevState,
            [aktivitetKey]: verdi
        }));
    };

    const fields = Object.entries(props.valg).map(([kode, verdi]) => [
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
                    data-testid={`aktivitet-filterform-${kode}-ja`}
                />
                <label htmlFor={`aktivitet-${kode}-ja`} className="skjemaelement__label aktivitet_radioknapp_label">
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
                    data-testid={`aktivitet-filterform-${kode}-nei`}
                />
                <label htmlFor={`aktivitet-${kode}-nei`} className="skjemaelement__label aktivitet_radioknapp_label">
                    <span className="sr-only">Nei, {verdi}</span>
                </label>
            </div>
        </div>
    ]);

    const harValg =
        valgteAktiviteter.BEHANDLING !== 'NA' ||
        valgteAktiviteter.EGEN !== 'NA' ||
        valgteAktiviteter.GRUPPEAKTIVITET !== 'NA' ||
        valgteAktiviteter.IJOBB !== 'NA' ||
        valgteAktiviteter.MOTE !== 'NA' ||
        valgteAktiviteter.SOKEAVTALE !== 'NA' ||
        valgteAktiviteter.STILLING !== 'NA' ||
        valgteAktiviteter.TILTAK !== 'NA' ||
        valgteAktiviteter.UTDANNINGAKTIVITET !== 'NA';

    const nullstillAktiviteter = () => {
        setValgteAktiviteter(aktivitetInitialState);
        props.endreFiltervalg('aktiviteter', aktivitetInitialState);
    };

    return (
        <form
            className="skjema aktivitetfilterform"
            onSubmit={() => {
                if (harValg) {
                    props.endreFiltervalg('aktiviteter', valgteAktiviteter);
                }
                props.closeDropdown();
            }}
        >
            <div className="aktivitetvalg__header blokk-xxs">
                <span className="aktivitetvalg__header--first">Ja</span>
                <span>Nei</span>
            </div>
            <div className="aktivitetfilterform__valg">{fields}</div>
            <div className="filterform__under-valg aktivitetfilter_knapper">
                <VelgLukkKnapp harValg={harValg} dataTestId={'aktivitet-filterform'} />
                <NullstillValgKnapp
                    dataTestId="aktivitet-filterform"
                    nullstillValg={nullstillAktiviteter}
                    form='aktiviteter'
                    disabled={!harValg}
                />
            </div>
        </form>
    );
}
export default AktivitetFilterform;
