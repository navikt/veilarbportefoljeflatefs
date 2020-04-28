import React from 'react';
import { BarInputRadio } from '../../../components/barinput/barinput-radio';
import hiddenIf from '../../../components/hidden-if/hidden-if';
import { Element } from 'nav-frontend-typografi';
import { useStatusTallSelector } from '../../../hooks/redux/use-statustall';
import './arbeidsliste.less';
import { ReactComponent as ArbeidslisteikonBla } from '../../../components/ikoner/arbeidsliste/arbeidslisteikon_bla.svg';
import { ReactComponent as ArbeidslisteikonLilla } from '../../../components/ikoner/arbeidsliste/arbeidslisteikon_lilla.svg';
import { ReactComponent as ArbeidslisteikonGronn } from '../../../components/ikoner/arbeidsliste/arbeidslisteikon_gronn.svg';
import { ReactComponent as ArbeidslisteikonGul } from '../../../components/ikoner/arbeidsliste/arbeidslisteikon_gul.svg';
import BarInputCheckbox from '../../../components/barinput/barinput-checkbox';
import {
    MIN_ARBEIDSLISTE_BLA,
    MIN_ARBEIDSLISTE_GRONN,
    MIN_ARBEIDSLISTE_GUL,
    MIN_ARBEIDSLISTE_LILLA
} from '../../filter-konstanter';
import { ARBEIDSLISTEKATEGORI } from '../../../konstanter';
import { useFeatureSelector } from '../../../hooks/redux/use-feature-selector';

export interface FilterStatusMinArbeidslisteProps {
    ferdigfilterListe: string[];
    handleChange: (e: any) => void;
    handleChangeCheckbox: (e: any) => void;
    filtervalg: any;
    endreFiltervalg: (filterId: string, filterVerdi: any) => void;
    checked: boolean;
}

function FilterStatusMinArbeidsliste(props: FilterStatusMinArbeidslisteProps) {
    const statusTall = useStatusTallSelector();
    const erFeaturePa = useFeatureSelector()(ARBEIDSLISTEKATEGORI);
    return (
        <>
            <div className="minArbeidsliste__tittel typo-element">
                <Element className="blokk-xxs" tag="h3">
                    Arbeidsliste
                </Element>
            </div>
            <BarInputRadio
                filterNavn="minArbeidsliste"
                handleChange={props.handleChange}
                max={statusTall.totalt}
                antall={statusTall.minArbeidsliste}
                checked={props.checked}
            />
            {erFeaturePa && props.checked && (
                <div className="minArbeidsliste__kategori-checkboxwrapper">
                    <BarInputCheckbox
                        labelTekst={<><ArbeidslisteikonBla/><span className="arbeidslistetekst">Blå</span></>}
                        filterNavn="minArbeidslisteBla"
                        max={statusTall.totalt}
                        handleChange={props.handleChangeCheckbox}
                        checked={props.checked && props.ferdigfilterListe.includes(MIN_ARBEIDSLISTE_BLA)}
                        antall={statusTall.minArbeidslisteBla}
                    />
                    <BarInputCheckbox
                        labelTekst={<><ArbeidslisteikonLilla/><span className="arbeidslistetekst">Lilla</span></>}
                        filterNavn="minArbeidslisteLilla"
                        max={statusTall.totalt}
                        handleChange={props.handleChangeCheckbox}
                        checked={props.checked && props.ferdigfilterListe.includes(MIN_ARBEIDSLISTE_LILLA)}
                        antall={statusTall.minArbeidslisteLilla}
                    />
                    <BarInputCheckbox
                        labelTekst={<><ArbeidslisteikonGronn/><span className="arbeidslistetekst">Grønn</span></>}
                        filterNavn="minArbeidslisteGronn"
                        max={statusTall.totalt}
                        handleChange={props.handleChangeCheckbox}
                        checked={props.checked && props.ferdigfilterListe.includes(MIN_ARBEIDSLISTE_GRONN)}
                        antall={statusTall.minArbeidslisteGronn}
                    />
                    <BarInputCheckbox
                        labelTekst={<><ArbeidslisteikonGul/><span className="arbeidslistetekst">Gul</span></>}
                        filterNavn="minArbeidslisteGul"
                        max={statusTall.totalt}
                        handleChange={props.handleChangeCheckbox}
                        checked={props.checked && props.ferdigfilterListe.includes(MIN_ARBEIDSLISTE_GUL)}
                        antall={statusTall.minArbeidslisteGul}
                    />
                </div>
            )}
        </>
    );
}

export default hiddenIf(FilterStatusMinArbeidsliste);
