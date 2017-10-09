import * as React from 'react';
import HybridpanelPure from './hybridpanel-pure';
import { MouseEvent } from 'react';

interface HybridpanelProps {
    apen?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    childrenHead: React.ReactNode[] | React.ReactNode;
    childrenBody: React.ReactNode[] | React.ReactNode;
}

interface HybridpanelState {
    apen: boolean;
}

/**
 * Self-contained `Hybridpanel`.
 * Denne komponenten holder selv styr på om innholdet skal vises eller ikke.
 */
class Hybridpanel extends React.Component<HybridpanelProps, HybridpanelState> {
    constructor(props) {
        super(props);

        this.state = {
            apen: this.props.apen === true
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.setState({ apen: !this.state.apen });
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }

    render() {
        return (
            <HybridpanelPure {...this.props} apen={this.state.apen} onClick={this.handleClick} />
        );
    }
}
export default Hybridpanel;

export { default as HybridpanelPure } from './hybridpanel-pure';
