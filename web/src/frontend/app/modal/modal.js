import React, { Component, PropTypes as PT } from 'react';
import Modal from 'react-modal';
import classnames from 'classnames';
import 'nav-frontend-modal-style';

const cls = (className) => classnames('modal', className);

class ModalWrapper extends Component {
    render() {
        const { children, closeButton, ...props } = this.props;
        return (
            <Modal {...props} className={cls(props.className)} overlayClassName="modal__overlay">
                {children}
                { closeButton && <button className="modal__lukkknapp" onClick={props.onRequestClose}>
                    <span className="text-hide">Lukk modal</span>
                </button> }
            </Modal>
        );
    }
}

ModalWrapper.propTypes = {
    closeButton: PT.bool,
    isOpen: PT.bool.isRequired,
    contentLabel: PT.string.isRequired,
    children: PT.node.isRequired,
    onAfterOpen: PT.func,
    onRequestClose: PT.func.isRequired,
    closeTimeoutMS: PT.number,
    appElement: PT.instanceOf(window.HTMLElement)
};

ModalWrapper.defaultProps = {
    closeButton: true,
    closeTimeoutMS: 0,
    onAfterOpen: () => {},
    appElement: document.body
};

export default ModalWrapper;
