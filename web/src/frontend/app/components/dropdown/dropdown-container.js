import { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeAll } from './dropdown-reducer';


function isChildOf(selector, element) {
    if (element === document) {
        return false;
    }

    element.matches = element.matches ||     // eslint-disable-line no-param-reassign
        element.webkitMatchesSelector ||    // eslint-disable-line no-param-reassign
        element.mozMatchesSelector ||    // eslint-disable-line no-param-reassign
        element.msMatchesSelector ||    // eslint-disable-line no-param-reassign
        element.oMatchesSelector;    // eslint-disable-line no-param-reassign


    if (element.matches(selector)) {
        return true;
    }
    return isChildOf(selector, element.parentNode);
}

class DropdownContainer extends Component {
    constructor(props) {
        super(props);

        this.handler = (e) => {
            if (this.props.apen && !isChildOf('.dropdown', e.target)) {
                this.props.actions.closeAll();
            }
        };
    }

    componentDidMount() {
        document.body.addEventListener('click', this.handler);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.handler);
    }

    render() {
        return this.props.children;
    }
}

DropdownContainer.propTypes = {
    children: PT.node.isRequired,
    apen: PT.string,
    actions: PT.objectOf(PT.func).isRequired
};

DropdownContainer.defaultProps = {
    apen: ''
};
const mapStateToProps = state => ({ apen: state.ui.dropdown.name });
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ closeAll }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownContainer);
