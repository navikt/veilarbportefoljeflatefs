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
    alleFargekategoriFilterAlternativer,
    FARGEKATEGORI_A,
    FARGEKATEGORI_B,
    FARGEKATEGORI_C,
    FARGEKATEGORI_D,
    FARGEKATEGORI_E,
    FARGEKATEGORI_F,
    FARGEKATEGORI_INGEN_KATEGORI,
    ferdigfilterListeLabelTekst,
    MINE_FARGEKATEGORIER
} from '../filter-konstanter';
import {usePortefoljeSelector} from '../../hooks/redux/use-portefolje-selector';
import {OversiktType} from '../../ducks/ui/listevisning';
import {useDispatch} from 'react-redux';
import {FARGEKATEGORIER_HOVEDFILTER_KLIKK, FARGEKATEGORIER_UNDERFILTER_KLIKK} from '../../ducks/filtrering';
import {FargekategoriModell} from '../../model-interfaces';

function FilterStatusMineFargekategorier() {
    const dispatch = useDispatch();
    const statusTall = useStatustallVeilederSelector();
    const filtervalg = usePortefoljeSelector(OversiktType.minOversikt).filtervalg;
    const ferdigfilter = filtervalg.ferdigfilterListe;
    const fargekategoriFilter = filtervalg.fargekategorier;

    const hovedfilterChecked =
        ferdigfilter.includes(MINE_FARGEKATEGORIER) &&
        alleFargekategoriFilterAlternativer.every(f => fargekategoriFilter.includes(f));
    const hovedfilterIndeterminate =
        ferdigfilter.includes(MINE_FARGEKATEGORIER) &&
        !alleFargekategoriFilterAlternativer.every(f => fargekategoriFilter.includes(f));

    function handleHovedfilterEndret() {
        dispatch({type: FARGEKATEGORIER_HOVEDFILTER_KLIKK, name: OversiktType.minOversikt});
    }

    function handleUnderfilterEndret(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch({
            type: FARGEKATEGORIER_UNDERFILTER_KLIKK,
            name: OversiktType.minOversikt,
            data: e.target.value as FargekategoriModell
        });
    }

    return (
        <>
            <BarInputCheckbox
                filterNavn="mineFargekategorier"
                handleChange={handleHovedfilterEndret}
                checked={hovedfilterChecked}
                labelTekst={ferdigfilterListeLabelTekst.MINE_FARGEKATEGORIER}
                indeterminate={hovedfilterIndeterminate}
            />
            {(hovedfilterChecked || hovedfilterIndeterminate) && (
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
                        handleChange={handleUnderfilterEndret}
                        checked={fargekategoriFilter.includes(FARGEKATEGORI_A)}
                        antall={statusTall.fargekategoriA}
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
                        handleChange={handleUnderfilterEndret}
                        checked={fargekategoriFilter.includes(FARGEKATEGORI_B)}
                        antall={statusTall.fargekategoriB}
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
                        handleChange={handleUnderfilterEndret}
                        checked={fargekategoriFilter.includes(FARGEKATEGORI_C)}
                        antall={statusTall.fargekategoriC}
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
                        handleChange={handleUnderfilterEndret}
                        checked={fargekategoriFilter.includes(FARGEKATEGORI_D)}
                        antall={statusTall.fargekategoriD}
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
                        handleChange={handleUnderfilterEndret}
                        checked={fargekategoriFilter.includes(FARGEKATEGORI_E)}
                        antall={statusTall.fargekategoriE}
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
                        handleChange={handleUnderfilterEndret}
                        checked={fargekategoriFilter.includes(FARGEKATEGORI_F)}
                        antall={statusTall.fargekategoriF}
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
                        handleChange={handleUnderfilterEndret}
                        checked={fargekategoriFilter.includes(FARGEKATEGORI_INGEN_KATEGORI)}
                        antall={statusTall.fargekategoriIngenKategori}
                    />
                </div>
            )}
        </>
    );
}

export default hiddenIf(FilterStatusMineFargekategorier);
