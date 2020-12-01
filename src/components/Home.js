import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import { Profile } from './Profile';
import { BrowseBooks } from './BrowseBooks';
import { MatchedBooks } from './MatchedBooks';
import { Layout } from './presentationalComponents/Layout';
import { NavigationBar} from './presentationalComponents/NavigationBar';
import Login from './Login';
const Home = () => {
    //TODO : Add Error Component    
    return (
        <React.Fragment>
            <Router>
                <NavigationBar />
                <Layout>
                    <Switch> 
                        <Route exact path="/"><Redirect to="/signin" /></Route>
                        <Route exact path="/signin" component = {Login} />
                        <Route exact path="/profile" component = {Profile} />
                        <Route exact path="/browsebooks" component = {BrowseBooks} />
                        <Route exact path="/matchedbooks" component = {MatchedBooks} />
                    </Switch>
                </Layout>
            </Router>
        </React.Fragment>
    )
}

export default Home;