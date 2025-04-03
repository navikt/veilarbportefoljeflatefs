import {useSelector} from 'react-redux';
import {Alert} from '@navikt/ds-react';
import {AppState} from '../../reducer';
import {STATUS} from '../../ducks/utils';
import {MineFilterInnhold, LagredeFilterInnholdProps} from './mine-filter_innhold';
import {HandlingsType} from '../../ducks/lagret-filter';
import './mine-filter_innhold.css';

export function FiltreringMineFilter({...mineFilterInnholdProps}: LagredeFilterInnholdProps) {
    const mineFilterState = useSelector((state: AppState) => state.mineFilter);

    return (
        <>
            {mineFilterState.handlingType === HandlingsType.HENTE && mineFilterState.status === STATUS.ERROR ? (
                <Alert variant="error" size="small">
                    Det oppsto en feil, og mine filter kunne ikke hentes fram. Prøv igjen senere.
                </Alert>
            ) : (
                <MineFilterInnhold {...mineFilterInnholdProps} />
            )}
        </>
    );
}
