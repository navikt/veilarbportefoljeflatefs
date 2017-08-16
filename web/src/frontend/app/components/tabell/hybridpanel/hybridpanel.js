import PT from 'prop-types';
import React, { Component } from 'react';
import HybridpanelPure from './hybridpanel-pure';

/**
 * Self-contained `Hybridpanel`.
 * Denne komponenten holder selv styr på om innholdet skal vises eller ikke.
 */
class Hybridpanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apen: this.props.apen
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.setState({ apen: !this.state.apen });
        this.props.onClick(event);
    }

    render() {
        const { apen: _apen, ...renderProps } = this.props;
        return (
            <HybridpanelPure {...renderProps} apen={this.state.apen} onClick={this.handleClick} />
        );
    }
}

Hybridpanel.propTypes = {
    /**
     * Skal komponenten være `default` åpen
     */
    apen: PT.bool,
    /**
     * Callback funksjon for når knappen blir klikket på
     */
    onClick: PT.func
};
Hybridpanel.defaultProps = {
    apen: false,
    onClick: () => {}
};

export default Hybridpanel;

export { default as HybridpanelPure } from './hybridpanel-pure';
