import React, { useEffect, useState } from "react";
import { Layout } from "./presentationalComponents/Layout";
import TabsContainer from './presentationalComponents/TabsContainer';

import { fetchBooksILiked, fetchBooksOthersLiked } from "../redux/matchedBooksSlice";

import { connect } from "react-redux";
import BooksILikedTab from "./BooksILikedTab";
import BooksOthersLikedTab from "./BooksOthersLikedTab";

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
  }, [pageLoad])

  let dataFetched = matchedBooks.booksILikedStatus === "fetched" && matchedBooks.booksOthersLikedStatus === "fetched";
 
  let booksILiked = [];
  let booksOthersLiked = [];
  if(dataFetched){
    booksILiked = matchedBooks.data.booksILiked.map(book => {
      let bookILiked = { ...book, title : book.name}
      return bookILiked;
    });
    booksOthersLiked = matchedBooks.data.booksOthersLiked.map(book => {
      let bookOthersLiked = { ...book, title : book.name}
      return bookOthersLiked;
    })
  }
  else{
    //TODO : Add Error Page here
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
