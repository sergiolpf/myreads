import React, {Component} from 'react';
import {Card, CardMedia, CardTitle } from 'material-ui/Card';
import Image from 'material-ui-image';
import {DragSource, DropTarget} from 'react-dnd';
import {findDOMNode} from 'react-dom';
import flow from 'lodash/flow';
import { ItemTypes } from './../constants/Constants';
import PropTypes from 'prop-types';
import CustomMenu from './CustomMenu';
import NoCover from './../../images/cover-no-image.jpg'

import './book.css'

const styles = {
    title: {
        lineHeight: 1.5,
        fontSize: 13,

    },
    authors: {
        lineHeight: 1.5,
        fontSize: 11,
    },
    cardTitle: {
        paddingLeft: 0,
        paddingTop: 5,
        paddingRight: 0,
        paddingBottom: 16,
    },
    moreInfo: {
        cursor: 'pointer',
        fontSize: 11,
        color: '#474747',
        textDecoration: 'underline',
    },
    cardText: {
        paddingTop: 0,
    },
    actionButton: {
        height: 30,
        width: 30,

    }
};

class Book extends Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
            anchorEl: null
        };

        this.changeShelf = this.changeShelf.bind(this);
    }

    authorStringfy(authors) {
        let sAuthors = authors.join(', ');

        return (sAuthors.length > 0) ? "by " + sAuthors : "";
    }

    changeShelf(newShelf) {
        this.props.onBookUpdate(this.props.book, newShelf);
    }

    getImage(book){
        return <Image src={
            this.hasImage(book)
                ? book.imageLinks.thumbnail
                : NoCover
        } aspectRatio={(2 / 3)}/>

    }

    hasImage (book) {
        return book.imageLinks && book.imageLinks.hasOwnProperty('thumbnail') ? true : false;
    }

    render() {
        const {book, isDragging, connectDragSource, connectDropTarget} = this.props;
        const opacity = isDragging ? 0 : 1;
        return (
            <div className="book" style={{opacity, position:"relative"}}
                 ref={instance => {
                     const node = findDOMNode(instance);
                     connectDragSource(node);
                     connectDropTarget(node);
                 }}>
                <Card key={book.id} className="book-content">
                    <CardMedia>
                        {this.getImage(book)}
                    </CardMedia>
                    <CardTitle
                        style={styles.cardTitle}
                        title={book.title}
                        titleStyle={styles.title}
                        subtitle={this.authorStringfy(book.authors)}
                        subtitleStyle={styles.authors}

                    />
                    {/*<CardText style={styles.cardText}>
                        <Link to="/info/" style={styles.moreInfo}>more info...</Link>
                    </CardText>*/}
                </Card>
                <CustomMenu currentShelf={book.shelf}
                            style={{top:180, right:4}}
                            onChangingShelfs={this.changeShelf} />
            </div>

        )
    }
}

const bookSource = {

    beginDrag(props) {
        return {
            index: props.index,
            shelfId: props.shelfId,
            book: props.book
        };
    },

    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();

        if (dropResult && dropResult.shelfId !== item.shelfId) {
            props.removeBook(item.index);
        }
    }
};

const bookTarget = {
    hover(props, monitor, component) {
        return {}
    }
};

Book.propTypes  = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    book:PropTypes.object.isRequired,
    shelfId:PropTypes.string.isRequired,
    index:PropTypes.number,
    removeBook:PropTypes.func.isRequired
}

export default flow(
    DropTarget(ItemTypes.BOOK, bookTarget, connect => ({
        connectDropTarget: connect.dropTarget()
    })),
    DragSource(ItemTypes.BOOK, bookSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }))
)(Book);
