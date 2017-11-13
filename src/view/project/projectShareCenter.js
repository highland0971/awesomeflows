/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/no-multi-comp */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import keycode from 'keycode';
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';
import Grid from 'material-ui/Grid';
import Toolbar from 'material-ui/Toolbar';

import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import Paper from 'material-ui/Paper';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import DeleteIcon from 'material-ui-icons/Delete';
import NewFolderIcon from 'material-ui-icons/CreateNewFolder';
import UploadIcon from 'material-ui-icons/FileUpload';
import FolderIcon from 'material-ui-icons/FolderOpen';
import FileIcon from 'material-ui-icons/InsertDriveFile';

import {getShareDirContents} from '../../model/mailEngine'
import {TagButton} from '../commonComponent'

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
    counter += 1;
    return { id: counter, name, calories, fat, carbs, protein };
}

const columnData = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
    { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
    { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
    { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
    { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];


class EnhancedTableHead extends React.Component {
    static propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.string.isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

const toolbarStyles = theme => ({
    root: {
        paddingRight: 2,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.A700,
                backgroundColor: theme.palette.secondary.A100,
            }
            : {
                color: theme.palette.secondary.A100,
                backgroundColor: theme.palette.secondary.A700,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const { numSelected, classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography type="subheading">{numSelected} selected</Typography>
                ) : (
                    <Typography type="title">{props.position}</Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <div style={{display:'flex'}}>
                        {[
                        <Tooltip title="创建文件夹">
                            <IconButton aria-label="创建文件夹">
                                <NewFolderIcon />
                            </IconButton>
                        </Tooltip>,
                        <Tooltip title="上传文件">
                            <IconButton aria-label="上传文件">
                                <UploadIcon />
                            </IconButton>
                        </Tooltip>
                        ]}
                    </div>
                )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const cardStyles = theme => ({
    card: {
        minWidth: 275,
        marginBottom:theme.spacing.unit,
    },

    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
});


function SimpleCard(props) {
    const { classes } = props;

    return (
        <div>
            <Card className={classes.card}>

                <CardContent>
                    <Typography type="title" className={classes.title}>
                        {props.category}
                    </Typography>
                    <Typography type="headline" component="h2">
                        {props.title}
                    </Typography>
                    <Typography >
                        {props.content}
                    </Typography>
                </CardContent>
                {/*<CardActions>*/}
                    {/*<Button dense>Share</Button>*/}
                {/*</CardActions>*/}
            </Card>
        </div>
    );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

SimpleCard = withStyles(cardStyles)(SimpleCard);

const styles = theme => ({
    root: {
        flex:'1'
    },
    table: {
        flex:'1'
    },
    tableWrapper: {
        overflowX: 'auto',
        display:'flex',
        flexDirection:'column'
    },
});


class EnhancedTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            page: 0,
            rowsPerPage: 5,
            currentDir:'/',
            data:getShareDirContents('/'),
        };
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ data, order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.state.data.map(n => n.id) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleKeyDown = (event, id) => {
        if (keycode(event) === 'space') {
            this.handleClick(event, id);
        }
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };



    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleDirChange(targetDir, baseDir){
        let newDir = baseDir.endsWith('/')?baseDir+targetDir:baseDir+'/'+targetDir
        this.setState({
            currentDir:newDir,
            data:getShareDirContents(newDir)
        });

    }

    render() {
        const { classes } = this.props;
        const { order, orderBy, selected, rowsPerPage, page } = this.state;

        const data = this.state.data;

        return (
                <Grid container spacing={0} className={classes.root}>
                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8}
                          style={{flex:1,display:'flex',flexDirection:'column'}}>
                        <Paper style={{margin:4,flex:1}}>
                            <EnhancedTableToolbar numSelected={selected.length} position={this.state.currentDir}/>
                            <div className={classes.tableWrapper}>
                                <Table className={classes.table}>

                                    <TableHead>
                                        <TableRow>
                                            <TableCell  padding={'dense'} style={{width:12}}/>
                                            <TableCell  padding={'dense'}>文件名称</TableCell>
                                            <TableCell  padding={'dense'}>文件大小</TableCell>
                                            <TableCell  padding={'dense'}>创建人</TableCell>
                                            <TableCell  padding={'dense'}>创建时间</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map(n => {
                                            const isSelected = this.isSelected(n.id);
                                            console.log(n);
                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={event => {
                                                        if(n.type === 'dir')
                                                            this.handleDirChange(n.name,n.dir);
                                                        else
                                                            this.handleClick(event, n.id);
                                                    }}
                                                    // onKeyDown={event => this.handleKeyDown(event, n.id)}
                                                    role="checkbox"
                                                    aria-checked={isSelected}
                                                    tabIndex={-1}
                                                    key={n.id}
                                                    selected={isSelected}
                                                >
                                                    <TableCell padding={'dense'} style={{width:12}}>
                                                        {/*<Checkbox checked={isSelected} />*/}
                                                        {n.type === 'dir'?<FolderIcon/>:<FileIcon/>}
                                                    </TableCell>
                                                    <TableCell padding={'dense'} >{n.name}</TableCell>
                                                    <TableCell padding={'dense'}>{n.type === 'file' && n.size}</TableCell>
                                                    <TableCell padding={'dense'} >{n.type === 'file' && n.author}</TableCell>
                                                    <TableCell padding={'dense'}>{n.type === 'file' && n.date}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                    {/*<TableFooter>*/}
                                    {/*<TableRow>*/}
                                    {/*<TableCell numeric>{"Last update 2018/08/22"}</TableCell>*/}
                                    {/*</TableRow>*/}
                                    {/*</TableFooter>*/}
                                </Table>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item hidden={{smDown: true}} md={4} lg={4} xl={4}
                          style={{display:'flex',flexDirection:'column',padding:4}}>
                        <SimpleCard category={'描述'} title={'Hello world'} content={'满足免运费条件的订单，如被拆分为两个或两个以上的子单，客户取消/拒收其中子单后，剩余子单金额如不满足免运费条件，京东有权通过扣京豆方式补偿相应运费（100个京豆相当于1元运费），客户账户内京豆数额不足以扣除时，订单会联动取消。若部分或全部剩余子单已被签收，导致订单无法联动取消的，则京东有权随时扣除客户账户内已有及新获得的京豆，以补偿相应运费。'}/>
                        <SimpleCard category={'标签'}  content={[<TagButton text={'测试Tag'}/>,<TagButton color= 'accent' text={"mini v3"}/>]}/>
                    </Grid>
                </Grid>


        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);