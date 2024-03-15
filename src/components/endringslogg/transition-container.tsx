import React from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {useFocus} from './hooks/use-focus';
import './endringslogg.css';
import './collapse-container-transition.css';
import classNames from 'classnames';

interface CollapseContainerProps {
    alignLeft?: boolean;
    children?: React.ReactNode;
}

const CollapseContainer = ({alignLeft, children}: CollapseContainerProps) => {
    const {focusRef} = useFocus();

    return (
        <div className={alignLeft ? classNames('align-left', 'collapse-container') : 'collapse-container'}>
            <div
                className={alignLeft ? 'arrow-container-left' : 'arrow-container'}
                ref={inputRef => (focusRef.current = inputRef)}
            >
                <div className={'endringslogg-content'} tabIndex={-1}>
                    {children}
                </div>
            </div>
        </div>
    );
};

interface TransitionProps extends CollapseContainerProps {
    visible: boolean;
}

const TransitionContainer = ({visible, alignLeft, children}: TransitionProps) => (
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
                <CollapseContainer alignLeft={alignLeft}>{children}</CollapseContainer>
            </CSSTransition>
        )}
    </TransitionGroup>
);

export default TransitionContainer;
