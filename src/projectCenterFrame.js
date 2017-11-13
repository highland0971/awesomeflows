import React, { Component } from 'react';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';
import Typography from 'material-ui/Typography';
import Radio, { RadioGroup } from 'material-ui/Radio';
import {FormControl, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import {red,blue,green,orange,blueGrey} from 'material-ui/colors'

import ProjectFunctionMenus from './projectFunctionMenus';
import ProjectList from './projectListFrame';
import ProjectTimeLine from './projectTimeline';
import TaskTrackChart from './taskTrackChart';
import TaskOverview from './taskOverview';
import OnlineContacts from './onlineContacts'
import ProjectActivityListFrame,{ActivityListItem,mockItems} from './projectActivityListFrame';
import ProjectShareCenter from './view/project/projectShareCenter';
import ProjectGantt from './view/project/projectGanttChart';

import {mailData} from './model/mailEngine';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        boxSizing:'border-box',
        zIndex: 1,
        backgroundColor:blueGrey[500],
    },
    drawerPaper: {
        position: 'absolute',
        height: '100%',
        left:56,
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        width: 0,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    drawerInner: {
        // Make the items inside not wrap when transitioning:
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
    },
    content: {
        width: '100%',
        height:'100%',
        boxSizing:'border-box',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default
    },
    selectCtrl: {
        display: 'flex',
        justifyContent:'center',
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
})

const viewName = {
    dashboard:'dashboard',
    search:'search',
    gannti:'gannti',
    share:'share',
};

class projectCenterFrame extends Component {

    state = {
        statusFilter: null,
        typeFilter: null,
        focusedItemIndex:0,
        anchorEl: undefined,
        floatMenuOpen: false,
        drawOpen:false,
        searchType:'all',
        isContextSearch:false,
        mailList: mailData.getDataNode(),
        focusedProject:'',
        projectList:[],
        currentView:viewName.dashboard,

    };

    projectObjects = {};

    refreshProjectList(){
        let projectList = new Array();
        Object.defineProperties(this.projectObjects, {
            "1":{value:"陕甘南雪莲花项目",enumerable:true},
            "2":{value:"南非野生动物保护项目",enumerable:true},
            "3":{value:"洪湖里拆迁改造项目",enumerable:true},
            "4":{value:"克丝菲尔专利纠纷案",enumerable:true},
        });

        for(let key in this.projectObjects){
            projectList.push({key:key,value:this.projectObjects[key]})
        }
        this.setState({
            projectList:projectList,
        });
    }

    handleFilterChange = (typeFilter,statusFilter)=>{
        this.setState({
            statusFilter:statusFilter,
            typeFilter:typeFilter
        });
    }

    handleActiveItemChange = (event, item) => {
        this.setState({focusedItemIndex:item});
    }

    handleDrawerOpen = () => {
        this.setState({ drawOpen: true });
    };

    handleDrawerToggle = () =>{
        this.setState({ drawOpen: !this.state.drawOpen });
    }

    getDrawerStatus = () =>{
        return this.state.drawOpen;
    }

    handleProjectChange(projectId){
        this.setState({focusedProject:this.projectObjects[projectId]});
    }

    handleViewChange = (viewName)=>{
        this.setState({currentView:viewName})
    }

    handleSearchTypeChange= (event,value) =>{
        this.setState({searchType:value})
    }

