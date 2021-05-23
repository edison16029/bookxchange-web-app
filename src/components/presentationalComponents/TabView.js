import React, { useState } from "react";
import { Pagination } from 'antd';
import TextItem from './TextItem';
import { UpdateButton } from  '../presentationalComponents/Button';
import '../../styles/styles.scss';
import '../../styles/tabview.scss';

const TabView = (props) => {
    const { data, title, numberOfBooksPerPage, showPagination, showButton, buttonText, buttonOnClick, itemOnClick} = props;
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    let startIndex = (currentPage-1) * numberOfBooksPerPage;
    
    const itemList = data.slice(startIndex, startIndex + numberOfBooksPerPage).map(item => {
        return(
          <TextItem id={item._id} text={item.title} itemOnClick={itemOnClick}/>
        )
    });

    return (
        <div className="tab-container">
          <div className="tab-header-container text-align-center padding-vertical-medium">
            <span className="big-font">{title}</span>
          </div>
          <div className="tab-list-container">
            {itemList}
          </div>
          {
            showPagination && 
            <div className = "tab-pagination-container">
              <Pagination current={currentPage} total={data.length} pageSize={numberOfBooksPerPage} onChange = {onPageChange} />
            </div>
          }
          {
            showButton && 
            <div className = "tab-pagination-container button-padding">
              <UpdateButton buttonText={buttonText} onClick={buttonOnClick}/>
            </div>
          }
        </div>
      );
}

export default TabView;