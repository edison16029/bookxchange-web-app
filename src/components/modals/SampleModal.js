import { Modal } from 'antd'
import { useState } from 'react'

const SampleModal = ({ showModalInitial }) => {

    const [showModal, setShowModal] = useState(showModalInitial);
    return(
        <Modal
        title="Vertically centered modal dialog"
        centered
        visible={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    )
}

export default SampleModal;