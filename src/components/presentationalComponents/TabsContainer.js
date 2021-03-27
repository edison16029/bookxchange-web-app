import React, { useState } from 'react'
import Button from './Button';
import '../../styles/tabscontainer.scss';

const pageConstants = {
    activeClassName : "tab-button-active",
    inactiveClassName : "tab-button-inactive",
    leftTabActive : "account-active",
    rightTabActive : "my-books-active"
} 

const TabsContainer = (props) => {

    const { LeftTab, RightTab, leftTabText, rightTabText } = props;
    const [leftButtonClassName, setLeftButtonClassName] = useState(pageConstants.activeClassName);
    const [rightButtonClassName, setRightButtonClassName] = useState(pageConstants.inactiveClassName);
    const [initallyActive, setInitallyActive] = useState(" initially-active");
    const [activeTab, setActiveTab] = useState(pageConstants.leftTabActive);

    const onLeftTabClick = () => {
        setInitallyActive("");
        setLeftButtonClassName(pageConstants.activeClassName);
        setRightButtonClassName(pageConstants.inactiveClassName);
        setActiveTab(pageConstants.leftTabActive);
    }

    const onRightTabClick = () => {
        setInitallyActive("");
        setLeftButtonClassName(pageConstants.inactiveClassName);
        setRightButtonClassName(pageConstants.activeClassName);
        setActiveTab(pageConstants.rightTabActive);
    }

    const getTabBody = () => {
        if(activeTab === pageConstants.leftTabActive)
            return <LeftTab />;
        else
            return <RightTab />;
    }

    return (
        <div className = "tabs-root-container">
            <div className = "tab-bar">
                <Button className = {leftButtonClassName + initallyActive} buttonText = {leftTabText} onClick = {onLeftTabClick}/>
                <Button className = {rightButtonClassName} buttonText = {rightTabText} onClick = {onRightTabClick}/>
            </div>
            <div className = "tab-body">
                {getTabBody()}
            </div>
        </div>
    )
}

export default TabsContainer;