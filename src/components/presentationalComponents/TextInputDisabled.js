import React from 'react'
import '../../styles/styles.scss'
import '../../styles/textinput.scss';
const TextInputDisabled = ({label, value, item, centeredText, itemOnClick}) => {

    let className = "text-input text-input-disable ";
    if(centeredText){
        className += "text-align-center";
    }

    const handleOnClick = () => {
        if(itemOnClick){
            itemOnClick(item);
        }
    }
    return (
        <div className = "text-input-container" onClick={handleOnClick}>
            <span className="text-input-label">{label}</span>
            <input type="text" value={value} disabled maxLength={150} className={className}/>
        </div>
    )
}

export default TextInputDisabled;