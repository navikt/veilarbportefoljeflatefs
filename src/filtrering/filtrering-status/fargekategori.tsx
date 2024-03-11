import React from 'react';
import hiddenIf from '../../components/hidden-if/hidden-if';
import {useStatustallVeilederSelector} from '../../hooks/redux/use-statustall';
import './arbeidsliste.css';
import {ReactComponent as ArbeidslisteikonBla} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_bla.svg';
import {ReactComponent as ArbeidslisteikonGronn} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_gronn.svg';
import {ReactComponent as ArbeidslisteikonLilla} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_lilla.svg';
import {ReactComponent as ArbeidslisteikonGul} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_gul.svg';
import BarInputCheckbox from '../../components/barinput/barinput-checkbox';
import {
    FARGEKATEGORI_A,
    FARGEKATEGORI_B,
    FARGEKATEGORI_C,
    FARGEKATEGORI_D,
    FARGEKATEGORI_E,
    FARGEKATEGORI_F,
    FARGEKATEGORI_INGEN_KATEGORI,
    ferdigfilterListeLabelTekst
} from '../filter-konstanter';

export interface FilterStatusMineFargekategorierProps {
    valgteFargekategoriFilter: string[];
    handleChange: (e: any) => void;
    handleChangeCheckbox: (e: any) => void;
    checked: boolean;
    indeterminate: boolean;
}

function FilterStatusMineFargekategorier({
    valgteFargekategoriFilter,
    handleChange,
    handleChangeCheckbox,
    checked,
    indeterminate
}: FilterStatusMineFargekategorierProps) {
    const statusTall = useStatustallVeilederSelector();
    const {
        fargekategoriA,
        fargekategoriB,
        fargekategoriC,
        fargekategoriD,
        fargekategoriE,
        fargekategoriF,
        fargekategoriIngenKategori
    } = statusTall;

    return (
        <>
            <BarInputCheckbox
                filterNavn="mineFargekategorier"
                handleChange={handleChange}
                checked={checked}
                labelTekst={ferdigfilterListeLabelTekst.MINE_FARGEKATEGORIER}
                indeterminate={indeterminate}
            />
            {checked && (
                <div className="minArbeidsliste__kategori-checkboxwrapper">
                    <BarInputCheckbox
                        labelTekst={
                            <>
                                {/*TODO: Bruke riktig ikon når det er klart*/}
                                <ArbeidslisteikonBla />
                                <span>Blå</span>
                            </>
                        }
                        filterNavn="mineFargekategorierA"
                        handleChange={handleChangeCheckbox}
                        checked={checked && valgteFargekategoriFilter.includes(FARGEKATEGORI_A)}
                        antall={fargekategoriA}
                    />
                    <BarInputCheckbox
                        labelTekst={
                            <>
                                {/*TODO: Bruke riktig ikon når det er klart*/}
                                <ArbeidslisteikonGronn />
                                <span>Grønn</span>
                            </>
                        }
                        filterNavn="mineFargekategorierB"
                        handleChange={handleChangeCheckbox}
                        checked={checked && valgteFargekategoriFilter.includes(FARGEKATEGORI_B)}
                        antall={fargekategoriB}
                    />
                    <BarInputCheckbox
                        labelTekst={
                            <>
                                {/*TODO: Bruke riktig ikon når det er klart*/}
                                <ArbeidslisteikonLilla />
                                <span>Lilla</span>
                            </>
                        }
                        filterNavn="mineFargekategorierC"
                        handleChange={handleChangeCheckbox}
                        checked={checked && valgteFargekategoriFilter.includes(FARGEKATEGORI_C)}
                        antall={fargekategoriC}
                    />
                    <BarInputCheckbox
                        labelTekst={
                            <>
                                {/*TODO: Bruke riktig ikon når det er klart*/}
                                <ArbeidslisteikonGul />
                                <span>Gul</span>
                            </>
                        }
                        filterNavn="mineFargekategorierD"
                        handleChange={handleChangeCheckbox}
                        checked={checked && valgteFargekategoriFilter.includes(FARGEKATEGORI_D)}
                        antall={fargekategoriD}
                    />
                    <BarInputCheckbox
                        labelTekst={
                            <>
                                {/*TODO: Bruke riktig ikon når det er klart*/}
                                <ArbeidslisteikonBla />
                                <span>Lyseblå</span>
                            </>
                        }
                        filterNavn="mineFargekategorierE"
                        handleChange={handleChangeCheckbox}
                        checked={checked && valgteFargekategoriFilter.includes(FARGEKATEGORI_E)}
                        antall={fargekategoriE}
                    />
                    <BarInputCheckbox
                        labelTekst={
                            <>
                                {/*TODO: Bruke riktig ikon når det er klart*/}
                                <ArbeidslisteikonBla />
                                <span>Oransje</span>
                            </>
                        }
                        filterNavn="mineFargekategorierF"
                        handleChange={handleChangeCheckbox}
                        checked={checked && valgteFargekategoriFilter.includes(FARGEKATEGORI_F)}
                        antall={fargekategoriF}
                    />
                    <BarInputCheckbox
                        labelTekst={
                            <>
                                {/*TODO: Bruke riktig ikon når det er klart*/}
                                <ArbeidslisteikonBla />
                                <span>Ingen farge</span>
                            </>
                        }
                        filterNavn="mineFargekategorierIngenKategori"
                        handleChange={handleChangeCheckbox}
                        checked={checked && valgteFargekategoriFilter.includes(FARGEKATEGORI_INGEN_KATEGORI)}
                        antall={fargekategoriIngenKategori}
                    />
                </div>
            )}
        </>
    );
}

export default hiddenIf(FilterStatusMineFargekategorier);
