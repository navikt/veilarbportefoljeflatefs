import React from 'react';
import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {AlertStripeFeil} from 'nav-frontend-alertstriper';
import {STATUS} from '../../ducks/utils';
import './ny_mine-filter-innhold.less';
import NyttMineFilterInnhold from './ny_mine-filter_innhold';
import {HandlingsType, LagretFilter} from '../../ducks/lagretFilter';
import {ListevisningType} from '../../ducks/ui/listevisning';

function NyFiltreringMineFilter(props: {
    filtergruppe: ListevisningType;
    fjernUtilgjengeligeFilter: (elem: LagretFilter) => void;
    sortertMineFilter;
    isDraggable: boolean;
    setisDraggable: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const mineFilterState = useSelector((state: AppState) => state.mineFilter);

    return (
        <>
            {mineFilterState.handlingType === HandlingsType.HENTE && mineFilterState.status === STATUS.ERROR ? (
                <AlertStripeFeil>
                    Det oppsto en feil, og mine filter kunne ikke hentes fram. Prøv igjen senere.
                </AlertStripeFeil>
            ) : (
                <NyttMineFilterInnhold
                    lagretFilter={props.sortertMineFilter}
                    filtergruppe={props.filtergruppe}
                    isDraggable={props.isDraggable}
                    fjernUtilgjengeligeFilter={props.fjernUtilgjengeligeFilter}
                    setisDraggable={props.setisDraggable}
                />
            )}
        </>
    );
}

export default NyFiltreringMineFilter;
