import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import { Profile } from './Profile';
import { BrowseBooks } from './BrowseBooks';
import { MatchedBooks } from './MatchedBooks';
import { Layout } from './presentationalComponents/Layout';
import { NavigationBar} from './presentationalComponents/NavigationBar';

const Home = () => {
    return (
        <React.Fragment>
            <Router>
                <NavigationBar />
                <Layout>
                    <Switch>
                        <Route exact path="/"><Redirect to="/profile" /></Route>
                        <Route exact path="/profile" component = {Profile} />
                        <Route exact path="/browsebooks" component = {BrowseBooks} />
                        <Route exact path="/matchedbooks" component = {MatchedBooks} />
                        <Route component = {Profile} />
                    </Switch>
                </Layout>
            </Router>
        </React.Fragment>
    )
}

export default Home;