import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import profile from './../../images/profile.jpg'
import './about.css'

const About = () => {
    return (
        <div className="about">
            {/*<h1>About</h1>*/}
            <Paper zDepth={3} className="about-content">
                <Card className="item" style={{width: '60%'}}>
                    <CardText style={{color: 'rgba(0,0,0,.65)'}}>
                        <h2>About</h2>

                        <p>The MyReads App is the implementation of the final assessment of the React Fundamentals
                            course
                            from the <a href="https://udacity.com/course/nd019" target="_blank"
                                        rel="noopener noreferrer">
                                React Nanodegree Program</a>.
                        </p>

                        <p>With MyReads you can select and categorize books you are currently reading, want to read,
                            or have read. You will be able to change a book status anytime, as well as add new titles
                            to your collection or remove items from your library, just move the books using the menu or
                            drag the books from the shelf and drop in the new shelf. It also includes a search function
                            to add additional books.</p>

                        <p>You can check the code in my GitHub repo in <a href="https://github.com/sergiolpf/myreads" target="_blank"
                               rel="noopener noreferrer">
                                https://github.com/sergiolpf/myreads</a></p>

                        <h3>Search Terms</h3>

                        <p>For searching books, only some specific words are allowed. The complete list is:</p>

                        <p>'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball',
                            'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes',
                            'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design',
                            'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education',
                            'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future',
                            'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King',
                            'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez',
                            'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry',
                            'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire',
                            'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time',
                            'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'</p>

                    </CardText>
                </Card>
                <Card className="item" style={{width: '40%'}}>
                    <CardHeader
                        title="Sergio Luiz Pereira Filho"
                        titleColor={'rgba(0,0,0,.65)'}
                        subtitle="IT Consultant"
                        subtitleColor={'rgba(0,0,0,.65)'}
                        avatar={<Avatar src={profile} size={70}/>} />

                    <CardText style={{color: 'rgba(0,0,0,.65)'}}>
                        <p>I am Brazilian. I am a seasoned IT Consultant with a few years experience working
                            wearing several types of hats.
                            I am also a father of a sleepless Alice, a coffee and scotch drinker and the things I do
                            love are:
                            <ul>
                                <li>Ice Cream</li>
                                <li>Traveling</li>
                                <li>Jiu Jitsu</li>
                            </ul>
                        </p>

                        <p>The links below contain more information about me - Check them ;) </p>

                        <ul>
                            <li>
                                <a href='https://www.linkedin.com/in/sergiolpf/'
                                   target="_blank" rel="noopener noreferrer">
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a href='https://github.com/sergiolpf'
                                   target="_blank" rel="noopener noreferrer">
                                    GitHub
                                </a>
                            </li>
                        </ul>
                    </CardText>
                </Card>
            </Paper>

        </div>
    )
};

export default About;



