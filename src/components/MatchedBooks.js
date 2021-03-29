import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Layout } from "./presentationalComponents/Layout";
import TabsContainer from './presentationalComponents/TabsContainer';
import BooksILikedTab from "./tabs/BooksILikedTab";
import BooksOthersLikedTab from "./tabs/BooksOthersLikedTab";

import { fetchBooksILiked, fetchBooksOthersLiked } from "../redux/matchedBooksSlice";

const MatchedBooks = props => {
  const {
    matchedBooks,
    fetchBooksILiked,
    fetchBooksOthersLiked
  } = props;
  // eslint-disable-next-line
  const [pageLoad, setpageLoad] = useState("");
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

      </Layout>
    ) 
  }

  return (
    <Layout>
      <TabsContainer 
        LeftTab = {() => <BooksILikedTab data={booksILiked}/>}
        RightTab = {() => <BooksOthersLikedTab data={booksOthersLiked}/>}
        leftTabText = "Books you are interested in"
        rightTabText = "Your books people are interested in"/>
    </Layout>
  )
};

const mapStateToProps = state => ({
  matchedBooks : state.matchedBooks
});

export default connect(mapStateToProps, { fetchBooksILiked, fetchBooksOthersLiked })(MatchedBooks);
