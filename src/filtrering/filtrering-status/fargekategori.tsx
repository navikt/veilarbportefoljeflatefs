import React from 'react';
import hiddenIf from '../../components/hidden-if/hidden-if';
import {useStatustallVeilederSelector} from '../../hooks/redux/use-statustall';
import './arbeidsliste.css';
import {ReactComponent as ArbeidslisteikonBla} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_bla.svg';
import {ReactComponent as ArbeidslisteikonGronn} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_gronn.svg';
import {ReactComponent as ArbeidslisteikonLilla} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_lilla.svg';
import {ReactComponent as ArbeidslisteikonGul} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_gul.svg';
import {PortefoljeFilter} from '../../model-interfaces';
import BarInputCheckbox from '../../components/barinput/barinput-checkbox';
import {
    FARGEKATEGORI_A,
    FARGEKATEGORI_B,
    FARGEKATEGORI_C,
    FARGEKATEGORI_D,
    FARGEKATEGORI_E,
    FARGEKATEGORI_F,
    FARGEKATEGORI_INGEN_KATEGORI,
    ferdigfilterListe
} from '../filter-konstanter';

export interface FilterStatusMinArbeidslisteProps {
    ferdigfilterListe: string[];
    handleChange: (e: any) => void;
    handleChangeCheckbox: (e: any) => void;
    filtervalg: PortefoljeFilter;
    endreFiltervalg: (filterId: string, filterVerdi: React.ReactNode) => void;
    checked: boolean;
}

function FilterStatusMineFargekategorier(props: FilterStatusMinArbeidslisteProps) {
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
                handleChange={props.handleChange}
                checked={props.checked}
                labelTekst={ferdigfilterListe.MINE_FARGEKATEGORIER}
            />
            {props.checked && (
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
                        handleChange={props.handleChangeCheckbox}
                        checked={props.checked && props.ferdigfilterListe.includes(FARGEKATEGORI_A)}
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
                        handleChange={props.handleChangeCheckbox}
                        checked={props.checked && props.ferdigfilterListe.includes(FARGEKATEGORI_B)}
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
                        handleChange={props.handleChangeCheckbox}
                        checked={props.checked && props.ferdigfilterListe.includes(FARGEKATEGORI_C)}
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
                        handleChange={props.handleChangeCheckbox}
                        checked={props.checked && props.ferdigfilterListe.includes(FARGEKATEGORI_D)}
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
                        handleChange={props.handleChangeCheckbox}
                        checked={props.checked && props.ferdigfilterListe.includes(FARGEKATEGORI_E)}
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
                        handleChange={props.handleChangeCheckbox}
                        checked={props.checked && props.ferdigfilterListe.includes(FARGEKATEGORI_F)}
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
                        handleChange={props.handleChangeCheckbox}
                        checked={props.checked && props.ferdigfilterListe.includes(FARGEKATEGORI_INGEN_KATEGORI)}
                        antall={fargekategoriIngenKategori}
                    />
                </div>
            )}
        </>
    );
}

export default hiddenIf(FilterStatusMineFargekategorier);
