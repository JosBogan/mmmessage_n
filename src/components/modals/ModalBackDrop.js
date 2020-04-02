import React from 'react'

function ModalBackDrop(props) {
  return (
    <div 
      className="modal_back_drop"
      onClick={props.modalToggle}
    >
      {props.component}
    </div>
  )
}

export default ModalBackDrop