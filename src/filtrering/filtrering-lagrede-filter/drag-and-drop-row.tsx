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

function DragAndDropRow({ children, idx, dropAnimation, sourceIndex, destIndex, setIsSource, setIsDestination }: DragAndDropRowProps) {
    const dragNode = useRef<HTMLLIElement>(null);

    const handleDragStart = (e) => {
        if (dragNode.current && dragNode.current.contains(e.target)) {
            // Setter start elementet
            setIsSource(idx)
        }
    };

    const handleOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (dragNode.current && dragNode.current.contains(e.target)) {
            if (idx !== sourceIndex) {
                if (idx !== destIndex) {
                    setIsDestination(idx)
                }
            } else {
                // Element blir dratt over start elementet
                // Reseter destination hvis nødvendig
                if (idx !== -1) {
                    setIsDestination(-1)
                }
            }
        }
    };

    useEventListener('dragstart', handleDragStart);
    useEventListener('dragover', handleOver);

    let dragAndDropCssClass = "drag-and-drop-row"
    dragAndDropCssClass += (dropAnimation) ? " dropped" : ""
    if (sourceIndex === idx)
        dragAndDropCssClass += " drag-elem"
    else if (destIndex === idx)
        dragAndDropCssClass += (sourceIndex < destIndex) ? " over-from-above" : " over-from-below"

    return (
        <li ref={dragNode} className={dragAndDropCssClass} draggable="true" >
            {children}
        </li>
    );
}

export default DragAndDropRow;
