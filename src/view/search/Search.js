import React, {Component} from 'react';
import SearchBar from 'material-ui-search-bar'
import sortBy from 'sort-by';
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './../../api/BooksAPI';
import debounce from 'lodash/debounce';
import {List} from 'material-ui/List';
import Book from "./book/Book";

import CircularProgress from 'material-ui/CircularProgress';
import './search.css';


class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            result: [],
            isEmpty: false,
            isLoading: false

        }
    }

    updateQuery = (query) => {
        const espcapedQuery = escapeRegExp(query.trim(), 'i');

        if (espcapedQuery.trim() === '') {
            this.setState({result: [], isEmpty: false});
            return;
        }

        this.setState({
            query: espcapedQuery.trim()
        });

        this.searchBooks(espcapedQuery.trim());
    };

    searchBooks = (query) => {

        this.setState({result: [], isEmpty: false, isLoading: true});

        if (query !== escapeRegExp(this.state.query.trim(), 'i')) return;

        BooksAPI.search(query)
            .then(response => {
                const emptyResponse = !!response.error;
                const result = emptyResponse ? [] : response.sort(sortBy('title'));

                this.setState({
                    result: result.map(book => {
                        const myBook = this.props.books.find(myBook => myBook.id === book.id);
                        if (myBook) {
                            book.shelf = myBook.shelf
                        }
                        return book;
                    }),
                    isEmpty: result.length > 0 ? false : true,
                    isLoading: false
                });

            });
    };

    render() {
        return (
            <div className="search-content">
                <SearchBar
                    /*dataSource={SearchHint}*/
                    onChange={debounce((value) => this.updateQuery(value), 400)}
                    onRequestSearch={debounce((value) => this.updateQuery(value), 400)}
                />
                {this.state.isLoading && (
                    <div className="results-count">
                        <CircularProgress/>
                    </div>
                )}

                {this.state.isEmpty && (
                    <div className="results-count">
                        No luck!!!! No results found!<br/>
                        Your Search '<b>{this.state.query}</b>' returned no books!<br/>
                        Change the query and try again.
                    </div>
                )}

                {this.state.result.length > 0 && (
                    <div className="results-count">
                        <b>{this.state.result.length}</b> {this.state.result.length === 1 ? "Book" : "Books"} found.
                    </div>
                )}


                <div className="results-list">
                    <List>{
                        this.state.result.map(book => {
                            return (
                                <Book key={book.id}
                                    book={book}
                                    onBookUpdate={this.props.onBookUpdate}
                                />
                            )
                        })
                    }</List>
                </div>
            </div>


        );
    }

}

export default Search