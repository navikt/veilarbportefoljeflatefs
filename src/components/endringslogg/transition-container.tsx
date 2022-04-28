import React from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {useFocus} from './hooks/use-focus';
import './endringslogg.css';
import './collapse-container-transition.css';
import classNames from 'classnames';

interface CollapseContainerProps {
    children?: React.ReactNode;
    alignLeft?: boolean;
}

interface TransitionProps extends CollapseContainerProps {
    visible: boolean;
    alignLeft?: boolean;
}

const TransitionContainer = (props: TransitionProps) => (
    <TransitionGroup component={null}>
        {props.visible && (
            <CSSTransition
                classNames={{
                    enter: 'collapse-container-enter',
                    enterActive: 'collapse-container-enter-active',
                    exit: 'collapse-container-exit',
                    exitActive: 'collapse-container-exit-active'
                }}
                timeout={400}
            >
                <CollapseContainer alignLeft={props.alignLeft}>{props.children}</CollapseContainer>
            </CSSTransition>
        )}
    </TransitionGroup>
);

const CollapseContainer = (props: CollapseContainerProps) => {
    const {focusRef} = useFocus();
    return (
        <div className={props.alignLeft ? classNames('align-left', 'collapse-container') : 'collapse-container'}>
            <div
                className={props.alignLeft ? 'arrow-container-left' : 'arrow-container'}
                ref={inputRef => (focusRef.current = inputRef)}
            >
                <div className={'endringslogg-content'} tabIndex={-1}>
                    {props.children}
                </div>
            </div>
        </div>
    );
};
export default TransitionContainer;
