import React from 'react';
import {Bleed} from '@navikt/ds-react';
import hiddenIf from '../../components/hidden-if/hidden-if';
import {useStatustallVeilederSelector} from '../../hooks/redux/use-statustall';
import {KategoriModell} from '../../model-interfaces';
import {BarInputRadio} from '../../components/barinput/barinput-radio';
import BarInputCheckbox from '../../components/barinput/barinput-checkbox';
import {ferdigfilterListeLabelTekst, MIN_ARBEIDSLISTE} from '../filter-konstanter';
import {useFeatureSelector} from '../../hooks/redux/use-feature-selector';
import {HUSKELAPP, SKJUL_ARBEIDSLISTEFUNKSJONALITET} from '../../konstanter';
import {ReactComponent as FargekategoriIkonBlaHalvsirkel} from '../../components/ikoner/fargekategorier/Fargekategoriikon_bla_halvsirkel.svg';
import {ReactComponent as FargekategoriIkonGronnTrekant} from '../../components/ikoner/fargekategorier/Fargekategoriikon_gronn_trekant.svg';
import {ReactComponent as FargekategoriIkonGulSirkel} from '../../components/ikoner/fargekategorier/Fargekategoriikon_gul_sirkel.svg';
import {ReactComponent as FargekategoriIkonLillaFirkant} from '../../components/ikoner/fargekategorier/Fargekategoriikon_lilla_firkant.svg';
import {ReactComponent as ArbeidslisteikonBla} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_bla.svg';
import {ReactComponent as ArbeidslisteikonGronn} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_gronn.svg';
import {ReactComponent as ArbeidslisteikonGul} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_gul.svg';
import {ReactComponent as ArbeidslisteikonLilla} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_lilla.svg';
import './arbeidsliste.css';

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
    const erHuskelappFeatureTogglePa = useFeatureSelector()(HUSKELAPP);
    const erSkjulArbeidslistefunksjonalitetTogglePa = useFeatureSelector()(SKJUL_ARBEIDSLISTEFUNKSJONALITET);

    if (erSkjulArbeidslistefunksjonalitetTogglePa) return null;

    return (
        <>
            <BarInputRadio
                filterNavn="minArbeidsliste"
                handleChange={handleChange}
                antall={statusTall.minArbeidsliste}
                filterVerdi={MIN_ARBEIDSLISTE}
                labelTekst={
                    erHuskelappFeatureTogglePa ? 'Gamle arbeidslister' : ferdigfilterListeLabelTekst[MIN_ARBEIDSLISTE]
                }
            />
            {checked && (
                <div className="minArbeidsliste__kategori-checkboxwrapper">
                    <BarInputCheckbox
                        labelTekst={
                            <>
                                <Bleed marginBlock="05" asChild>
                                    {erHuskelappFeatureTogglePa ? (
                                        <FargekategoriIkonBlaHalvsirkel fontSize="1.5rem" />
                                    ) : (
                                        <ArbeidslisteikonBla width="1.2rem" />
                                    )}
                                </Bleed>
                                Blå
                            </>
                        }
                        filterNavn="minArbeidslisteBla"
                        handleChange={handleChangeCheckbox}
                        checked={checked && ferdigfilterListe.includes(KategoriModell.BLA)}
                        antall={statusTall.minArbeidslisteBla}
                        filterVerdi={KategoriModell.BLA}
                    />
                    <BarInputCheckbox
                        labelTekst={
                            <>
                                <Bleed marginBlock="05" asChild>
                                    {erHuskelappFeatureTogglePa ? (
                                        <FargekategoriIkonGronnTrekant fontSize="1.5rem" />
                                    ) : (
                                        <ArbeidslisteikonGronn width="1.2rem" />
                                    )}
                                </Bleed>
                                Grønn
                            </>
                        }
                        filterNavn="minArbeidslisteGronn"
                        handleChange={handleChangeCheckbox}
                        checked={checked && ferdigfilterListe.includes(KategoriModell.GRONN)}
                        antall={statusTall.minArbeidslisteGronn}
                        filterVerdi={KategoriModell.GRONN}
                    />
                    <BarInputCheckbox
                        labelTekst={
                            <>
                                <Bleed marginBlock="05" asChild>
                                    {erHuskelappFeatureTogglePa ? (
                                        <FargekategoriIkonGulSirkel fontSize="1.5rem" />
                                    ) : (
                                        <ArbeidslisteikonGul width="1.2rem" />
                                    )}
                                </Bleed>
                                Gul
                            </>
                        }
                        filterNavn="minArbeidslisteGul"
                        handleChange={handleChangeCheckbox}
                        checked={checked && ferdigfilterListe.includes(KategoriModell.GUL)}
                        antall={statusTall.minArbeidslisteGul}
                        filterVerdi={KategoriModell.GUL}
                    />
                    <BarInputCheckbox
                        labelTekst={
                            <>
                                <Bleed marginBlock="05" asChild>
                                    {erHuskelappFeatureTogglePa ? (
                                        <FargekategoriIkonLillaFirkant fontSize="1.5rem" />
                                    ) : (
                                        <ArbeidslisteikonLilla width="1.2rem" />
                                    )}
                                </Bleed>
                                Lilla
                            </>
                        }
                        filterNavn="minArbeidslisteLilla"
                        handleChange={handleChangeCheckbox}
                        checked={checked && ferdigfilterListe.includes(KategoriModell.LILLA)}
                        antall={statusTall.minArbeidslisteLilla}
                        filterVerdi={KategoriModell.LILLA}
                    />
                </div>
            )}
        </>
    );
}

export default hiddenIf(FilterStatusMinArbeidsliste);
