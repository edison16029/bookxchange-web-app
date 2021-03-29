import React from 'react'
import '../../styles/textitem.scss';
const TextItem = (props) => {
    return (
        <div className = "text-item-container text-align-center">
            {props.text}
        </div>
    )
}

export default TextItem;