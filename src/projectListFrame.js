import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List, {
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';

import Input, { InputLabel } from 'material-ui/Input';
import FormControl from 'material-ui/Form/FormControl';
import {getMyProjects} from './model/mailEngine';

const styleSheet = theme => ({
    root: {
        width: '100%',
        boxSizing:'border-box',
        height:'100%',
        overflowY:'auto'
    },
    listStyle:{
        overflowX:'hidden',
        height:'100%',
        boxSizing:'border-box',
    },
    formContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});


class projectListFrame extends Component {

    constructor(props){
        super(props);
        this.state = {projectList:getMyProjects()};
    }

    render() {
        const classes = this.props.classes;
        // let qualifiedChild = this.props.children.filter(this.itemFilter);

        return (
            <div className={classes.root} >
                <form className={classes.formContainer} noValidate autoComplete="off">
                    <FormControl className={classes.formControl} style={{flexGrow:1}}>
                        <InputLabel htmlFor="search-content">搜索内容</InputLabel>
                        <Input id="search-content" />
                    </FormControl>
                </form>
                <List dense = {true} className={classes.listStyle} >
                    {
                        this.props.projects.map(item =>
                            <ListItem button onClick={event=>this.props.onProjectChange && this.props.onProjectChange(item.key)}>
                                {/*<ListItemIcon>*/}
                                    {/*<SendIcon />*/}
                                {/*</ListItemIcon>*/}
                                <ListItemText primary={item.value} />
                            </ListItem>
                        )
                    }

                </List>
            </div>
        );
    }
}

export default withStyles(styleSheet)(projectListFrame);