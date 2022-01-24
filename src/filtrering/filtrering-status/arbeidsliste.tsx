import React from 'react';
import hiddenIf from '../../components/hidden-if/hidden-if';
import {useStatusTallSelector} from '../../hooks/redux/use-statustall';
import './arbeidsliste.less';
import {ReactComponent as ArbeidslisteikonBla} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_bla.svg';
import {ReactComponent as ArbeidslisteikonGronn} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_gronn.svg';
import {ReactComponent as ArbeidslisteikonLilla} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_lilla.svg';
import {ReactComponent as ArbeidslisteikonGul} from '../../components/ikoner/arbeidsliste/arbeidslisteikon_gul.svg';
import {FiltervalgModell, KategoriModell} from '../../model-interfaces';
import {BarInputRadio} from '../../components/barinput/barinput-radio';
import BarInputCheckbox from '../../components/barinput/barinput-checkbox';
import {BodyShort, CheckboxGroup, Label} from '@navikt/ds-react';

export interface FilterStatusMinArbeidslisteProps {
    ferdigfilterListe: string[];
    handleChange: (e: any) => void;
    handleChangeCheckbox: (e: any) => void;
    filtervalg: FiltervalgModell;
    endreFiltervalg: (filterId: string, filterVerdi: React.ReactNode) => void;
    checked: boolean;
}

function FilterStatusMinArbeidsliste(props: FilterStatusMinArbeidslisteProps) {
    const statusTall = useStatusTallSelector();

    return (
        <>
            <Label className="minArbeidsliste__tittel">Arbeidsliste</Label>
            <BarInputRadio
                filterNavn="minArbeidsliste"
                handleChange={props.handleChange}
                antall={statusTall.minArbeidsliste}
                checked={props.checked}
            />
            {props.checked && (
                <CheckboxGroup legend="" hideLegend className="minArbeidsliste__kategori-checkboxwrapper" key={2}>
                    <BarInputCheckbox
                        labelTekst={
                            <>
                                <BodyShort className="arbeidslistetekst" title="Arbeidslistekategori blå">
                                    <ArbeidslisteikonBla />
                                    Blå
                                </BodyShort>
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
                                <BodyShort className="arbeidslistetekst" title="Arbeidslistekategori grønn">
                                    <ArbeidslisteikonGronn />
                                    Grønn
                                </BodyShort>
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
                                <BodyShort className="arbeidslistetekst" title="Arbeidslistekategori lilla">
                                    <ArbeidslisteikonLilla />
                                    Lilla
                                </BodyShort>
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
                                <BodyShort className="arbeidslistetekst" title="Arbeidslistekategori gul">
                                    <ArbeidslisteikonGul />
                                    Gul
                                </BodyShort>
                            </>
                        }
                        filterNavn="minArbeidslisteGul"
                        handleChange={props.handleChangeCheckbox}
                        checked={props.checked && props.ferdigfilterListe.includes(KategoriModell.GUL)}
                        antall={statusTall.minArbeidslisteGul}
                    />
                </CheckboxGroup>
            )}
        </>
    );
}

export default hiddenIf(FilterStatusMinArbeidsliste);
