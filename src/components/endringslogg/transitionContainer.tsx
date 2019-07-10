import { default as React } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function TransitionContainer(props) {
    return (
        <TransitionGroup component={null}>
            {props.visible && (
                <CSSTransition className="collapse-container" timeout={400}>
                    <div className="collapse-container">
                        <div className="content" ref={props.focusRef} tabIndex={-1}>
                            {props.children}
                        </div>
                    </div>
                </CSSTransition>
            )}
        </TransitionGroup>
    );
}
