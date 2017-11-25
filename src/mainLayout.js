import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Card, {  CardMedia } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import Input, { InputAdornment } from 'material-ui/Input';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';

import EmailIcon from 'material-ui-icons/Email';
import ExtensionIcon from 'material-ui-icons/Extension';
import ForumIcon from 'material-ui-icons/Forum';
import TrackChangesIcon from 'material-ui-icons/TrackChanges';
import PetsIcon from 'material-ui-icons/Pets';
import CloseIcon from 'material-ui-icons/Close';
import MenuIcon from 'material-ui-icons/Menu';
import DashBoardIcon from 'material-ui-icons/Dashboard';
import PeopleIcon from 'material-ui-icons/People';
import SearchIcon from 'material-ui-icons/Search';
import TaskIcon from 'material-ui-icons/Assessment';
import DocumentIcon from 'material-ui-icons/InsertDriveFile';
import WatchLaterIcon from 'material-ui-icons/WatchLater';
import LightBulbIcon from 'material-ui-icons/LightbulbOutline';
import DoneAllIcon from 'material-ui-icons/DoneAll';
import InboxIcon from 'material-ui-icons/Inbox';
import SendIcon from 'material-ui-icons/Send';
import DraftIcon from 'material-ui-icons/Drafts';

import {blue,blueGrey} from 'material-ui/colors';

import {SideFunctionMenu,ContentListComponent} from './view/commonComponent';
import MailComposerFrame from './mailComposerFrame';

const searchInputStyle = theme => ({

    textFieldInput: {
        borderRadius: 4,
        background: theme.palette.common.white,
        border: '1px solid #ced4da',
        padding: '2px 5px 0px 5px',
        alignItems:'center'
    },
});

let SearchInput = props => {
    const { classes } = props;

    return (
            <Input
                placeholder="搜索"
                disableUnderline={true}
                classes = {{
                    root: classes.textFieldInput,
                }}
                startAdornment={<InputAdornment position="start">
                    <SearchIcon color={'gray'}/>
                </InputAdornment>}
            />
    );
};

SearchInput = withStyles(searchInputStyle)(SearchInput);

function TabContainer(props) {
    return <div style={{ height: '100%',
        // paddingTop: 48,
        boxSizing:'border-box'
    }}>
        {props.children}
    </div>;
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const chatWindowStyles = theme => ({
    titleButton: {
        flex: 1,
    },
    toolbar:{
        background:blue[500],
        padding:'0px',
        minHeight:0,
    }
});

class ChatWindow extends React.Component{


    render(){
        const { classes } = this.props;

        let currentStyle = {
            position:'fixed',
            bottom:0,
            right:210,
            zIndex:1000,
            width:250,
            height:this.props.minimized?36:400,
            display:this.props.hidden?'none':'flex',
            flexDirection:'column'
        };

        return(
            <Paper style={currentStyle}>
                <Toolbar className={classes.toolbar}>
                    <Button color="contrast" className={classes.titleButton}
                            onClick={()=> {
                                this.props.onWindowStateChage(!this.props.minimized,this.props.hidden);
                            }}>
                        {this.props.contact}
                    </Button>
                    <IconButton color="contrast" aria-label="Close" style={{height:36}}
                                onClick={()=>{
                                    this.props.onWindowStateChage(this.props.minimized,true);
                                }}>
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
                <div style={{flex:1,display:this.props.minimized?'none':'block'}}>
                    hello
                </div>
                <div style={{borderTopColor:blueGrey[300],borderTopStyle:'solid',borderTopWidth:'2px'}}>
                    <Input autoFocus={true} placeholder="说点什么" inputProps={{'aria-label': '消息',}}
                            style={{display:this.props.minimized?'none':'block',padding:'0 5px'}}/>
                </div>

            </Paper>
        )
    }
}

ChatWindow = withStyles(chatWindowStyles)(ChatWindow);

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        height:'100%',
        backgroundColor: theme.palette.background.paper,
        boxSizing:'border-box',
        display:'flex',
        flexDirection:'column'
    },
    messageButton: {
        // position:'absolute',
        // top:0,
        // right:theme.spacing.unit*2
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    customScroll:{
        '&::-webkit-scrollbar-trackPiece':{backgroundColor:'#fff'},
        '&::-webkit-scrollbar':{width:2},
        '&::-webkit-scrollbar-thumb':{
            backgroundColor:'#999',
            borderRadius:'5px'},
        overflowY:'auto',
        flex:1,
    }
});

class mainLayout extends React.Component {

    static DOMAIN = {
        MAIL:'mail',
        TRACKER:'tracker',
        INFOHUB:'infohub',
        PROJECT:'project',
        TALKS:'talks'
    };

