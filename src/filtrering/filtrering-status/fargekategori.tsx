import React from 'react';
import hiddenIf from '../../components/hidden-if/hidden-if';
import {useStatustallVeilederSelector} from '../../hooks/redux/use-statustall';
import './fargekategori.css';
import {ReactComponent as FargekategoriBla} from '../../components/ikoner/fargekategorier/Fargekategoriikon_blatt_bokmerke.svg';
import {ReactComponent as FargekategoriGronn} from '../../components/ikoner/fargekategorier/Fargekategoriikon_gronn_trekant.svg';
import {ReactComponent as FargekategoriLilla} from '../../components/ikoner/fargekategorier/Fargekategoriikon_lilla_firkant.svg';
import {ReactComponent as FargekategoriGul} from '../../components/ikoner/fargekategorier/Fargekategoriikon_gul_sirkel.svg';
import {ReactComponent as FargekategoriOransje} from '../../components/ikoner/fargekategorier/Fargekategoriikon_oransje_diamant_v2.svg';
import {ReactComponent as FargekategoriLysebla} from '../../components/ikoner/fargekategorier/Fargekategoriikon_lysebla_femkant.svg';
import {ReactComponent as FargekategoriIngen} from '../../components/ikoner/fargekategorier/Fargekategoriikon_ingen_kategori.svg';
import BarInputCheckbox from '../../components/barinput/barinput-checkbox';
import {
    alleFargekategoriFilterAlternativer,
    FARGEKATEGORI_A,
    FARGEKATEGORI_B,
    FARGEKATEGORI_C,
    FARGEKATEGORI_D,
    FARGEKATEGORI_E,
    FARGEKATEGORI_F,
    INGEN_KATEGORI,
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
            <div className="fargekategorier--underfilter">
                <BarInputCheckbox
                    labelTekst={
                        <span className="fargekategoriikon--label">
                            <FargekategoriBla className="fargekategoriikon" />
                            <span>Blå</span>
                        </span>
                    }
                    filterNavn="mineFargekategorierA"
                    handleChange={handleUnderfilterEndret}
                    checked={fargekategoriFilter.includes(FARGEKATEGORI_A)}
                    antall={statusTall.fargekategoriA}
                />
                <BarInputCheckbox
                    labelTekst={
                        <span className="fargekategoriikon--label">
                            <FargekategoriGronn className="fargekategoriikon" />
                            <span>Grønn</span>
                        </span>
                    }
                    filterNavn="mineFargekategorierB"
                    handleChange={handleUnderfilterEndret}
                    checked={fargekategoriFilter.includes(FARGEKATEGORI_B)}
                    antall={statusTall.fargekategoriB}
                />
                <BarInputCheckbox
                    labelTekst={
                        <span className="fargekategoriikon--label">
                            <FargekategoriGul className="fargekategoriikon" />
                            <span>Gul</span>
                        </span>
                    }
                    filterNavn="mineFargekategorierC"
                    handleChange={handleUnderfilterEndret}
                    checked={fargekategoriFilter.includes(FARGEKATEGORI_C)}
                    antall={statusTall.fargekategoriC}
                />
                <BarInputCheckbox
                    labelTekst={
                        <span className="fargekategoriikon--label">
                            <FargekategoriLilla className="fargekategoriikon" />
                            <span>Lilla</span>
                        </span>
                    }
                    filterNavn="mineFargekategorierD"
                    handleChange={handleUnderfilterEndret}
                    checked={fargekategoriFilter.includes(FARGEKATEGORI_D)}
                    antall={statusTall.fargekategoriD}
                />
                <BarInputCheckbox
                    labelTekst={
                        <span className="fargekategoriikon--label">
                            <FargekategoriLysebla className="fargekategoriikon" />
                            <span>Lyseblå</span>
                        </span>
                    }
                    filterNavn="mineFargekategorierE"
                    handleChange={handleUnderfilterEndret}
                    checked={fargekategoriFilter.includes(FARGEKATEGORI_E)}
                    antall={statusTall.fargekategoriE}
                />
                <BarInputCheckbox
                    labelTekst={
                        <span className="fargekategoriikon--label">
                            <FargekategoriOransje className="fargekategoriikon" />
                            <span>Oransje</span>
                        </span>
                    }
                    filterNavn="mineFargekategorierF"
                    handleChange={handleUnderfilterEndret}
                    checked={fargekategoriFilter.includes(FARGEKATEGORI_F)}
                    antall={statusTall.fargekategoriF}
                />
                <BarInputCheckbox
                    labelTekst={
                        <span className="fargekategoriikon--label">
                            <FargekategoriIngen className="fargekategoriikon" />
                            <span>Ingen kategori</span>
                        </span>
                    }
                    filterNavn="mineFargekategorierIngenKategori"
                    handleChange={handleUnderfilterEndret}
                    checked={fargekategoriFilter.includes(INGEN_KATEGORI)}
                    antall={statusTall.fargekategoriIngenKategori}
                />
            </div>
        </>
    );
}

export default hiddenIf(FilterStatusMineFargekategorier);
