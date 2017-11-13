// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import AssignmentIcon from 'material-ui-icons/Assignment';


const styleSheet =  theme => ({
    paper: {
        width: '100%',
        overflowX: 'hidden',
        overflowY: 'scroll',
        // height:'100%'
        flex:1
    },
});

let id = 0;
function createData(name, author, date, size, type) {
    id += 1;
    return { id, name, author, date, size, type };
}

const data = [
    createData('回龙观钉子户拆迁动员', '王麻子', '2017/01/03 13:23:00', '', 'parent'),
    createData('两学一做心得体会编写', '熊瞎子', '2017/05/03 13:23:00', '', 'dir'),
    createData('新能源汽车发动机拆解', '李三儿', '2017/04/04 13:23:00', '343 KB', 'other'),
    createData('天津渤海银行现场评估', '徐铁三', '2017/06/13 13:23:00', '1.2 MB', 'img'),
    createData('南马路小商品商场整改报告', '王侯', '2017/07/01 03:23:00', '2.2 KB', 'doc'),
    createData('中国有嘻哈合作洽谈', '马大哈', '2014/05/01 17:23:00', '1.2 MB', 'sheet'),
];

function BasicTable(props) {
    const classes = props.classes;

    return (
        <Paper className={classes.paper}>
            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell style={{padding:'0px 24px 0px 24px'}} />
                        <TableCell style={{padding:'0px 24px 0px 24px'}}>名称</TableCell>
                        <TableCell style={{padding:'0px 24px 0px 24px'}}>发布人</TableCell>
                        <TableCell style={{padding:'0px 24px 0px 24px'}}>时间</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(n => {
                        return (
                            <TableRow key={n.id} hover>
                                <TableCell style={{padding:'0px 24px 0px 24px'}} >
                                    <AssignmentIcon/>
                                </TableCell>
                                <TableCell style={{padding:'0px 24px 0px 24px'}}>{n.name}</TableCell>
                                <TableCell style={{padding:'0px 24px 0px 24px'}}>{n.author}</TableCell>
                                <TableCell style={{padding:'0px 24px 0px 24px'}}>{n.date}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}

BasicTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(BasicTable);
