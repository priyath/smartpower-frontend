import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Panel from "../../../../shared/components/Panel";
import {ResponsiveContainer} from "recharts";

export default class LiveChart extends React.Component {
    chartComponent;
    options;
    timer;

    constructor (props) {
        super(props);
        this.chartComponent = React.createRef();
        this.options = {
            chartOptions: {
                title: {
                    text: ''
                },
                time: {
                    useUTC: false
                },
                chart: {
                    type: 'area',
                    events: {
                        load() {
                        }
                    }
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
                            return this.value;
                        }
                    },
                },
                tooltip: {
                    pointFormat: 'Value: <b>{point.y:,.2f}</b>'
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
                    },
                },
                series: [
                    {
                        showInLegend: false,
                        data: props.data.realtimeData,
                        pointStart: Date.now(),
                        pointInterval: 1666,
                        color: 'rgba(91,169,222,0.73)'
                    }
                ],
                selectedGaugeIdx: null,
                selectedBranchIdx: null,
                thresholdBreached: null,
            },
            timer: null
        }
    }

    componentDidMount() {
        this.timer = setInterval(() =>  {
            this.props.getRealTimeData();
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
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
        const thresholdBreached = chart.userOptions.thresholdBreached;

        const minRealtime = Math.min(...realtimeData);
        const maxRealtime = Math.max(...realtimeData);

        const y = realtimeData[realtimeData.length - 1];

        chart.series[0].yAxis.update({
            min: minRealtime === 0 ? minRealtime : minRealtime - 0.1,
            max: maxRealtime + 0.1,
        }, false, false);

        if (y > selectedGauge.upperThreshold || y < selectedGauge.lowerThreshold) {
            chart.series[0].update({
                color: 'rgb(187,62,62, 0.6)',
            }, false);
            chart.update({thresholdBreached: true}, false);
        } else {
            if (thresholdBreached) {
                chart.series[0].update({
                    color: 'rgba(91,169,222,0.73)',
                }, false);
                chart.update({thresholdBreached: false}, false);
            }
        }

        //unchanged updates
        if(selectedGaugeIdx === previousSelectedGaugeIdx) {
            chart.series[0].addPoint(y, true, true);
        }
        //gauge changed
        else {
            chart.update({selectedGaugeIdx: selectedGaugeIdx}, false);
            chart.setTitle({text: selectedGauge.title});
            chart.series[0].setData(realtimeData);
        }
        return false;
    }

    render() {
        return (
            <Panel md={12} lg={12} xl={7} sm={12} xs={12} title='LIVE'>
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
