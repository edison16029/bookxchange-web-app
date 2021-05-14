import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Layout } from "./presentationalComponents/Layout";
import TabsContainer from './presentationalComponents/TabsContainer';
import BooksILikedTab from "./tabs/BooksILikedTab";
import BooksOthersLikedTab from "./tabs/BooksOthersLikedTab";
import BookDetailsModal from './modals/BookDetailsModal';
import InterestedPeopleModal from './modals/InterestedPeopleModal';
import BooksOfUserModal from './modals/BooksOfUserModal';

import { fetchBooksILiked, fetchBooksOthersLiked, fetchUserById, resetBooksILiked, unlikeBook, likeBook } from "../redux/matchedBooksSlice";

const MatchedBooks = props => {
  const {
    matchedBooks,
    fetchBooksILiked,
    fetchBooksOthersLiked,
    fetchUserById,
    resetBooksILiked,
    unlikeBook,
    likeBook
  } = props;

  const [showBookDetailsModal, setShowBookDetailsModal] = useState(false);
  const [showInterestedPeopleModal, setShowInterestedPeopleModal] = useState(false);
  const [showBooksOfUserModal, setShowBooksOfUserModal] = useState(false);
  const [bookInfo, setBookInfo] = useState({});
  const [bookOtherLikedInfo, setBookOtherLikedInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [isBookILikedTab, SetIsBookILikedTab] = useState(true);

  // eslint-disable-next-line
  const [pageLoad, setpageLoad] = useState(0);
  useEffect( () => {
    fetchBooksILiked();
    fetchBooksOthersLiked();
    // eslint-disable-next-line
  }, [pageLoad])

  let dataFetched = matchedBooks.booksILikedStatus === "fetched" && matchedBooks.booksOthersLikedStatus === "fetched";
 
  let booksILiked = [];
  let booksOthersLiked = [];
  if(dataFetched){
    if(!matchedBooks.booksILikedError && !matchedBooks.booksOthersLikedError){ //change
      booksILiked = matchedBooks.data.booksILiked.map(book => {
        let bookILiked = { ...book, title : book.name}
        return bookILiked;
      });
      booksOthersLiked = matchedBooks.data.booksOthersLiked.map(book => {
        let bookOthersLiked = { ...book, title : book.name}
        return bookOthersLiked;
      })
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

  const onBookILikedItemClick = bookId => {
    SetIsBookILikedTab(true);
    let chosenBook = booksILiked.filter(book => book._id === bookId)[0];
    //TODO : Spinner On
    fetchUserById(chosenBook.owner).then(response => {
      //TODO : Spinner Off
      chosenBook.ownerName = response.payload.data.user.name;
      setBookInfo(chosenBook);
      setShowBookDetailsModal(true);
    });
  }

  const onBookOthersLikedItemClick = bookId => {
    SetIsBookILikedTab(false);
    let chosenBook = booksOthersLiked.filter(book => book._id === bookId)[0];
    setBookOtherLikedInfo(chosenBook);
    setShowInterestedPeopleModal(true);
  }

  const onUnlikeBook = data => {
    resetBooksILiked();
    unlikeBook(data).then(() => {
      setpageLoad(pageLoad+1);
    });
  }

  const onInterestedUserClick = item => {
    setShowInterestedPeopleModal(false);
    //TODO : Spinner On
    fetchUserById(item._id).then(response => {
      //TODO : Spinner Off
      let userInfoObject = {}
      userInfoObject.name = response.payload.data.user.name;
      userInfoObject.booksOwned = response.payload.data.user.booksOwned;
      setUserInfo(userInfoObject);
      setShowBooksOfUserModal(true);
    });
  }

  const onBookOfOtherUserClick = item => {
    setShowBooksOfUserModal(false)
    let chosenBook = item;
    chosenBook.title = item.name;
    chosenBook.ownerName = userInfo.name;
    setBookInfo(chosenBook);
    setShowBookDetailsModal(true);
  }


  const onLikeBook = data => {
    resetBooksILiked();
    likeBook(data).then(() => {
      setpageLoad(pageLoad+1);
    });
  }

  return (
    <Layout>
      <TabsContainer 
        LeftTab = {() => <BooksILikedTab data={booksILiked} itemOnClick={onBookILikedItemClick}/>}
        RightTab = {() => <BooksOthersLikedTab data={booksOthersLiked} itemOnClick={onBookOthersLikedItemClick}/>}
        leftTabText = "Books you are interested in"
        rightTabText = "Your books people are interested in"/>
        <BookDetailsModal bookInfo={bookInfo} onOk={isBookILikedTab ? onUnlikeBook : onLikeBook} okayButtonText={isBookILikedTab ? "Unlike Book" : "Like Book"} showModal={showBookDetailsModal} setShowModal={setShowBookDetailsModal}/>
        <InterestedPeopleModal bookInfo={bookOtherLikedInfo} onInterestedUserClick={onInterestedUserClick} showModal={showInterestedPeopleModal} setShowModal={setShowInterestedPeopleModal}/>
        <BooksOfUserModal userInfo={userInfo} showModal={showBooksOfUserModal} onBookOfOtherUserClick={onBookOfOtherUserClick} setShowModal={setShowBooksOfUserModal}/>

    </Layout>
  )
};

const mapStateToProps = state => ({
  matchedBooks : state.matchedBooks
});

export default connect(mapStateToProps, { fetchBooksILiked, 
  fetchBooksOthersLiked, 
  fetchUserById, 
  resetBooksILiked, 
  unlikeBook,
  likeBook })(MatchedBooks);
