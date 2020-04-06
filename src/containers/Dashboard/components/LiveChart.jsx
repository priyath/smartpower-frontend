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
                chart: {
                    type: 'area',
                },
                xAxis: {
                    allowDecimals: false,
                    labels: {
                        formatter: function () {
                            return this.value; // clean, unformatted number for year
                        }
                    }
                },
                yAxis: {
                    labels: {
                        formatter: function () {
                            return this.value / 1000 + 'k';
                        }
                    }
                },
                tooltip: {
                    pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
                },
                plotOptions: {
                    area: {
                        pointStart: 1940,
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
                    name: 'Points',
                    data: [
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0
                    ]
                }]
            }
        }
    }

    componentDidMount() {
        this.timer = setInterval(() =>  this.props.getRealTimeData(), 5000);
    }

    addPointToSeries (chart, realtimeData) {
        chart.series[0].addPoint([realtimeData[realtimeData.length - 3]], false, true);
        chart.series[0].addPoint([realtimeData[realtimeData.length - 2]], false, true);
        chart.series[0].addPoint([realtimeData[realtimeData.length - 1]], false, true);
    }

    //returning false here prevents react from manipulating the DOM
    shouldComponentUpdate(nextProps) {
        if (!this.chartComponent.current){
            return false;
        }
        const chart = this.chartComponent.current.chart;

        const realtimeData = nextProps.data;
        const selectedGaugeIdx = nextProps.selectedGaugeIdx;
        const previousSelectedGaugeIdx = chart.userOptions.selectedGaugeIdx;

        //initial scenario
        if (selectedGaugeIdx === undefined){
            chart.update({selectedGaugeIdx: previousSelectedGaugeIdx}, false);
            this.addPointToSeries(chart, realtimeData);
        }
        //unchanged updates
        else if(selectedGaugeIdx === previousSelectedGaugeIdx) {
            this.addPointToSeries(chart, realtimeData);
        }
        else {
            chart.update({selectedGaugeIdx: previousSelectedGaugeIdx}, false);
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
