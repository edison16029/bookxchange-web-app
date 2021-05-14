import React from 'react'
import '../../styles/textitem.scss';
const TextItem = ({id, text, itemOnClick}) => {
    const handleOnClick = () => {
        if(itemOnClick){
            itemOnClick(id);
        }
    }
    return (
        <div className = "text-item-container text-align-center" onClick={handleOnClick}>
            {text}
        </div>
    )
}

export default TextItem;