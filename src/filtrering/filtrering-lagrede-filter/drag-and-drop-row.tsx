import React, { useRef } from "react";
import { useEventListener } from '../../hooks/use-event-listener';

export interface DragAndDropRowProps {
    children: React.ReactNode;
    idx: number;
    dropAnimation: boolean
    sourceIndex: number;
    destIndex: number;
    setIsSource: React.Dispatch<React.SetStateAction<number>>;
    setIsDestination: React.Dispatch<React.SetStateAction<number>>;
}

function DragAndDropRow(props: DragAndDropRowProps) {
    const dragNode = useRef<HTMLLIElement>(null);

    const handleDragStart = (e) => {
        if (dragNode.current && dragNode.current.contains(e.target)) {
            // Setter start elementet
            props.setIsSource(props.idx)
        }
    };

    const handleOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (dragNode.current && dragNode.current.contains(e.target)) {
            if (props.idx !== props.sourceIndex) {
                if (props.idx !== props.destIndex) {
                    props.setIsDestination(props.idx)
                }
            } else {
                // Element blir dratt over start elementet
                // Reseter destination hvis nødvendig
                if (props.idx !== -1) {
                    props.setIsDestination(-1)
                }
            }
        }
    };

    useEventListener('dragstart', handleDragStart);
    useEventListener('dragover', handleOver);

    let dragAndDropCssClass = "drag-and-drop-row"
    dragAndDropCssClass += (props.dropAnimation) ? " dropped" : ""
    if (props.destIndex === props.idx)
        dragAndDropCssClass += (props.sourceIndex <= props.destIndex) ? " over-from-above" : " over-from-below"
    else if (props.sourceIndex === props.idx)
        dragAndDropCssClass += " drag-elem"
    
    return (
        <li ref={dragNode} className={dragAndDropCssClass} draggable="true" >
            {props.children}
        </li>
    );
}

export default DragAndDropRow;
