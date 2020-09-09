import React, { useRef, useState } from 'react';
import { useEventListener } from '../../hooks/use-event-listener';
import DragAndDropRow from './drag-and-drop-row';
import './drag-and-drop.less';
import NyMineFilterRad from './ny_mine-filter-rad';
import { useDispatch } from 'react-redux';
import { lagreSorteringForFilter, MineFilter } from '../../ducks/mine-filter';
import { Checkbox } from 'nav-frontend-skjema';
import { Fareknapp, Hovedknapp, Flatknapp } from 'nav-frontend-knapper';

export interface DragAndDropProps {
    stateFilterOrder: MineFilter[];
    filtergruppe: string;
}

function DragAndDropContainer({ stateFilterOrder, filtergruppe }: DragAndDropProps) {
    const [dragAndDropOrder, setDragAndDropOrder] = useState([...stateFilterOrder]);
    const [isDraggable, setisDraggable] = useState(false);
    const [srcIndex, setSrcIndex] = useState(-1);
    const [destIndex, setDestIndex] = useState(-1);
    const [dropIndex, setDropIndex] = useState(-1);
    const [ariaTekst, setAriaTekst] = useState('');
    const [dragIsInsideElement, setdDragIsInsideElement] = useState(false);
    const dragContainer = useRef<HTMLUListElement>(null);

    const dispatch = useDispatch();

    const saveOrder = () => {
        const idAndPriorities = dragAndDropOrder.map((filter, idx) => ({
            sortOrder: idx,
            filterId: filter.filterId
        }));
        dispatch(lagreSorteringForFilter(idAndPriorities));
        setisDraggable(false);
    };

    const avbryt = () => {
        dragAndDropOrder.sort((a: MineFilter, b: MineFilter) => {
            if (a.sortOrder !== null) {
                if (b.sortOrder !== null) {
                    return a.sortOrder - b.sortOrder;
                }
                return -1;
            }
            if (b.sortOrder !== null) {
                return 1;
            }
            return a.filterNavn.toLowerCase().localeCompare(b.filterNavn.toLowerCase(), undefined, { numeric: true });
        });
        setDragAndDropOrder([...stateFilterOrder]);
        setisDraggable(false);
    };

    const alfabetiskSort = () => {
        dragAndDropOrder.sort((a: MineFilter, b: MineFilter) => {
            return a.filterNavn.toLowerCase().localeCompare(b.filterNavn.toLowerCase(), undefined, { numeric: true });
        });
        setDragAndDropOrder([...dragAndDropOrder]);
    };

    const orderIsRequestedToChange = () => {
        if (destIndex !== -1 && srcIndex !== -1 && destIndex < dragAndDropOrder.length) {
            if (srcIndex < destIndex)
                setAriaTekst(
                    dragAndDropOrder[srcIndex].filterNavn + ' flyttet under ' + dragAndDropOrder[destIndex].filterNavn
                );
            else
                setAriaTekst(
                    dragAndDropOrder[srcIndex].filterNavn + ' flyttet over ' + dragAndDropOrder[destIndex].filterNavn
                );
            flyttElementIArray(dragAndDropOrder, srcIndex, destIndex);

            setdDragIsInsideElement(false);
            setDropIndex(destIndex);
        }
        setSrcIndex(-1);
        setDestIndex(-1);
    };

    const handleDragStart = (e) => {
        if (dragContainer.current) {
            if (dragContainer.current.contains(e.target) && !dragIsInsideElement) {
                setdDragIsInsideElement(true);
                setDropIndex(-1);
            }
        }
    };

    const handleDragLeave = (e) => {
        if (dragContainer.current) {
            if (!dragContainer.current.contains(e.target) && dragIsInsideElement) {
                setdDragIsInsideElement(false);
            }
        }
    };

    const handleDragEnd = (e) => {
        if (dragIsInsideElement) {
            orderIsRequestedToChange();
        } else {
            setSrcIndex(-1);
            setDestIndex(-1);
        }
    };

    const handleKeyUp = (e) => {
        if (dragContainer.current) {
            if (dragContainer.current.contains(e.target)) {
                if (e.keyCode === 38 || e.keyCode === 40) {
                    orderIsRequestedToChange();
                }
            }
        }
    };

    useEventListener('dragenter', handleDragStart);
    useEventListener('dragleave', handleDragLeave);
    useEventListener('dragend', handleDragEnd);
    useEventListener('keyup', handleKeyUp);

    let endreRekkefølgeCheckbox = (
        <Checkbox
            label={'Endre rekkefølge:'}
            aria-label={isDraggable ? 'Marker filter og endre rekkefølge med piltast.' : 'Endre rekkefølge'}
            defaultChecked={false}
            checked={isDraggable}
            onChange={(e) => {
                if (!e.target.checked) avbryt();
                setisDraggable(e.target.checked);
                setDropIndex(-1);
            }}
        />
    );
    if (isDraggable) {
        return (
            <>
                {endreRekkefølgeCheckbox}
                <ul ref={dragContainer} className="drag-and-drop-container">
                    {dragAndDropOrder.map((filter, idx) => (
                        <DragAndDropRow
                            key={idx}
                            idx={idx}
                            setIsDestination={setDestIndex}
                            setIsSource={setSrcIndex}
                            destIndex={destIndex}
                            sourceIndex={srcIndex}
                            dropIndex={dropIndex}
                            filterNavn={filter.filterNavn}
                            setDropIndex={setDropIndex}
                            ariaTekstDropElement={ariaTekst}
                        ></DragAndDropRow>
                    ))}
                </ul>
                <div className="drag-and-drop-knapper">
                    <Hovedknapp mini onClick={(e) => saveOrder()}>
                        Lagre
                    </Hovedknapp>
                    <Fareknapp mini onClick={(e) => avbryt()}>
                        Avbryt
                    </Fareknapp>
                    <Flatknapp mini onClick={() => alfabetiskSort()}>
                        Sorter
                    </Flatknapp>
                </div>
            </>
        );
    }
    return (
        <>
            {endreRekkefølgeCheckbox}
            <ul ref={dragContainer} className="drag-and-drop-container">
                {dragAndDropOrder.map((filter, idx) => (
                    <NyMineFilterRad key={idx} filter={filter} filtergruppe={filtergruppe} />
                ))}
            </ul>
        </>
    );
}

function flyttElementIArray(arr: any[], fromIndex: number, toIndex: number) {
    const verdiSomFlyttes = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, verdiSomFlyttes);
    return arr;
}

export default DragAndDropContainer;
