import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import update from 'immutability-helper';
import {DropTarget} from 'react-dnd';
import * as Types from './../constants/Constants'
import { findDOMNode } from 'react-dom';


import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import Book from './../book/Book'

import './shelf.css'
import PropTypes from 'prop-types'

const style = {
    shelfTitle: {
        fontFamily: 'La Belle Aurore, cursive',
        fontSize: 30,
        paddingTop: 10,
    }
}

class Shelf extends Component {
    constructor(props) {
        super(props);
        this.state = { shelfBooks: props.books};

    }

    pushBook(book) {
        console.log("shelf - pushbook - id", this.props.id);
        console.log("shelf - pushbook - book", book);


        const newState = update(this.state, {
            shelfBooks: {
                $push: [book]
            }
        });
        console.log("shelf - pushbook - new state", newState);
        this.setState({newState});
        this.props.onBookUpdate(book, this.props.id)
    }

    removeBook(index) {
        this.setState(update(this.state, {
            shelfBooks: {
                $splice: [
                    [index, 1]
                ]
            }
        }));
    }

    moveBook(dragIndex, hoverIndex) {
        const { shelfBooks } = this.state;
        const dragBook = shelfBooks[dragIndex];

        this.setState(update(this.state, {
            shelfBooks: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragBook]
                ]
            }
        }));
    }

    componentWillReceiveProps(nextProps){
        this.setState( {
            shelfBooks: nextProps.books
        })
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state === nextState ? false : true;

    }

    render() {
        const { shelfBooks } = this.state;
        const { canDrop, isOver, connectDropTarget} = this.props;
        const isActive = canDrop && isOver;
        const backgroundColor = isActive ? 'lightgreen' : '#FFF';

        return (
                <Paper zDepth={3}
                       className="shelf"
                       ref={instance => connectDropTarget(findDOMNode(instance))}>

                    <div className="shelfTitle">
                        <Toolbar className="shelfTitleContainer">
                            <ToolbarGroup>
                                <ToolbarTitle text={this.props.title} style={style.shelfTitle}/>
                            </ToolbarGroup>
                        </Toolbar>
                    </div>

                    <div className="shelfContainer" style={{backgroundColor}}>
                        {shelfBooks.map((book, i) => (
                            <Book
                                key={book.id}
                                book={book}
                                shelfId={book.shelf}
                                index={i}
                                removeBook={this.removeBook.bind(this)}
                                moveBook={this.moveBook.bind(this)}
                            />
                        ))}
                    </div>
                </Paper>
        )
    }
}

Shelf.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onBookUpdate: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired ,
    canDrop: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired
}

const bookTarget = {
    drop(props, monitor, component) {
        const {id} = props;
        const sourceObj = monitor.getItem();
        if (id !== sourceObj.shelfId) component.pushBook(sourceObj.book);
        return {
            shelfId: id
        }
    }
}
export default DropTarget(Types.ItemTypes.BOOK, bookTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()

}))(Shelf);
