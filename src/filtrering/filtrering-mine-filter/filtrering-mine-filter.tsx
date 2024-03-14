import React from 'react';
import {useSelector} from 'react-redux';
import {AppState} from '../../reducer';
import {STATUS} from '../../ducks/utils';
import './mine-filter_innhold.css';
import MineFilterInnhold, {LagredeFilterInnholdProps} from './mine-filter_innhold';
import {HandlingsType} from '../../ducks/lagret-filter';
import {Alert} from '@navikt/ds-react';

function FiltreringMineFilter({...mineFilterInnholdProps}: LagredeFilterInnholdProps) {
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

export default FiltreringMineFilter;
