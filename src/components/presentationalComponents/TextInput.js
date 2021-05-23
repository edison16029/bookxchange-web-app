import React from 'react'
import '../../styles/textinput.scss';
const TextInput = ({label, value, handleValueChange}) => {
    return (
        <div className = "text-input-container">
            <span className="text-input-label">{label}</span>
            <input className="text-input" type="text" value={value} onChange={handleValueChange} maxLength={150}/>
        </div>
    )
}

export default TextInput;