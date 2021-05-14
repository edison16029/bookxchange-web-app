import React, { useState } from "react";
import { Pagination } from 'antd';
import TextInputDisabled from './TextInputDisabled';
import { UpdateButton } from  '../presentationalComponents/Button';
import '../../styles/styles.scss';
import '../../styles/modallistview.scss';
const ModalListView = (props) => {
    const { data, numberOfBooksPerPage, showPagination, showButton, buttonText, buttonOnClick, itemOnClick} = props;
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    let startIndex = (currentPage-1) * numberOfBooksPerPage;
    
    const itemList = data.slice(startIndex, startIndex + numberOfBooksPerPage).map(item => {
        return(
          <TextInputDisabled label={""} id={item._id} value={item.title} centeredText itemOnClick={itemOnClick} item={item}/>
        )
    });

    return (
        <div className="modal-tab-container">
          <div className="modal-tab-list-container">
            {itemList}
          </div>
          {
            showPagination && 
            <div className = "modal-tab-pagination-container">
              <Pagination current={currentPage} total={data.length} pageSize={numberOfBooksPerPage} onChange = {onPageChange} />
            </div>
          }
          {
            showButton && 
            <div className = "modal-tab-pagination-container modal-button-padding">
              <UpdateButton buttonText={buttonText} onClick={buttonOnClick}/>
            </div>
          }
        </div>
      );
}

export default ModalListView;