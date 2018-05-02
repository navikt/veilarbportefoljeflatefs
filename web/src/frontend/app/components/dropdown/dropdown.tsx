import * as React from 'react';
import { Children, cloneElement, Component } from 'react';
import * as classNames from 'classnames';

const btnCls = (erApen, className) => classNames('dropdown', className, {
    'dropdown--apen': erApen
});

const btnWrapperCls = (disabled) => classNames('dropdown__btnwrapper', {'dropdown__btnwrapper--disabled': disabled});

function isChildOf(parent, element) {
    if (element === document) { // eslint-disable-line no-undef
        return false;
    }

    if (element === parent) {
        return true;
    }
    return isChildOf(parent, element.parentNode);
}

interface DropdownProps {
    hoyre?: boolean;
    apen?: boolean;
    disabled?: boolean;
    name: string;
    children: React.ReactChild | React.ReactChildren;
    className?: string;
    onLukk?: () => void;
}

interface DropdownState {
    apen: boolean;
}

class Dropdown extends Component<DropdownProps, DropdownState> {
    component: React.ReactNode;
    btn: HTMLButtonElement | null;

    constructor(props) {
        super(props);

        this.state = {apen: this.props.apen === true};

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.lukkDropdown = this.lukkDropdown.bind(this);
        this.bindComponent = this.bindComponent.bind(this);
        this.settFokus = this.settFokus.bind(this);
        this.handler = this.handler.bind(this);
    }

    handler(e: HTMLElementEventMap['click']) {
        if (this.state.apen && !isChildOf(this.component, e.target)) {
            this.lukkDropdown();
        }
    }

    componentDidMount() {
        document.body.addEventListener('click', this.handler); // eslint-disable-line no-undef
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.handler); // eslint-disable-line no-undef
    }

    settFokus(element) { // eslint-disable-line class-methods-use-this
        if (element !== null) {
            const elementer = element.querySelector('button, a, input, select');
            elementer.focus();
        }
    }

    toggleDropdown() {
        const {
            onLukk = () => void(0)
        } = this.props;
        if (this.state.apen) {
            onLukk();
        }
        this.setState({apen: !this.state.apen});
    }

    lukkDropdown() {
        const {
            onLukk = () => void(0)
        } = this.props;
        this.setState({apen: false});

        if (this.btn != null) {
            this.btn.focus();
        }
        onLukk();
    }

    bindComponent(component) {
        this.component = component;
    }

    render() {
        const { name, className, disabled, children, hoyre } = this.props;
        const { apen } = this.state;

        const augmentedChild = Children.map(children, (child: React.ReactElement<any>) => cloneElement(child, {
            closeDropdown: this.lukkDropdown
        }));
        const innhold = !apen ? null : (
            <div
                className={`dropdown__innhold ${hoyre ? 'hoyre' : null}`}
                id={`${name}-dropdown__innhold`}
                ref={this.settFokus}
            >
                {augmentedChild}
            </div>
        );

        return (
            <div className={btnCls(apen, className)} ref={this.bindComponent}>
                <div className={btnWrapperCls(disabled)}>
                    <button
                        ref={(btn) => {
                            this.btn = btn;
                        }}
                        type="button"
                        className="dropdown__btn"
                        onClick={this.toggleDropdown}
                        aria-expanded={apen}
                        aria-controls={`${name}-dropdown__innhold`}
                        disabled={disabled}
                    >
                        <span className="dropdown__btntext">{name}</span>
                    </button>
                </div>
                {innhold}
            </div>
        );
    }
}

export default Dropdown;
