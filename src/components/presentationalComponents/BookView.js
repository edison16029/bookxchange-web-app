import React from 'react'
import '../../styles/styles.scss';
import '../../styles/bookview.scss';

const BookView = (props) => {
    let book = props.book;
    return (
        <div className = "bookview-container">
            <div className = "bookbg flex-column">
                {/*Top Container fills the top part of Book Icon with empty space*/}
                <div className = "top-container" /> 
                <div className = "bookname-container">
                    {/*Left Container fills the left part of Book Icon with empty space*/}
                    <div className = "left-container" />
                    <div className = "mid-container text-align-center padding-horizontal-medium">
                        <span className = "big-font"><a href={book.link} target="_blank">{book.name}</a></span>
                    </div>
                </div>
                <div className = "author-container">
                    <div className = "left-container"/>
                    <div className = "mid-container flex-column padding-horizontal-large">
                        <span className = "medium-font font-color-secondary">Author</span>
                        <span className = "medium-font">{book.author}</span>
                    </div>
                </div>
                <div className = "owner-container">
                    <div className = "left-container" />
                    <div className = "mid-container flex-column padding-horizontal-large text-align-right">
                        <span className = "medium-font font-color-secondary">Owner</span>
                        <span className = "medium-font">{book.userName}</span>
                    </div>
                </div>
                <div className = "bottom-container">
                    {/* Add Button Code here*/}
                    {/* <div className = "left-container" />
                    <div className = "mid-container temp-bg padding-horizontal-large button-container">
                        <div className = "inner-button-container">
                            <button>Interested</button>
                            asd
                        </div>
                        <div className = "extra-button-container">
                            <button>Interested</button>
                            sda
                        </div>
                    </div> */}
                </div>
            </div>

        </div>
    )
}

export default BookView;