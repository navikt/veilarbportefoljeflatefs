import {Dispatch, MutableRefObject, SetStateAction, useCallback, useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import {BodyShort, Button} from '@navikt/ds-react';
import {useEventListener} from '../../../hooks/use-event-listener';
import DragAndDropRow from './drag-and-drop-row';
import {handleDragEnd, handleDragEnter, handleDragOver, handleDragStart} from './mouse-drag-event-listeners';
import {handleKeyDown, handleKeyUp} from './keyboard-event-listeners';
import {LagretFilter} from '../../../ducks/lagret-filter';
import './drag-and-drop.css';

interface DragAndDropContainerProps {
    dragAndDropOrder: LagretFilter[];
    setDragAndDropOrder: Dispatch<SetStateAction<LagretFilter[]>>;
    lagreRekkefolge: () => void;
    avbryt: () => void;
    onUnmount: MutableRefObject<() => void>;
}

export function DragAndDropContainer({
    dragAndDropOrder,
    setDragAndDropOrder,
    lagreRekkefolge,
    avbryt,
    onUnmount
}: DragAndDropContainerProps) {
    const [srcIndex, setSrcIndex] = useState(-1);
    const [destIndex, setDestIndex] = useState(-1);
    const [dropIndex, setDropIndex] = useState(-1);
    const [requestRowInFocuse, setRequestRowInFocuse] = useState(0);
    const [ariaTekst, setAriaTekst] = useState('');
    const [dragIsInsideElement, setDragIsInsideElement] = useState(false);
    const dragContainer = useRef<HTMLUListElement>(null);
    const dragAndDropOrderRef = useRef(dragAndDropOrder);

    useEffect(() => {
        dragAndDropOrderRef.current = dragAndDropOrder;
    }, [dragAndDropOrder]);

    const alfabetiskSort = () => {
        dragAndDropOrder.sort((a: LagretFilter, b: LagretFilter) => {
            return a.filterNavn.toLowerCase().localeCompare(b.filterNavn.toLowerCase(), undefined, {numeric: true});
        });
        setAriaTekst('Filtrene har blitt sortert i alfabetisk rekkefølge.');
        setDragAndDropOrder([...dragAndDropOrder]);
    };

    const requestNewOrder = useCallback(
        (from: number, to: number) => {
            if (to !== from && to !== -1 && from !== -1 && to < dragAndDropOrderRef.current.length) {
                if (from < to)
                    setAriaTekst(
                        dragAndDropOrderRef.current[from].filterNavn +
                            ' flyttet under ' +
                            dragAndDropOrderRef.current[to].filterNavn +
                            ', til posisjon ' +
                            (to + 1) +
                            '.'
                    );
                else
                    setAriaTekst(
                        dragAndDropOrderRef.current[from].filterNavn +
                            ' flyttet over ' +
                            dragAndDropOrderRef.current[to].filterNavn +
                            ', til posisjon ' +
                            (to + 1) +
                            '.'
                    );
                flyttElementIArray(dragAndDropOrderRef.current, from, to);

                setDragAndDropOrder([...dragAndDropOrderRef.current]);
                setDropIndex(to);
                setRequestRowInFocuse(to);
            } else {
                setDropIndex(-1);
            }
            setSrcIndex(-1);
            setDestIndex(-1);
        },
        [dragAndDropOrderRef, setDragAndDropOrder]
    );

    const requestFocus = useCallback((row: number) => {
        if (row !== -1) setDropIndex(-1);
        setSrcIndex(-1);
        setDestIndex(-1);
        setRequestRowInFocuse(row);
    }, []);

    //-------- Function call on unMount --------
    useEffect(() => () => onUnmount.current(), [onUnmount]);

    //-------- Drag and drop with mouse handeling --------
    const eventIsInsideContainer = e => dragContainer.current !== null && dragContainer.current.contains(e.target);

    useEventListener('dragstart', handleDragStart({eventIsInsideContainer, setSrcIndex, setDropIndex}));
    useEventListener(
        'dragenter',
        handleDragEnter({eventIsInsideContainer, setdDragIsInsideElement: setDragIsInsideElement})
    );
    useEventListener('dragover', handleDragOver({eventIsInsideContainer, setDestIndex}));
    useEventListener(
        'dragend',
        handleDragEnd({
            srcIndex,
            destIndex,
            dragIsInsideElement,
            requestNewOrder,
            setSrcIndex,
            setDestIndex,
            eventIsInsideContainer
        })
    );

    //-------- Keybord handeling --------
    const prepFlyttOpp = useCallback((index: number) => {
        setSrcIndex(index);
        setDestIndex(index - 1);
    }, []);

    const prepFlyttNed = useCallback((index: number) => {
        setSrcIndex(index);
        setDestIndex(index + 1);
    }, []);

    useEventListener(
        'keyup',
        handleKeyUp({
            eventIsInsideContainer,
            requestNewOrder,
            lagreRekkefolge: lagreRekkefolge,
            avbryt,
            setDestIndex,
            setSrcIndex
        })
    );
    useEventListener(
        'keydown',
        handleKeyDown({
            eventIsInsideContainer,
            setDropIndex,
            prepFlyttOpp,
            prepFlyttNed,
            requestFocus
        })
    );

    return (
        <>
            <div aria-live="assertive" className="assistive-text">
                {ariaTekst}
            </div>
            <BodyShort
                size="small"
                className="drag-and-drop-tittel"
                aria-readonly="true"
                aria-live="polite"
                data-testid="drag-drop_infotekst"
            >
                Endre rekkefølge med SHIFT-tast + piltaster eller dra og slipp:
            </BodyShort>
            <ul
                ref={dragContainer}
                className="drag-and-drop-container"
                role={'listbox'}
                data-testid="drag-drop_container"
            >
                {dragAndDropOrder.map((filter, idx) => (
                    <DragAndDropRow
                        key={filter.filterId}
                        idx={idx}
                        filterNavn={filter.filterNavn}
                        isLastRow={idx === dragAndDropOrder.length - 1}
                        shouldBeFocused={idx === requestRowInFocuse}
                        requestFocus={requestFocus}
                        onClick={requestNewOrder}
                        className={classNames({
                            'drag-and-drop-row': true,
                            dropped: dropIndex === idx,
                            'drag-elem': srcIndex === idx,
                            'over-from-above': destIndex === idx && srcIndex < destIndex,
                            'over-from-below': destIndex === idx && srcIndex > destIndex
                        })}
                    />
                ))}
            </ul>
            <div className="drag-and-drop-knapper">
                <Button
                    size="small"
                    className="drag-and-drop-knapp-lagre"
                    aria-label="Lagre sortering"
                    onClick={() => lagreRekkefolge()}
                    data-testid="mine-filter_sortering_lagre-knapp"
                >
                    Lagre
                </Button>
                <Button
                    size="small"
                    variant="secondary"
                    className="drag-and-drop-knapp-avbryt"
                    aria-label="Avbryt sortering"
                    onClick={() => avbryt()}
                    data-testid="mine-filter_sortering_avbryt-knapp"
                >
                    Avbryt
                </Button>
                <Button
                    size="small"
                    variant="tertiary"
                    className="drag-and-drop-knapp-nullstill"
                    aria-label="Nullstill til alfabetisk sortering"
                    onClick={() => alfabetiskSort()}
                    data-testid="mine-filter_sortering_nullstill-knapp"
                >
                    Nullstill
                </Button>
            </div>
        </>
    );
}

function flyttElementIArray(arr: any[], fromIndex: number, toIndex: number) {
    const verdiSomFlyttes = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, verdiSomFlyttes);
}
