import {ReactNode} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {useFocus} from './hooks/use-focus';
import './endringslogg.css';
import './collapse-container-transition.css';

interface CollapseContainerProps {
    children?: ReactNode;
}

const CollapseContainer = ({children}: CollapseContainerProps) => {
    const {focusRef} = useFocus();

    return (
        <div className="align-left collapse-container">
            <div className="arrow-container-left" ref={inputRef => (focusRef.current = inputRef)}>
                <div className="endringslogg-content" tabIndex={-1}>
                    {children}
                </div>
            </div>
        </div>
    );
};

interface TransitionProps extends CollapseContainerProps {
    visible: boolean;
}

export const TransitionContainer = ({visible, children}: TransitionProps) => (
    <TransitionGroup component={null}>
        {visible && (
            <CSSTransition
                classNames={{
                    enter: 'collapse-container-enter',
                    enterActive: 'collapse-container-enter-active',
                    exit: 'collapse-container-exit',
                    exitActive: 'collapse-container-exit-active'
                }}
                timeout={400}
            >
                <CollapseContainer>{children}</CollapseContainer>
            </CSSTransition>
        )}
    </TransitionGroup>
);
