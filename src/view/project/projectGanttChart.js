import React,{Component} from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import {blueGrey} from 'material-ui/colors'

require('dhtmlx-gantt/codebase/dhtmlxgantt');
require('dhtmlx-gantt/codebase/dhtmlxgantt.css');
require('dhtmlx-gantt/codebase/locale/locale_cn');

const styles = theme => ({
    root: {
        overflow: 'hidden',
        flex:1,
        width:'100%',
        height:'100%',
        backgroundColor:blueGrey[500],
        // padding:theme.spacing.unit/2
    },
});

class Gantt extends Component{

    constructor(props){
        super(props);
        this.state = {
        };
        this.syncState = {
        }
    }

    componentDidMount() {
        let tasks = {
            data:[
                {id:1, text:"Project #1",start_date:"01-04-2013", duration:11,
                    progress: 0.6, open: true},
                {id:2, text:"Task #1",   start_date:"03-04-2013", duration:5,
                    progress: 1,   open: true, parent:1},
                {id:3, text:"Task #2",   start_date:"02-04-2013", duration:7,
                    progress: 0.5, open: true, parent:1},
                {id:4, text:"Task #2.1", start_date:"03-04-2013", duration:2,
                    progress: 1,   open: true, parent:3},
                {id:5, text:"Task #2.2", start_date:"04-04-2013", duration:3,
                    progress: 0.8, open: true, parent:3},
                {id:6, text:"Task #2.3", start_date:"05-04-2013", duration:4,
                    progress: 0.2, open: true, parent:3}
            ],
            links:[
                {id:1, source:1, target:2, type:"1"},
                {id:2, source:1, target:3, type:"1"},
                {id:3, source:3, target:4, type:"1"},
                {id:4, source:4, target:5, type:"0"},
                {id:5, source:5, target:6, type:"0"}
            ]
        };
        gantt.init("gantt_here");
        gantt.parse (tasks);
    }

    render(){
        const classes = this.props.classes;

        return(
            <Paper id="gantt_here" className={classes.root}></Paper>
        )
    }
}

export default withStyles(styles)(Gantt);