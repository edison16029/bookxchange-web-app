import React from 'react'

import '../../styles/layout.scss';

export const Layout = (props) => {
    return (
        <div className = "layout-container">
            <div className = "layout-inner-container">
                {props.children}
            </div>
        </div>
    )
}