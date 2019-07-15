import { default as React, RefObject } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useFocus } from '../../hooks/use-focus';

interface CollapseContainerProps {
    focusRef: RefObject<HTMLDivElement>;
    children: React.ReactNode;

}

interface TransitionProps extends CollapseContainerProps{
    visible: boolean;

}

export default function TransitionContainer(props: TransitionProps) {
    return (
        <TransitionGroup component={null}>
            {props.visible && (
                <CSSTransition classNames="collapse-container" timeout={400}>
                    <CollapseContainer focusRef={props.focusRef}>
                        {props.children}
                    </CollapseContainer>
                </CSSTransition>
            )}
        </TransitionGroup>
    );
}

function CollapseContainer(props: CollapseContainerProps){
    useFocus(props.focusRef, []);
    return (
        <div className="collapse-container">
            <div className="endringslogg-content" ref={props.focusRef} tabIndex={-1}>
                {props.children}
            </div>
        </div>
    )
}
