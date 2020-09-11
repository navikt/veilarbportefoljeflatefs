import React, { useRef, useEffect } from 'react';
import { useEventListener } from '../../../hooks/use-event-listener';
import { ReactComponent as DragIcon } from './dragIcon.svg';
import { ReactComponent as PilAscending } from '../../../components/tabell/arrow-up.svg';
import { ReactComponent as PilDescending } from '../../../components/tabell/arrow-down.svg';
import classNames from 'classnames';

export interface DragAndDropRowProps {
    idx: number;
    dropIndex: number;
    sourceIndex: number;
    destIndex: number;
    filterNavn: string;
    isLastRow: boolean;
    shouldBeFocused: boolean;
    setIsSource: React.Dispatch<React.SetStateAction<number>>;
    setIsDestination: React.Dispatch<React.SetStateAction<number>>;
    setDropIndex: React.Dispatch<React.SetStateAction<number>>;
    setRequestUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    setRequestRowInFocuse: React.Dispatch<React.SetStateAction<number>>;
}

function DragAndDropRow({
    idx,
    dropIndex,
    sourceIndex,
    destIndex,
    filterNavn,
    isLastRow,
    shouldBeFocused,
    setRequestUpdate,
    setIsSource,
    setIsDestination,
    setDropIndex,
    setRequestRowInFocuse
}: DragAndDropRowProps) {
    const dragNode = useRef<HTMLLIElement>(null);
    const dropAnimation = dropIndex === idx;

    const flyttOpp = () => {
        if (sourceIndex !== idx) setIsSource(idx);
        if (dropIndex !== -1) setDropIndex(-1);
        setIsDestination(idx - 1);
    };
    const flyttNed = () => {
        if (sourceIndex !== idx) setIsSource(idx);
        if (dropIndex !== -1) setDropIndex(-1);
        setIsDestination(idx + 1);
    };
    const flyttFokusOpp = () => {
        if (sourceIndex !== -1) setIsSource(-1);
        if (dropIndex !== -1) setDropIndex(-1);
        if (destIndex !== -1) setIsDestination(-1);
        setRequestRowInFocuse(idx - 1);
    };
    const flyttFokusNed = () => {
        if (sourceIndex !== -1) setIsSource(-1);
        if (dropIndex !== -1) setDropIndex(-1);
        if (destIndex !== -1) setIsDestination(-1);
        setRequestRowInFocuse(idx + 1);
    };

    const flyttOppAndRequestUpdate = () => {
        flyttOpp();
        dragNode.current?.focus();
        setRequestUpdate(true);
    };

    const flyttNedAndRequestUpdate = () => {
        flyttNed();
        dragNode.current?.focus();
        setRequestUpdate(true);
    };

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
                if (e.keyCode === 38) {
                    if (e.altKey) {
                        flyttOpp();
                    } else {
                        flyttFokusOpp();
                    }
                } else {
                    if (e.altKey) {
                        flyttNed();
                    } else {
                        flyttFokusNed();
                    }
                }
            } else if (e.keyCode === 32) e.preventDefault();
        }
    };

    useEffect(() => {
        if (shouldBeFocused && document.activeElement !== dragNode.current) {
            dragNode.current?.focus();
            setRequestRowInFocuse(-1);
        }
    }, [shouldBeFocused, setRequestRowInFocuse]);

    useEventListener('dragstart', handleDragStart);
    useEventListener('dragover', handleOver);
    useEventListener('keydown', handleKeyDown);

    const dragAndDropCssClass = classNames({
        'drag-and-drop-row': true,
        dropped: dropAnimation,
        'drag-elem': sourceIndex === idx,
        'over-from-above': destIndex === idx && sourceIndex < destIndex,
        'over-from-below': destIndex === idx && sourceIndex > destIndex
    });

    const flyttKnapper = (
        <div className="flytt-knapper" aria-hidden="true">
            {idx !== 0 && (
                <div
                    className="flytt-knapp"
                    role="button"
                    aria-disabled="true"
                    onClick={(e) => flyttOppAndRequestUpdate()}
                >
                    <PilAscending />
                </div>
            )}
            {!isLastRow && (
                <div
                    className="flytt-knapp"
                    role="button"
                    aria-disabled="true"
                    onClick={(e) => flyttNedAndRequestUpdate()}
                >
                    <PilDescending />
                </div>
            )}
        </div>
    );
    const tabIndex = idx === 0 ? 0 : -1;
    return (
        <li
            ref={dragNode}
            className={dragAndDropCssClass}
            draggable="true"
            tabIndex={tabIndex}
            role="option"
            aria-describedby="operation"
            aria-selected={true}
        >
            <DragIcon aria-disabled={true} />
            {filterNavn}
            {flyttKnapper}
        </li>
    );
}

export default DragAndDropRow;
