import React, {Component} from 'react';
import * as BooksAPI from './api/BooksAPI';
import Header from './view/header/Header';
import About from './view/about/About';
import Shelves from './view/shelves/Shelves';
import Search from './view/search/Search'

import { Route } from 'react-router-dom'

const shelfTypes = {
    currentlyReading: {
        id: 'currentlyReading',
        label: 'Currently Reading',
        display: true
    },
    wantToRead: {
        id: 'wantToRead',
        label: 'Want to Read',
        display: true
    },
    read: {
        id: 'read',
        label: 'Read',
        display: true
    },
    none: {
        id: 'none',
        label: '',
        display: false
    }
};


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: []
        };

        this.bookUpdate = this.bookUpdate.bind(this);
        this.modifyBook = this.modifyBook.bind(this);

    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books})
        })
    }

    bookUpdate(book, shelf, callback = () =>{}) {
        if (shelf.trim() === '') return;

        BooksAPI.update(book, shelf).then(() => {
            this.modifyBook(book, shelf)
            return callback()
        });

    }

    modifyBook(book, shelf) {
        book.shelf = shelf;
        this.setState(prevState => {
            return {
                books: [
                    ...prevState.books.filter(
                        elem => elem.id !== book.id
                    ),
                    book
                ]
            }
        })
    }

    render() {
        return (
            <div>
                <Header />
                <Route exact path="/" render={() => (
                    <Shelves books={this.state.books}
                             types={shelfTypes}
                             onBookUpdate={this.bookUpdate.bind(this)}/>
                )}/>
                <Route path="/search" render={() => (
                    <Search />
                )}/>
                <Route path="/about" component={About} />

            </div>
        );
    }
}

export default App;
