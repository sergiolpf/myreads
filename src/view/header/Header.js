import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import withRouter from 'react-router-dom/withRouter'

import './header.css'
import logo from './../../images/logo.png';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const styles = {
    topMenu: {
        paddingTop: 45,
    },
};

class HeaderApp extends Component {
    constructor(props){
        super(props);
        switch (this.props.location.pathname) {
            case '/':
                this.state = {initialTab: 0};
                break;
            case '/search':
                this.state = {initialTab: 1};
                break;
            case '/about':
                this.state = {initialTab: 2};
                break;
            default:
                this.setState = {initialTab: 0};
                break;
        }
    }

    render() {
        return (
            <AppBar titleStyle={styles.topMenu}
                    title={
                        <Tabs className="headerMenu"
                              inkBarStyle={{backgroundColor: 'black'}}
                              initialSelectedIndex={this.state.initialTab || 0}>
                            <Tab label="My Shelves" value="/" containerElement={<Link to="/"/>}/>
                            <Tab label="Search" value="/search" containerElement={<Link to="/search"/>}/>
                            <Tab label="About" value="/about" containerElement={<Link to="/about"/>}/>
                        </Tabs>}
                    iconElementLeft={
                        <Link to="/">
                            <img src={logo} alt="Logo" className="logo" />
                        </Link>}
            />
        );
    }
}

export default withRouter(HeaderApp);

