import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Layout } from "./presentationalComponents/Layout";
import TabsContainer from './presentationalComponents/TabsContainer';
import AccountTab from "./tabs/AccountTab";
import YourBooksTab from "./tabs/YourBooksTab";
import UpdateProfileModal from './modals/UpdateProfileModal';
import AddBookModal from './modals/AddBookModal';
import EditBookModal from './modals/EditBookModal';
import { fetchMyAccountData, fetchBooksIOwn, updateMyAccountData, resetAccountInfo, resetBooksIOwnInfo, updateBookInfo, addBook } from "../redux/profileSlice";

const Profile = props => {
  const {
    profile,
    fetchMyAccountData,
    fetchBooksIOwn,
    updateMyAccountData,
    resetAccountInfo,
    updateBookInfo,
    resetBooksIOwnInfo,
    addBook
  } = props;

  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showEditBookModal, setShowEditBookModal] = useState(false);
  const [bookInfo, setBookInfo] = useState({});

  // eslint-disable-next-line
  const [pageLoad, setpageLoad] = useState(0);
  useEffect( () => {
    fetchMyAccountData();
    fetchBooksIOwn();
    // eslint-disable-next-line
  }, [pageLoad])

  let accountInfoData = {}

  let dataFetched = profile.myAccountStatus === "fetched" && profile.booksIOwnStatus === "fetched";
 
  let accountInfo = [];
  let booksIOwn = [];
  if(dataFetched){
    if(!profile.accountInfoError && !profile.booksIOwnError){
        //AccountInfo data
        accountInfo.push({title : profile.data.accountInfo.name})
        accountInfo.push({title : profile.data.accountInfo.email})
        accountInfo.push({title : profile.data.accountInfo.location})
        //For Displaying in the Modal to update the Account Info
        accountInfoData = profile.data.accountInfo;
        console.log("accountInfoData : ", accountInfoData);
        //BooksIOwn data
        booksIOwn = profile.data.booksIOwn.map(book => {
              let bookIOwn = { ...book, title : book.name}
              return bookIOwn;
            });
    }
    else{ //TODO : Add Error Page here
        return (
            <Layout>
                ERRRRRRRRRRROR
            </Layout>
          ) 
    }
  }
  else{
    //TODO : Add Loading Page here
    return (
      <Layout>
            LOADINGG
      </Layout>
    ) 
  }

  const onYourBookItemClick = bookId => {
    let chosenBook = booksIOwn.filter(book => book._id === bookId)[0];
    setBookInfo(chosenBook);
    setShowEditBookModal(true);
  }

  const onUpdateProfile = data => {
    resetAccountInfo();
    updateMyAccountData(data).then(() => {
      setpageLoad(pageLoad+1);
    });
  }

  const onUpdateBook = data => {
    resetBooksIOwnInfo();
    updateBookInfo(data).then(() => {
      setpageLoad(pageLoad+1);
    });
  }

  const onAddBook = data => {
    resetBooksIOwnInfo();
    console.log("Data for Adding Book ", data);
    addBook(data).then(() => {
      setpageLoad(pageLoad+1);
    });
  }

  return (
    <Layout>
      <TabsContainer 
        LeftTab = {() => <AccountTab data={accountInfo} setShowModal={setShowUpdateProfileModal}/>}
        RightTab = {() => <YourBooksTab data={booksIOwn} setShowModal={setShowAddBookModal} itemOnClick={onYourBookItemClick}/>}
        leftTabText = "Account Info"
        rightTabText = "Your books"/>
      <UpdateProfileModal accountInfo={accountInfoData} onUpdateProfile={onUpdateProfile} showModal={showUpdateProfileModal} setShowModal={setShowUpdateProfileModal}/> 
      <AddBookModal onAddBook={onAddBook} showModal={showAddBookModal} setShowModal={setShowAddBookModal}/> 
      <EditBookModal bookInfo={bookInfo} onUpdateBook={onUpdateBook} showModal={showEditBookModal} setShowModal={setShowEditBookModal}/> 
    </Layout>
  )
};

const mapStateToProps = state => ({
    profile : state.profile
});

export default connect(mapStateToProps, { fetchMyAccountData, fetchBooksIOwn, updateMyAccountData, resetAccountInfo, updateBookInfo, resetBooksIOwnInfo, addBook })(Profile);
