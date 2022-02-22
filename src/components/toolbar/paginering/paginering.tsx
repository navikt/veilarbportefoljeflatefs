import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {HoyreChevron, VenstreChevron} from 'nav-frontend-chevron';
import classNames from 'classnames';
import KnappPanel from './knapp-panel';
import {pagineringSetup} from '../../../ducks/paginering';
import {selectSeAlle, selectSide, selectSideStorrelse} from './paginering-selector';
import './paginering.less';
import {AppState} from '../../../reducer';
import {DEFAULT_PAGINERING_STORRELSE, SE_FLERE_PAGINERING_STORRELSE} from '../../../konstanter';

interface PagineringProps {
    className: string;
    antallTotalt: number;
    onChange?: (fra?: number, til?: number) => void;
}

function Paginering({className, antallTotalt, onChange}: PagineringProps) {
    const side = useSelector((state: AppState) => selectSide(state));

    const seAlle = useSelector((state: AppState) => selectSeAlle(state));

    const sideStorrelse = useSelector((state: AppState) => selectSideStorrelse(state));

    const dispatch = useDispatch();

    const endrePaginering = (side, seAlle, sideStorrelse) => {
        // @ts-ignore
        dispatch(pagineringSetup({side, seAlle, sideStorrelse}));
    };

    const antallSider: number = Math.ceil(antallTotalt / sideStorrelse) ? Math.ceil(antallTotalt / sideStorrelse) : 1;
    const erPaForsteSide: boolean = side === 1;
    const erPaSisteSide: boolean = side >= antallSider;
    const totalPaginering = (sideNumber: number, seAlleBool: boolean, sideStorrelse?: number): void => {
        if (seAlleBool) {
            sideStorrelse = SE_FLERE_PAGINERING_STORRELSE;
        } else {
            sideStorrelse = DEFAULT_PAGINERING_STORRELSE;
        }
        endrePaginering(sideNumber, seAlleBool, sideStorrelse);
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
                ariaLabel={!seAlle ? 'Vis 200 per side' : 'Vis 50 per side'}
            >
                {!seAlle ? 'Vis 200 per side' : 'Vis 50 per side'}
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

            {!erPaSisteSide && (
                <KnappPanel
                    onClick={() => totalPaginering(antallSider, seAlle)}
                    data-testid={`paginering-tall_${antallSider}`}
                    ariaLabel={`Side ${antallSider}`}
                >
                    {antallSider}
                </KnappPanel>
            )}

            <KnappPanel
                disabled={erPaSisteSide}
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