    render()
    {
        const classes = this.props.classes;

        return(

            <div className={classes.root}>
                <ProjectFunctionMenus
                    focusedView = {this.state.currentView}
                    onFilterChange={this.handleFilterChange}
                    onToggle = {this.handleDrawerToggle}
                    onOpenDrawer = {this.handleDrawerOpen}
                    isDrawerOpen = {this.getDrawerStatus}
                    projectTitle = {this.state.focusedProject}
                    onProjectRefreshRequest = {() => this.refreshProjectList()}
                    onViewChange={this.handleViewChange}

                />
                <Drawer type="permanent" open={this.state.drawOpen}
                        classes={{
                            paper: classNames(classes.drawerPaper, !this.state.drawOpen && classes.drawerPaperClose),
                        }}>
                    <ProjectList onProjectChange = {(projectId) => {this.handleProjectChange(projectId);this.handleDrawerToggle()}} projects={this.state.projectList}/>
                </Drawer>
                {
                    this.state.currentView === viewName.dashboard &&
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={{overflowY:'auto'}}>
                            <ProjectTimeLine />
                        </Grid>
                        <Grid item hidden={{smDown: true}} md={6} lg={6} xl={6} style={{display:'flex', flexDirection:'column'}}>
                            <Paper elevation={4} style={{flex:'0 1 50%',margin:'5px',overflowY:'hidden'}}>
                                <TaskOverview />
                            </Paper>
                            <Paper elevation={4} style={{flex:'0 1 50%',margin:'5px'}}>
                                <TaskTrackChart/>
                            </Paper>

                        </Grid>
                        <Grid item hidden={{smDown: true}} md={2} lg={2} xl={2} style={{display:'flex'}}>
                            <Paper elevation={4}>
                                <OnlineContacts chat={this.props.chat}/>
                            </Paper>
                        </Grid>
                    </Grid>
                }
                {
                    this.state.currentView === viewName.search &&
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={10} lg={10} xl={10} style={{flex:1,display:'flex',flexDirection:'column'}}>
                            <Paper style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',paddingTop:24,margin:4}}>
                                {/*<Typography type={'title'}>{this.state.focusedProject}</Typography>*/}
                                <Input placeholder={"搜索 "+this.state.focusedProject+" 项目内容🔍"} type="search" autoFocus={true} style={{width:'60%'}}/>
                                <div className={classes.selectCtrl}>
                                    <FormControl component="fieldset" required  >
                                        <RadioGroup aria-label="searchType" name="searchType" className={classes.group}
                                                    value={this.state.searchType} onChange={this.handleSearchTypeChange} style={{display:'flex',flexDirection:'row',margin:0}}
                                        >
                                            <FormControlLabel value="all" control={<Radio />} label="所有类型" />
                                            <FormControlLabel value="task" control={<Radio />} label="任务" />
                                            <FormControlLabel value="mail" control={<Radio />} label="邮件" />
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControlLabel control={
                                        <Switch checked={this.state.isContextSearch} onChange={(event, checked) => this.setState({ isContextSearch: checked })}/>}
                                                      label="搜索正文"
                                    />
                                </div>
                            </Paper>
                            <ProjectActivityListFrame statusFilter = {this.state.statusFilter} typeFilter={this.state.typeFilter}>
                                {
                                    this.state.mailList.map((item) =>
                                        <ActivityListItem itemType={item.itemType} status = {item.status} author={item.author}
                                                          title={item.title} datetime={item.datetime} key={item.item.toString()}
                                                          onClick = {e =>this.handleActiveItemChange(e,item.item)}
                                        />
                                    )
                                }
                            </ProjectActivityListFrame>
                        </Grid>
                        <Grid item hidden={{smDown: true}} md={2} lg={2} xl={2} style={{display:'flex'}}>
                            <Paper elevation={4}>
                                <OnlineContacts chat={this.props.chat}/>
                            </Paper>
                        </Grid>
                    </Grid>

                }
                {
                    this.state.currentView === viewName.share &&
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={10} lg={10} xl={10} style={{flex:1,display:'flex',flexDirection:'column'}}>
                            <ProjectShareCenter style={{flex:1}}/>
                        </Grid>
                        <Grid item hidden={{smDown: true}} md={2} lg={2} xl={2} style={{display:'flex'}}>
                            <Paper elevation={4}>
                                <OnlineContacts chat={this.props.chat}/>
                            </Paper>
                        </Grid>
                    </Grid>
                }
                {
                    this.state.currentView === viewName.gannti && <ProjectGantt/>
                }
            </div>
        )
    }
}

export default withStyles(styles)(projectCenterFrame);
