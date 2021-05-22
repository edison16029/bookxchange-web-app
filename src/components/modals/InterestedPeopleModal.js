import React, { useEffect, useState} from 'react'
import { Modal } from 'antd'

import '../../styles/modal.scss'
import TextInputDisabled from '../presentationalComponents/TextInputDisabled'
import ModalListView from '../presentationalComponents/ModalListView';
const InterestedPeopleModal = ({ showModal, setShowModal, bookInfo, onInterestedUserClick }) => {

    const removeBook = () => {
    //   onUnlikeBook(bookInfo._id);
      setShowModal(false);
    }
    let data = [];
    if(bookInfo.likedBy){
      bookInfo.likedBy.forEach(item => {
        let newItem = {};
        newItem._id = item._id;
        newItem.title = item.name;
        data.push(newItem);
      })
    }
    
    return(
      <Modal
        title="Book Details"
        centered
        bodyStyle = {{height: '340px'}}
        visible={showModal}
        okText="Unlike Book"
        onOk={removeBook}
        onCancel={() => {
            setShowModal(false)
          }
        }
        okButtonProps={{style : { display: 'none'}}}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <div className = "modal-body-container">
          <TextInputDisabled label={""} value={bookInfo.name} centeredText/>
          
          <div className = "ant-modal-header">
            <div className = "ant-modal-title">Interested People</div>
          </div>
          <ModalListView data={data} itemOnClick={onInterestedUserClick} numberOfBooksPerPage={4} showPagination/>
        </div>
      </Modal>
    )
}

export default InterestedPeopleModal;