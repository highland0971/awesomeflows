import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import List, {
    ListItem,
    ListItemIcon,
    ListItemText,
} from 'material-ui/List';

import Input,{InputAdornment}from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';

import FaceIcon from 'material-ui-icons/Face';
import AssignmentIcon from 'material-ui-icons/Assignment';
import AttachmentIcon from 'material-ui-icons/Attachment';
import DoneIcon from 'material-ui-icons/Done';
import ScheduleIcon from 'material-ui-icons/Schedule';
import RequestIcon from 'material-ui-icons/PanTool';



const chatInputStyle = theme =>({
    base: {
        // margin:9,

    },
    textFieldRoot: {
        paddingTop:theme.spacing.unit/2,
        paddingBottom:theme.spacing.unit/2,
        paddingLeft:theme.spacing.unit,
        paddingRight:theme.spacing.unit*2,
        display:'flex',
        alignItems:'center',
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    textFieldInput: {
        borderRadius: 4,
        background: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        flex:1,
        // width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
});

class _commonInputComponent extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {classes} = this.props;
        return (
            <Input
                placeholder="我想说..."
                disableUnderline={true}
                // className = {classes.root}
                classes = {{
                    root: classes.textFieldRoot,
                    input: classes.textFieldInput,
                }}
                endAdornment={<InputAdornment position="end">
                    {this.props.controls}
                </InputAdornment>}
            />
        );
    }
}

export let InputComponent = withStyles(chatInputStyle)(_commonInputComponent);

class _chatInputComponent extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {classes} = this.props;
        return (
            <Input
                placeholder="我想说..."
                disableUnderline={true}
                // className = {classes.root}
                classes = {{
                    root: classes.textFieldRoot,
                    input: classes.textFieldInput,
                }}
                endAdornment={<InputAdornment position="end">
                    <IconButton>
                        <FaceIcon />
                    </IconButton>
                    <IconButton>
                        <AttachmentIcon />
                    </IconButton>
                    <IconButton>
                        <AssignmentIcon />
                    </IconButton>
                </InputAdornment>}
            />
        );
    }
}

export let ChatInputComponent = withStyles(chatInputStyle)(_chatInputComponent);

const contentListStyle = theme =>({
    root:{
        // borderRadius:2,
        // marginTop: theme.spacing.unit,
        // marginBottom: theme.spacing.unit,
        // marginLeft:theme.spacing.unit*2,
        // marginRight:theme.spacing.unit*2,
        // boxShadow:'0px 1px 5px 0px rgba(0, 0, 0, 0.2),' +
        // '0px 2px 2px 0px rgba(0, 0, 0, 0.14), ' +
        // '0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
    },
});

class _contentListComponent extends Component{

    constructor(props){
        super(props);
        this.handleClick = props.onClick;
    }

    render(){
        const { classes } = this.props;
        console.log('ReRender trigered by _contentListComponent');
        return(
            <List >
                {
                    this.props.items && this.props.items.map(
                        entry => (

                            <ListItem button key={entry.id}
                                      onClick={() => {
                                          this.handleClick && this.handleClick(entry);
                                          // console.log(selection);
                                             }}
                                      classes = {{root:classes.root}}
                                      divider = {true}
                            >
                                <ListItemIcon>
                                    {entry.icon}
                                </ListItemIcon>
                                <ListItemText primary={entry.primary} secondary={entry.secondary}  />
                            </ListItem>)
                    )
                }
            </List>
        );
    }
}

export let ContentListComponent = withStyles(contentListStyle)(_contentListComponent);


const sideFunctionMenuStyle =  theme => ({
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

class _sideFunctionMenus extends Component {

    constructor(props){
        super(props);
        this.menuConfig = props.menuConfig;
        this.handleClose = props.onClose;
        this.handleClick = props.onClick;

    }

    render() {
        const classes = this.props.classes;
        console.log('ReRender trigered by sideFunctionMenus');
        return (
            <div className={classes.root}>
                <List >
                    {
                        this.menuConfig && this.menuConfig.map(entry => ( <ListItem button key={entry.key}
                                                                 onClick={
                                                                     () => {
                                                                         this.handleClick && this.handleClick(entry);
                                                                         this.handleClose && this.handleClose();
                                                                     }
                                                                 }
                            >
                                <ListItemIcon>
                                    {entry.icon}
                                </ListItemIcon>
                                <ListItemText primary={entry.caption} />
                            </ListItem>)
                        )
                    }
                </List>
            </div>
        );
    }
}

_sideFunctionMenus.propTypes = {
    classes: PropTypes.object.isRequired,
};

export let SideFunctionMenu =  withStyles(sideFunctionMenuStyle)(_sideFunctionMenus);


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
});

function _TagButton (props) {
    const classes = props.classes;
    let Icon = <div/>;
    switch (props.type){
        case 'done':
            Icon = <DoneIcon className={classes.icon}/>;
            break;
        case 'pending':
            Icon = <ScheduleIcon className={classes.icon}/>;
            break;
        case 'request':
            Icon = <RequestIcon className={classes.icon}/>;
            break;
        default:
            break;
    }
    return(
        <Button raised color={props.color} className={classes.button}>
            {props.text}
            {Icon}
        </Button>
        )
}
export let TagButton = withStyles(tagButtonStyle)(_TagButton);

