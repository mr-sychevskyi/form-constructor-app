import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import './modal.scss';

class Modal extends Component {
  render() {
    const modalRoot = document.getElementById('modal-root');

    return modalRoot && createPortal(
      this.props.children,
      modalRoot,
    );
  }
}

class ModalWrapper extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.modalRef = createRef();
  // }
  //
  // state = {
  //   isOpen: false
  // };
  //
  // componentDidMount() {
  //   document.addEventListener('mousedown', this.handleClickOutside);
  // }
  //
  // componentWillUnmount() {
  //   document.removeEventListener('mousedown', this.handleClickOutside);
  // }
  //
  // handleClickOutside = e => {
  //   const modal = this.modalRef.current;
  //
  //   if (modal && !modal.contains(e.target)) {
  //     // this.setState({
  //     //   isOpen: true
  //     // });
  //   }
  // };

  render() {
    const { children, isOpen } = this.props;

    return (
      <>
        {isOpen && (
          <Modal>
            <div className="modal-overlay">
              {children}
            </div>
          </Modal>
        )}
      </>
    );
  }
}

export default ModalWrapper;
