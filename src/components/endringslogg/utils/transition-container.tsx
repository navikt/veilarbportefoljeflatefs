import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useFocus } from '../../../hooks/use-focus';
import '../endringslogg.less';
import '../collapse-container-transition.less';

interface CollapseContainerProps {
    children: React.ReactNode;
}

interface TransitionProps extends CollapseContainerProps {
    visible: boolean;
}

export default function TransitionContainer(props: TransitionProps) {
    return (
        <TransitionGroup component={null}>
            {props.visible && (
                <CSSTransition classNames="collapse-container" timeout={400}>
                    <CollapseContainer>
                        {props.children}
                    </CollapseContainer>
                </CSSTransition>
            )}
        </TransitionGroup>
    );
}

function CollapseContainer(props: CollapseContainerProps) {
    const focusRef = useFocus();
    return (
        <div className="collapse-container">
            <div className="endringslogg-content" ref={focusRef} tabIndex={-1}>
                {props.children}
            </div>
        </div>
    );
}
