import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classNames from 'classnames';
import KnappPanel from './knapp-panel';
import {pagineringSetup} from '../../../ducks/paginering';
import {selectSide, selectSidestorrelse} from './paginering-selector';
import './paginering.less';
import {AppState} from '../../../reducer';
import {DEFAULT_PAGINERING_STORRELSE, SE_FLERE_PAGINERING_STORRELSE} from '../../../konstanter';
import {Pagination} from '@navikt/ds-react';

interface PagineringProps {
    className: string;
    antallTotalt: number;
    onPaginering?: () => void;
}

function Paginering({className, antallTotalt, onPaginering}: PagineringProps) {
    const dispatch = useDispatch();
    const side = useSelector((state: AppState) => selectSide(state));
    const sidestorrelseRedux = useSelector((state: AppState) => selectSidestorrelse(state));
    const viserDefaultAntall = DEFAULT_PAGINERING_STORRELSE === sidestorrelseRedux;
    const sidestorrelse = viserDefaultAntall ? DEFAULT_PAGINERING_STORRELSE : SE_FLERE_PAGINERING_STORRELSE;
    const alternativSidestorrelse = viserDefaultAntall ? SE_FLERE_PAGINERING_STORRELSE : DEFAULT_PAGINERING_STORRELSE;

    const antallSider: number = Math.ceil(antallTotalt / sidestorrelse) ? Math.ceil(antallTotalt / sidestorrelse) : 1;
    const endreSide = (nySide: number) => {
        endreSidestorrelse(nySide, sidestorrelse);
    };

    const endreSidestorrelse = (nySide: number, nyttAntall: number) => {
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
                onClick={() => endreSidestorrelse(1, alternativSidestorrelse)}
                data-testid={viserDefaultAntall ? 'se-flere_knapp' : 'se-faerre_knapp'}
                ariaLabel={viserDefaultAntall ? 'Vis 200 per side' : 'Vis 50 per side'}
            >
                {viserDefaultAntall ? 'Vis 200 per side' : 'Vis 50 per side'}
            </KnappPanel>

            <Pagination
                page={side}
                onPageChange={endreSide}
                count={antallSider}
                size="medium"
                siblingCount={0}
                boundaryCount={1}
            />
        </div>
    );
}

export default Paginering;
