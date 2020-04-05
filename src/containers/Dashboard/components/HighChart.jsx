import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Panel from "../../../shared/components/Panel";
import {ResponsiveContainer} from "recharts";

export default class HighChart extends React.Component {
    chartComponent;
    options;

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

    //returning false here prevents react from manipulating the DOM
    shouldComponentUpdate() {
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
                            ref={this.props.setRef}
                        />
                    </ResponsiveContainer>
                </div>
            </Panel>
        )
    }
}
