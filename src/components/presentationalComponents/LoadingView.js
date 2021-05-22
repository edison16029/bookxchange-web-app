import { Spin } from 'antd';
import React from 'react'
import '../../styles/loadingView.scss';
const LoadingView = props => {

    return(
        <div className = "error-view-container">
            <Spin size="large" tip="Loading..."/>
        </div>
    )
}

export default LoadingView;