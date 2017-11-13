import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Radio, { RadioGroup } from 'material-ui/Radio';
import {FormControl, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import BasicTable from './tempTables';



const styles = theme => ({
    selectCtrl: {
        display: 'flex',
        justifyContent:'center',
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

class taskOverview extends React.Component {

    constructor(props){
        super(props);
        this.id = 0;
        this.state = {
            value: 'male',
            checkedA: true,
            checkedB: false,
        };
    }


    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div  style={{height:'100%',display:'flex',flexDirection:'column'}}>
                <div className={classes.selectCtrl}>
                    <FormControl component="fieldset" required  >
                        <RadioGroup
                            aria-label="gender"
                            name="gender"
                            className={classes.group}
                            value={this.state.value}
                            onChange={this.handleChange}
                            style={{display:'flex',flexDirection:'row',margin:0}}
                        >
                            <FormControlLabel value="male" control={<Radio />} label="所有任务" />
                            <FormControlLabel value="female" control={<Radio />} label="我的任务" />
                        </RadioGroup>
                    </FormControl>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.checkedA}
                                onChange={(event, checked) => this.setState({ checkedA: checked })}
                            />
                        }
                        label="仅显示逾期任务"
                    />
                </div>
                <BasicTable />
            </div>
        );
    }
}

taskOverview.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(taskOverview);