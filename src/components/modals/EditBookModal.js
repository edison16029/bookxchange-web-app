import React, { useEffect, useState} from 'react'
import { Modal } from 'antd'
import '../../styles/modal.scss'
import TextInput from '../presentationalComponents/TextInput'

const EditBookModal = ({ onUpdateBook, showModal, setShowModal, bookInfo }) => {
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
    
    const setState = () => {
      setName(bookInfo.name);
      setAuthor(bookInfo.author);
      setLink(bookInfo.link);
    }

    const clearState = () => {
      setName('');
      setAuthor('');
      setLink('');
    }

    const updateBook = () => {
      let body = {
        name: name,
        author: author,
        link: link
      }
      onUpdateBook({id: bookInfo._id, data: body});
      clearState();
      setShowModal(false);
    }

    useEffect(() => {
      setState();
    },[bookInfo]);
    
    return(
      <Modal
        title="Edit Book"
        centered
        bodyStyle = {{height: '300px'}}
        visible={showModal}
        okText="Update Book"
        onOk={updateBook}
        onCancel={() => {
            setState();
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

export default EditBookModal;