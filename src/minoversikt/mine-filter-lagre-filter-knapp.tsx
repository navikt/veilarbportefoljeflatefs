import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from '@navikt/ds-react';
import {StarIcon} from '@navikt/aksel-icons';
import {erObjektValuesTomt, lagretFilterValgModellErLik} from '../components/modal/mine-filter/mine-filter-utils';
import {AppState} from '../reducer';
import {apneMineFilterModal} from '../ducks/lagret-filter-ui-state';
import {OversiktType} from '../ducks/ui/listevisning';

interface Props {
    oversiktType: OversiktType;
}

export function MineFilterLagreFilterKnapp({oversiktType}: Props) {
    const [erLagreKnappSkjult, setErLagreKnappSkjult] = useState(true);
    const filtreringMinOversikt = useSelector((state: AppState) => state.filtreringMinoversikt);
    const filtreringEnhetensOversikt = useSelector((state: AppState) => state.filtreringEnhetensOversikt);

    const erPaMinOversikt = oversiktType === OversiktType.minOversikt;
    const erPaEnhetensOversikt = oversiktType === OversiktType.enhetensOversikt;

    const filtrering = useSelector((state: AppState) =>
        erPaMinOversikt ? state.filtreringMinoversikt : state.filtreringEnhetensOversikt
    );
    const mineFilterList = useSelector((state: AppState) => state.mineFilter.data);
    const valgtMineFilter = !mineFilterList.find(elem => lagretFilterValgModellErLik(elem.filterValg, filtrering));

    const dispatch = useDispatch();

    function lagreFilterModal(event) {
        event.preventDefault();
        dispatch(apneMineFilterModal(oversiktType));
    }

    useEffect(() => {
        const ingenFilterValgt = erPaMinOversikt
            ? erObjektValuesTomt(filtreringMinOversikt)
            : erObjektValuesTomt(filtreringEnhetensOversikt);

        if (
            (erPaMinOversikt && valgtMineFilter && !ingenFilterValgt) ||
            (erPaEnhetensOversikt && valgtMineFilter && !ingenFilterValgt)
        ) {
            setErLagreKnappSkjult(false);
        } else {
            setErLagreKnappSkjult(true);
        }
    }, [
        filtreringMinOversikt,
        filtreringEnhetensOversikt,
        erPaMinOversikt,
        erPaEnhetensOversikt,
        erLagreKnappSkjult,
        valgtMineFilter
    ]);

    return (
        <Button
            variant="secondary-neutral"
            size="small"
            className="lagre-filter-knapp"
            hidden={erLagreKnappSkjult}
            data-testid="lagre-filter_knapp"
            onClick={event => lagreFilterModal(event)}
            icon={<StarIcon aria-hidden={true} fontSize="1.2rem" />}
        >
            Lagre filter
        </Button>
    );
}
