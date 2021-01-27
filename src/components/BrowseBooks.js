import React from 'react'
import BookView from './presentationalComponents/BookView'
import { fetchBooks } from '../redux/booksSlice'
import { connect } from 'react-redux'

const mapDispatchToProps = { fetchBooks }

const BrowseBooks = ({fetchBooks}) => {
    fetchBooks();
    return (
        <div>
            <h1>BrowseBooks Page</h1>
            <p>Welcome to the BrowseBooks Page</p>
            <BookView />
        </div>
    )
}

export default connect(null, mapDispatchToProps)(BrowseBooks)