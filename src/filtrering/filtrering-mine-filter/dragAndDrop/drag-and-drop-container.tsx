import React, { useRef, useState } from 'react';
import { useEventListener } from '../../../hooks/use-event-listener';
import DragAndDropRow from './drag-and-drop-row';
import './drag-and-drop.less';
import NyMineFilterRad from '../ny_mine-filter-rad';
import { useDispatch } from 'react-redux';
import { lagreSorteringForFilter, MineFilter } from '../../../ducks/mine-filter';
import { Checkbox } from 'nav-frontend-skjema';
import { Hovedknapp, Flatknapp, Knapp } from 'nav-frontend-knapper';

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
    const [requestRowInFocuse, setRequestRowInFocuse] = useState(-1);
    const [updateRequest, setUpdateRequest] = useState(false);
    const [ariaTekst, setAriaTekst] = useState('');
    const [dragIsInsideElement, setdDragIsInsideElement] = useState(false);
    const dragContainer = useRef<HTMLUListElement>(null);

    const dispatch = useDispatch();

    const lagreRekkefølge = () => {
        const idAndPriorities = dragAndDropOrder.map((filter, idx) => ({
            sortOrder: idx,
            filterId: filter.filterId
        }));
        dispatch(lagreSorteringForFilter(idAndPriorities));
        setisDraggable(false);
    };

    const avbryt = () => {
        setDragAndDropOrder([...stateFilterOrder]);
        setisDraggable(false);
    };

    const alfabetiskSort = () => {
        dragAndDropOrder.sort((a: MineFilter, b: MineFilter) => {
            return a.filterNavn.toLowerCase().localeCompare(b.filterNavn.toLowerCase(), undefined, { numeric: true });
        });
        setAriaTekst('Filtre har blitt sortert i alfabetisk rekkefølge.');
        setDragAndDropOrder([...dragAndDropOrder]);
    };

    const orderIsRequestedToChange = () => {
        if (destIndex !== -1 && srcIndex !== -1 && destIndex < dragAndDropOrder.length) {
            if (srcIndex < destIndex)
                setAriaTekst(
                    dragAndDropOrder[srcIndex].filterNavn +
                        ' flyttet under ' +
                        dragAndDropOrder[destIndex].filterNavn +
                        ', til posisjon ' +
                        (destIndex + 1) +
                        '.'
                );
            else
                setAriaTekst(
                    dragAndDropOrder[srcIndex].filterNavn +
                        ' flyttet over ' +
                        dragAndDropOrder[destIndex].filterNavn +
                        ', til posisjon ' +
                        (destIndex + 1) +
                        '.'
                );
            flyttElementIArray(dragAndDropOrder, srcIndex, destIndex);

            setDragAndDropOrder([...dragAndDropOrder]);
            setdDragIsInsideElement(false);
            setDropIndex(destIndex);
            setRequestRowInFocuse(destIndex);
        }
        setSrcIndex(-1);
        setDestIndex(-1);
    };

    if (updateRequest) {
        orderIsRequestedToChange();
        setUpdateRequest(false);
    }

    const handleDragStart = (e) => {
        if (dragContainer.current && dragContainer.current.contains(e.target) && !dragIsInsideElement) {
            setdDragIsInsideElement(true);
            setDropIndex(-1);
        }
    };

    const handleDragLeave = (e) => {
        if (dragContainer.current && !dragContainer.current.contains(e.target) && dragIsInsideElement) {
            setdDragIsInsideElement(false);
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
        if (dragContainer.current && dragContainer.current.contains(e.target)) {
            if (e.altKey && (e.keyCode === 38 || e.keyCode === 40)) {
                // Piltast opp og ned
                orderIsRequestedToChange();
            } else if (e.keyCode === 32) {
                // Space
                setAriaTekst(
                    'Bruk piltast opp eller ned for å velge et annet filter. Hold nede alt og press opp eller ned for å endre rekkefølgen til filter. Enter for å lagre. Escape for å avbryte.'
                );
            } else if (e.keyCode === 27) {
                // Esc.
                avbryt();
            } else if (e.keyCode === 13) {
                // Enter
                lagreRekkefølge();
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
                <span aria-live="assertive" className="assistive-text">
                    {ariaTekst}
                </span>
                <ul ref={dragContainer} className="drag-and-drop-container" role={'listbox'}>
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
                            setRequestRowInFocuse={setRequestRowInFocuse}
                            setDropIndex={setDropIndex}
                            setRequestUpdate={setUpdateRequest}
                            shouldBeFocused={idx === requestRowInFocuse}
                            isLastRow={idx === dragAndDropOrder.length - 1}
                        ></DragAndDropRow>
                    ))}
                </ul>
                <div className="drag-and-drop-knapper">
                    <Hovedknapp className="drag-and-drop-knapp-lagre" mini onClick={(e) => lagreRekkefølge()}>
                        Lagre
                    </Hovedknapp>
                    <Knapp className="drag-and-drop-knapp-avbryt" mini onClick={(e) => avbryt()}>
                        Avbryt
                    </Knapp>
                    <Flatknapp
                        className="drag-and-drop-knapp-nullstill"
                        aria-label="Nullstill til alfabetisk sortering"
                        mini
                        onClick={(e) => alfabetiskSort()}
                    >
                        Nullstill
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
}

export default DragAndDropContainer;
