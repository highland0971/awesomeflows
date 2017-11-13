import React,{ Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import ContactActionCard from './contactActionCard';

const styles = theme => ({
    root: {
        width: '100%',
        background: theme.palette.background.paper,
    },
    avatar: {
        margin: 2,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

class projectContacts extends Component{

    constructor(props){
        super(props);
        this.state={
            anchorEl:null,
            popoverOpen:false,
            focusedContactName:null,
            focusedContactImgUrl:null,
            focusedContactEmail:null,

        };
        this.anchorEls ={};
        this.contactCount = 0;
    }


    handleRequestClose = () => {
        this.setState({
            popoverOpen: false,
        });
    };


    createContact(email,name,img){
        return {email,name,img};
    }

    render(){
        const classes = this.props.classes;
        let contacts = [
            this.createContact('15802221580@139.com',"Remy Sharp","https://material-ui-next.com/static/images/remy.jpg"),
            this.createContact('joy.highand@139.com',"Eric Hoffman","https://material-ui-next.com/static/images/uxceo-128.jpg"),
            this.createContact('cced@139.com',"尤雨溪","https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=d49c7e60ee1190ef15f69a8daf72f673/4afbfbedab64034f29596c8ba6c379310b551da2.jpg"),
            this.createContact('3022212@qq.com',"余国荔","https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=11b49d24f4039245b5b8e95de6fdcfa7/54fbb2fb43166d229d307e7d4e2309f79152d290.jpg"),
        ];

        return(
            <div className={classes.root} >
                <form className={classes.formContainer} noValidate autoComplete="off">
                    <TextField
                        id="search"
                        label="🔍搜索成员"
                        type="search"
                        className={classes.textField}
                        margin="normal"
                    />
                </form>
                <List dense className={classes.root}>
                {
                    contacts.map(contact =>{
                        return(
                            <ListItem button ref={node=> this.anchorEls[contact.name] = node}
                                      onClick={event =>{
                                          this.setState({
                                              anchorEl:findDOMNode(this.anchorEls[contact.name]),
                                              popoverOpen:true,
                                              focusedContactName:contact.name,
                                              focusedContactEmail:contact.email,
                                              focusedContactImgUrl:contact.img,
                                          });
                                      }}
                                      key ={contact.email}
                            >
                                <ListItemIcon>
                                    <Avatar alt={contact.name} src={contact.img} className={classes.avatar} />
                                </ListItemIcon>
                                <ListItemText inset primary={contact.name} />
                            </ListItem>
                        );
                    })
                }
                </List>
                <Popover
                    open={this.state.popoverOpen}
                    anchorEl={this.state.anchorEl}
                    onRequestClose={this.handleRequestClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <ContactActionCard imgUrl={this.state.focusedContactImgUrl}
                                       email={this.state.focusedContactEmail}
                                       name={this.state.focusedContactName}
                                       chat={contact=>{this.props.chat(contact);this.handleRequestClose()}}
                    />
                </Popover>
            </div>
        )
    }
}

projectContacts.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(projectContacts);