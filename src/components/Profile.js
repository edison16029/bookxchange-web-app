import React, { useState } from 'react'
import { Layout } from './presentationalComponents/Layout';
import Button from './presentationalComponents/Button';
import '../styles/profile.scss';

const pageConstants = {
    activeClassName : "tab-button-active",
    inactiveClassName : "tab-button-inactive",
    accountTabActive : "account-active",
    myBooksTabActive : "my-books-active"
} 

export const Profile = () => {

    const [accountButtonClassName, setAccountButtonClassName] = useState(pageConstants.activeClassName);
    const [myBooksButtonClassName, setMyBooksAccountButtonClassName] = useState(pageConstants.inactiveClassName);
    const [initallyActive, setInitallyActive] = useState(" initially-active");
    const [activeTab, setActiveTab] = useState(pageConstants.accountTabActive);

    const onAccountClick = () => {
        setInitallyActive("");
        setAccountButtonClassName(pageConstants.activeClassName);
        setMyBooksAccountButtonClassName(pageConstants.inactiveClassName);
        setActiveTab(pageConstants.accountTabActive);
    }

    const onMyBooksClick = () => {
        setInitallyActive("");
        setAccountButtonClassName(pageConstants.inactiveClassName);
        setMyBooksAccountButtonClassName(pageConstants.activeClassName);
        setActiveTab(pageConstants.myBooksTabActive);
    }

    const AccountTabBody = () => (
        <div>Hello  Account</div>
    )

    const MyBooksTabBody = () => (
        <div>Hello Books</div>
    )
    const Body = () => {
        if(activeTab === pageConstants.accountTabActive)
            return <AccountTabBody />;
        else
            return <MyBooksTabBody />;
    }

    return (
        <Layout>
            <div className = "profile-root-container">
                <div className = "tab-bar">
                    <Button className = {accountButtonClassName + initallyActive} buttonText = "Account" onClick = {onAccountClick}/>
                    <Button className = {myBooksButtonClassName} buttonText = "My Books" onClick = {onMyBooksClick}/>
                </div>
                <div className = "tab-body">
                    {Body()}
                </div>
            </div>
        </Layout>
    )
}