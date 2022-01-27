import * as React from 'react';
import {kebabCase} from '../../utils/utils';
import {useState} from 'react';
import {Checkbox, CheckboxGroup} from '@navikt/ds-react';

export enum Meldepliktverdier {
    HAR_MELDEPLIKT = 'Om personen har meldeplikt eller ikke',
    LEVERT_MELDEKORT = 'Om personen har levert siste meldekort eller ikke',
    JOBB_14_DAGER = 'Jobbet siste 14 dager eller ikke',
    HVOR_MYE_JOBB = 'Hvor mye personen har jobbet',
    GJENNOMFORT_AKTIVITET = 'Gjennomført aktivitet/tiltak/kurs/utdanning eller ikke',
    SYKDOM = 'Sykdom',
    FERIE_FRAVAER = 'Ferie eller fravær',
    REGISTRERT = 'Ønsker fortsatt å stå registrert eller ikke'
}

interface CheckboxValgProps {
    onCheckboxChanged: (verdi) => void;
}

function CheckboxValg({onCheckboxChanged}: CheckboxValgProps) {
    const [checkboxListe, setCheckboxListe] = useState<number[]>([]);

    const handleCheckboxChanged = (e, verdi: number) => {
        let index;
        if (e.target.checked) {
            checkboxListe.push(verdi);
        } else {
            index = checkboxListe.indexOf(verdi);
            checkboxListe.splice(index, 1);
        }
        onCheckboxChanged(checkboxListe);
        setCheckboxListe([...checkboxListe]);
    };

    const erValgt = (verdi: number) => {
        return checkboxListe.indexOf(verdi) > -1;
    };

    const sjekkDisabled = (verdi: number) => {
        return checkboxListe.length >= 4 && !erValgt(verdi);
    };

    return (
        <CheckboxGroup legend="" hideLegend className="tilbakemelding-modal__checkbox">
            <Checkbox
                id={kebabCase(Meldepliktverdier.HAR_MELDEPLIKT)}
                type="checkbox"
                className="meldeplikt"
                value={kebabCase(Meldepliktverdier.HAR_MELDEPLIKT)}
                name="meldeplikt"
                onChange={e => handleCheckboxChanged(e, 1)}
                disabled={sjekkDisabled(1)}
                data-testid="checkboxvalg_1"
            >
                {Meldepliktverdier.HAR_MELDEPLIKT}
            </Checkbox>

            <Checkbox
                id={kebabCase(Meldepliktverdier.LEVERT_MELDEKORT)}
                type="checkbox"
                className="meldeplikt"
                value={kebabCase(Meldepliktverdier.LEVERT_MELDEKORT)}
                name="meldeplikt"
                onChange={e => handleCheckboxChanged(e, 2)}
                disabled={sjekkDisabled(2)}
                data-testid="checkboxvalg_2"
            >
                {Meldepliktverdier.LEVERT_MELDEKORT}
            </Checkbox>

            <Checkbox
                id={kebabCase(Meldepliktverdier.JOBB_14_DAGER)}
                type="checkbox"
                className="meldeplikt"
                value={kebabCase(Meldepliktverdier.JOBB_14_DAGER)}
                name="meldeplikt"
                onChange={e => handleCheckboxChanged(e, 3)}
                disabled={sjekkDisabled(3)}
                data-testid="checkboxvalg_3"
            >
                {Meldepliktverdier.JOBB_14_DAGER}
            </Checkbox>

            <Checkbox
                id={kebabCase(Meldepliktverdier.HVOR_MYE_JOBB)}
                type="checkbox"
                className="meldeplikt"
                value={kebabCase(Meldepliktverdier.HVOR_MYE_JOBB)}
                name="meldeplikt"
                onChange={e => handleCheckboxChanged(e, 4)}
                disabled={sjekkDisabled(4)}
                data-testid="checkboxvalg_4"
            >
                {Meldepliktverdier.HVOR_MYE_JOBB}
            </Checkbox>

            <Checkbox
                id={kebabCase(Meldepliktverdier.GJENNOMFORT_AKTIVITET)}
                type="checkbox"
                className="meldeplikt"
                value={kebabCase(Meldepliktverdier.GJENNOMFORT_AKTIVITET)}
                name="meldeplikt"
                onChange={e => handleCheckboxChanged(e, 5)}
                disabled={sjekkDisabled(5)}
                data-testid="checkboxvalg_5"
            >
                {Meldepliktverdier.GJENNOMFORT_AKTIVITET}
            </Checkbox>

            <Checkbox
                id={kebabCase(Meldepliktverdier.SYKDOM)}
                type="checkbox"
                className="meldeplikt"
                value={kebabCase(Meldepliktverdier.SYKDOM)}
                name="meldeplikt"
                onChange={e => handleCheckboxChanged(e, 6)}
                disabled={sjekkDisabled(6)}
                data-testid="checkboxvalg_6"
            >
                {Meldepliktverdier.SYKDOM}
            </Checkbox>

            <Checkbox
                id={kebabCase(Meldepliktverdier.FERIE_FRAVAER)}
                type="checkbox"
                className="meldeplikt"
                value={kebabCase(Meldepliktverdier.FERIE_FRAVAER)}
                name="meldeplikt"
                onChange={e => handleCheckboxChanged(e, 7)}
                disabled={sjekkDisabled(7)}
                data-testid="checkboxvalg_7"
            >
                {Meldepliktverdier.FERIE_FRAVAER}
            </Checkbox>

            <Checkbox
                id={kebabCase(Meldepliktverdier.REGISTRERT)}
                type="checkbox"
                className="meldeplikt"
                value={kebabCase(Meldepliktverdier.REGISTRERT)}
                name="meldeplikt"
                onChange={e => handleCheckboxChanged(e, 8)}
                disabled={sjekkDisabled(8)}
                data-testid="checkboxvalg_8"
            >
                {Meldepliktverdier.REGISTRERT}
            </Checkbox>
        </CheckboxGroup>
    );
}
export default CheckboxValg;
