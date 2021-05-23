import React from 'react'
import '../../styles/loadingView.scss';
import Spinner from './Spinner';
const LoadingView = props => {

    return(
        <Spinner text={"Loading..."} showSpinner={true}/>
    )
}

export default LoadingView;