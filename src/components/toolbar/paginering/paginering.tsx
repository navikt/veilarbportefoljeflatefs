import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {HoyreChevron, VenstreChevron} from 'nav-frontend-chevron';
import classNames from 'classnames';
import KnappPanel from './knapp-panel';
import {pagineringSetup} from '../../../ducks/paginering';
import {selectSeFlere, selectSide, selectSideStorrelse} from './paginering-selector';
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

    const seFlere = useSelector((state: AppState) => selectSeFlere(state));

    const sideStorrelse = useSelector((state: AppState) => selectSideStorrelse(state));

    const dispatch = useDispatch();

    const endrePaginering = (side, seAlle, sideStorrelse) => {
        dispatch(pagineringSetup({side, seFlere, sideStorrelse}));
    };

    const antallSider: number = Math.ceil(antallTotalt / sideStorrelse) ? Math.ceil(antallTotalt / sideStorrelse) : 1;
    const erPaForsteSide: boolean = side === 1;
    const erPaSisteSide: boolean = side >= antallSider;
    const totalPaginering = (sideNumber: number, seFlereBool: boolean, sideStorrelse?: number): void => {
        if (seFlereBool) {
            sideStorrelse = SE_FLERE_PAGINERING_STORRELSE;
        } else {
            sideStorrelse = DEFAULT_PAGINERING_STORRELSE;
        }
        endrePaginering(sideNumber, seFlereBool, sideStorrelse);
        if (onChange) {
            onChange();
        }
    };

    return (
        <div className={classNames('paginering', className)}>
            <KnappPanel
                disabled={!seFlere && antallTotalt <= sideStorrelse}
                selected={seFlere && antallTotalt <= sideStorrelse}
                onClick={() => totalPaginering(1, !seFlere)}
                data-testid={!seFlere ? 'se-flere_knapp' : 'se-faerre_knapp'}
                ariaLabel={!seFlere ? 'Vis 200 per side' : 'Vis 50 per side'}
            >
                {!seFlere ? 'Vis 200 per side' : 'Vis 50 per side'}
            </KnappPanel>

            <KnappPanel
                disabled={erPaForsteSide}
                onClick={() => totalPaginering(side - 1, seFlere)}
                data-testid="paginering_venstre"
                ariaLabel="Forrige side"
            >
                <VenstreChevron />
            </KnappPanel>

            {!erPaForsteSide && (
                <KnappPanel
                    onClick={() => totalPaginering(1, seFlere)}
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
                    onClick={() => totalPaginering(antallSider, seFlere)}
                    data-testid={`paginering-tall_${antallSider}`}
                    ariaLabel={`Side ${antallSider}`}
                >
                    {antallSider}
                </KnappPanel>
            )}

            <KnappPanel
                disabled={erPaSisteSide}
                onClick={() => totalPaginering(side + 1, seFlere)}
                data-testid="paginering_hoyre"
                ariaLabel="Neste side"
            >
                <HoyreChevron />
            </KnappPanel>
        </div>
    );
}

export default Paginering;
