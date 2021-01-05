import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import { Profile } from './Profile';
import { BrowseBooks } from './BrowseBooks';
import { MatchedBooks } from './MatchedBooks';
import { NavigationBar} from './presentationalComponents/NavigationBar';
import Login from './Login';
import Signup from './Signup';
import constants from '../shared/constants';

const Home = () => {
    //TODO : Add Error Component    
    return (
        <React.Fragment>
            <Router>
                <NavigationBar />
                    <Switch> 
                        <Route exact path="/"><Redirect to={constants.routes.signin}/></Route>
                        <Route exact path={constants.routes.signin} component = {Login} />
                        <Route exact path={constants.routes.signup} component = {Signup} />
                        <Route exact path={constants.routes.profile} component = {Profile} />
                        <Route exact path={constants.routes.browseBooks} component = {BrowseBooks} />
                        <Route exact path={constants.routes.matchedBooks} component = {MatchedBooks} />
                    </Switch>
            </Router>
        </React.Fragment>
    )
}

export default Home;