import React from 'react';
import hiddenIf from '../../components/hidden-if/hidden-if';
import {useStatustallVeilederSelector} from '../../hooks/redux/use-statustall';
import './fargekategori.css';
import BarInputCheckbox from '../../components/barinput/barinput-checkbox';
import {
    alleFargekategoriFilterAlternativer,
    FARGEKATEGORI_A,
    FARGEKATEGORI_B,
    FARGEKATEGORI_C,
    FARGEKATEGORI_D,
    FARGEKATEGORI_E,
    FARGEKATEGORI_F,
    fargekategorier,
    ferdigfilterListeLabelTekst,
    INGEN_KATEGORI,
    MINE_FARGEKATEGORIER
} from '../filter-konstanter';
import {usePortefoljeSelector} from '../../hooks/redux/use-portefolje-selector';
import {OversiktType} from '../../ducks/ui/listevisning';
import {useDispatch} from 'react-redux';
import {FARGEKATEGORIER_HOVEDFILTER_KLIKK, FARGEKATEGORIER_UNDERFILTER_KLIKK} from '../../ducks/filtrering';
import {FargekategoriModell} from '../../model-interfaces';
import fargekategoriIkonMapper from '../../components/fargekategori/fargekategori-ikon-mapper';

type FargekategoriUnderfilterKonfigurasjon = {
    filterLabel: string;
    filterId: FargekategoriModell;
    filterNavn: string;
};
const fargekategoriUnderfilterKonfigurasjoner: readonly FargekategoriUnderfilterKonfigurasjon[] = [
    {
        filterLabel: fargekategorier.FARGEKATEGORI_A,
        filterId: FARGEKATEGORI_A,
        filterNavn: 'mineFargekategorierA'
    },
    {
        filterLabel: fargekategorier.FARGEKATEGORI_B,
        filterId: FARGEKATEGORI_B,
        filterNavn: 'mineFargekategorierB'
    },
    {
        filterLabel: fargekategorier.FARGEKATEGORI_C,
        filterId: FARGEKATEGORI_C,
        filterNavn: 'mineFargekategorierC'
    },
    {
        filterLabel: fargekategorier.FARGEKATEGORI_D,
        filterId: FARGEKATEGORI_D,
        filterNavn: 'mineFargekategorierD'
    },
    {
        filterLabel: fargekategorier.FARGEKATEGORI_E,
        filterId: FARGEKATEGORI_E,
        filterNavn: 'mineFargekategorierE'
    },
    {
        filterLabel: fargekategorier.FARGEKATEGORI_F,
        filterId: FARGEKATEGORI_F,
        filterNavn: 'mineFargekategorierF'
    },
    {
        filterLabel: fargekategorier.INGEN_KATEGORI,
        filterId: INGEN_KATEGORI,
        filterNavn: 'mineFargekategorierIngenKategori'
    }
] as const;

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
                {fargekategoriUnderfilterKonfigurasjoner.map(fargekategori => (
                    <BarInputCheckbox
                        key={fargekategori.filterId}
                        labelTekst={
                            <span className="fargekategoriikon--label">
                                {fargekategoriIkonMapper(fargekategori.filterId, 'fargekategoriikon')}
                                <span>{fargekategori.filterLabel}</span>
                            </span>
                        }
                        filterNavn={fargekategori.filterNavn}
                        handleChange={handleUnderfilterEndret}
                        checked={fargekategoriFilter.includes(fargekategori.filterId)}
                        antall={statusTall[fargekategori.filterId]}
                    />
                ))}
            </div>
        </>
    );
}

export default hiddenIf(FilterStatusMineFargekategorier);
