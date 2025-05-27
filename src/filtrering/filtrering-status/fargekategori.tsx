import {ChangeEvent} from 'react';
import {useDispatch} from 'react-redux';
import {Bleed} from '@navikt/ds-react';
import {useStatustallVeilederSelector} from '../../hooks/redux/use-statustall';
import {BarInputCheckbox} from '../../components/barinput/barinput-checkbox';
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
import {FARGEKATEGORIER_HOVEDFILTER_KLIKK, FARGEKATEGORIER_UNDERFILTER_KLIKK} from '../../ducks/filtrering';
import {FargekategoriModell} from '../../typer/bruker-modell';
import {fargekategoriIkonMapper} from '../../components/fargekategori/fargekategori-ikon-mapper';
import './fargekategori.css';

type FargekategoriUnderfilterKonfigurasjon = {
    filterLabel: string;
    filterId: FargekategoriModell;
    filterNavn: string;
    statustallId: string;
};

export const fargekategoriUnderfilterKonfigurasjoner: readonly FargekategoriUnderfilterKonfigurasjon[] = [
    {
        filterLabel: fargekategorier.FARGEKATEGORI_A,
        filterId: FARGEKATEGORI_A,
        filterNavn: 'mineFargekategorierA',
        statustallId: 'fargekategoriA'
    },
    {
        filterLabel: fargekategorier.FARGEKATEGORI_B,
        filterId: FARGEKATEGORI_B,
        filterNavn: 'mineFargekategorierB',
        statustallId: 'fargekategoriB'
    },
    {
        filterLabel: fargekategorier.FARGEKATEGORI_C,
        filterId: FARGEKATEGORI_C,
        filterNavn: 'mineFargekategorierC',
        statustallId: 'fargekategoriC'
    },
    {
        filterLabel: fargekategorier.FARGEKATEGORI_D,
        filterId: FARGEKATEGORI_D,
        filterNavn: 'mineFargekategorierD',
        statustallId: 'fargekategoriD'
    },
    {
        filterLabel: fargekategorier.FARGEKATEGORI_F,
        filterId: FARGEKATEGORI_F,
        filterNavn: 'mineFargekategorierF',
        statustallId: 'fargekategoriF'
    },
    {
        // Denne må liggje nedst for at farge-namna ("turkis", "gul") skal visast alfabetisk
        filterLabel: fargekategorier.FARGEKATEGORI_E,
        filterId: FARGEKATEGORI_E,
        filterNavn: 'mineFargekategorierE',
        statustallId: 'fargekategoriE'
    },
    {
        filterLabel: fargekategorier.INGEN_KATEGORI,
        filterId: INGEN_KATEGORI,
        filterNavn: 'mineFargekategorierIngenKategori',
        statustallId: 'fargekategoriIngenKategori'
    }
] as const;

export function FilterStatusMineFargekategorier() {
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

    function handleUnderfilterEndret(e: ChangeEvent<HTMLInputElement>) {
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
                filterVerdi={MINE_FARGEKATEGORIER}
            />
            <div className="fargekategorier--underfilter">
                {fargekategoriUnderfilterKonfigurasjoner.map(fargekategori => (
                    <BarInputCheckbox
                        key={fargekategori.filterId}
                        labelTekst={
                            <>
                                <Bleed marginBlock="05" asChild>
                                    {fargekategoriIkonMapper(fargekategori.filterId, 'fargekategoriikon')}
                                </Bleed>
                                {fargekategori.filterLabel}
                            </>
                        }
                        filterNavn={fargekategori.filterNavn}
                        handleChange={handleUnderfilterEndret}
                        checked={fargekategoriFilter.includes(fargekategori.filterId)}
                        antall={statusTall[fargekategori.statustallId]}
                        filterVerdi={fargekategori.filterId}
                    />
                ))}
            </div>
        </>
    );
}
