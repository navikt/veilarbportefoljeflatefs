import {ChangeEvent} from 'react';
import {useStatustallEnhetSelector, useStatustallVeilederSelector} from '../../hooks/redux/use-statustall';
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
import {useAppDispatch} from '../../hooks/redux/use-app-dispatch';
import {pagineringSetup} from '../../ducks/paginering';
import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';

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

type FilterStatusFargekategorierProps = {
    oversiktType: OversiktType;
};

type FargekategoriStatustall = {
    fargekategoriA: number;
    fargekategoriB: number;
    fargekategoriC: number;
    fargekategoriD: number;
    fargekategoriE: number;
    fargekategoriF: number;
    fargekategoriIngenKategori: number;
};

const initialeFargekategoriStatustall: FargekategoriStatustall = {
    fargekategoriA: 0,
    fargekategoriB: 0,
    fargekategoriC: 0,
    fargekategoriD: 0,
    fargekategoriE: 0,
    fargekategoriF: 0,
    fargekategoriIngenKategori: 0
};

function lagFargekategoriStatustallForEnhet(
    brukere: AppState['portefolje']['data']['brukere']
): FargekategoriStatustall {
    return brukere.reduce(
        (acc, bruker) => {
            switch (bruker.fargekategori) {
                case FARGEKATEGORI_A:
                    acc.fargekategoriA += 1;
                    break;
                case FARGEKATEGORI_B:
                    acc.fargekategoriB += 1;
                    break;
                case FARGEKATEGORI_C:
                    acc.fargekategoriC += 1;
                    break;
                case FARGEKATEGORI_D:
                    acc.fargekategoriD += 1;
                    break;
                case FARGEKATEGORI_E:
                    acc.fargekategoriE += 1;
                    break;
                case FARGEKATEGORI_F:
                    acc.fargekategoriF += 1;
                    break;
                case INGEN_KATEGORI:
                case null:
                    acc.fargekategoriIngenKategori += 1;
                    break;
            }

            return acc;
        },
        {...initialeFargekategoriStatustall}
    );
}

export function FilterStatusMineFargekategorier({oversiktType}: FilterStatusFargekategorierProps) {
    const dispatch = useAppDispatch();
    const statusTallVeileder = useStatustallVeilederSelector();
    const enhetStatustall = useStatustallEnhetSelector();
    const enhetsBrukere = useSelector((state: AppState) => state.portefolje.data.brukere);
    const beregnetStatusTallEnhet = lagFargekategoriStatustallForEnhet(enhetsBrukere);
    const statusTallEnhet = {
        ...beregnetStatusTallEnhet,
        fargekategoriA: enhetStatustall.medBrukerinnsyn.fargekategoriA ?? beregnetStatusTallEnhet.fargekategoriA,
        fargekategoriB: enhetStatustall.medBrukerinnsyn.fargekategoriB ?? beregnetStatusTallEnhet.fargekategoriB,
        fargekategoriC: enhetStatustall.medBrukerinnsyn.fargekategoriC ?? beregnetStatusTallEnhet.fargekategoriC,
        fargekategoriD: enhetStatustall.medBrukerinnsyn.fargekategoriD ?? beregnetStatusTallEnhet.fargekategoriD,
        fargekategoriE: enhetStatustall.medBrukerinnsyn.fargekategoriE ?? beregnetStatusTallEnhet.fargekategoriE,
        fargekategoriF: enhetStatustall.medBrukerinnsyn.fargekategoriF ?? beregnetStatusTallEnhet.fargekategoriF,
        fargekategoriIngenKategori:
            enhetStatustall.medBrukerinnsyn.fargekategoriIngenKategori ??
            beregnetStatusTallEnhet.fargekategoriIngenKategori
    };
    const filtervalg = usePortefoljeSelector(oversiktType).filtervalg;
    const ferdigfilter = filtervalg.ferdigfilterListe;
    const fargekategoriFilter = filtervalg.fargekategorier;

    const hovedfilterChecked =
        ferdigfilter.includes(MINE_FARGEKATEGORIER) &&
        alleFargekategoriFilterAlternativer.every(f => fargekategoriFilter.includes(f));
    const hovedfilterIndeterminate =
        ferdigfilter.includes(MINE_FARGEKATEGORIER) &&
        !alleFargekategoriFilterAlternativer.every(f => fargekategoriFilter.includes(f));

    function handleHovedfilterEndret() {
        dispatch(pagineringSetup({side: 1}));
        dispatch({type: FARGEKATEGORIER_HOVEDFILTER_KLIKK, name: oversiktType});
    }

    function handleUnderfilterEndret(e: ChangeEvent<HTMLInputElement>) {
        dispatch(pagineringSetup({side: 1}));
        dispatch({
            type: FARGEKATEGORIER_UNDERFILTER_KLIKK,
            name: oversiktType,
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
                            <span className="fargekategorier--underfilter-label">
                                {fargekategoriIkonMapper(fargekategori.filterId, 'fargekategoriikon')}
                                {fargekategori.filterLabel}
                            </span>
                        }
                        filterNavn={fargekategori.filterNavn}
                        handleChange={handleUnderfilterEndret}
                        checked={fargekategoriFilter.includes(fargekategori.filterId)}
                        antall={
                            oversiktType === OversiktType.minOversikt
                                ? statusTallVeileder[fargekategori.statustallId]
                                : statusTallEnhet[fargekategori.statustallId]
                        }
                        filterVerdi={fargekategori.filterId}
                    />
                ))}
            </div>
        </>
    );
}
