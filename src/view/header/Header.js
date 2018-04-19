import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import withRouter from 'react-router-dom/withRouter'

import './header.css'
import logo from './../../icons/logo.png';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const styles = {
    topMenu: {
        paddingTop: 45,
    },
}
// TODO: change the render process to set the current tab based on the URL change as well, not only from the Tab => URL
const HeaderApp = () => {
    return (
        <AppBar titleStyle={styles.topMenu}
                title={
                    <Tabs className="headerMenu" inkBarStyle={{backgroundColor: 'black'}} >
                        <Tab label="My Shelves" value="/" containerElement={<Link to="/"/>}/>
                        <Tab label="Search" value="/search" containerElement={<Link to="/search"/>}/>
                        <Tab label="About" value="/about" containerElement={<Link to="/about"/>}/>
                    </Tabs>}
                iconElementLeft={
                    <Link to="/">
                        <img src={logo} alt="Logo" className="logo"/>
                    </Link>}
        />
    )
}

export default withRouter(HeaderApp);

