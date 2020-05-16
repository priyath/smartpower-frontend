import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Panel from "../../../shared/components/Panel";
import {ResponsiveContainer} from "recharts";

export default class LiveChart extends React.Component {
    chartComponent;
    options;
    timer;

    constructor () {
        super();
        this.chartComponent = React.createRef();
        this.options = {
            chartOptions: {
                title: {
                    text: 'Frequency'
                },
                time: {
                    useUTC: false
                },
                chart: {
                    type: 'area',
                },
                xAxis: {
                    title: {
                        enabled: true,
                        text: 'Time'
                    },
                    type: 'datetime'
                },
                yAxis: {
                    labels: {
                        formatter: function () {
                            return this.value / 1000 + 'k';
                        }
                    }
                },
                tooltip: {
                    pointFormat: 'Value: <b>{point.y:,.0f}</b>'
                },
                plotOptions: {
                    area: {
                        pointStart: Date.now(),
                        marker: {
                            enabled: false,
                            symbol: 'circle',
                            radius: 1,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    }
                },
                series: [{
                    showInLegend: false,
                    data: [
                    ],
                    pointStart: Date.now(),
                    pointInterval: 1000*5
                }],
                selectedGaugeIdx: null,
            },
        }
    }

    componentDidMount() {
        this.timer = setInterval(() =>  this.props.getRealTimeData(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    addPointToSeries (chart, realtimeData) {
        chart.series[0].addPoint([realtimeData[realtimeData.length - 3]], false, true);
        chart.series[0].addPoint([realtimeData[realtimeData.length - 2]], false, true);
        chart.series[0].addPoint([realtimeData[realtimeData.length - 1]], false, true);
    }

    //returning false here prevents react from manipulating the DOM
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (!this.chartComponent.current){
            return false;
        }
        const chart = this.chartComponent.current.chart;

        const selectedGauge = nextProps.data;
        const realtimeData = selectedGauge.realtimeData;
        const selectedGaugeIdx = nextProps.selectedGaugeIdx;
        const previousSelectedGaugeIdx = chart.userOptions.selectedGaugeIdx;

        //unchanged updates
        if(selectedGaugeIdx === previousSelectedGaugeIdx) {
            this.addPointToSeries(chart, realtimeData);
        }
        //gauge changed
        else {
            chart.update({selectedGaugeIdx: selectedGaugeIdx}, false);
            chart.setTitle({text: selectedGauge.title});
            chart.series[0].update({
                data: realtimeData
            }, false);
        }
        chart.redraw();
        return false;
    }

    render() {
        return (
            <Panel md={12} lg={12} xl={7} sm={12} xs={12} title='test'>
                <div dir="ltr">
                    <ResponsiveContainer height={500} className="dashboard__area">
                        <HighchartsReact
                            containerProps={{style: {height: "100%"}}}
                            options={this.options.chartOptions}
                            ref={this.chartComponent}
                        />
                    </ResponsiveContainer>
                </div>
            </Panel>
        )
    }
}

//util functions
function timeNow() {
    let d = new Date(),
        h = (d.getHours()<10?'0':'') + d.getHours(),
        m = (d.getMinutes()<10?'0':'') + d.getMinutes(),
        s = (d.getSeconds()<10?'0':'') + d.getSeconds();
    return h + ':' + m + ':' + s;
}
