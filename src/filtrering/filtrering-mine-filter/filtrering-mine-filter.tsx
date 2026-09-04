import {useSelector} from 'react-redux';
import {Alert} from '@navikt/ds-react';
import {AppState} from '../../reducer';
import {STATUS} from '../../ducks/utils';
import {LagredeFilterInnholdProps, MineFilterInnhold} from './mine-filter_innhold';
import {HandlingsType} from '../../ducks/lagret-filter';
import './mine-filter_innhold.css';

export function FiltreringMineFilter({...mineFilterInnholdProps}: LagredeFilterInnholdProps) {
    const mineFilterState = useSelector((state: AppState) => state.mineFilter);

    if (mineFilterState.handlingType === HandlingsType.HENTE && mineFilterState.status === STATUS.ERROR) {
        return (
            <Alert variant="error" size="small" className={'mine-filter-alert'}>
                Det oppsto en feil, og mine filter kunne ikke hentes fram. Prøv igjen senere.
            </Alert>
        );
    }

    return (
        <>
            {mineFilterState?.antallFiltreSomFeilet != undefined && mineFilterState.antallFiltreSomFeilet > 0 && (
                <Alert variant="warning" size="small" className={'mine-filter-alert'}>
                    {mineFilterState.antallFiltreSomFeilet} av filtrene dine kunne ikke lastes inn. Prøv igjen senere.
                </Alert>
            )}
            <MineFilterInnhold {...mineFilterInnholdProps} />
        </>
    );
}
