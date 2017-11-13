import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';

import EmailIcon from 'material-ui-icons/Email';
import BusinessIcon from 'material-ui-icons/Business';
import CalendarIcon from 'material-ui-icons/DateRange';
import NotificationIcon from 'material-ui-icons/Notifications';
import NonNotificationIcon from 'material-ui-icons/NotificationsNone';
import CloseIcon from 'material-ui-icons/Close';

import {blue,blueGrey} from 'material-ui/colors';

import MailComponent from './mailMainFrame';
import ProjectComponent from './projectCenterFrame';
import MyCalendar from './view/calendar/everyCalendar'

function TabContainer(props) {
    return <div style={{ height: '100%',
        paddingTop: 48,
        boxSizing:'border-box'
    }}>
        {props.children}
    </div>;
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        height:'100%',
        backgroundColor: theme.palette.background.paper,
        boxSizing:'border-box',
        dispaly:'flex',
        flexDirection:'column'
    },
    messageButton: {
        position:'absolute',
        top:0,
        right:theme.spacing.unit*2
    },
});

const chatWindowStyles = theme => ({
    titleButton: {
        flex: 1,
    },
    toolbar:{
        background:blue[500],
        padding:'0px',
        minHeight:0,
    }
});

class ChatWindow extends React.Component{


    render(){
        const { classes } = this.props;

        let currentStyle = {
            position:'fixed',
            bottom:0,
            right:210,
            zIndex:1000,
            width:250,
            height:this.props.minimized?36:400,
            display:this.props.hidden?'none':'flex',
            flexDirection:'column'
        };

        return(
            <Paper style={currentStyle}>
                <Toolbar className={classes.toolbar}>
                    <Button color="contrast" className={classes.titleButton}
                            onClick={()=> {
                                this.props.onWindowStateChage(!this.props.minimized,this.props.hidden);
                            }}>
                        {this.props.contact}
                    </Button>
                    <IconButton color="contrast" aria-label="Close" style={{height:36}}
                                onClick={()=>{
                                    this.props.onWindowStateChage(this.props.minimized,true);
                                }}>
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
                <div style={{flex:1,display:this.props.minimized?'none':'block'}}>
                    hello
                </div>
                <div style={{borderTopColor:blueGrey[300],borderTopStyle:'solid',borderTopWidth:'2px'}}>
                    <Input autoFocus={true} placeholder="说点什么" inputProps={{'aria-label': '消息',}}
                            style={{display:this.props.minimized?'none':'block',padding:'0 5px'}}/>
                </div>

            </Paper>
        )
    }
}

ChatWindow = withStyles(chatWindowStyles)(ChatWindow);


class mainLayout extends React.Component {

    state = {
        value: 0,
        chatWindowMinimized:true,
        chatWindowsHidden:true,
        chatContact:'null',
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    openChatWindow(contact){
        this.setState({
            chatWindowsHidden:false,
            chatWindowMinimized:false,
            chatContact:contact
        });
    }

    changeChatTarget(contact){
        this.openChatWindow(contact);
    }

    handleChatWindowStateChange(minimized,hidden){
        this.setState({
            chatWindowMinimized:minimized,
            chatWindowsHidden:hidden,
        });
    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <AppBar >
                    <Tabs value={value} onChange={this.handleChange} scrollable scrollButtons="off">
                        <Tab icon={<EmailIcon />} />
                        <Tab icon={<BusinessIcon />} />
                        <Tab icon={<CalendarIcon />} />
                    </Tabs>
                    <IconButton color="contrast" className={classes.messageButton}>
                        <NonNotificationIcon />
                    </IconButton>
                </AppBar>
                {value === 0 && <TabContainer><MailComponent /> </TabContainer>}
                {value === 1 && <TabContainer><ProjectComponent chat={contact => this.openChatWindow(contact)}/></TabContainer>}
                {value === 2 && <TabContainer><MyCalendar/></TabContainer>}
                <ChatWindow minimized={this.state.chatWindowMinimized}
                    hidden={this.state.chatWindowsHidden}
                    contact={this.state.chatContact}
                            onWindowStateChage={(mini,hide)=>{this.handleChatWindowStateChange(mini,hide)}}
                />
            </div>
        );
    }
}

mainLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(mainLayout);