import React, { useEffect, useState} from 'react'
import { Modal } from 'antd'

import '../../styles/modal.scss'
import TextInputDisabled from '../presentationalComponents/TextInputDisabled'
import ModalListView from '../presentationalComponents/ModalListView';
const BooksOfUserModal = ({ showModal, setShowModal, userInfo, onBookOfOtherUserClick }) => {
    let data = [];
    if(userInfo.booksOwned){
      userInfo.booksOwned.forEach(item => {
        let newItem = {};
        newItem._id = item._id;
        newItem.title = item.name;
        newItem = {...newItem, ...item}
        data.push(newItem);
        
      })
    }
    
    return(
      <Modal
        title="User"
        centered
        bodyStyle = {{height: '340px'}}
        visible={showModal}
        okText="Unlike Book"
        onCancel={() => {
            setShowModal(false)
          }
        }
        okButtonProps={{style : { display: 'none'}}}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <div className = "modal-body-container">
          <TextInputDisabled label={""} value={userInfo.name} centeredText/>
          
          <div className = "ant-modal-header">
            <div className = "ant-modal-title">Books</div>
          </div>
          <ModalListView data={data} numberOfBooksPerPage={3} showPagination itemOnClick={onBookOfOtherUserClick}/>
        </div>
      </Modal>
    )
}

export default BooksOfUserModal;