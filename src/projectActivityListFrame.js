import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List,{ ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import {red,blue,green,orange,blueGrey} from 'material-ui/colors'
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Paper from 'material-ui/Paper';

import UnreadMailIcon from 'material-ui-icons/Mail';
import AssignmentIcon from 'material-ui-icons/Assignment';
import ShareIcon from 'material-ui-icons/Share';

import ProjectActivityView from './projectActivityView';
import ProjectActivitySubView from './projectActivitySubView';
import {DataItemType,DataItemStatus} from './model/mailEngine';
import {TagButton} from './view/commonComponent';



const activityItemStyle = theme => ({
    listItemBoldText:{
        fontWeight:'bold',
        overflow:'hidden'
    },
    listItemText:{
        overflow:'hidden'
    },
    root:{
        // borderLeftStyle:props.itemType === 'task'?'solid':'none',
        // borderLeftWidth:'4px',
        // borderLeftColor:
        //     props.status ==='delayed' || props.status === 'rejected'?red[500]:
        //         props.status ==='complete'?blueGrey[300]:
        //             props.status ==='new'?orange[500]:blue[500],
        display:'flex',
        position:'sticky',
        top:0,
        zIndex:100
    }
});

export function ActivityItemIcon(props){

    // let color = props.status === 'new'?'balck':'gray';
    let color = 'gray';
    switch (props.itemType) {
        case 'task':
            return(<AssignmentIcon style={{color:color}}/>);
        case 'share':
            return(<ShareIcon style={{color:color}}/>);
        case 'discuss':
            return(<UnreadMailIcon style={{color:color}}/>);
        default:{
            return(<UnreadMailIcon style={{color:color}}/>);
        }
    }
}

class _ActivityListItem extends Component{

    constructor(props){
        super(props);
        this.state={
            expanded:false,
        }
    }

    handleMainTopicToggle = ()=>{
        this.setState({expanded:!this.state.expanded});
    }

    render(){
        const classes = this.props.classes;
        const props = this.props;
        const sendToGroup=[
            {
                name:'尤雨溪',
                status:DataItemStatus.DONE,
                key:'尤雨溪',
            }
        ];
        const copyToGroup=[
            {
                name:'Remy Sharp',
                status:DataItemStatus.DELAYED,
                key:'Remy Sharp',
            },
            {
                name:'余国荔',
                status:DataItemStatus.DONE,
                key:'余国荔',
            }
        ]
        return(
            <div>
                <ListItem button divider onClick={this.handleMainTopicToggle}
                          style={{backgroundColor:this.state.expanded?blue[50]:'white',}}
                          className = {classes.root}
                >
                    <ActivityItemIcon itemType={props.itemType} status={props.status}/>
                    {
                        props.itemType === DataItemType.TASK ?
                            <ListItemText primary={<Typography>{props.title}</Typography>}
                                          secondary ={props.status === DataItemStatus.DONE?
                                              <TagButton text={'Closed'} color={'default'}/>:
                                              <TagButton text={'Open'} color={props.status === DataItemStatus.DELAYED?'accent':'primary'}/>}
                                          style = {{flex:'1 0 0'}}
                                          classes = {{textDense:classes.listItemText}}
                                          disableTypography = {true}
                            />
                            :
                            <ListItemText primary={props.title}
                                          style = {{flex:'1 0 0'}}
                                          classes = {{textDense:classes.listItemText}}
                            />
                    }

                    <ListItemText secondary={props.author} primary={props.datetime}
                                  classes = {{textDense:classes.listItemText}}
                                  style={{flex:'0 0 0'}}
                    />
                    {this.state.expanded ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                {this.state.expanded &&
                <div>
                    <ProjectActivityView owner={props.author} sendTime={props.datetime} sendTo={sendToGroup} copyTo={copyToGroup} itemType={ props.itemType}>
                        Values static The element is positioned according to the normal flow of the document.
                        The top, right, bottom, left, and z-index properties have no effect. This is the default value.relative
                        The element is positioned according to the normal flow of the document, and then offset relative
                        to itself based on the values of top, right, bottom, and left. The offset does not affect the position
                        of any other elements; thus, the space given for the element in the page layout is the same as
                        if position were static. This value creates a new stacking context when the value of z-index is not auto.
                    </ProjectActivityView>
                    <ProjectActivitySubView >
                        <p>
                            The constructor for a React component is called before it is mounted. When implementing the constructor for a React.Component subclass, you should call super(props) before any other statement. Otherwise, this.props will be undefined in the constructor, which can lead to bugs.
                            The constructor is the right place to initialize state. If you don’t initialize state and you don’t bind methods, you don’t need to implement a constructor for your React component.
                            It’s okay to initialize state based on props. This effectively “forks” the props and sets the state with the initial props. Here’s an example of a valid React.Component subclass constructor:
                        </p>
                    </ProjectActivitySubView>
                    <ProjectActivitySubView >
                        <p>
                            Hadoop Key Management Server（KMS）是一个基于HadoopKeyProvider API编写的密钥管理服务器。他提供了一个client和一个server组件，client和server之间基于HTTP协议使用REST API通信。Client是一个KeyProvider的实现，使用KMS HTTP REST API与KMS交互。KMS和它的client有内置的安全机制，支持HTTP SPNEGO Kerberos认证和HTTPS安全传输。KMS是一个Java Web应用程序，运行在与Hadoop发行版绑定在一起的预先配置好的Tomcat服务器上。
                        </p>
                    </ProjectActivitySubView>
                </div>
                }
            </div>
        );
    }

}

export let ActivityListItem = withStyles(activityItemStyle)(_ActivityListItem);

const styleSheet = theme => ({
    root: {
        boxSizing:'border-box',
        // height:'100%',
        overflowY:'auto',
        flex:1,
        margin:4
    },
    listStyle:{
        overflowX:'hidden',
        height:'100%',
        boxSizing:'border-box',
    }
});

class projectActivityListFrame extends Component {

    itemFilter = (item) =>{
        let filterRest = true;
        if(filterRest && this.props.typeFilter)
            filterRest = this.props.typeFilter.indexOf(item.props.itemType)>=0;
        return filterRest;
    }

    componentWillMount(){
        console.log('projectActivityListFrame request mount!');
    }

    render() {
        const classes = this.props.classes;
        console.log(this.props.children);
        let qualifiedChild = this.props.children.filter(this.itemFilter);
        return (
            <Paper className={classes.root} >
                <List dense = {true} className={classes.listStyle} >
                    {qualifiedChild}
                </List>
            </Paper>
        );
    }
}

export default withStyles(styleSheet)(projectActivityListFrame);