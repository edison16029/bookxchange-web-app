import React, { useState } from "react";
import { Pagination } from 'antd';
import TextItem from './TextItem';
import '../../styles/styles.scss';
import '../../styles/tabview.scss';

const TabView = (props) => {
    const { data, title, numberOfBooksPerPage} = props;
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    let startIndex = (currentPage-1) * numberOfBooksPerPage;
    
    const itemList = data.slice(startIndex, startIndex + numberOfBooksPerPage).map(item => {
        return(
          <TextItem text={item.title}/>
        )
    });

    return (
        <div className="tab-container">
          <div className="tab-header-container text-align-center padding-vertical-medium">
            <span className="font-style">{title}</span>
          </div>
          <div className="tab-list-container">
            {itemList}
          </div>
          <div className = "tab-pagination-container">
            <Pagination current={currentPage} total={data.length} pageSize={numberOfBooksPerPage} onChange = {onPageChange} />
          </div>
        </div>
      );
}

export default TabView;