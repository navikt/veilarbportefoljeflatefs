import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {HoyreChevron, VenstreChevron} from 'nav-frontend-chevron';
import classNames from 'classnames';
import KnappPanel from './knapp-panel';
import {pagineringSetup} from '../../../ducks/paginering';
import {selectSeAlle, selectSide, selectSideStorrelse} from './paginering-selector';
import './paginering.less';
import {AppState} from '../../../reducer';

interface PagineringProps {
    className: string;
    antallTotalt: number;
    onChange?: (fra?: number, til?: number) => void;
}

function Paginering({className, antallTotalt, onChange}: PagineringProps) {
    const side = useSelector((state: AppState) => selectSide(state));
    const sideStorrelse = useSelector((state: AppState) => selectSideStorrelse(state));
    const seAlle = useSelector((state: AppState) => selectSeAlle(state));

    const dispatch = useDispatch();

    const endrePaginering = (side, seAlle) => {
        dispatch(pagineringSetup({side, seAlle}));
    };

    const antallSider: number = Math.ceil(antallTotalt / sideStorrelse);
    const erPaForsteSide: boolean = side === 1;
    const erPaSisteSide: boolean = side >= antallSider;

    const totalPaginering = (sideNumber: number, seAlleBool: boolean): void => {
        endrePaginering(sideNumber, seAlleBool);
        if (onChange) {
            onChange();
        }
    };

    return (
        <div className={classNames('paginering', className)}>
            <KnappPanel
                disabled={!seAlle && antallTotalt <= sideStorrelse}
                selected={seAlle && antallTotalt <= sideStorrelse}
                onClick={() => totalPaginering(1, !seAlle)}
                data-testid={!seAlle ? 'se-alle_knapp' : 'se-faerre_knapp'}
                ariaLabel={!seAlle ? 'Se alle' : 'Se færre'}
            >
                {!seAlle ? 'Se alle' : 'Se færre'}
            </KnappPanel>

            <KnappPanel
                disabled={erPaForsteSide}
                onClick={() => totalPaginering(side - 1, seAlle)}
                data-testid="paginering_venstre"
                ariaLabel="Forrige side"
            >
                <VenstreChevron />
            </KnappPanel>

            {!erPaForsteSide && (
                <KnappPanel
                    onClick={() => totalPaginering(1, seAlle)}
                    data-testid="paginering-tall_1"
                    ariaLabel="Side 1"
                >
                    1
                </KnappPanel>
            )}

            <KnappPanel data-testid={`paginering-tall_${side}`} selected ariaLabel={`Side ${side}`}>
                <strong>{side}</strong>
            </KnappPanel>

            {!erPaSisteSide && !seAlle && (
                <KnappPanel
                    onClick={() => totalPaginering(antallSider, seAlle)}
                    data-testid={`paginering-tall_${antallSider}`}
                    ariaLabel={`Side ${antallSider}`}
                >
                    {antallSider}
                </KnappPanel>
            )}

            <KnappPanel
                disabled={erPaSisteSide || seAlle}
                onClick={() => totalPaginering(side + 1, seAlle)}
                data-testid="paginering_hoyre"
                ariaLabel="Neste side"
            >
                <HoyreChevron />
            </KnappPanel>
        </div>
    );
}

export default Paginering;
