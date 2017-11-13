import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';


const styleSheet = theme => ({
    root: {
        width: '100%',
        boxSizing:'border-box',
        // height:'100%',
        overflowY:'auto',
        flex:1,
    },
    listStyle:{
        overflowX:'hidden',
        height:'100%',
        boxSizing:'border-box',
    }
});


class mailListFrame extends Component {

    itemFilter = (item) =>{
        let filterRest = true;
        if(filterRest && this.props.statusFilter)
            filterRest = this.props.statusFilter.indexOf(item.props.status)>=0;
        if(filterRest && this.props.typeFilter)
            filterRest = this.props.typeFilter.indexOf(item.props.itemType)>=0;
        return filterRest;
    }

    render() {
        const classes = this.props.classes;
        let qualifiedChild = this.props.children.filter(this.itemFilter);
        return (
            <div className={classes.root} >
                <List dense = {true} className={classes.listStyle} >
                    {qualifiedChild}
                </List>
            </div>
        );
    }
}

export default withStyles(styleSheet)(mailListFrame);