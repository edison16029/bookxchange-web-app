import React, { useState, useEffect } from "react";
import BookView from "./presentationalComponents/BookView";
import Layout from "./presentationalComponents/Layout";
import { fetchBooks, removeLikedBook, updateBooks } from "../redux/booksSlice";
import { connect } from "react-redux";
import { Pagination } from "antd";
import API from "../shared/api";
import handleApiError from "../shared/errorhandler";
import notifyUser from "../shared/Notification";
import LoadingView from "./presentationalComponents/LoadingView";
import ErrorView from "./presentationalComponents/ErrorView";
import Spinner from "./presentationalComponents/Spinner";
import { Select } from "antd";
import "../styles/browsebooks.scss";
const { Option } = Select;

const mapDispatchToProps = { fetchBooks, removeLikedBook, updateBooks };

const mapStateToProps = (state) => ({
  books: state.books,
});
const BrowseBooks = ({ fetchBooks, books, removeLikedBook, updateBooks }) => {
  const distance = [];
  for (let i = 1; i <= 10; i++) {
    distance.push(<Option key={i}>{i} kms</Option>);
  }
  useEffect(fetchBooks, [fetchBooks]);

  const [currentPage, setCurrentPage] = useState(1);
  const [showSpinner, SetShowSpinner] = useState(false);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const onDistanceChange = (distance) => {
    SetShowSpinner(true);
    const myApi = new API();
    return myApi.endpoints.books
      .fetchNearbyBooks(distance)
      .then((response) => {
        SetShowSpinner(false);
        updateBooks(response.data.data.nearbyBooks);
      })
      .catch((error) => {
        SetShowSpinner(false);
        handleApiError(error);
      });
  };

  const onBookLikeClick = (bookId) => {
    SetShowSpinner(true);
    const myApi = new API();
    return myApi.endpoints.books
      .likeBook(bookId)
      .then((response) => {
        SetShowSpinner(false);
        removeLikedBook(bookId);
        notifyUser("success", "Book Liked", response.data.message);
      })
      .catch((error) => {
        SetShowSpinner(false);
        handleApiError(error);
      });
  };

  let nearbyBooks = [];
  let booksList = null;
  let numberOfBooksPerPage = 4;
  if (books.status === "fetched") {
    if (!books.error && books.data && books.data.nearbyBooks) {
      nearbyBooks = books.data.nearbyBooks;
      let startIndex = (currentPage - 1) * numberOfBooksPerPage;
      booksList = nearbyBooks
        .slice(startIndex, startIndex + numberOfBooksPerPage)
        .map((book) => {
          return (
            <div className="book-container" key={book.id}>
              <BookView book={book} onClick={onBookLikeClick} />
            </div>
          );
        });
    } else {
      return (
        <Layout>
          <ErrorView />
        </Layout>
      );
    }
  } else {
    return (
      <Layout>
        <LoadingView />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="browsebooks-root-container">
        <div className="select-container">
          <Select
            placeholder="Select distance"
            className="select"
            onChange={onDistanceChange}
            style={{ width: "200px" }}
          >
            {distance}
          </Select>
        </div>

        <div className="books-container">{booksList}</div>
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            total={nearbyBooks.length}
            pageSize={numberOfBooksPerPage}
            onChange={onPageChange}
          />
        </div>
      </div>
      <Spinner showSpinner={showSpinner} />
    </Layout>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseBooks);
