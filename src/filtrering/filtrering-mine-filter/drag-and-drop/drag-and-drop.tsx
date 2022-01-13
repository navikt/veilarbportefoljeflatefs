import React, {useCallback, useEffect, useState} from 'react';
import './drag-and-drop.less';
import {lagreSorteringForFilter} from '../../../ducks/mine-filter';
import DragAndDropContainer from './drag-and-drop-container';
import MineFilterRad from '../mine-filter-rad';
import {useDispatch} from 'react-redux';
import {useOnlyOnUnmount} from './use-only-onUnmount-hook';
import {LagretFilter} from '../../../ducks/lagret-filter';
import {OversiktType} from '../../../ducks/ui/listevisning';
import {OrNothing} from '../../../utils/types/types';
import {Tiltak} from '../../../ducks/enhettiltak';
import {RadioGroup} from '@navikt/ds-react';

export interface DragAndDropProps {
    stateFilterOrder: LagretFilter[];
    oversiktType: OversiktType;
    isDraggable: boolean;
    setisDraggable: React.Dispatch<React.SetStateAction<boolean>>;
    enhettiltak: OrNothing<Tiltak>;
}

function DragAndDrop({stateFilterOrder, oversiktType, isDraggable, setisDraggable, enhettiltak}: DragAndDropProps) {
    const [dragAndDropOrder, setDragAndDropOrder] = useState([...stateFilterOrder]);
    const [onUnmountRef, setOnUnmount] = useOnlyOnUnmount();
    const dispatch = useDispatch();

    const lagreRekkefolge = useCallback(() => {
        const idAndPriorities = dragAndDropOrder.map((filter, idx) => ({
            sortOrder: idx,
            filterId: filter.filterId
        }));
        if (harEndretRekkefolge(dragAndDropOrder, stateFilterOrder)) {
            dispatch(lagreSorteringForFilter(idAndPriorities));
        }
        setisDraggable(false);
    }, [dragAndDropOrder, stateFilterOrder, setisDraggable, dispatch]);

    const avbryt = () => {
        setOnUnmount(() => null);
        setDragAndDropOrder([...stateFilterOrder]);
        setisDraggable(false);
    };

    const lagre = () => {
        setisDraggable(false);
    };

    useEffect(() => {
        setOnUnmount(lagreRekkefolge);
    }, [lagreRekkefolge, setOnUnmount]);

    useEffect(() => {
        setDragAndDropOrder([...stateFilterOrder]);
    }, [stateFilterOrder]);

    if (isDraggable) {
        return (
            <DragAndDropContainer
                dragAndDropOrder={dragAndDropOrder}
                setDragAndDropOrder={setDragAndDropOrder}
                lagreRekkefolge={lagre}
                avbryt={avbryt}
                onUnmount={onUnmountRef}
            />
        );
    }

    return (
        <RadioGroup legend="" hideLegend>
            {dragAndDropOrder.map((filter, idx) => (
                <MineFilterRad key={idx} mineFilter={filter} oversiktType={oversiktType} enhettiltak={enhettiltak} />
            ))}
        </RadioGroup>
    );
}

function harEndretRekkefolge(a: LagretFilter[], b: LagretFilter[]) {
    return !(
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val.filterNavn === b[index].filterNavn)
    );
}

export default DragAndDrop;
