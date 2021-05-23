import React from 'react'
import '../../styles/textitem.scss';
const TextItem = ({id, text, itemOnClick}) => {
    let classNames = "text-item-container text-align-center ";
    if(itemOnClick){
        classNames+= "pointer-cursor ";
    }
    else{
        classNames+= "text-cursor";
    }
    const handleOnClick = () => {
        if(itemOnClick){
            itemOnClick(id);
        }
    }
    return (
        <div className={classNames} onClick={handleOnClick}>
            <span className="medium-font">{text}</span>
        </div>
    )
}

export default TextItem;