import React, { useEffect, useState} from 'react'
import { Modal } from 'antd'
import '../../styles/modal.scss'
import TextInput from '../presentationalComponents/TextInput'

const UpdateProfileModal = ({ onUpdateProfile, showModal, setShowModal, accountInfo }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const handleNameChange = event => {
      setName(event.target.value)
    }

    const handleAddressChange = event => {
      setAddress(event.target.value)
    }

    const setState = React.useCallback(() => {
      setName(accountInfo.name);
      setAddress(accountInfo.location);
    }, [accountInfo]);

    const clearState = () => {
      setName('');
      setAddress('');
    }

    const updateProfile = () => {
      onUpdateProfile({name: name, location: address});
      clearState();
      setShowModal(false);
    }

    useEffect(() => {
      setState();
    },[accountInfo, setState]);
    
    return(
      <Modal
        title="Edit profile"
        centered
        bodyStyle = {{height: '300px'}}
        visible={showModal}
        okText="Update Profile"
        onOk={updateProfile}
        onCancel={() => {
            setState();
            setShowModal(false);
          }
        }
        okButtonProps={{style : { borderRadius : '10px'}}}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <div className = "modal-body-container">
          <TextInput label={"Name"} value={name} handleValueChange={handleNameChange}/>
          <TextInput label={"Address"} value={address} handleValueChange={handleAddressChange}/>
        </div>
      </Modal>
    )
}

export default UpdateProfileModal;