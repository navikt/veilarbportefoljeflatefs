import {default as React, RefObject, useRef } from 'react';
import {useFocus} from "../../hooks/use-focus";



interface EndringsloggContainerProps {
    children: React.ReactNode;
    onClose: () => void;
    buttonRef: RefObject<HTMLDivElement>;
}

export default function EndringsloggContainer(props: EndringsloggContainerProps) {

    const loggNode = useRef<HTMLDivElement>(null);
    useFocus(loggNode);

    return(
            <div className="collapse-container">
                <div className="content" ref={loggNode} tabIndex={-1}>
                    {props.children}
                </div>
            </div>
    )
}
