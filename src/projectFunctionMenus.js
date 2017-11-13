import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, {
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

import GanntiIcon from 'material-ui-icons/Today';
import SearchIcon  from 'material-ui-icons/Search';
import ShareIcon from 'material-ui-icons/Share';
import DashboardIcon from 'material-ui-icons/Dashboard';
import ProjectIcon from 'material-ui-icons/Pages';
const styleSheet =  theme => ({
    root: {
        background: theme.palette.background.paper,
        paddingLeft:0,
        height:'100%',
        width:56,
        display:'flex',
        flexDirection:'column'
    },
    sideMenu:{
        width:56,
    },
    focusedItemIndex:{
        textDecoration:'none',
        backgroundColor:'rgba(0, 0, 0, 0.12)'
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    projectTitle:{
        padding:theme.spacing.unit * 2,
    }
});

const sectionName = {
    dashboard:'dashboard',
    search:'search',
    gannti:'gannti',
    share:'share',
};

class projectFunctionMenus extends Component {

    state = {
        checked:{
            inbox:[],
            outbox:[],
            todo:[],
            assignment:['new','rejected','complete','delayed','inaction']
        },
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
        // this.props.onOpenDrawer && this.props.onOpenDrawer();
    };

    render() {
        const classes = this.props.classes;

        return (
            <div className={classes.root}>
                <List className = {classes.sideMenu}>
                    <ListItem button onClick={()=>this.props.onViewChange(sectionName.dashboard)} className={this.props.focusedView == sectionName.dashboard ?classes.focusedItemIndex:null}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem button onClick={()=>this.props.onViewChange(sectionName.gannti)} className={this.props.focusedView == sectionName.gannti? classes.focusedItemIndex:null} >
                        <ListItemIcon>
                            <GanntiIcon />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem button onClick={()=>this.props.onViewChange(sectionName.search)} className={this.props.focusedView == sectionName.search? classes.focusedItemIndex:null}>
                        <ListItemIcon>
                            <SearchIcon />
                        </ListItemIcon>
                    </ListItem>

                    <ListItem button onClick={()=>this.props.onViewChange(sectionName.share)} className={this.props.focusedView == sectionName.share? classes.focusedItemIndex:null} >
                        <ListItemIcon>
                            <ShareIcon />
                        </ListItemIcon>
                    </ListItem>
                </List>
                <div style = {{flex:1}} />
                {this.props.isDrawerOpen() || this.props.projectTitle =="" ?
                    <IconButton color="primary" className={classes.button} aria-label="Select Project"
                                onClick = {event =>{
                                    this.props.onToggle && this.props.onToggle();
                                    this.props.onProjectRefreshRequest && this.props.onProjectRefreshRequest();
                                }}>
                        <ProjectIcon/>
                    </IconButton>:
                    <Button  raised  color="primary" className={classes.projectTitle} style={{minWidth:'auto'}}
                             onClick = {event =>{
                                 this.props.onToggle && this.props.onToggle();
                                 this.props.onProjectRefreshRequest && this.props.onProjectRefreshRequest();
                             }}>
                        {this.props.projectTitle}
                    </Button>
                }

            </div>
        );
    }
}

projectFunctionMenus.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(projectFunctionMenus);
