import React from 'react';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import { LinearProgress } from 'material-ui/Progress';
import {red,blue,green,orange,blueGrey} from 'material-ui/colors'

import UnreadMailIcon from 'material-ui-icons/Mail';
import AssignmentIcon from 'material-ui-icons/Assignment';
import ShareIcon from 'material-ui-icons/Share';


const styles = theme => ({
    listItemBoldText:{
        fontWeight:'bold',
        overflow:'hidden'
    },
    listItemText:{
        overflow:'hidden'
    }
});

export function MailListItemIcon(props){

    let color = props.status === 'new'?'balck':'gray';
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

class MailListItem extends React.Component{

    // SmartProgress(props){
    //     switch (props.itemType) {
    //         case 'task':{
    //             switch (props.status) {
    //                 case 'complete':
    //                     return(<LinearProgress mode="determinate" value={100}  />);
    //                 case 'delayed':
    //                     return(<LinearProgress mode="determinate" value={Math.random()*100} style ={{backgroundColor:'red' }}/>);
    //                 case 'rejected':
    //                     return(<LinearProgress mode="determinate" value={0} style ={{backgroundColor:'grey'}}/>);
    //                 default:
    //                     return(<LinearProgress mode="determinate" value={Math.random()*100} />);
    //             }
    //         }
    //         default:{
    //             return null;
    //         }
    //     }
    // }

    render(){
        const classes = this.props.classes;
        return(
            <div>
                <ListItem button divider onClick={this.props.onClick}
                          style={{
                              borderLeftStyle:this.props.itemType=='task'?'solid':'none',
                              borderLeftWidth:'4px',
                              borderLeftColor:
                                  this.props.status=='delayed' || this.props.status=='rejected'?red[500]:
                                      this.props.status=='complete'?blueGrey[300]:
                                          this.props.status=='new'?orange[500]:blue[500],
                          }}
                >
                    <MailListItemIcon itemType={this.props.itemType} status={this.props.status} style = {{flex:'0 0 auto',color:'red'}}/>
                    <ListItemText
                                  primary={this.props.author}
                                  secondary={this.props.title}
                                  style = {{flex:'1 0 auto'}}
                                  classes = {{textDense: this.props.status === 'new'?this.props.classes.listItemBoldText:this.props.classes.listItemText}}
                    />
                    <ListItemText secondary={this.props.datetime} primary={this.props.datetime} style = {{flex:'0 0 auto'}}
                                  classes = {{textDense: this.props.status === 'new'?this.props.classes.listItemBoldText:this.props.classes.listItemText}}
                    />
                </ListItem>
            </div>


        )
    }
}

export default withStyles(styles)(MailListItem);