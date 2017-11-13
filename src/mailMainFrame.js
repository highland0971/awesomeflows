import React, { Component } from 'react';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Menu, { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import FormControl from 'material-ui/Form/FormControl';

import FunctionMenus from './mailFunctionMenus';
import MailListFrame from './mailListFrame';
import MailListItem from './mailListItem';
import MailComposerFrame from './mailComposerFrame';

import MailIcon from 'material-ui-icons/Mail';
import AssignmentIcon from 'material-ui-icons/Assignment';
import ShareIcon from 'material-ui-icons/Share';



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
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        width: 56,
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
    formContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
})

export function mockItems(){
    let arrayLength = Math.floor(Math.random()*20+1);
    let randomArray = [];
    for(var i=0;i<arrayLength;i++)
        randomArray.push(i);

    return randomArray.map((item) => ({
        itemType:['discuss','task','share','mail'][Math.round(Math.random()*10) % 4],
        status:['new','rejected','complete','delayed','inaction'][Math.round(Math.random()*10) % 5],
        author:['周连双','杨春雷','高宏','马致远','冯小刚'][Math.round(Math.random()*10) % 5],
        title:Math.random().toString(36).substr(2),
        datetime:'2013/4/12',
        item:item,
    }));
}

class mailMainFrame extends Component {

    state = {
        statusFilter: null,
        typeFilter: null,
        focusedItemIndex:0,
        anchorEl: undefined,
        floatMenuOpen: false,
        drawOpen:false,
        searchType:'',
        mailList: mockItems(),
    };

    handleFilterChange = (typeFilter,statusFilter)=>{
        this.setState({
            statusFilter:statusFilter,
            typeFilter:typeFilter
        });
    }

    handleItemClick = (event,item) => {
        this.setState({focusedItemIndex:item});
    }

    handleAddClick = event => {
        this.setState({ floatMenuOpen: true, anchorEl: event.currentTarget });
    };

    handleMenuRequestClose = () => {
        this.setState({ floatMenuOpen: false });
    };

    handleDrawerOpen = () => {
        this.setState({ drawOpen: true });
    };

    handleDrawerClose = () => {
        this.setState({ drawOpen: false });
    };

    handleDrawerToggle = () =>{
        this.setState({ drawOpen: !this.state.drawOpen });
    }

    getDrawerStatus = () =>{
        return this.state.drawOpen;
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render()
    {
        const classes = this.props.classes;

        return(

            <div className={classes.root}>
                <Drawer type="permanent" open={this.state.drawOpen}
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.drawOpen && classes.drawerPaperClose),
                    }}>
                    <div className={classes.drawerInner}>
                        <FunctionMenus onFilterChange={this.handleFilterChange}
                                       onToggle = {this.handleDrawerToggle}
                                       onOpenDrawer = {this.handleDrawerOpen}
                                       isDrawerOpen = {this.getDrawerStatus}
                        />
                    </div>
                </Drawer>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={{display:'flex',flexDirection:'column'}}>
                        <form className={classes.formContainer} noValidate autoComplete="off">
                            <FormControl className={classes.formControl} style={{flexGrow:1}}>
                                <InputLabel htmlFor="search-content">搜索内容</InputLabel>
                                <Input id="search-content" />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-helper">搜索范围</InputLabel>
                                <Select
                                    value={this.state.searchType}
                                    onChange={this.handleChange('searchType')}
                                    input={<Input id="age-helper" />}
                                >
                                    {
                                        [{value:"发件人",key:"from"},{value:"收件人",key:"to"},{value:"标题",key:"title"}].map(item =>(
                                            <MenuItem key={item.key} value={item.value}>
                                                {item.value}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </form>
                        <MailListFrame statusFilter = {this.state.statusFilter} typeFilter={this.state.typeFilter}>
                            {
                                this.state.mailList.map((item) =>
                                    <MailListItem itemType={item.itemType} status = {item.status} author={item.author}
                                                      title={item.title} datetime={item.datetime} key={item.item.toString()}
                                                      onClick = {e =>this.handleItemClick(e,item.item)}
                                    />
                                )
                            }
                        </MailListFrame>
                    </Grid>
                    <Grid item hidden={{smDown: true}} md={8} lg={8} xl={8}>
                        <MailComposerFrame  title={this.state.mailList[this.state.focusedItemIndex]['title']}
                                            author={this.state.mailList[this.state.focusedItemIndex]['author']}
                                            datetime = {this.state.mailList[this.state.focusedItemIndex]['datetime']}
                                            itemType = {this.state.mailList[this.state.focusedItemIndex]['itemType']}
                                            itemStatus = {this.state.mailList[this.state.focusedItemIndex]['status']}>
                            <p>
                                十八大以来，习近平对外出访数十次，无论是署名文章还是主旨演讲，他的讲话里始终充满着古今中外的优秀文化元素。广征博引、纵横捭阖，具有鲜明特点和魅力的“习式”语言给人留下了深刻印象。
                                在刚刚结束的“一带一路”国际合作高峰论坛上，习近平开场便引用《兰亭集序》中的名句“群贤毕至，少长咸集”来描述会议盛况，欢迎各国来宾。会上，习近平道出“不积跬步，无以至千里”“金字塔是一块块石头垒成的”“伟业非一日之功”，用中国、阿拉伯、欧洲的谚语名句强调同一个道理，即“一带一路”建设要稳扎稳打，久久为功，“一步一个脚印推进实施，一点一滴抓出成果”。
                                “相知无远近，万里尚为邻”，2016年11月，习近平在秘鲁国会发表演讲时引用了唐代诗人张九龄《送韦城李少府》中的名句，表明两国虽地理位置距离遥远，但是国家关系仍可以像邻居一样亲密。
                                “未之见而亲焉，可以往矣；久而不忘焉，可以来矣。”2016年1月，在阿盟总部演讲时，习近平引用这句两千多年前管子的话来讲述此行的重要意义。随后，他又道出孟子的“立天下之正位，行天下之大道”，进一步阐释中国对中东政策的坚持和立场，言简意赅，鞭辟入里。
                                在博鳌亚洲论坛2015年年会上，习近平说，“夫物之不齐，物之情也”，强调“不同文明没有优劣之分，只有特色之别”，表达了要促进不同文明不同发展模式交流对话，在竞争比较中取长补短，在交流互鉴中共同发展的深刻思想。
                                习近平在讲话中引用古今中外的名言警句、古语诗词，看似顺手拈来，但无不恰到好处，尽画龙点睛之妙，这既是中西方传统文化的交融，也是习近平对中国智慧的最好“代言”。
                            </p>
                        </MailComposerFrame>
                        <Button fab style = {{position:"fixed", bottom:'2rem',right:'2rem'}} aria-owns="action" aria-haspopup="false" onClick={this.handleAddClick} color="accent">
                            <AddIcon />
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            open={this.state.floatMenuOpen}
                            onRequestClose={this.handleMenuRequestClose}
                        >
                            <MenuItem onClick={this.handleMenuRequestClose}><MailIcon/>起草邮件</MenuItem>
                            <MenuItem onClick={this.handleMenuRequestClose}><AssignmentIcon/> 创建任务</MenuItem>
                            <MenuItem onClick={this.handleMenuRequestClose}><ShareIcon/> 共享资料</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(mailMainFrame);
