import React, {Component} from 'react';
import Image from 'material-ui-image';
import NoCover from './../../../images/cover-no-image.jpg';
import Chip from 'material-ui/Chip';
import { ShelfTypes } from './../../../components/constants/Constants'

class Book extends Component {

    getImage(book){
        return <Image src={
            this.hasImage(book)
                ? book.imageLinks.thumbnail
                : NoCover
        } aspectRatio={(2 / 3)}/>

    }

    hasImage (book) {
        return !!(book.imageLinks && book.imageLinks.hasOwnProperty('thumbnail'));
    }

    hasShelf(book) {
        return !!book.shelf;
    }

    getShelfName(shelfId){
        const shelfKey = Object.keys(ShelfTypes).filter((key) => key === shelfId);
        return ShelfTypes[shelfKey].label;
    }

    hasYear(book) {
        return !!book.publishedDate;
    }

    hasAuthors(book) {
        return !!book.authors;
    }

    authorStringfy(authors) {
        return authors.join(', ');
    }

    hasPages(book){
        return !!book.pageCount;
    }

    render() {
        const book = this.props.book;
        return (
            <div className="list-item">
                <div className="item-image">
                    {this.getImage(book)}
                </div>
                <div className="item-content">
                    <div className="item-title">
                        {book.title}
                        {this.hasShelf(book) && (<Chip style={{marginLeft: 10, fontWeight: 700}}>{this.getShelfName(book.shelf)}</Chip>)}
                    </div>
                    <div className="item-details">
                        {this.hasYear(book) && (
                            <div className="item-detail">
                                <span><strong>Year: </strong></span>
                                {book.publishedDate.split('-')[0]}
                            </div>
                            )}
                        {this.hasAuthors(book) && (
                            <div className="item-detail">
                                <span><strong>Author(s): </strong></span>
                                {this.authorStringfy(book.authors)}
                            </div>
                        )}
                        {this.hasPages(book) && (
                            <div className="item-detail">
                                <span><strong>Pages: </strong></span>
                                {book.pageCount}
                            </div>
                        )}
                    </div>
                    <div className="item-description">
                        {book.description}
                    </div>
                    <div className="item-actions">
                        <select onChange={(e) => {
                            this.props.onBookUpdate(book, e.target.value)
                        }}>
                            <option value="">Move to...</option>

                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>

                </div>


            </div>
        );
    };
}

export default Book;