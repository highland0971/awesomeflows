import React,{ Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import {red} from 'material-ui/colors';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import List, {
    ListItem,
    ListItemIcon,
    ListItemText,
} from 'material-ui/List';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import FaceIcon from 'material-ui-icons/Face';
import AttachmentIcon from 'material-ui-icons/Attachment'
import AssignmentIcon from 'material-ui-icons/Assignment';
import AssignmentCompleteIcon from 'material-ui-icons/AssignmentTurnedIn';
import CloseIcon from 'material-ui-icons/Close';
import ScheduleIcon from 'material-ui-icons/Schedule';
import DoneIcon from 'material-ui-icons/Done';


import {TagButton,InputComponent} from './commonComponent';


const style = theme =>({
    root:{
        flex:1,
        display:'flex',
        flexDirection:'column'
    },
    textFieldRoot: {
        padding: 0,
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    textFieldInput: {
        borderRadius: 4,
        background: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    customScroll:{
        '&::-webkit-scrollbar-trackPiece':{backgroundColor:'#fff'},
        '&::-webkit-scrollbar':{width:theme.spacing.unit},
        '&::-webkit-scrollbar-thumb':{
            backgroundColor:'#999',
            borderRadius:'5px'},
        overflowY:'scroll',
        flex:1,
        // padding:theme.spacing.unit *2,
    },
    horizontalFlow:{
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-start',
        marginTop:theme.spacing.unit,
        marginLeft:theme.spacing.unit *6.5,
    },
    horizontalTitle:{
        width:'6rem',
    },
    avatar: {
        margin: theme.spacing.unit,
    },
    chip: {
        marginRight: theme.spacing.unit*2,
    },
});

class ChatFrame extends Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    render(){

        const classes = this.props.classes;

        return(
            <div className={classes.root}>
                <AppBar position="static" color="default" >
                    <Toolbar className={classes.toolbar} >
                        <Typography type='title' color={"primary"} style={{flex:1}} >
                            {this.props.title}
                        </Typography>
                        <IconButton className={classes.button} >
                            <AssignmentIcon />
                        </IconButton>
                        <IconButton className={classes.button}>
                            <AssignmentCompleteIcon />
                        </IconButton>
                        <IconButton className={classes.button}>
                            <ScheduleIcon />
                        </IconButton>
                        <IconButton className={classes.button}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Paper className={classes.customScroll}>
                    <Card >
                        <CardContent >
                            <div style={{display:'flex',flexDirection:'row'}}>
                                <Avatar src="https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=d49c7e60ee1190ef15f69a8daf72f673/4afbfbedab64034f29596c8ba6c379310b551da2.jpg" style={{marginRight:12}}/>
                                <div>
                                    <div style={{display:'flex',flexDirection:'row',marginBottom:6}}>
                                        <Typography type={"button"} style={{marginRight:12}}>AndrewLi</Typography>
                                        <Typography type={"caption"}>6:44 AM</Typography>
                                    </div>
                                    <Typography component="p" style={{
                                        flex:1,
                                        borderRadius: 4,
                                        border: '1px solid #ced4da',
                                        padding:12
                                    }}>
                                        在基准确定之前，变更无需正式受控于实施整体变更控制过程。一旦确定了项目基准，就必须通
                                        过本过程来处理变更请求。依照常规，每个项目的配置管理计划应规定哪些项目工件受控于配置控
                                        制程序。对配置要素的任何变更都应该提出变更请求，并经过正式控制。
                                        尽管也可以口头提出，但所有变更请求都必须以书面形式记录，并纳入变更管理和（或）配置管
                                        理系统中。在批准变更之前，可能需要了解变更对进度的影响和对成本的影响。在变更请求可能影
                                        响任一项目基准的情况下，都需要开展正式的整体变更控制过程。每项记录在案的变更请求都必须
                                        由一位责任人批准、推迟或否决，这个责任人通常是项目发起人或项目经理。应该在项目管理计划
                                        或组织程序中指定这位责任人，必要时，应该由变更控制委员会（CCB）来开展实施整体变更控制
                                        过程。CCB 是一个正式组成的团体，负责审查、评价、批准、推迟或否决项目变更，以及记录和传
                                        达变更处理决定。
                                    </Typography>
                                </div>
                            </div>
                            <div className={classes.horizontalFlow}>
                                <TagButton color={'accent'} text={"归属项目"} className={classes.horizontalTitle}/>
                                <Typography component="p" style={{
                                    flex:1,
                                    borderRadius: 4,
                                    border: '1px solid #ced4da',
                                    padding:12
                                }}>软件协同体系改革项目</Typography>
                            </div>
                            <div className={classes.horizontalFlow}>
                                <TagButton color={'accent'} text={"分类标签"} className={classes.horizontalTitle}/>
                                {/*<TagButton color={'primary'} text={<Typography className={classes.horizontalTitle} type={'body2'}>负责人</Typography>} />*/}
                                <div component="p" style={{
                                    flex:1,
                                    borderRadius: 4,
                                    border: '1px solid #ced4da',
                                    padding:12,
                                    display:'flex',
                                    flexDirection:'row'
                                }}>
                                    <Chip label="标准规范" className={classes.chip}/>
                                </div>
                            </div>
                            <div className={classes.horizontalFlow}>
                                <TagButton color={'accent'} text={"负责人"} className={classes.horizontalTitle}/>
                                {/*<TagButton color={'primary'} text={<Typography className={classes.horizontalTitle} type={'body2'}>负责人</Typography>} />*/}
                                <div component="p" style={{
                                    flex:1,
                                    borderRadius: 4,
                                    border: '1px solid #ced4da',
                                    padding:12,
                                    display:'flex',
                                    flexDirection:'row'
                                }}>
                                    <Chip
                                        avatar={<Avatar src="https://material-ui-next.com/static/images/remy.jpg" />}
                                        label="黄四海" className={classes.chip}
                                    />
                                </div>
                            </div>
                            <div className={classes.horizontalFlow}>
                                <TagButton color={'accent'} text={"承办人"} className={classes.horizontalTitle}/>
                                <div component="p" style={{
                                    flex:1,
                                    borderRadius: 4,
                                    border: '1px solid #ced4da',
                                    padding:12,
                                    display:'flex',
                                    flexDirection:'row'
                                }}>
                                    <Chip
                                        avatar={<Avatar src="https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=d49c7e60ee1190ef15f69a8daf72f673/4afbfbedab64034f29596c8ba6c379310b551da2.jpg" />}
                                        label="AndrewLi" className={classes.chip}
                                    />
                                    <Chip
                                        avatar={<Avatar >J</Avatar>}
                                        label="joy.goodsoft@icbc.com.cn" className={classes.chip}
                                    />
                                    <Chip
                                        avatar={<Avatar src="https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=11b49d24f4039245b5b8e95de6fdcfa7/54fbb2fb43166d229d307e7d4e2309f79152d290.jpg" />}
                                        label="刘芳" className={classes.chip}
                                        onRequestDelete={()=>{console.log('me')}}
                                        deleteIcon={<DoneIcon />}
                                    />
                                </div>

                            </div>
                            <div className={classes.horizontalFlow}>
                                <TagButton color={'accent'} text={"截至时间"} className={classes.horizontalTitle}/>
                                <Typography component="p" style={{
                                    flex:1,
                                    borderRadius: 4,
                                    border: '1px solid #ced4da',
                                    padding:12
                                }}>2017年11月12日</Typography>
                            </div>
                            <div className={classes.horizontalFlow}>
                                <TagButton color={'accent'} text={"附件"} className={classes.horizontalTitle}/>
                                {/*<TagButton color={'primary'} text={<Typography className={classes.horizontalTitle} type={'body2'}>附件</Typography>} />*/}
                                <div  style={{
                                    flex:1,
                                    borderRadius: 4,
                                    border: '1px solid #ced4da',
                                    padding:12
                                }}><div>UI基本要求.docx</div></div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent  style={{display:'flex',flexDirection:'row'}}>
                            <Avatar src="https://material-ui-next.com/static/images/remy.jpg" style={{marginRight:12}}/>
                            <div>
                                <div style={{display:'flex',flexDirection:'row',marginBottom:6}}>
                                    <Typography type={"button"} style={{marginRight:12}}>黄四海</Typography>
                                    <Typography type={"caption"}>6:44 AM</Typography>
                                </div>
                                <Typography component="p" style={{
                                    flex:1,
                                    borderRadius: 4,
                                    border: '1px solid #ced4da',
                                    padding:12
                                }}>
                                    在基准确定之前，变更无需正式受控于实施整体变更控制过程。一旦确定了项目基准，就必须通
                                    过本过程来处理变更请求。依照常规，每个项目的配置管理计划应规定哪些项目工件受控于配置控
                                    制程序。对配置要素的任何变更都应该提出变更请求，并经过正式控制。
                                    尽管也可以口头提出，但所有变更请求都必须以书面形式记录，并纳入变更管理和（或）配置管.
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent  style={{display:'flex',flexDirection:'row'}}>
                            <Avatar src="https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=d49c7e60ee1190ef15f69a8daf72f673/4afbfbedab64034f29596c8ba6c379310b551da2.jpg" style={{marginRight:12}}/>
                            <div>
                                <div style={{display:'flex',flexDirection:'row',marginBottom:6}}>
                                    <Typography type={"button"} style={{marginRight:12}}>AndrewLi</Typography>
                                    <Typography type={"caption"}>6:44 AM</Typography>
                                </div>
                                <Typography component="p" style={{
                                    flex:1,
                                    borderRadius: 4,
                                    border: '1px solid #ced4da',
                                    padding:12
                                }}>
                                    在基准确定之录好的！
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                    <InputComponent controls={[
                        <IconButton>
                            <FaceIcon />
                        </IconButton>,
                        <IconButton>
                            <AttachmentIcon />
                        </IconButton>
                    ]}/>
                </Paper>

            </div>
        )
    }
}

export default withStyles(style)(ChatFrame);