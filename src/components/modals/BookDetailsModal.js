import React from 'react'
import { Modal } from 'antd'
import '../../styles/modal.scss'
import TextInputDisabled from '../presentationalComponents/TextInputDisabled'

const BookDetailsModal = ({ onOk, okayButtonText,showModal, setShowModal, bookInfo }) => {

    const handleOnOk = () => {
      onOk(bookInfo._id);
      setShowModal(false);
    }
    return(
      <Modal
        title="Book Details"
        centered
        bodyStyle = {{height: '300px'}}
        visible={showModal}
        okText={okayButtonText}
        onOk={handleOnOk}
        onCancel={() => {
            setShowModal(false)
          }
        }
        okButtonProps={{style : { borderRadius : '10px'}}}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <div className = "modal-body-container">
          <TextInputDisabled label={"Name"} value={bookInfo.name} />
          <TextInputDisabled label={"Author"} value={bookInfo.author} />
          <TextInputDisabled label={"Owner"} value={bookInfo.ownerName} />
        </div>
      </Modal>
    )
}

export default BookDetailsModal;