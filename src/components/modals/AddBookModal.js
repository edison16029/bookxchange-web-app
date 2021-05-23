import React, { useState} from 'react'
import { Modal } from 'antd'
import '../../styles/modal.scss'
import TextInput from '../presentationalComponents/TextInput'

const AddBookModal = ({ onAddBook, showModal, setShowModal }) => {

    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [link, setLink] = useState('');

    const handleNameChange = event => {
      setName(event.target.value)
    }

    const handleAuthorChange = event => {
        setAuthor(event.target.value)
    }

    const handleLinkChange = event => {
        setLink(event.target.value)
    }

    const clearState = () => {
      setName('');
      setAuthor('');
      setLink('');
    }

    const addBook = () => {
      let body = {
        name: name,
        author: author,
        link: link
      }
      onAddBook(body);
      clearState();
      setShowModal(false);
    }

    return(
      <Modal
        title="Add Book"
        centered
        bodyStyle = {{height: '300px'}}
        visible={showModal}
        okText="Add Book"
        onOk={addBook}
        onCancel={() => {
            clearState();
            setShowModal(false)
          }
        }
        okButtonProps={{style : { borderRadius : '10px'}}}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <div className = "modal-body-container">
          <TextInput label={"Name"} value={name} handleValueChange={handleNameChange}/>
          <TextInput label={"Author"} value={author} handleValueChange={handleAuthorChange}/>
          <TextInput label={"Link"} value={link} handleValueChange={handleLinkChange}/>
        </div>
      </Modal>
    )
}

export default AddBookModal;