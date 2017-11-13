import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';

import ReplyIcon from 'material-ui-icons/Reply';
import ReplyAllIcon from 'material-ui-icons/ReplyAll';
import AssignmentIcon from 'material-ui-icons/Assignment';
import ShareIcon from 'material-ui-icons/Share';
import DeleteIcon from 'material-ui-icons/Delete';
import FullScreenIcon from 'material-ui-icons/Launch';
import ForwardIcon from 'material-ui-icons/Forward';
import {blue} from 'material-ui/colors';

import {TagButton} from './view/commonComponent';
import {DataItemType,DataItemStatus} from './model/mailEngine';


const primaryViewStyle = theme => ({
    flex: {
        flex: 1,
    },
    button: {
        //margin: theme.spacing.unit,
        // height:'1em',
        alignItems:'center ',
    },
    mainContent: {
        maxWidth: '100%',
        height:'100%',
        display:'flex',
        flexDirection:'column'
    },
    card: {
        marginTop: '1px',
        width: '100%',
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
    toolBar:{
        backgroundColor:blue[100],
    },
    avatar: {
        margin: theme.spacing.unit,
    },
    root:{
        marginBottom:theme.spacing.unit,
        display:'flex',
        marginRight:theme.spacing.unit,
    }
});

class projectActivityPrimaryView extends Component {

    constructor(props){
        super(props);
        this.chipData = [
            { key: 0, label: 'Angular' },
            { key: 1, label: 'JQuery' },
            { key: 2, label: 'Polymer' },
            { key: 3, label: 'ReactJS' },
            { key: 4, label: 'Vue.js' },
        ];
    }

    render(){
        const classes = this.props.classes;
        return(
            <div className={classes.root}>
                <Avatar alt={'anonymous'} src={'https://material-ui-next.com/static/images/uxceo-128.jpg'} className={classes.avatar} />
                <Card className={classes.card}>
                    {/*<CardHeader title="Eric Hoffman" subheader="September 14, 2016"/>*/}
                    <CardHeader title={this.props.owner} subheader={this.props.sendTime}/>
                    <CardContent style={{flexGrow:1,overflowY:'auto'}}>
                        {this.props.children}
                    </CardContent>
                    {/*<Divider />*/}
                    <CardContent>
                        <div className={classes.row}>
                            <div style={{paddingRight:'1rem'}}>{this.props.itemType === DataItemType.TASK?'负责人':'发送'}</div>
                            {
                                this.props.itemType === DataItemType.TASK?
                                    this.props.sendTo && this.props.sendTo.map( user => <TagButton key={user.name} color={user.status === DataItemStatus.DONE?'primary':'accent'} text={user.name} type={user.status === DataItemStatus.DONE?'done':'pending'} />):
                                    this.props.sendTo && this.props.sendTo.map( user => <TagButton key={user.name} color={'default'} text={user.name} />)
                            }
                        </div>
                        <div className={classes.row}>
                            <div style={{paddingRight:'1rem'}}>{this.props.itemType === DataItemType.TASK?'协办人':'抄送'}</div>
                            {
                                this.props.itemType === DataItemType.TASK?
                                    this.props.copyTo && this.props.copyTo.map( user => <TagButton key={user.name} color={user.status === DataItemStatus.DONE?'primary':'accent'} text={user.name} type={user.status === DataItemStatus.DONE?'done':'pending'} />):
                                    this.props.copyTo && this.props.copyTo.map( user => <TagButton key={user.name} color={'default'} text={user.name} />)
                            }
                        </div>
                    </CardContent>
                    <CardActions>
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
                        <div className={classes.flex}/>
                        <TagButton color={'default'} text={"发起任务"} type={'pending'} />
                    </CardActions>
                    <Divider />
                </Card>
            </div>
        )
    }
}

projectActivityPrimaryView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(primaryViewStyle)(projectActivityPrimaryView);