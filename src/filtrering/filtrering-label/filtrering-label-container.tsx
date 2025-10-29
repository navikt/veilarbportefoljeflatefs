import {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import {FiltreringLabel} from './filtrering-label';
import {alleFargekategoriFilterAlternativer, MINE_FARGEKATEGORIER} from '../filter-konstanter';
import {EnhetModell} from '../../typer/enhet-og-veiledere-modeller';
import {Filtervalg, FiltervalgModell} from '../../typer/filtervalg-modell';
import {oppdaterKolonneAlternativer, OversiktType} from '../../ducks/ui/listevisning';
import {hentMineFilterForVeileder} from '../../ducks/mine-filter';
import {clearFiltervalg, endreFiltervalg, fjern, initialState, slettEnkeltFilter} from '../../ducks/filtrering';
import {pagineringSetup} from '../../ducks/paginering';
import {avmarkerValgtMineFilter} from '../../ducks/lagret-filter-ui-state';
import {LagLabelForFiltervalg} from './lagLabelForFiltervalg';

interface FiltreringLabelContainerProps {
    enhettiltak: EnhetModell;
    actions: {
        slettAlle: () => void;
        slettEnkelt: (filterNavn: string, filterValue: boolean | string | null) => void;
    };
    filtervalg: FiltervalgModell;
    className: string;
}

function FiltreringLabelContainer({
    filtervalg,
    enhettiltak,
    actions: {slettAlle, slettEnkelt},
    className
}: FiltreringLabelContainerProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hentMineFilterForVeileder());
    }, [dispatch]);

    const filterElementer = Object.entries(filtervalg)
        .map(([filter, filteralternativer]) => {
            return LagLabelForFiltervalg({filter, filteralternativer, slettEnkeltfilter: slettEnkelt, enhettiltak});
        })
        .reduce((acc, l) => [...acc, ...l], []);

    return (
        <div className={className} data-testid="filtrering_label-container">
            {filterElementer}
            {filterElementer.length > 0 && (
                <FiltreringLabel
                    key="slett-alle"
                    label="Nullstill filtervalg"
                    slettFilter={slettAlle}
                    skalHaKryssIkon={false}
                />
            )}
        </div>
    );
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: {
        slettAlle: () => {
            dispatch(pagineringSetup({side: 1}));
            dispatch(clearFiltervalg(ownProps.oversiktType as OversiktType));
            oppdaterKolonneAlternativer(dispatch, initialState, ownProps.oversiktType as OversiktType);
        },
        slettEnkelt: (filterKey: string, filterValue: boolean | string | null) => {
            dispatch(pagineringSetup({side: 1}));
            dispatch(slettEnkeltFilter(filterKey, filterValue, ownProps.oversiktType as OversiktType));
            dispatch(avmarkerValgtMineFilter(ownProps.oversiktType));

            if (filterValue === MINE_FARGEKATEGORIER) {
                dispatch(endreFiltervalg(Filtervalg.fargekategorier, [], ownProps.oversiktType as OversiktType));
            }
            if (
                alleFargekategoriFilterAlternativer.some(f => f === filterValue) &&
                ownProps.filtervalg.fargekategorier.length === 1
            ) {
                dispatch(
                    endreFiltervalg(
                        Filtervalg.ferdigfilterListe,
                        ownProps.filtervalg.ferdigfilterListe.filter(f => f !== MINE_FARGEKATEGORIER),
                        ownProps.oversiktType as OversiktType
                    )
                );
            }

            const oppdatertFiltervalg = {
                ...ownProps.filtervalg,
                [filterKey]: fjern(filterKey, ownProps.filtervalg[filterKey], filterValue)
            };
            oppdaterKolonneAlternativer(dispatch, oppdatertFiltervalg, ownProps.oversiktType as OversiktType);
        }
    }
});

export default connect(null, mapDispatchToProps)(FiltreringLabelContainer);
