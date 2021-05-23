import React from 'react';
import { Spin } from 'antd'         

const Spinner = ({showSpinner, text, size="large"}) => {
    return(
        <div style={{position: 'absolute',width: '0px', height: '0px',  top: '50vh', left: '50vw', right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Spin size={size} spinning={showSpinner} tip={text}/>
        </div>
    )

}

export default Spinner