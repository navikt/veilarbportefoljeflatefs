import React from 'react';
import hiddenIf from '../../components/hidden-if/hidden-if';
import {useStatustallVeilederSelector} from '../../hooks/redux/use-statustall';
import './arbeidsliste.css';
import {ReactComponent as ArbeidslisteikonBla} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_bla.svg';
import {ReactComponent as ArbeidslisteikonGronn} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_gronn.svg';
import {ReactComponent as ArbeidslisteikonLilla} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_lilla.svg';
import {ReactComponent as ArbeidslisteikonGul} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_gul.svg';
import {FiltervalgModell, KategoriModell} from '../../model-interfaces';
import {BarInputRadio} from '../../components/barinput/barinput-radio';
import BarInputCheckbox from '../../components/barinput/barinput-checkbox';
import {Label} from '@navikt/ds-react';

export interface FilterStatusMinArbeidslisteProps {
    ferdigfilterListe: string[];
    handleChange: (e: any) => void;
    handleChangeCheckbox: (e: any) => void;
    filtervalg: FiltervalgModell;
    endreFiltervalg: (filterId: string, filterVerdi: React.ReactNode) => void;
    checked: boolean;
}

function FilterStatusMinArbeidsliste(props: FilterStatusMinArbeidslisteProps) {
    const statusTall = useStatustallVeilederSelector();

    return (
        <>
            <Label className="minArbeidsliste__tittel">Arbeidsliste</Label>
            <BarInputRadio
                filterNavn="minArbeidsliste"
                handleChange={props.handleChange}
                antall={statusTall.minArbeidsliste}
            />
            {props.checked && (
                <div className="minArbeidsliste__kategori-checkboxwrapper">
                    <BarInputCheckbox
                        labelTekst={
                            <>
                                <ArbeidslisteikonBla />
                                <span>Blå</span>
                            </>
                        }
                        filterNavn="minArbeidslisteBla"
                        handleChange={props.handleChangeCheckbox}
                        checked={props.checked && props.ferdigfilterListe.includes(KategoriModell.BLA)}
                        antall={statusTall.minArbeidslisteBla}
                    />
                    <BarInputCheckbox
                        labelTekst={
                            <>
                                <ArbeidslisteikonGronn />
                                <span>Grønn</span>
                            </>
                        }
                        filterNavn="minArbeidslisteGronn"
                        handleChange={props.handleChangeCheckbox}
                        checked={props.checked && props.ferdigfilterListe.includes(KategoriModell.GRONN)}
                        antall={statusTall.minArbeidslisteGronn}
                    />
                    <BarInputCheckbox
                        labelTekst={
                            <>
                                <ArbeidslisteikonLilla />
                                <span>Lilla</span>
                            </>
                        }
                        filterNavn="minArbeidslisteLilla"
                        handleChange={props.handleChangeCheckbox}
                        checked={props.checked && props.ferdigfilterListe.includes(KategoriModell.LILLA)}
                        antall={statusTall.minArbeidslisteLilla}
                    />
                    <BarInputCheckbox
                        labelTekst={
                            <>
                                <ArbeidslisteikonGul />
                                <span>Gul</span>
                            </>
                        }
                        filterNavn="minArbeidslisteGul"
                        handleChange={props.handleChangeCheckbox}
                        checked={props.checked && props.ferdigfilterListe.includes(KategoriModell.GUL)}
                        antall={statusTall.minArbeidslisteGul}
                    />
                </div>
            )}
        </>
    );
}

export default hiddenIf(FilterStatusMinArbeidsliste);
