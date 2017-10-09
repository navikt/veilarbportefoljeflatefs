import * as React from 'react';
import * as classnames from 'classnames';
import Collapse from 'react-collapse';
import { MouseEvent } from 'react';

const cls = (className, props) => classnames('hybridPanel', className, {
    'hybridPanel--lukket': !props.apen,
    'hybridPanel--apen': props.apen
});

interface HybridpanelPureProps {
    className?: string;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    apen: boolean;
    childrenHead: React.ReactNode[] | React.ReactNode;
    childrenBody: React.ReactNode[] | React.ReactNode;
}

function HybridpanelPure(props: HybridpanelPureProps) {
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

export default HybridpanelPure;