    constructor(props) {

        super(props);

        this.state = {
            domain: mainLayout.DOMAIN.INFOHUB,
            chatWindowMinimized: true,
            chatWindowsHidden: true,
            chatContact: 'null',
            drawerOpen: false,
            currentMailAccount:"joy.highland@gmail.com",
        };
        this.sideMenuFunctions = {};
        this.sideMenuFunctions[mainLayout.DOMAIN.PROJECT] = [
            {key: 'dashboard', caption: 'Dashboard', icon: <DashBoardIcon/>},
            {key: 'members', caption: 'Members', icon: <PeopleIcon/>},
            {key: 'task', caption: 'Task', icon: <TaskIcon/>},
            {key: 'mail', caption: 'Mails', icon: <EmailIcon/>},
            {key: 'discuss', caption: 'Discusses', icon: <ForumIcon/>},
            {key: 'docs', caption: 'Archives', icon: <DocumentIcon/>},
        ];
        this.sideMenuFunctions[mainLayout.DOMAIN.INFOHUB] = [
            {key: 'new', caption: 'New', icon: <LightBulbIcon/>},
            {key: 'pending', caption: 'Pending', icon: <WatchLaterIcon/>},
            {key: 'completed', caption: 'Completed', icon: <DoneAllIcon/>},
        ];
        this.sideMenuFunctions[mainLayout.DOMAIN.MAIL] = [
            {key: 'inbox', caption: 'Inbox', icon: <InboxIcon/>},
            {key: 'sent', caption: 'Sent', icon: <SendIcon/>},
            {key: 'draft', caption: 'Drafts', icon: <DraftIcon/>},
        ];
        this.sideMenuFunctions[mainLayout.DOMAIN.TALKS] = [
            {key: 'contacts', caption: 'Contacts', icon: <PeopleIcon/>},
            {key: 'topics', caption: 'Topics', icon: <ForumIcon/>},
        ];

        this.contentItems = {};
        this.contentItems[mainLayout.DOMAIN.INFOHUB] = [
            {id: 'mail-1', primary:'王炳史', secondary: '今天去哪里吃饭，等你回复', icon: <EmailIcon/>},
            {id: 'contact-msg-1', primary:'Andy',secondary: '第15行有错误，BOSS说今天必须改完', icon: <Avatar src={"https://material-ui-next.com/static/images/remy.jpg"}/>},
            {id: 'task-1',primary:'韩梅梅', secondary: 'UI标准文档提交', icon: <TaskIcon/>},
            {id: 'mail-2',primary:'hr@ccpi.com', secondary: 'Re:Re:答复: 转发: 关于召开2017网络质量指标工作研讨会的通知(网通[2017]307)', icon: <EmailIcon/>},
            {id: 'discuss-topic',primary:'PM Wang', secondary: '工程设计材料有问题，谁负责的检查？', icon: <ForumIcon/>},
            {id: 'docs-1', primary:'Google HR',secondary: '《XXX公司人力资源管理制度》', icon: <DocumentIcon/>},
            {id: 'mail-3', primary:'王炳史', secondary: '关于公司规范员工行为准则的通知', icon: <EmailIcon/>},
            {id: 'mail-4', primary:'王炳史', secondary: '请协助提供X接口数据规范，今日反馈', icon: <EmailIcon/>},
        ];
        this.contentItems[mainLayout.DOMAIN.MAIL] = [
            {id: 'dashboard', caption: 'Dashboard', icon: <EmailIcon/>},
            {id: 'members', caption: 'Members', icon: <EmailIcon/>},
            {id: 'task', caption: 'Task', icon: <EmailIcon/>},
            {id: 'mail', caption: 'Mails', icon: <EmailIcon/>},
            {id: 'discuss', caption: 'Discusses', icon: <EmailIcon/>},
            {id: 'docs', caption: 'Archives', icon: <EmailIcon/>},
        ];
        this.contentItems[mainLayout.DOMAIN.TRACKER] = [
            {id: 'dashboard', caption: 'Dashboard', icon: <EmailIcon/>},
            {id: 'members', caption: 'Members', icon: <TaskIcon/>},
            {id: 'task', caption: 'Task', icon: <EmailIcon/>},
            {id: 'mail', caption: 'Mails', icon: <EmailIcon/>},
            {id: 'discuss', caption: 'Discusses', icon: <TaskIcon/>},
            {id: 'docs', caption: 'Archives', icon: <EmailIcon/>},
        ];
        // console.log(this.sideMenuFunctions);
    }

    handleChange = (event, value) => {
        this.setState({ domain:value });
    };

    openChatWindow(contact){
        this.setState({
            chatWindowsHidden:false,
            chatWindowMinimized:false,
            chatContact:contact
        });
    }

    changeChatTarget(contact){
        this.openChatWindow(contact);
    }

    handleChatWindowStateChange(minimized,hidden){
        this.setState({
            chatWindowMinimized:minimized,
            chatWindowsHidden:hidden,
        });
    }

