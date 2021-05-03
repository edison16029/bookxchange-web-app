import React from 'react'
import '../../styles/textitem.scss';
const TextItem = ({id, text, itemOnClick}) => {
    return (
        <div className = "text-item-container text-align-center" onClick={() => {itemOnClick(id)}}>
            {text}
        </div>
    )
}

export default TextItem;