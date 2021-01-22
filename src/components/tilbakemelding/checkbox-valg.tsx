import * as React from 'react';
import {kebabCase} from '../../utils/utils';
import {useState} from 'react';

export enum Meldepliktverdier {
    HAR_MELDEPLIKT = 'Om personen har meldeplikt eller ikke',
    DATO_MELDEKORT = 'Dato for innsending av siste meldekort',
    JOBB_14_DAGER = 'Jobbet siste 14 dager eller ikke',
    HVOR_MYE_JOBB = 'Hvor mye personen har jobbet',
    GJENNOMFORT_AKTIVITET = 'Gjennomført avtalt aktivitet/tiltak /kurs/utdanning eller ikke',
    SYKDOM = 'Sykdom',
    FERIE_FRAVAER = 'Ferie eller fravær',
    REGISTRERT = 'Ønsker forstatt å stå registrert eller ikke'
}

interface CheckboxValgProps {
    onCheckboxChanged: (verdi) => void;
}

function CheckboxValg({onCheckboxChanged}: CheckboxValgProps) {
    const [checkboxListe] = useState<number[]>([]);

    const handleCheckboxChanged = (e, verdi: number) => {
        let index;
        if (e.target.checked) {
            checkboxListe.push(verdi);
        } else {
            index = checkboxListe.indexOf(verdi);
            checkboxListe.splice(index, 1);
        }
        onCheckboxChanged(checkboxListe);
    };

    return (
        <div className="tilbakemelding-modal__checkbox-gruppe">
            <div className="tilbakemelding-modal__checkbox">
                <input
                    id={kebabCase(Meldepliktverdier.HAR_MELDEPLIKT)}
                    type="checkbox"
                    className="meldeplikt"
                    value={kebabCase(Meldepliktverdier.HAR_MELDEPLIKT)}
                    name="meldeplikt"
                    onChange={e => handleCheckboxChanged(e, 1)}
                />
                <label htmlFor={kebabCase(Meldepliktverdier.HAR_MELDEPLIKT)}>{Meldepliktverdier.HAR_MELDEPLIKT}</label>
            </div>

            <div className="tilbakemelding-modal__checkbox">
                <input
                    id={kebabCase(Meldepliktverdier.DATO_MELDEKORT)}
                    type="checkbox"
                    className="meldeplikt"
                    value={kebabCase(Meldepliktverdier.DATO_MELDEKORT)}
                    name="meldeplikt"
                    onChange={e => handleCheckboxChanged(e, 2)}
                />
                <label htmlFor={kebabCase(Meldepliktverdier.DATO_MELDEKORT)}>{Meldepliktverdier.DATO_MELDEKORT}</label>
            </div>

            <div className="tilbakemelding-modal__checkbox">
                <input
                    id={kebabCase(Meldepliktverdier.JOBB_14_DAGER)}
                    type="checkbox"
                    className="meldeplikt"
                    value={kebabCase(Meldepliktverdier.JOBB_14_DAGER)}
                    name="meldeplikt"
                    onChange={e => handleCheckboxChanged(e, 3)}
                />
                <label htmlFor={kebabCase(Meldepliktverdier.JOBB_14_DAGER)}>{Meldepliktverdier.JOBB_14_DAGER}</label>
            </div>

            <div className="tilbakemelding-modal__checkbox">
                <input
                    id={kebabCase(Meldepliktverdier.HVOR_MYE_JOBB)}
                    type="checkbox"
                    className="meldeplikt"
                    value={kebabCase(Meldepliktverdier.HVOR_MYE_JOBB)}
                    name="meldeplikt"
                    onChange={e => handleCheckboxChanged(e, 4)}
                />
                <label htmlFor={kebabCase(Meldepliktverdier.HVOR_MYE_JOBB)}>{Meldepliktverdier.HVOR_MYE_JOBB}</label>
            </div>

            <div className="tilbakemelding-modal__checkbox">
                <input
                    id={kebabCase(Meldepliktverdier.GJENNOMFORT_AKTIVITET)}
                    type="checkbox"
                    className="meldeplikt"
                    value={kebabCase(Meldepliktverdier.GJENNOMFORT_AKTIVITET)}
                    name="meldeplikt"
                    onChange={e => handleCheckboxChanged(e, 5)}
                />
                <label htmlFor={kebabCase(Meldepliktverdier.GJENNOMFORT_AKTIVITET)}>
                    {Meldepliktverdier.GJENNOMFORT_AKTIVITET}
                </label>
            </div>

            <div className="tilbakemelding-modal__checkbox">
                <input
                    id={kebabCase(Meldepliktverdier.SYKDOM)}
                    type="checkbox"
                    className="meldeplikt"
                    value={kebabCase(Meldepliktverdier.SYKDOM)}
                    name="meldeplikt"
                    onChange={e => handleCheckboxChanged(e, 6)}
                />
                <label htmlFor={kebabCase(Meldepliktverdier.SYKDOM)}>{Meldepliktverdier.SYKDOM}</label>
            </div>

            <div className="tilbakemelding-modal__checkbox">
                <input
                    id={kebabCase(Meldepliktverdier.FERIE_FRAVAER)}
                    type="checkbox"
                    className="meldeplikt"
                    value={kebabCase(Meldepliktverdier.FERIE_FRAVAER)}
                    name="meldeplikt"
                    onChange={e => handleCheckboxChanged(e, 7)}
                />
                <label htmlFor={kebabCase(Meldepliktverdier.FERIE_FRAVAER)}>{Meldepliktverdier.FERIE_FRAVAER}</label>
            </div>

            <div className="tilbakemelding-modal__checkbox">
                <input
                    id={kebabCase(Meldepliktverdier.REGISTRERT)}
                    type="checkbox"
                    className="meldeplikt"
                    value={kebabCase(Meldepliktverdier.REGISTRERT)}
                    name="meldeplikt"
                    onChange={e => handleCheckboxChanged(e, 8)}
                />
                <label htmlFor={kebabCase(Meldepliktverdier.REGISTRERT)}>{Meldepliktverdier.REGISTRERT}</label>
            </div>
        </div>
    );
}
export default CheckboxValg;
