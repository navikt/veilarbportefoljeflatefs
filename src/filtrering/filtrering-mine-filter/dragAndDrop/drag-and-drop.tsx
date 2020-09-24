import React, {useCallback, useEffect, useState} from 'react';
import './drag-and-drop.less';
import {lagreSorteringForFilter, MineFilter} from '../../../ducks/mine-filter';
import DragAndDropContainer from './drag-and-drop-container';
import NyMineFilterRad from '../ny_mine-filter-rad';
import {useDispatch} from 'react-redux';

export interface DragAndDropProps {
    stateFilterOrder: MineFilter[];
    filtergruppe: string;
    isDraggable: boolean;
    setisDraggable: React.Dispatch<React.SetStateAction<boolean>>;
}

function DragAndDrop({stateFilterOrder, filtergruppe, isDraggable, setisDraggable}: DragAndDropProps) {
    const [dragAndDropOrder, setDragAndDropOrder] = useState([...stateFilterOrder]);
    const dispatch = useDispatch();

    const lagreRekkefolge = useCallback(() => {
        const idAndPriorities = dragAndDropOrder.map((filter, idx) => ({
            sortOrder: idx,
            filterId: filter.filterId
        }));
        if (harEndretRekkefølge(dragAndDropOrder, stateFilterOrder)) {
            dispatch(lagreSorteringForFilter(idAndPriorities));
        }
        setisDraggable(false);
    }, [dragAndDropOrder, stateFilterOrder, setisDraggable, dispatch]);

    const avbryt = () => {
        setDragAndDropOrder([...stateFilterOrder]);
        setisDraggable(false);
    };

    useEffect(()=>{
        return () => {
            if (isDraggable){
                lagreRekkefolge()
            } };
    },[isDraggable])

    if (isDraggable) {
        return (
            <DragAndDropContainer
                dragAndDropOrder={dragAndDropOrder}
                setDragAndDropOrder={setDragAndDropOrder}
                lagreRekkefølge={lagreRekkefolge}
                avbryt={avbryt}
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

function harEndretRekkefølge(a: MineFilter[], b: MineFilter[]) {
    return !(
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val.filterNavn === b[index].filterNavn)
    );
}

export default DragAndDrop;
