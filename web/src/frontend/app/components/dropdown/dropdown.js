import React, { PropTypes as PT, Children, cloneElement } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { toggleDropdown } from './dropdown-reducer';

const btnCls = (erApen, className) => classNames('dropdown', className, {
    'dropdown--apen': erApen
});


function Dropdown({ name, apen, className, children, actions }) {
    const augmentedChild = Children.map(children, (child) => cloneElement(child, { closeDropdown: () => actions.toggleDropdown(name)}));
    const innhold = apen ? (<div className="dropdown__innhold" id={`${name}-dropdown__innhold`}>{augmentedChild}</div>) : null;
    return (
        <div className={btnCls(apen, className)}>
            <div className="dropdown__btnwrapper">
                <button
                    className="dropdown__btn"
                    onClick={() => actions.toggleDropdown(name)}
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

Dropdown.propTypes = {
    apen: PT.bool.isRequired,
    name: PT.string.isRequired,
    children: PT.oneOfType([PT.node, PT.arrayOf(PT.node)]).isRequired,
    className: PT.string
};

const mapStateToProps = (state, ownProps) => {
    const dropdownName = ownProps.name;

    return {
        apen: state.ui.dropdown.name === dropdownName
    };
};
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ toggleDropdown }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
