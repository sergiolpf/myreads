import React, {Component} from 'react';
import ActionCompareArrows from 'material-ui/svg-icons/action/compare-arrows';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { ShelfTypes } from './../constants/Constants';


class CustomMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            anchorEl: null,
        }
    }

    handleClick = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    handleClickMenuItem = (shelfId, event) => {
        event.preventDefault();

        this.setState({
            open: false
        });

        this.props.onChangingShelfs(shelfId);
    };

    render() {
        return (
            <div>
                <RaisedButton
                    buttonStyle={{borderRadius: 25, height: 35, width: 35}}
                    style={{...this.props.style,
                        borderRadius: 25,
                        minWidth: 35,
                        height: 35,
                        position: 'absolute',
                        zIndex: 10
                    }}
                    labelColor={'#FFFFFF'}
                    backgroundColor={"#a05f9e"}
                    icon={<ActionCompareArrows/>}
                    onClick={this.handleClick}
                />
                <Popover open={this.state.open}
                         anchorEl={this.state.anchorEl}
                         anchorOrigin={{horizontal: 'left', vertical:'bottom'}}
                         targetOrigin={{horizontal: 'left', vertical:'top'}}
                         onRequestClose={this.handleRequestClose}
                         animation={PopoverAnimationVertical}>
                    <Menu>
                        <MenuItem primaryText="Move to" disabled={true} />
                        <Divider/>
                        {

                            Object.keys(ShelfTypes).map(key => {
                                const type = ShelfTypes[key];

                                if (type.id === this.props.currentShelf) return null;

                                return (
                                    <MenuItem primaryText={type.label}
                                              key={type.id}
                                              onClick={(evt) => this.handleClickMenuItem(type.id, evt)}

                                              value={type.id}/>
                                )
                            })
                        }
                    </Menu>
                </Popover>
            </div>
        );
    }
}

export default CustomMenu;