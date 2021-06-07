import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Profile from './Profile';
import  BrowseBooks  from './BrowseBooks';
import  MatchedBooks  from './MatchedBooks';
import { NavigationBar} from './presentationalComponents/NavigationBar';
import Login from './Login';
import Signup from './Signup';
import ErrorView from './presentationalComponents/ErrorView';
import constants from '../shared/constants';

import '../styles/home.scss';

const Home = () => {
    return (
        <React.Fragment>
            <Router>
                <NavigationBar />
                    <div className = "switch-container">
                        <Switch> 
                            <Route exact path="/"><Redirect to={constants.routes.signin}/></Route>
                            <Route exact path={constants.routes.signin} component = {Login} />
                            <Route exact path={constants.routes.signup} component = {Signup} />
                            <Route exact path={constants.routes.profile} component = {Profile} />
                            <Route exact path={constants.routes.browseBooks} component = {BrowseBooks} />
                            <Route exact path={constants.routes.matchedBooks} component = {MatchedBooks} />
                            <Route component={ErrorView} />
                        </Switch>
                    </div>
            </Router>
        </React.Fragment>
    )
}

export default Home;