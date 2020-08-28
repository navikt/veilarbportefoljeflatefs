import React, { useRef, useState } from "react";
import { useEventListener } from "../../hooks/use-event-listener";
import DragAndDropRow from "./drag-and-drop-row";
import './drag-and-drop.less';


export interface DragAndDropProps {
    dragAndDropElements: JSX.Element[]
}


function DragAndDropContainer({ dragAndDropElements }: DragAndDropProps) {
    const [srcIndex, setSrcIndex] = useState(-1);
    const [destIndex, setDestIndex] = useState(-1);
    const [dropIndex, setDropIndex] = useState(-1);
    const [dragIsInsideElement, setdDragIsInsideElement] = useState(false);
    const dragContainer = useRef<HTMLUListElement>(null);

    const handleDragStart = (e) => {
        if (dragContainer.current) {
            if (dragContainer.current.contains(e.target) && !dragIsInsideElement) {
                setdDragIsInsideElement(true)
                setDropIndex(-1)
            }
        }
    };

    const handleDragLeave = (e) => {
        if (dragContainer.current) {
            if (!dragContainer.current.contains(e.target) && dragIsInsideElement) {
                setdDragIsInsideElement(false)
            }
        }
    };

    const handleDragEnd = (e) => {
        if (dragIsInsideElement && destIndex !== -1 && srcIndex !== -1) {
            flyttElementIArray(dragAndDropElements, srcIndex, destIndex)
            setDropIndex(destIndex)
            setdDragIsInsideElement(false)
        }
        setSrcIndex(-1)
        setDestIndex(-1)
    };

    useEventListener('dragenter', handleDragStart);
    useEventListener('dragleave', handleDragLeave);
    useEventListener('dragend', handleDragEnd);
    return (
        <ul ref={dragContainer} className="drag-and-drop-container" >
            {dragAndDropElements.map((feild, idx) =>
                <DragAndDropRow key={idx}
                    idx={idx}
                    setIsDestination={setDestIndex}
                    setIsSource={setSrcIndex}
                    destIndex={destIndex}
                    sourceIndex={srcIndex}
                    dropAnimation={idx === dropIndex}
                >
                    {feild}
                </DragAndDropRow>
            )}
        </ul>
    );
}

function flyttElementIArray(arr: any[], fromIndex: number, toIndex: number) {
    const verdiSomFlyttes = arr[fromIndex]
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, verdiSomFlyttes);
    return arr;
};

export default DragAndDropContainer;
