import {useDispatch, useSelector} from 'react-redux';
import classNames from 'classnames';
import {Pagination} from '@navikt/ds-react';
import {KnappPanel} from './knapp-panel';
import {pagineringSetup} from '../../../ducks/paginering';
import {selectSide, selectSidestorrelse} from './paginering-selector';
import {AppState} from '../../../reducer';
import {DEFAULT_PAGINERING_STORRELSE, SE_FLERE_PAGINERING_STORRELSE} from '../../../konstanter';
import './paginering.css';

interface PagineringProps {
    className?: string;
    antallTotalt: number;
    onPaginering?: () => void;
}

export function Paginering({className, antallTotalt, onPaginering}: PagineringProps) {
    const dispatch = useDispatch();
    const side = useSelector((state: AppState) => selectSide(state));
    const sidestorrelseRedux = useSelector((state: AppState) => selectSidestorrelse(state));
    const viserDefaultAntall = DEFAULT_PAGINERING_STORRELSE === sidestorrelseRedux;
    const sidestorrelse = viserDefaultAntall ? DEFAULT_PAGINERING_STORRELSE : SE_FLERE_PAGINERING_STORRELSE;
    const alternativSidestorrelse = viserDefaultAntall ? SE_FLERE_PAGINERING_STORRELSE : DEFAULT_PAGINERING_STORRELSE;

    const antallSider: number = Math.ceil(antallTotalt / sidestorrelse) ? Math.ceil(antallTotalt / sidestorrelse) : 1;
    const endreSide = (nySide: number) => {
        endreSideOgSidestorrelse(nySide, sidestorrelse);
    };

    const endreSidestorrelse = (storrelse: number) => {
        endreSideOgSidestorrelse(1, storrelse);
    };

    const endreSideOgSidestorrelse = (nySide: number, nyttAntall: number) => {
        dispatch(pagineringSetup({side: nySide, sidestorrelse: nyttAntall}));
        if (onPaginering) {
            onPaginering();
        }
    };

    return (
        <div className={classNames('paginering', className)}>
            <KnappPanel
                disabled={viserDefaultAntall && antallTotalt <= sidestorrelse}
                selected={!viserDefaultAntall && antallTotalt <= sidestorrelse}
                onClick={() => endreSidestorrelse(alternativSidestorrelse)}
                data-testid={viserDefaultAntall ? 'vis-200-per-side_knapp' : 'vis-50-per-side_knapp'}
                ariaLabel={viserDefaultAntall ? 'Vis 200 per side' : 'Vis 50 per side'}
                tekst={viserDefaultAntall ? 'Vis 200 per side' : 'Vis 50 per side'}
            />

            <Pagination
                page={side}
                onPageChange={endreSide}
                count={antallSider}
                size="small"
                siblingCount={0}
                boundaryCount={1}
                data-testid="paginering"
                data-version="v1"
            />
        </div>
    );
}
