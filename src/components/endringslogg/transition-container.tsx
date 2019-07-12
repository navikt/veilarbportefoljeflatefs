import { default as React } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function TransitionContainer(props: {visible: boolean, children: React.ReactNode}) {
    return (
        <TransitionGroup component={null}>
            {props.visible && (
                <CSSTransition classNames="collapse-container" timeout={400}>
                    {props.children}
                </CSSTransition>
            )}
        </TransitionGroup>
    );
}



