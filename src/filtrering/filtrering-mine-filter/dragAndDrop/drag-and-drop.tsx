import React, {useState, useEffect, useCallback} from 'react';
import './drag-and-drop.less';
import {MineFilter, lagreSorteringForFilter} from '../../../ducks/mine-filter';
import DragAndDropContainer from './drag-and-drop-container';
import NyMineFilterRad from '../ny_mine-filter-rad';
import {useDispatch} from 'react-redux';
import {useOnlyOnUnmount} from './use-only-onUnmount-hook';

export interface DragAndDropProps {
    stateFilterOrder: MineFilter[];
    filtergruppe: string;
    isDraggable: boolean;
    setisDraggable: React.Dispatch<React.SetStateAction<boolean>>;
}

function DragAndDrop({stateFilterOrder, filtergruppe, isDraggable, setisDraggable}: DragAndDropProps) {
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
        // Automatisk lagring på onUnmount.
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
                lagreRekkefølge={lagre}
                avbryt={avbryt}
                onUnmount={onUnmountRef}
            />
        );
    }

    return (
        <>
            {dragAndDropOrder.map((filter, idx) => (
                <NyMineFilterRad key={idx} filter={filter} filtergruppe={filtergruppe} />
            ))}
        </>
    );
}

function harEndretRekkefolge(a: MineFilter[], b: MineFilter[]) {
    return !(
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val.filterNavn === b[index].filterNavn)
    );
}

export default DragAndDrop;
