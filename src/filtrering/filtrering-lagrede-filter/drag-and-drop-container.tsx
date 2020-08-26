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
}

function DragAndDropContainer(props: DragAndDropContainerProps) {
    const dragContainer = useRef<HTMLUListElement>(null);
    const [dragIsInsideElement, setdDagIsInsideElement] = useState(false);
    const handleDragStart = (e) => {
        if (dragContainer.current) {
            if (dragContainer.current.contains(e.target) && !dragIsInsideElement) {
                setdDagIsInsideElement(true)
            }
        }
    };

    const handleDragLeave = (e) => {
        if (dragContainer.current) {
            if (!dragContainer.current.contains(e.target) && dragIsInsideElement) {
                setdDagIsInsideElement(false)
            }
        }
    };

    const handleDragEnd = (e) => {
        if (dragIsInsideElement && props.destIndex !== -1 && props.sourceIndex !== -1) {
            let temp = props.liste[props.sourceIndex]
            props.liste[props.sourceIndex] = props.liste[props.destIndex]
            props.liste[props.destIndex] = temp
            props.setdragAndDropList(props.liste)
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

export default DragAndDropContainer;
