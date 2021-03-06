import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Collapse from 'material-ui/transitions/Collapse';

import ReplyIcon from 'material-ui-icons/Reply';
import ReplyAllIcon from 'material-ui-icons/ReplyAll';
import AssignmentIcon from 'material-ui-icons/Assignment';
import ShareIcon from 'material-ui-icons/Share';
import DeleteIcon from 'material-ui-icons/Delete';
import FullScreenIcon from 'material-ui-icons/Launch';
import ForwardIcon from 'material-ui-icons/Forward';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ChevronLeft';


import {MailListItemIcon} from './mailListItem'

const styles = theme => ({
    root: {
        width: '100%',
        height:'100%',
    },
    flex: {
        flex: 1,
    },
    button: {
        margin: theme.spacing.unit,
        // height:'1em',
        alignItems:'center ',
    },
    mainContent: {
        maxWidth: '100%',
        height:'100%',
        display:'flex',
        flexDirection:'column'
    },
    chip: {
        margin: theme.spacing.unit / 2,
        height:'1.5em',
        borderRadius:'0.2em',
    },
    card: {
        marginTop: '1px',
        maxWidth: '100%',
        height:'100%',
        display:'flex',
        flexDirection:'column'
    },
    row: {
        display: 'flex',
        justifyContent: 'start',
        flexWrap: 'wrap',
        alignItems:'center ',
        height:'100%',
    },
    toolbar:{
        minHeight:'54px',
    }
});

class mailComposerFrame extends Component {

    chipData = [
        { key: 0, label: 'Angular' },
        { key: 1, label: 'JQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'ReactJS' },
        { key: 4, label: 'Vue.js' },
    ];

    state = {
        headerOpen:false,
    };

    handleHeaderToggle(event){
        this.setState({
            headerOpen: ! this.state.headerOpen,
        });
    }

    render(){
        const classes = this.props.classes;
        return(
            <div className={classes.root}>
                <AppBar position="static" color="default" >
                    <Toolbar className={classes.toolbar} >
                        <div className={classes.flex}></div>
                        <IconButton className={classes.button}>
                            <ReplyIcon />
                        </IconButton>
                        <IconButton className={classes.button} >
                            <ReplyAllIcon />
                        </IconButton>
                        <IconButton className={classes.button} >
                            <ForwardIcon />
                        </IconButton>
                        <IconButton className={classes.button} >
                            <ShareIcon />
                        </IconButton>
                        <IconButton className={classes.button} disabled>
                            <AssignmentIcon />
                        </IconButton>
                        <IconButton className={classes.button}>
                            <DeleteIcon />
                        </IconButton>

                        <IconButton className={classes.button}>
                            <FullScreenIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Card className={classes.card}>
                    <div style={{display:'flex'}}>
                        <CardHeader
                            avatar={<Avatar className={classes.avatar}><MailListItemIcon itemType={this.props.itemType} status ={this.props.itemStatus}/></Avatar>}
                            title={<Typography type="headline">{ this.props.title} </Typography>}
                            subheader={this.props.author + " 🏁 " + this.props.datetime + "  🗓️ 2017/9/19"}
                            style={{paddingTop:5,paddingBottom:2,flex:1}}
                        />
                        <Button color="primary" className={classes.button}>
                            {'天津全运会保障项目'}
                        </Button>
                        <IconButton className={classes.button} onClick={event => this.handleHeaderToggle(event)}>
                            {this.state.headerOpen ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>

                    </div>
                    <Divider />
                    <Collapse in = {this.state.headerOpen } transitionDuration="auto" unmountOnExit>
                        <CardContent>
                            <div className={classes.row}>
                                <div style={{width:'3rem'}}>接收人</div>
                                {
                                    this.chipData.map(data =>(
                                        <Chip label={data.label} key={data.key} className={classes.chip}/>
                                    ))
                                }
                            </div>
                            <div className={classes.row}>
                                <div style={{width:'3rem'}}>抄送</div>
                                {
                                    this.chipData.map(data =>(
                                        <Chip label={data.label} key={data.key} className={classes.chip}/>
                                    ))
                                }
                            </div>
                        </CardContent>
                        <Divider />
                    </Collapse>
                    <CardContent style={{flexGrow:1,overflowY:'auto'}}>
                        {this.props.children}
                    </CardContent>
                </Card>
            </div>
        )

    }
}

mailComposerFrame.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(mailComposerFrame);