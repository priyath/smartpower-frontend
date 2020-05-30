import React from 'react';
import Highcharts from "highcharts/highstock";
import drilldown from "highcharts/modules/drilldown.js";
import Panel from "../../../shared/components/Panel";
import {ResponsiveContainer} from "recharts";
import HighchartsReact from "highcharts-react-official";
import {transformHistoryResponse, getHistoryFilters} from "../../../logic/historyManager";
import {fetchHistoryDrilldownData} from "../../../repositories/historyRepository";

drilldown(Highcharts);

const data = [[1221696000000, 19.16], [1221782400000, 20.13], [1222041600000, 18.72], [1222128000000, 18.12], [1222214400000, 18.39], [1222300800000, 18.85], [1222387200000, 18.32], [1222646400000, 15.04], [1222732800000, 16.24], [1222819200000, 15.59], [1222905600000, 14.3], [1222992000000, 13.87], [1223251200000, 14.02], [1223337600000, 12.74], [1223424000000, 12.83], [1223510400000, 12.68], [1223596800000, 13.8], [1223856000000, 15.75], [1223942400000, 14.87], [1224028800000, 13.99], [1224115200000, 14.56], [1224201600000, 13.91], [1224460800000, 14.06], [1224547200000, 13.07], [1224633600000, 13.84], [1224720000000, 14.03], [1224806400000, 13.77], [1225065600000, 13.16], [1225152000000, 14.27], [1225238400000, 14.94], [1225324800000, 15.86], [1225411200000, 15.37], [1225670400000, 15.28], [1225756800000, 15.86], [1225843200000, 14.76], [1225929600000, 14.16], [1226016000000, 14.03], [1226275200000, 13.7], [1226361600000, 13.54], [1226448000000, 12.87], [1226534400000, 13.78], [1226620800000, 12.89], [1226880000000, 12.59], [1226966400000, 12.84], [1227052800000, 12.33], [1227139200000, 11.5], [1227225600000, 11.8], [1227484800000, 13.28], [1227571200000, 12.97], [1227657600000, 13.57], [1227830400000, 13.24], [1228089600000, 12.7], [1228176000000, 13.21], [1228262400000, 13.7], [1228348800000, 13.06], [1228435200000, 13.43], [1228694400000, 14.25], [1228780800000, 14.29], [1228867200000, 14.03], [1228953600000, 13.57], [1229040000000, 14.04], [1229299200000, 13.54]];
const drill0 = [[1221696000000, 19.16], [1221782400000, 20.13], [1222041600000, 18.72], [1222128000000, 18.12], [1222214400000, 18.39], [1222300800000, 18.85]];
const data1 = [{x: 1221696000000, y: 13.54, drilldown: true}, {x: 1222041600000, y: 20.13, drilldown: true}, {x: 1222128000000, y: 10.13, drilldown: true}];
const data3 = [{x: 1221696000000, y: 13.54, drilldown: true}, {x: 1222041600000, y: 20.13, drilldown: true}];
const month = [[1229299200000, 13.54]];
const data2 = [[1221696000000, 19.16], [1221782400000, 20.13], [1222041600000, 18.72], [1222128000000, 18.12], [1222214400000, 18.39], [1222300800000, 18.85], [1222387200000, 18.32], [1222646400000, 15.04], [1222732800000, 16.24], [1222819200000, 15.59], [1222905600000, 14.3], [1222992000000, 13.87], [1223251200000, 14.02], [1223337600000, 12.74], [1223424000000, 12.83], [1223510400000, 12.68], [1223596800000, 13.8], [1223856000000, 15.75], [1223942400000, 14.87], [1224028800000, 13.99], [1224115200000, 14.56], [1224201600000, 13.91], [1224460800000, 14.06], [1224547200000, 13.07], [1224633600000, 13.84], [1224720000000, 14.03], [1224806400000, 13.77], [1225065600000, 13.16], [1225152000000, 14.27], [1225238400000, 14.94], [1225324800000, 15.86], [1225411200000, 15.37], [1225670400000, 15.28], [1225756800000, 15.86], [1225843200000, 14.76], [1225929600000, 14.16], [1226016000000, 14.03], [1226275200000, 13.7], [1226361600000, 13.54], [1226448000000, 12.87], [1226534400000, 13.78], [1226620800000, 12.89], [1226880000000, 12.59], [1226966400000, 12.84], [1227052800000, 12.33], [1227139200000, 11.5], [1227225600000, 11.8], [1227484800000, 13.28], [1227571200000, 12.97], [1227657600000, 13.57], [1227830400000, 13.24], [1228089600000, 12.7], [1228176000000, 13.21], [1228262400000, 13.7], [1228348800000, 13.06], [1228435200000, 13.43]];

const afterSetExtremes = (e, chartComponent) => {
    console.log(e);
}

//TODO: this should be handled better
const getChartName = {
    'hour': 'Average Voltage (Day)',
    'min': 'Average Voltage (Hour)',
    'sec': 'Average Voltage (Min)',
}

const getDrilldownData = (data) => {
    return data.map(el => {
        return {
            x: el[0],
            y: el[1],
            drilldown: true,
        }
    })
}

const getDrilldownSeries = (data) => {
    return {
        showInLegend: true,
        name: getChartName[data[0].step],
        data: data,
        tooltip: {
            valueDecimals: 2
        },
        // dataGrouping: {
        //     forced: true,
        //     units: [
        //         ['day', [1]]
        //     ]
        // },
    }
}

export default class LiveChart extends React.Component {
    chartComponent;
    options;
    timer;

    constructor (props) {
        super(props);
        this.chartComponent = React.createRef();
        this.options = {
            chart: {
                zoomType: 'xy',
                events: {
                    drilldown: (e) => {
                        const chart = this.chartComponent.current.chart;
                        const metaData = {
                            month: e.point.name,
                            drilldown: true,
                            step: e.point.step,
                            from: e.point.from,
                            to: e.point.to,
                        }
                        chart.showLoading('Retrieving Data...');
                        fetchHistoryDrilldownData(getHistoryFilters(metaData)).then((resp) => {
                            const transformedData = transformHistoryResponse(resp.data, metaData);
                            chart.hideLoading();
                            chart.addSeriesAsDrilldown(e.point, getDrilldownSeries(transformedData));
                        });
                    }
                }
            },
            title: {
                text: 'Historical Data'
            },
            legend : {
                enabled : true
            },
            scrollbar: {
                liveRedraw: false
            },
            xAxis: {
                events: {
                    afterSetExtremes: (e) => {
                        afterSetExtremes(e, this.chartComponent);
                    }
                },
            },
            series: [
                {
                    showInLegend: true,
                    name: 'Average Voltage (Month)',
                    data: this.props.historyData,
                    tooltip: {
                        valueDecimals: 2,
                    },
                    // dataGrouping: {
                    //     forced: true,
                    //     units: [
                    //         ['day', [1]]
                    //     ]
                    // },
                },
            ],
            drilldown: {
                series: []
            }
        };
    }

    render() {
        return (
            <Panel md={12} lg={12} xl={12} sm={12} xs={12} title='LIVE'>
                <div dir="ltr">
                    <ResponsiveContainer height={600} className="dashboard__area">
                        <HighchartsReact
                            containerProps={{style: {height: "100%"}}}
                            highcharts={Highcharts}
                            options={this.options}
                            constructorType="stockChart"
                            ref={this.chartComponent}
                        />
                    </ResponsiveContainer>
                </div>
            </Panel>
        )
    }
}
