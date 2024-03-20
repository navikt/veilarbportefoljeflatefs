import React from 'react';
import hiddenIf from '../../components/hidden-if/hidden-if';
import {useStatustallVeilederSelector} from '../../hooks/redux/use-statustall';
import './arbeidsliste.css';
import {ReactComponent as ArbeidslisteikonBla} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_bla.svg';
import {ReactComponent as ArbeidslisteikonGronn} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_gronn.svg';
import {ReactComponent as ArbeidslisteikonLilla} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_lilla.svg';
import {ReactComponent as ArbeidslisteikonGul} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_gul.svg';
import {KategoriModell} from '../../model-interfaces';
import {BarInputRadio} from '../../components/barinput/barinput-radio';
import BarInputCheckbox from '../../components/barinput/barinput-checkbox';
import {Label} from '@navikt/ds-react';
import {ferdigfilterListeLabelTekst, mapFilternavnTilFilterValue} from '../filter-konstanter';
import {useFeatureSelector} from '../../hooks/redux/use-feature-selector';
import {HUSKELAPP} from '../../konstanter';

export interface FilterStatusMinArbeidslisteProps {
    ferdigfilterListe: string[];
    handleChange: (e: any) => void;
    handleChangeCheckbox: (e: any) => void;
    checked: boolean;
}

function FilterStatusMinArbeidsliste({
    ferdigfilterListe,
    handleChange,
    handleChangeCheckbox,
    checked
}: FilterStatusMinArbeidslisteProps) {
    const statusTall = useStatustallVeilederSelector();
    const erHuskelappFeatureTogglePaa = useFeatureSelector()(HUSKELAPP);

    return (
        <>
            <Label className="minArbeidsliste__tittel">
                {erHuskelappFeatureTogglePaa ? 'Huskelapper og kategorier' : 'Arbeidsliste'}
            </Label>
            <BarInputRadio
                filterNavn="minArbeidsliste"
                handleChange={handleChange}
                antall={statusTall.minArbeidsliste}
                filterVerdi={mapFilternavnTilFilterValue['minArbeidsliste']}
                labelTekst={
                    erHuskelappFeatureTogglePaa
                        ? 'Gamle arbeidslister'
                        : ferdigfilterListeLabelTekst[mapFilternavnTilFilterValue['minArbeidsliste']]
                }
            />
            {checked && (
                <div className="minArbeidsliste__kategori-checkboxwrapper">
                    <BarInputCheckbox
                        labelTekst={
                            <>
                                <ArbeidslisteikonBla />
                                <span>Blå</span>
                            </>
                        }
                        filterNavn="minArbeidslisteBla"
                        handleChange={handleChangeCheckbox}
                        checked={checked && ferdigfilterListe.includes(KategoriModell.BLA)}
                        antall={statusTall.minArbeidslisteBla}
                        filterVerdi={mapFilternavnTilFilterValue['minArbeidslisteBla']}
                    />
                    <BarInputCheckbox
                        labelTekst={
                            <>
                                <ArbeidslisteikonGronn />
                                <span>Grønn</span>
                            </>
                        }
                        filterNavn="minArbeidslisteGronn"
                        handleChange={handleChangeCheckbox}
                        checked={checked && ferdigfilterListe.includes(KategoriModell.GRONN)}
                        antall={statusTall.minArbeidslisteGronn}
                        filterVerdi={mapFilternavnTilFilterValue['minArbeidslisteGronn']}
                    />
                    <BarInputCheckbox
                        labelTekst={
                            <>
                                <ArbeidslisteikonLilla />
                                <span>Lilla</span>
                            </>
                        }
                        filterNavn="minArbeidslisteLilla"
                        handleChange={handleChangeCheckbox}
                        checked={checked && ferdigfilterListe.includes(KategoriModell.LILLA)}
                        antall={statusTall.minArbeidslisteLilla}
                        filterVerdi={mapFilternavnTilFilterValue['minArbeidslisteLilla']}
                    />
                    <BarInputCheckbox
                        labelTekst={
                            <>
                                <ArbeidslisteikonGul />
                                <span>Gul</span>
                            </>
                        }
                        filterNavn="minArbeidslisteGul"
                        handleChange={handleChangeCheckbox}
                        checked={checked && ferdigfilterListe.includes(KategoriModell.GUL)}
                        antall={statusTall.minArbeidslisteGul}
                        filterVerdi={mapFilternavnTilFilterValue['minArbeidslisteGul']}
                    />
                </div>
            )}
        </>
    );
}

export default hiddenIf(FilterStatusMinArbeidsliste);