    render() {
        const { classes } = this.props;
        const { domain } = this.state;

        return (
            <div className={classes.root}>
                <Grid container spacing={0} style={{flex:1}}>
                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4} style={{flex:1,display:'flex',flexDirection:'column'}}>
                        <AppBar position={'static'} >
                            <Toolbar style={{display:'flex'}}>
                                <IconButton className={classes.menuButton} color="contrast" aria-label="Menu"
                                            onClick={()=>{this.setState({drawerOpen:true})}}
                                            onKeyDown={()=>{this.setState({drawerOpen:true})}}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <div style={{flex:1}}/>
                                <SearchInput />
                            </Toolbar>
                        </AppBar>
                        {/*<div style={{flex:1,overflowY:'scroll'}}>*/}
                        <div className={classes.customScroll}>
                            <ContentListComponent items = {this.contentItems[this.state.domain]}/>
                        </div>
                        <BottomNavigation value={domain} onChange={this.handleChange}
                                          style={{borderWidth:'1px 0px 0px 0px',borderColor:'gray',borderStyle:'solid'}}>
                            <BottomNavigationButton label="Mail" value={mainLayout.DOMAIN.MAIL} icon={<EmailIcon />} />
                            <BottomNavigationButton label="Tracker" value={mainLayout.DOMAIN.TRACKER} icon={<TrackChangesIcon />} />
                            <BottomNavigationButton label="InfoHub" value={mainLayout.DOMAIN.INFOHUB} icon={<PetsIcon />} />
                            <BottomNavigationButton label="Project" value={mainLayout.DOMAIN.PROJECT} icon={<ExtensionIcon />} />
                            <BottomNavigationButton label="Talks" value={mainLayout.DOMAIN.TALKS} icon={<ForumIcon />} />
                        </BottomNavigation>
                        <Drawer open={this.state.drawerOpen} onRequestClose={()=>{this.setState({drawerOpen:false})}}>
                            <Card style={{width: 300,}}>
                                <CardMedia
                                    style={{height: 200,display:'flex',justifyContent:'center ',alignItems:'center',flexDirection:'column'}}
                                    image="/res/img/background.jpg"
                                    title={this.state.currentMailAccount}
                                >
                                    <Avatar alt={"Mandy"} src={"https://material-ui-next.com/static/images/remy.jpg"} style={{width: 60,height: 60,boxShadow:'black 0px 0px 10px 1px'}} />
                                    <Typography type={'subheading'}
                                                style={{backgroundColor:'rgba(255, 255, 255, 0.37)',margin:5,padding:5,boxShadow:'3px 5px 8px 3px black'}}>
                                        {this.state.currentMailAccount}
                                    </Typography>
                                </CardMedia>
                            </Card>
                            <SideFunctionMenu menuConfig = {this.sideMenuFunctions[this.state.domain]}
                                              onClose = {()=>{this.setState({drawerOpen:false})}}
                            />
                        </Drawer>
                    </Grid>
                    <Grid item hidden={{smDown: true}} sm={8} md={8} lg={8} xl={8} style={{flex:1,display:'flex',flexDirection:'column'}}>
                        <MailComposerFrame  title={"怎么办，你看着办吧"}
                                            author={"Andy Wang<joy.highland@gmail.com>"}
                                            datetime = {"2017-09-12 13:32:33"}
                                            itemType = {"mail"}
                                            itemStatus = {"new"}>
                            <p>
                                十八大以来，习近平对外出访数十次，无论是署名文章还是主旨演讲，他的讲话里始终充满着古今中外的优秀文化元素。广征博引、纵横捭阖，具有鲜明特点和魅力的“习式”语言给人留下了深刻印象。
                                在刚刚结束的“一带一路”国际合作高峰论坛上，习近平开场便引用《兰亭集序》中的名句“群贤毕至，少长咸集”来描述会议盛况，欢迎各国来宾。会上，习近平道出“不积跬步，无以至千里”“金字塔是一块块石头垒成的”“伟业非一日之功”，用中国、阿拉伯、欧洲的谚语名句强调同一个道理，即“一带一路”建设要稳扎稳打，久久为功，“一步一个脚印推进实施，一点一滴抓出成果”。
                                “相知无远近，万里尚为邻”，2016年11月，习近平在秘鲁国会发表演讲时引用了唐代诗人张九龄《送韦城李少府》中的名句，表明两国虽地理位置距离遥远，但是国家关系仍可以像邻居一样亲密。
                                “未之见而亲焉，可以往矣；久而不忘焉，可以来矣。”2016年1月，在阿盟总部演讲时，习近平引用这句两千多年前管子的话来讲述此行的重要意义。随后，他又道出孟子的“立天下之正位，行天下之大道”，进一步阐释中国对中东政策的坚持和立场，言简意赅，鞭辟入里。
                                在博鳌亚洲论坛2015年年会上，习近平说，“夫物之不齐，物之情也”，强调“不同文明没有优劣之分，只有特色之别”，表达了要促进不同文明不同发展模式交流对话，在竞争比较中取长补短，在交流互鉴中共同发展的深刻思想。
                                习近平在讲话中引用古今中外的名言警句、古语诗词，看似顺手拈来，但无不恰到好处，尽画龙点睛之妙，这既是中西方传统文化的交融，也是习近平对中国智慧的最好“代言”。
                            </p>
                        </MailComposerFrame>
                    </Grid>
                </Grid>

                <ChatWindow minimized={this.state.chatWindowMinimized}
                    hidden={this.state.chatWindowsHidden}
                    contact={this.state.chatContact}
                            onWindowStateChage={(mini,hide)=>{this.handleChatWindowStateChange(mini,hide)}}
                />

            </div>
        );
    }
}

mainLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(mainLayout);