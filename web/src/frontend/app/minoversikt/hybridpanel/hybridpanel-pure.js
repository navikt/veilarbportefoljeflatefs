import PT from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Collapse from 'react-collapse';

const cls = (className, props) => classnames('hybridPanel', className, {
    'hybridPanel--lukket': !props.apen,
    'hybridPanel--apen': props.apen
});

function HybridpanelPure(props) {
    const { className, childrenHead, childrenBody, apen, onClick, ...renderProps } = props;

    return (
        <div className={cls(className, props)} {...renderProps}>
            <div className="hybridPanel__hode">
                {childrenHead}
                <button className="hybridPanel__knapp" onClick={onClick} aria-expanded={apen}>
                    <span className="hybridPanel__indikator" />
                </button>
            </div>
            <Collapse isOpened={apen}>
                <article className="hybridPanel__innhold">{childrenBody}</article>
            </Collapse>
        </div>
    );
}

HybridpanelPure.propTypes = {
    className: PT.string,
    onClick: PT.func.isRequired,
    apen: PT.bool.isRequired,
    childrenHead: PT.oneOfType([
        PT.arrayOf(PT.node),
        PT.node
    ]).isRequired,
    childrenBody: PT.oneOfType([
        PT.arrayOf(PT.node),
        PT.node
    ]).isRequired
};
HybridpanelPure.defaultProps = {
    className: undefined
};

export default HybridpanelPure;
