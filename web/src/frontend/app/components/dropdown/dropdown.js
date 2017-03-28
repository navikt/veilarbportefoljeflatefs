import React, { PropTypes as PT, Children, Component, cloneElement } from 'react';
import classNames from 'classnames';

const btnCls = (erApen, className) => classNames('dropdown', className, {
    'dropdown--apen': erApen
});

function isChildOf(parent, element) {
    if (element === document) {
        return false;
    }

    if (element === parent) {
        return true;
    }
    return isChildOf(parent, element.parentNode);
}

class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.state = { apen: this.props.apen };

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.lukkDropdown = this.lukkDropdown.bind(this);
        this.bindComponent = this.bindComponent.bind(this);
        this.handler = (e) => {
            if (this.state.apen && !isChildOf(this.component, e.target)) {
                this.lukkDropdown();
            }
        };
    }

    componentDidMount() {
        document.body.addEventListener('click', this.handler);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.handler);
    }

    bindComponent(component) {
        this.component = component;
    }

    toggleDropdown() {
        this.setState({ apen: !this.state.apen });
    }

    lukkDropdown() {
        this.setState({ apen: false });
    }

    render() {
        const { name, className, children } = this.props;
        const { apen } = this.state;

        const augmentedChild = Children.map(children, (child) => cloneElement(child, {
            closeDropdown: this.lukkDropdown
        }));
        const innhold = !apen ? null : (
            <div className="dropdown__innhold" id={`${name}-dropdown__innhold`}>{augmentedChild}</div>
            );
        return (
            <div className={btnCls(apen, className)} ref={this.bindComponent}>
                <div className="dropdown__btnwrapper">
                    <button
                        className="dropdown__btn"
                        onClick={this.toggleDropdown}
                        aria-pressed={apen}
                        aria-controls={`${name}-dropdown__innhold`}
                    >
                        {name}
                    </button>
                </div>
                {innhold}
            </div>
        );
    }
}

Dropdown.propTypes = {
    apen: PT.bool,
    name: PT.string.isRequired,
    children: PT.oneOfType([PT.node, PT.arrayOf(PT.node)]).isRequired,
    className: PT.string
};
Dropdown.defaultProps = {
    apen: false
};

export default Dropdown;
