import React,{ Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import {red} from 'material-ui/colors';

import Paper from 'material-ui/Paper';
import List, {
    ListItem,
    ListItemIcon,
    ListItemText,
} from 'material-ui/List';



import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AttachFileIcon from 'material-ui-icons/AttachFile';
import CloseIcon from 'material-ui-icons/Close';
import RecordIcon from 'material-ui-icons/FiberManualRecord';


import {ChatInputComponent} from '../commonComponent';


const style = theme =>({
    root:{
        flex:1,
        display:'flex',
        flexDirection:'column'
    },
    textFieldRoot: {
        padding: 0,
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    textFieldInput: {
        borderRadius: 4,
        background: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    customScroll:{
        '&::-webkit-scrollbar-trackPiece':{backgroundColor:'#fff'},
        '&::-webkit-scrollbar':{width:2},
        '&::-webkit-scrollbar-thumb':{
            backgroundColor:'#999',
            borderRadius:'5px'},
        overflowY:'scroll',
        flex:1,
    }
});

class ChatFrame extends Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    render(){

        const classes = this.props.classes;

        return(
            <div className={classes.root}>
                <AppBar position="static" color="default" >
                    <Toolbar className={classes.toolbar} >
                        <Typography type='title' color={"primary"} style={{flex:1}} >
                            {this.props.title}
                        </Typography>
                        <IconButton className={classes.button} style={{color:red[200]}}>
                            <RecordIcon />
                        </IconButton>
                        <IconButton className={classes.button}>
                            <AttachFileIcon />
                        </IconButton>
                        <IconButton className={classes.button}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Paper className={classes.customScroll}>
                    <List >
                        {
                            this.props.dialogs && this.props.dialogs.map(
                                entry => (
                                    <ListItem key={entry.id}>
                                        {
                                            entry.mine ?
                                                < ListItemText primary={entry.primary} secondary={entry.timestamp.format('h:mm:ss a')} style={{textAlign:'end'}}/>
                                                :
                                                <ListItemIcon><Avatar src={entry.iconSrc} style={{width:36,height:36}}/></ListItemIcon>
                                        }
                                        {
                                            entry.mine ?
                                                <ListItemIcon><Avatar src={entry.iconSrc} style={{width:36,height:36}}/></ListItemIcon>
                                                :
                                                < ListItemText primary={entry.primary} secondary={entry.timestamp.format('h:mm:ss a')}  />
                                        }
                                    </ListItem>)
                            )
                        }
                    </List>
                </Paper>
                <ChatInputComponent/>
                {/*<TextField placeholder="说点什么吧" style={{margin:9,}}*/}
                {/*InputProps={{*/}
                    {/*disableUnderline: true,*/}
                    {/*classes: {*/}
                        {/*root: classes.textFieldRoot,*/}
                        {/*input: classes.textFieldInput,*/}
                    {/*},*/}
                {/*}}/>*/}
        
            </div>
        )
    }
}

export default withStyles(style)(ChatFrame);