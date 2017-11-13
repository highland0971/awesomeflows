import React,{ Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import DoneIcon from 'material-ui-icons/Done';
import ScheduleIcon from 'material-ui-icons/Schedule';
import DefaultIcon from 'material-ui-icons/HelpOutline';
import RequestIcon from 'material-ui-icons/PanTool';

const tagButtonStyle = theme => ({
    button:{
        padding:'0 2px',
        minHeight:0,
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit/2,
    },
    icon:{
        height:12
    }
})

function _TagButton (props) {
    const classes = props.classes
    let Icon = <div/>
    switch (props.type){
        case 'done':
            Icon = <DoneIcon className={classes.icon}/>
            break;
        case 'pending':
            Icon = <ScheduleIcon className={classes.icon}/>
            break;
        case 'request':
            Icon = <RequestIcon className={classes.icon}/>
            break;
        default:
            Icon = Icon;
    }
    return(
        <Button raised color={props.color} className={classes.button}>
            {props.text}
            {Icon}
        </Button>
        )
}
export let TagButton = withStyles(tagButtonStyle)(_TagButton);

