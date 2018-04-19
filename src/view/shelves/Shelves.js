import React, {Component} from 'react';
import Shelf from './../../components/shelf/Shelf';
import PropTypes from 'prop-types'
import HTML5Backend from 'react-dnd-html5-backend';

import { DragDropContext } from 'react-dnd';

import './shelves.css';

class Shelves extends Component {

    filterBooksByShelf(shelfId) {
        return this.props.books.filter((book) => book.shelf === shelfId);
    }

    render() {
        return (
            <div className="shelves">
                <h1>My Shelves</h1>
                {
                    Object.keys(this.props.types).map(key => {
                        const type = this.props.types[key];

                        if (!type.display) return null;

                        return (
                            <Shelf
                                   key={key}
                                   title={type.label}
                                   id = {type.id}
                                   books={this.filterBooksByShelf(type.id)}
                                   onBookUpdate={this.props.onBookUpdate}
                            />
                        );
                    })
                }
            </div>
        )
    }
}

Shelves.defaultProps = {
    books: [],
    onBookUpdate: () => {
    }
}

Shelves.propTypes = {
    book: PropTypes.array,
    onBookUpdate: PropTypes.func.isRequired
}

export default DragDropContext(HTML5Backend)(Shelves);
