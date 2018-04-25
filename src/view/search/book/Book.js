import React, {Component} from 'react';
import Image from 'material-ui-image';
import NoCover from './../../../images/cover-no-image.jpg';
import Chip from 'material-ui/Chip';
import { ShelfTypes } from './../../../components/constants/Constants';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
                        <SelectField
                            floatingLabelText="Move to..."
                            value={this.hasShelf(book) ? book.shelf : null}
                            floatingLabelStyle={{color: 'white' }}
                            style={{width: 185 }}
                            onChange={(event, index, value) => {
                                console.log("select value:", value)
                                this.props.onBookUpdate(book, value)
                            }}
                        >
                            <MenuItem value="currentlyReading" primaryText="Currently Reading" />
                            <MenuItem value="wantToRead" primaryText="Want to Read" />
                            <MenuItem value="read" primaryText="Read" />
                            <MenuItem value="none" primaryText="None" />
                        </SelectField>
                    </div>

                </div>


            </div>
        );
    };
}

export default Book;