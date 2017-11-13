import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, {
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';

import Switch from 'material-ui/Switch';
import AssignmentInActionIcon from 'material-ui-icons/AssignmentInd';
import AssignmentIcon from 'material-ui-icons/Assignment';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import SendIcon from 'material-ui-icons/Send';
import RecycleIcon from 'material-ui-icons/Delete';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

import MenuIcon from 'material-ui-icons/Menu';

const styleSheet =  theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        background: theme.palette.background.paper,
        paddingLeft:0,
        height:'100%'
    },
    focusedItemIndex:{
        textDecoration:'none',
        backgroundColor:'rgba(0, 0, 0, 0.12)'
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

const sectionName = {
    inbox:'inbox',
    outbox:'outbox',
    todo:'todo',
    assignment:'assignment',
    recycle:'recycle',
    nil:'nil'
};

class mainFunctionMenus extends Component {

    state = {
        checked:{
            inbox:[],
            outbox:[],
            todo:[],
            assignment:['new','rejected','complete','delayed','inaction']
        },
        focused:'todo',
        drawOpened:false,
    };

    typeFilter = null;
    statusFilter = {
        inbox:null,
        outbox:null,
        todo:null,
        assignment:null,
        recycle:null,
    };

    handleToggle = (event,group,filter) => {

        const currentIndex = this.state.checked[group].indexOf(filter);
        const newChecked = [...this.state.checked[group]];
        const orgChecked = this.state.checked;

        if (currentIndex === -1) {
            newChecked.push(filter);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        orgChecked[group] = newChecked;
        this.setState({
            checked: orgChecked,
        });

        console.debug("newChecked.indexOf('hideReaded') " + newChecked.indexOf('hideReaded'));
        console.debug("newChecked.indexOf('hideTodo') " + newChecked.indexOf('hideTodo'));

        switch(group){
            case sectionName.inbox:{
                if(newChecked.indexOf('hideReaded') >=0 )
                {
                    this.statusFilter[group] = ['new',];
                    console.debug(this.statusFilter[group]);
                }
                else
                    this.statusFilter[group] = null;
                if(newChecked.indexOf('hideTodo')>=0)
                {
                    this.typeFilter = ['discuss','share','mail'];
                    console.debug(this.typeFilter);
                }
                else
                    this.typeFilter = null;
                break;
            }
            case sectionName.todo:{
                this.statusFilter[group] = ['new','rejected','delayed','inaction'];
                // this.statusFilter[group] = this.state.checked[group];
                break;
            }
            case sectionName.assignment:{
                this.statusFilter[group] = newChecked;
                break;
            }
        }
        console.debug(newChecked);
        this.props.onFilterChange(this.typeFilter,this.statusFilter[group]);
    };

    handleFocus = (event,group) =>{
        //用于标注当前属于激活-展开状态的菜单项，在组件style中根据状态不同进行不同的渲染
        console.log(group);
        this.setState({focused:group,});
        switch(group){
            case sectionName.todo:{
                this.typeFilter = ['task',];
                this.statusFilter[group] = null;
            }
            case sectionName.assignment:{
                this.typeFilter = ['task',];
                console.debug(this.statusFilter[group]);
                break;
            }
            case sectionName.inbox:{
                this.handleToggle(null,group,null);
                break;
            }
            case sectionName.outbox:{
                this.handleToggle(null,group,null);
                break;
            }
            case sectionName.recycle:
            default:
                this.typeFilter = null;
        };
        this.props.onFilterChange && this.props.onFilterChange(this.typeFilter,this.statusFilter[group]);
        this.props.onOpenDrawer && this.props.onOpenDrawer();
    };

    render() {
        const classes = this.props.classes;

        return (
            <div className={classes.root}>
                <List dense subheader = {
                    <ListItem button onClick = {event =>{
                        this.props.onToggle && this.props.onToggle();
                        //this.setState({focused : sectionName.nil});
                    }}>
                        <ListItemIcon>
                            <MenuIcon />
                        </ListItemIcon>
                    </ListItem>
                } >
                    <ListItem button onClick={event=>this.handleFocus(event,sectionName.inbox)} className={this.state.focused == sectionName.inbox ?classes.focusedItemIndex:null}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="收件箱" />
                        {this.state.focused == sectionName.inbox ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in = {this.state.focused == sectionName.inbox && this.props.isDrawerOpen && this.props.isDrawerOpen() } transitionDuration="auto" unmountOnExit>
                        <ListItem className={classes.nested} >
                            <ListItemText primary="隐藏待办" />
                            <ListItemSecondaryAction>
                                <Switch
                                    onClick={event => this.handleToggle(event,sectionName.inbox , 'hideTodo')}
                                    checked={this.state.checked[sectionName.inbox].indexOf('hideTodo') !== -1}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.nested}>
                            <ListItemText primary="隐藏已读" />
                            <ListItemSecondaryAction>
                                <Switch
                                    onClick={event => this.handleToggle(event,sectionName.inbox,'hideReaded')}
                                    checked={this.state.checked[sectionName.inbox].indexOf('hideReaded') !== -1}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Collapse>
                    <ListItem button onClick={event=>this.handleFocus(event,sectionName.outbox)} className={this.state.focused == sectionName.outbox? classes.focusedItemIndex:null}>
                        <ListItemIcon>
                            <SendIcon />
                        </ListItemIcon>
                        <ListItemText primary="发件箱" />
                        {this.state.focused == sectionName.outbox ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in = {this.state.focused == sectionName.outbox && this.props.isDrawerOpen && this.props.isDrawerOpen()} transitionDuration="auto" unmountOnExit>
                        <ListItem className={classes.nested} >
                            <ListItemText primary="隐藏交办" />
                            <ListItemSecondaryAction>
                                <Switch
                                    onClick={event => this.handleToggle(event, sectionName.outbox,'hideAssignment')}
                                    checked={this.state.checked[sectionName.outbox].indexOf('hideAssignment') !== -1}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Collapse>
                    <ListItem button onClick={event=>this.handleFocus(event,sectionName.recycle)} className={this.state.focused == sectionName.recycle? classes.focusedItemIndex:null} >
                        <ListItemIcon>
                            <RecycleIcon />
                        </ListItemIcon>
                        <ListItemText primary="回收站" />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={event=>this.handleFocus(event,sectionName.todo)} className={this.state.focused == sectionName.todo? classes.focusedItemIndex:null}>
                        <ListItemIcon>
                            <AssignmentInActionIcon />
                        </ListItemIcon>
                        <ListItemText primary="我的待办" />
                        {this.state.focused == sectionName.todo ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in = {this.state.focused == sectionName.todo && this.props.isDrawerOpen && this.props.isDrawerOpen()} transitionDuration="auto" unmountOnExit >
                        <ListItem className={classes.nested}>
                            <ListItemText primary="对我重要" />
                            <ListItemSecondaryAction >
                                <Switch
                                    onClick={event => this.handleToggle(event,sectionName.todo, 'importantForMe')}
                                    checked={this.state.checked[sectionName.todo].indexOf('importantForMe') !== -1}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.nested}>
                            <ListItemText primary="对他人重要" />
                            <ListItemSecondaryAction>
                                <Switch
                                    onClick={event => this.handleToggle(event,sectionName.todo, 'importantForAssigner')}
                                    checked={this.state.checked[sectionName.todo].indexOf('importantForAssigner') !== -1}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.nested}>
                            <ListItemText primary="其它" />
                            <ListItemSecondaryAction>
                                <Switch
                                    onClick={event => this.handleToggle(event,sectionName.todo, 'notImportant')}
                                    checked={this.state.checked[sectionName.todo].indexOf('notImportant') !== -1}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Collapse>
                    <ListItem button onClick={event=>this.handleFocus(event,sectionName.assignment)} className={this.state.focused == sectionName.assignment? classes.focusedItemIndex:null}>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="我的交办" />
                        {this.state.focused == sectionName.assignment ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in= {this.state.focused == sectionName.assignment && this.props.isDrawerOpen && this.props.isDrawerOpen()} transitionDuration="auto" unmountOnExit>
                        <ListItem className={classes.nested}>
                            <ListItemText primary="待确认" />
                            <ListItemSecondaryAction>
                                <Switch
                                    onClick={event => this.handleToggle(event,sectionName.assignment, 'new')}
                                    checked={this.state.checked[sectionName.assignment].indexOf('new') !== -1}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.nested}>
                            <ListItemText primary="进行中" />
                            <ListItemSecondaryAction>
                                <Switch
                                    onClick={event => this.handleToggle(event, sectionName.assignment,'inaction')}
                                    checked={this.state.checked[sectionName.assignment].indexOf('inaction') !== -1}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.nested}>
                            <ListItemText primary="已完成" />
                            <ListItemSecondaryAction>
                                <Switch
                                    onClick={event => this.handleToggle(event,sectionName.assignment, 'complete')}
                                    checked={this.state.checked[sectionName.assignment].indexOf('complete') !== -1}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.nested}>
                            <ListItemText primary="已逾期" />
                            <ListItemSecondaryAction>
                                <Switch
                                    onClick={event => this.handleToggle(event,sectionName.assignment, 'delayed')}
                                    checked={this.state.checked[sectionName.assignment].indexOf('delayed') !== -1}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem className={classes.nested}>
                            <ListItemText primary="已拒绝" />
                            <ListItemSecondaryAction>
                                <Switch
                                    onClick={event => this.handleToggle(event,sectionName.assignment, 'rejected')}
                                    checked={this.state.checked[sectionName.assignment].indexOf('rejected') !== -1}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Collapse>
                </List>

            </div>
        );
    }
}

mainFunctionMenus.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(mainFunctionMenus);
