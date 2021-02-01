import React, { useState, useEffect } from 'react'
import BookView from './presentationalComponents/BookView'
import { Layout } from './presentationalComponents/Layout';
import { fetchBooks } from '../redux/booksSlice'
import { connect } from 'react-redux'
import { Pagination } from 'antd';
import '../styles/browsebooks.scss';

const mapDispatchToProps = { fetchBooks }

const mapStateToProps = state => ({
    books : state.books
});
const BrowseBooks = ({fetchBooks, books}) => {
    useEffect(() => {
        console.group();
        fetchBooks();
    }, [])

    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    if(!books || !books.data || !books.data.nearbyBooks) return null; //Add Error Page

    let numberOfBooksPerPage = 4;
    let startIndex = (currentPage-1) * numberOfBooksPerPage;
    let booksList = books.data.nearbyBooks.slice(startIndex, startIndex + numberOfBooksPerPage)
        .map(book => {
            return (
                <div className = "book-container" key = {book.id}>
                        <BookView book = {book}/>
                </div>
            )
        })
    return (
        <Layout>
            <div className = "browsebooks-root-container">
                <div className = "books-container">
                    {booksList}
                </div>
                <div className = "pagination-container">
                    <Pagination current={currentPage} total={books.data.nearbyBooks.length} pageSize={numberOfBooksPerPage} onChange = {onPageChange} />
                </div>
            </div>
        </Layout>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseBooks)