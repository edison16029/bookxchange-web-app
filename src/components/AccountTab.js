import React  from 'react'
import { connect } from 'react-redux'
import Button from './presentationalComponents/Button'
import '../styles/accounttab.scss';

const mapStateToProps = state => ({
    myAccount : state.myAccount
});

const onUpdateClick = () => {
    console.log("Update Clicked");
}

const AccountTab = ({ myAccount }) => {
    return(
        <div className = "accounttab-container">
            <div className = "data-container">
                <span className="font-style">{myAccount.data.name}</span>
            </div>
            <div className = "data-container">
                <span className="font-style">{myAccount.data.address}</span>
            </div>
            <div className = "data-container">
                <span className="font-style">{myAccount.data.email}</span>
            </div>
            <div className = "button-container">
                <Button className = "button" buttonText="Update" onClick={onUpdateClick}/>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, null)(AccountTab)