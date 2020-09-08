import React, { useRef, useEffect } from 'react';
import { useEventListener } from '../../hooks/use-event-listener';

export interface DragAndDropRowProps {
    idx: number;
    dropIndex: number;
    sourceIndex: number;
    destIndex: number;
    filterNavn: string;
    setIsSource: React.Dispatch<React.SetStateAction<number>>;
    setIsDestination: React.Dispatch<React.SetStateAction<number>>;
    setDropIndex: React.Dispatch<React.SetStateAction<number>>;
    ariaTekstDropElement: string;
}

function DragAndDropRow({
    idx,
    dropIndex,
    sourceIndex,
    destIndex,
    filterNavn,
    setIsSource,
    setIsDestination,
    setDropIndex,
    ariaTekstDropElement
}: DragAndDropRowProps) {
    const dragNode = useRef<HTMLLIElement>(null);
    const dropAnimation = dropIndex === idx;
    const handleDragStart = (e) => {
        if (dragNode.current && dragNode.current.contains(e.target)) {
            // Setter start elementet
            setIsSource(idx);
        }
    };

    const handleOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (dragNode.current && dragNode.current.contains(e.target)) {
            if (idx !== sourceIndex) {
                if (idx !== destIndex) {
                    setIsDestination(idx);
                }
            } else {
                // Element blir dratt over start elementet
                // Reseter destination hvis nødvendig
                if (idx !== -1) {
                    setIsDestination(-1);
                }
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.target === dragNode.current) {
            if (e.keyCode === 38 || e.keyCode === 40) {
                e.preventDefault();
                if (sourceIndex !== idx) setIsSource(idx);
                if (dropIndex !== -1) {
                    setDropIndex(-1);
                }
                if (e.keyCode === 38) {
                    setIsDestination(idx - 1);
                } else if (e.keyCode === 40) {
                    setIsDestination(idx + 1);
                }
            }
        }
    };

    useEffect(() => {
        if (dropAnimation && document.activeElement !== dragNode.current) {
            dragNode.current?.focus();
        }
    }, [dropAnimation]);

    useEventListener('dragstart', handleDragStart);
    useEventListener('dragover', handleOver);
    useEventListener('keydown', handleKeyDown);

    let dragAndDropCssClass = 'drag-and-drop-row';
    dragAndDropCssClass += dropAnimation ? ' dropped' : '';
    if (sourceIndex === idx) dragAndDropCssClass += ' drag-elem';
    else if (destIndex === idx)
        dragAndDropCssClass += sourceIndex < destIndex ? ' over-from-above' : ' over-from-below';

    if (dropAnimation) {
        return (
            <li
                ref={dragNode}
                className={dragAndDropCssClass}
                aria-label={ariaTekstDropElement}
                draggable="true"
                tabIndex={0}
            >
                {filterNavn}
            </li>
        );
    }
    return (
        <li ref={dragNode} className={dragAndDropCssClass} draggable="true" tabIndex={0}>
            {filterNavn}
        </li>
    );
}

export default DragAndDropRow;
