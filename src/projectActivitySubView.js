import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

import Done from 'material-ui-icons/Done';
import ReplyIcon from 'material-ui-icons/Reply';
import ReplyAllIcon from 'material-ui-icons/ReplyAll';
import AssignmentIcon from 'material-ui-icons/Assignment';
import ShareIcon from 'material-ui-icons/Share';
import DeleteIcon from 'material-ui-icons/Delete';
import FullScreenIcon from 'material-ui-icons/Launch';
import ForwardIcon from 'material-ui-icons/Forward';
import {blue} from 'material-ui/colors';
import {TagButton} from './view/commonComponent';




const subViewStyle = theme =>({
    card: {
        flex:'1',
        display:'flex',
        flexDirection:'column',
        borderLeftColor:blue[700],
        borderLeftWidth:30,
        borderLeftStyle:'solid',
        boxSizing:'border-box'
    },
    row: {
        display: 'flex',
        justifyContent: 'start',
        flexWrap: 'wrap',
        alignItems:'center ',
        height:'100%',
    },
    root:{
        display:'flex',
        marginBottom:theme.spacing.unit,
        marginRight:theme.spacing.unit,
    },
    avatar: {
        margin: theme.spacing.unit,
    },
});

let projectActivitySubView = props =>
{
    const classes = props.classes;
    return(
        <div className={classes.root}>
            <Avatar alt={'anonymous'} src={'https://material-ui-next.com/static/images/remy.jpg'} className={classes.avatar} />
            <Card className={classes.card}>
                <CardHeader
                    title="Mark Twowen"
                    subheader="September 14, 2016"
                />
                <CardContent style={{flexGrow:1,overflowY:'auto'}}>
                    {props.children}
                </CardContent>
                <CardContent>
                    <div className={classes.row}>
                        <div style={{width:'3rem'}}>接收人</div>
                        <TagButton color={'default'} text={"Uncle Wang"} />
                    </div>
                    <div className={classes.row}>
                        <div style={{width:'3rem'}}>抄送</div>
                        <TagButton color={'default'} text={"Uncle Jack"} />
                        <TagButton color={'default'} text={"王艾莉"} />
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
                    <div style={{flex:1}}/>
                    <TagButton color={'accent'} text={"关闭请求"} type={'request'} />
                </CardActions>
                <Divider />
            </Card>
        </div>

    );

}

export default withStyles(subViewStyle)(projectActivitySubView);