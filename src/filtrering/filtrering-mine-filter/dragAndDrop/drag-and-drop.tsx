import React, {useState, useEffect, useCallback} from 'react';
import './drag-and-drop.less';
import {MineFilter, lagreSorteringForFilter} from '../../../ducks/mine-filter';
import DragAndDropContainer from './drag-and-drop-container';
import NyMineFilterRad from '../ny_mine-filter-rad';
import {useDispatch} from 'react-redux';
import {useOnlyOnUnmount} from './use-only-onUnmount-hook';
import {sortMineFilter} from '../../../components/sidebar/sidevelger';

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
        setisDraggable(false);
    };

    useEffect(() => {
        setOnUnmount(lagreRekkefolge);
    }, [lagreRekkefolge, setOnUnmount]);

    useEffect(() => {
        setDragAndDropOrder(overskrivStateRekefulge(stateFilterOrder, dragAndDropOrder));
    }, [stateFilterOrder, dragAndDropOrder]);

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
        <>
            {dragAndDropOrder.map((filter, idx) => (
                <NyMineFilterRad key={idx} filter={filter} filtergruppe={filtergruppe} />
            ))}
        </>
    );
}

function overskrivStateRekefulge(stateArray: MineFilter[], dragAndDropArray: MineFilter[]) {
    const newDragAndDropArray = [...stateArray];
    newDragAndDropArray.forEach(
        (a: MineFilter) => (a.sortOrder = dragAndDropArray.findIndex((b) => b.filterId === a.filterId))
    );
    newDragAndDropArray.sort(sortMineFilter);

    if (harEndretRekkefolge(newDragAndDropArray, dragAndDropArray)) {
        return newDragAndDropArray;
    }
    return dragAndDropArray;
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
