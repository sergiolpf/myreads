import React, { Component } from 'react';
import * as BooksAPI from './api/BooksAPI';
import logo from './icons/logo.png';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

class App extends Component {

    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        books: [],
        headerTitle: 'Home'
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books})
        })
    }

    render() {
    return (
      <div>
          <Route exact path='/' render={() => (
          <AppBar
              title={this.state.headerTitle}
              iconElementLeft={
                  <Link to="/">
                      <img src={logo} alt="Logo" />
                  </Link>}>
              <Toolbar>
                  <ToolbarGroup firstChild={true}>

                  </ToolbarGroup>
              </Toolbar>
          </AppBar>

          )}/>
      </div>
    );
  }
}

export default App;
