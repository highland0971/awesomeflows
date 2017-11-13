import React,{Component} from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import * as colors from 'material-ui/colors';

require('dhtmlx-scheduler/codebase/dhtmlxscheduler');
require('dhtmlx-scheduler/codebase/sources/locale/locale_cn');
require('dhtmlx-scheduler/codebase/dhtmlxscheduler.css');

import {getMyProjects,getProjectTasks} from '../../model/mailEngine';

const styles = theme => ({
    root: {
        overflow: 'hidden',
        flex:1,
        width:'100%',
        height:'100%',
        backgroundColor:colors.blueGrey[500],
    },
});

class Calendar extends Component{

    constructor(props){
        super(props);
        this.state = {
            checked: [],
            projects:getMyProjects(true),
        };
        this.syncState = {
            checked:[],
        }
    }

    static getProjectColor(project){
        const colorNames = ['amber','blue','blueGrey','brown','cyan','deepOrange','deepPurple','green','grey','indigo','lightBlue','lightGreen',
        'lime','orange','pink','purple','red','teal','yellow'];
        return colors[colorNames[project.key % colorNames.length]][500];
    }


    handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });

        if(this.syncState.checked.indexOf(value) >=0)
            this.syncState.checked.splice(this.syncState.checked.indexOf(value),1);
        else
            this.syncState.checked.push(value);

        this.mountEvent();

    };

    componentDidMount() {
        scheduler.init('scheduler_here', new Date(),"month");
        this.mountEvent();

    }

    mountEvent(){
        let willMountTasks = [];
        this.state.projects.filter(project => this.syncState.checked.indexOf(project.key) >=0).forEach(project =>{
            let color = Calendar.getProjectColor(project);
            getProjectTasks(project.value).forEach(task => {
                task.color = color;
                willMountTasks.push(task);
            })
        });

        scheduler.clearAll();
        scheduler.parse(willMountTasks, "json");
    }

    render(){
        const classes = this.props.classes;

        return(
            <Grid container spacing={0} className={classes.root}>
                <Grid item hidden={{smDown: true}} md={3} lg={3} xl={3} style={{display:'flex',flexDirection:'column'}}>
                    <Paper style={{flex:1,padding:12,margin:4}}>
                        <Typography type={'button'}>我的项目日历</Typography>
                        <List>
                            {this.state.projects.map(project => (
                                <ListItem key={project.key} dense button
                                    onClick={this.handleToggle(project.key)}
                                >
                                    <ListItemText primary={project.value} />
                                    <ListItemSecondaryAction>
                                        <Checkbox
                                            onClick={this.handleToggle(project.key)}
                                            checked={this.state.checked.indexOf(project.key) !== -1}
                                            style={{color:Calendar.getProjectColor(project)}}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9} xl={9} style={{display:'flex'}}>
                    <div id="scheduler_here" className="dhx_cal_container" style={{flex:1,margin:4}}>
                        <div className="dhx_cal_navline">
                            <div className="dhx_cal_prev_button">&nbsp;</div>
                            <div className="dhx_cal_next_button">&nbsp;</div>
                            <div className="dhx_cal_today_button"></div>
                            <div className="dhx_cal_date"></div>
                            <div className="dhx_cal_tab" name="day_tab" style={{right:204}}></div>
                            <div className="dhx_cal_tab" name="week_tab" style={{right:140}}></div>
                            <div className="dhx_cal_tab" name="month_tab" style={{right:76}}></div>
                        </div>
                        <div className="dhx_cal_header"></div>
                        <div className="dhx_cal_data"></div>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Calendar);