import React from 'react'
import '../../styles/styles.scss'
import '../../styles/textinput.scss';
const TextInputDisabled = ({label, value, item, centeredText, itemOnClick}) => {

    let classNames = "text-input text-input-disable ";
    if(itemOnClick){
        classNames+= "pointer-cursor ";
    }
    else{
        classNames+= "text-cursor ";
    }

    if(centeredText){
        classNames += "text-align-center";
    }

    const handleOnClick = () => {
        if(itemOnClick){
            itemOnClick(item);
        }
    }
    return (
        <div className = "text-input-container" onClick={handleOnClick}>
            <span className="text-input-label">{label}</span>
            <input type="text" value={value} disabled maxLength={150} className={classNames}/>
        </div>
    )
}

export default TextInputDisabled;