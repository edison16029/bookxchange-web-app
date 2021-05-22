import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Layout from "./presentationalComponents/Layout";
import TabsContainer from './presentationalComponents/TabsContainer';
import AccountTab from "./tabs/AccountTab";
import YourBooksTab from "./tabs/YourBooksTab";
import UpdateProfileModal from './modals/UpdateProfileModal';
import AddBookModal from './modals/AddBookModal';
import EditBookModal from './modals/EditBookModal';
import ErrorView from './presentationalComponents/ErrorView';
import LoadingView from './presentationalComponents/LoadingView';
import { fetchMyAccountData, fetchBooksIOwn, updateMyAccountData, resetAccountInfo, resetBooksIOwnInfo, updateBookInfo, deleteBook, addBook } from "../redux/profileSlice";

const Profile = props => {
  const {
    profile,
    fetchMyAccountData,
    fetchBooksIOwn,
    updateMyAccountData,
    resetAccountInfo,
    updateBookInfo,
    deleteBook,
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
        //BooksIOwn data
        booksIOwn = profile.data.booksIOwn.map(book => {
              let bookIOwn = { ...book, title : book.name}
              return bookIOwn;
            });
    }
    else{
        return (
            <Layout>
                <ErrorView />
            </Layout>
          ) 
    }
  }
  else{
    return (
      <Layout>
          <LoadingView />
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

  const onDeleteBook = data => {
    resetBooksIOwnInfo();
    deleteBook(data).then(() => {
      setpageLoad(pageLoad+1);
    });
  }

  const onAddBook = data => {
    resetBooksIOwnInfo();
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
      <EditBookModal bookInfo={bookInfo} onUpdateBook={onUpdateBook} onDeleteBook={onDeleteBook} showModal={showEditBookModal} setShowModal={setShowEditBookModal}/> 
    </Layout>
  )
};

const mapStateToProps = state => ({
    profile : state.profile
});

export default connect(mapStateToProps, { fetchMyAccountData, fetchBooksIOwn, updateMyAccountData, resetAccountInfo, updateBookInfo, deleteBook, resetBooksIOwnInfo, addBook })(Profile);
