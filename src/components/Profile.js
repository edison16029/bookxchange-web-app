import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Layout } from "./presentationalComponents/Layout";
import TabsContainer from './presentationalComponents/TabsContainer';
import AccountTab from "./tabs/AccountTab";
import YourBooksTab from "./tabs/YourBooksTab";

import { fetchMyAccountData, fetchBooksIOwn } from "../redux/profileSlice";

const Profile = props => {
  const {
    profile,
    fetchMyAccountData,
    fetchBooksIOwn
  } = props;
  // eslint-disable-next-line
  const [pageLoad, setpageLoad] = useState("");
  useEffect( () => {
    fetchMyAccountData();
    fetchBooksIOwn();
    // eslint-disable-next-line
  }, [pageLoad])

  let dataFetched = profile.myAccountStatus === "fetched" && profile.booksIOwnStatus === "fetched";
 
  let accountInfo = [];
  let booksIOwn = [];
  if(dataFetched){
    if(!profile.accountInfoError && !profile.booksIOwnError){
        //AccountInfo data
        accountInfo.push({title : profile.data.accountInfo.name})
        accountInfo.push({title : profile.data.accountInfo.email})
        accountInfo.push({title : profile.data.accountInfo.location})
        //BooksIOwn data
        booksIOwn = profile.data.booksIOwn.map(book => {
              let bookIOwn = { ...book, title : book.name}
              return bookIOwn;
            });
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
  
  return (
    <Layout>
      <TabsContainer 
        LeftTab = {() => <AccountTab data={accountInfo}/>}
        RightTab = {() => <YourBooksTab data={booksIOwn}/>}
        leftTabText = "Account Info"
        rightTabText = "Your books"/>
    </Layout>
  )
};

const mapStateToProps = state => ({
    profile : state.profile
});

export default connect(mapStateToProps, { fetchMyAccountData, fetchBooksIOwn })(Profile);
