import React, { useRef, useState } from "react";
import './drag-and-drop.less';
import { useEventListener } from "../../hooks/use-event-listener";

interface DragAndDropContainerProps {
    liste: any[];
    children: React.ReactNode;

    setdragAndDropList: React.Dispatch<React.SetStateAction<any[]>>;
    setIsSource: React.Dispatch<React.SetStateAction<number>>;
    setIsDestination: React.Dispatch<React.SetStateAction<number>>;
    sourceIndex: number;
    destIndex: number;
    setDropIndex: React.Dispatch<React.SetStateAction<number>>;
}

function DragAndDropContainer(props: DragAndDropContainerProps) {
    const dragContainer = useRef<HTMLUListElement>(null);
    const [dragIsInsideElement, setdDragIsInsideElement] = useState(false);
    const handleDragStart = (e) => {
        if (dragContainer.current) {
            if (dragContainer.current.contains(e.target) && !dragIsInsideElement) {
                setdDragIsInsideElement(true)
                props.setDropIndex(-1)
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
        if (dragIsInsideElement && props.destIndex !== -1 && props.sourceIndex !== -1) {
            const nyListe = flyttElementIArray(props.liste, props.sourceIndex, props.destIndex)
            props.setdragAndDropList(nyListe)
            props.setDropIndex(props.destIndex)
            setdDragIsInsideElement(false)
        }
        props.setIsSource(-1)
        props.setIsDestination(-1)
    };

    useEventListener('dragenter', handleDragStart);
    useEventListener('dragleave', handleDragLeave);
    useEventListener('dragend', handleDragEnd);
    return (
        <ul ref={dragContainer} className="drag-and-drop-container" >
            {props.children}
        </ul>
    );
}

function flyttElementIArray(arr: any[], src_index: number, dest_index: number) {
    const verdiSomFlyttes = arr[src_index]
    arr.splice(src_index, 1);
    arr.splice(dest_index, 0, verdiSomFlyttes);
    return arr; 
};

export default DragAndDropContainer;
