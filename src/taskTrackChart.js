import React from 'react';
import {withStyles } from 'material-ui/styles';
import echart from 'echarts';

const styles = theme => ({
            chart:{
                flexGrow:1,
                width:'100%',
                height:'100%'
            },
        }
    );

class EfficiencyCharts extends React.Component{

    chartConfig = {
        title: {
            text: '任务进度',
            subtext: 'Demo数据',
            x: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: true
            }
        },
        legend: {
            data:['分配任务','完成任务'],
            x: 'left'
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                axisLine: {onZero: true},
                data:['2009/6/12', '2009/6/13', '2009/6/14', '2009/6/15', '2009/6/16', '2009/6/17','2009/6/18']
            }
        ],
        yAxis : [
            {
                name : '数量',
                type : 'value',
            }
        ],
        series: [
            {
                name:'分配任务',
                type:'line',
                symbolSize: 8,
                hoverAnimation: true,
                data:[1,5,8,10,11,15]
            },
            {
                name:'完成任务',
                type:'line',
                symbolSize: 8,
                hoverAnimation: true,
                data:[0,3,6,8,10,13]
            }
        ]
    }

    handleResize = (event) => {
        this.myChart.resize();
    }

    componentDidMount() {
        this.myChart = echart.init(this.refs.charts);
        this.myChart.setOption(this.chartConfig);
        window.addEventListener('resize',this.handleResize);
    }

    componentWillUnmount()
    {
        window.removeEventListener('resize', this.handleResize);
    }

    render(){
        const classes = this.props.classes;
        return(
            <div className={classes.chart} ref = "charts" />
        )
    }
}

export default withStyles(styles)(EfficiencyCharts);
