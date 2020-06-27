import React from 'react';
import Highcharts from "highcharts/highstock";
import drilldown from "highcharts/modules/drilldown.js";
import Panel from "../../../shared/components/Panel";
import {ResponsiveContainer} from "recharts";
import HighchartsReact from "highcharts-react-official";
import {transformHistoryResponse, getHistoryFilters} from "../../../logic/historyManager";
import {fetchHistoryDrilldownData} from "../../../repositories/historyRepository";

const theme = {
    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
        backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
                [0, '#232329'],
                [1, '#232329']
            ]
        },
        style: {
            fontFamily: '\'Unica One\', sans-serif'
        },
        plotBorderColor: '#606063'
    },
    title: {
        style: {
            color: '#E0E0E3',
            textTransform: 'uppercase',
            fontSize: '15px'
        }
    },
    subtitle: {
        style: {
            color: '#E0E0E3',
            textTransform: 'uppercase'
        }
    },
    xAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
            style: {
                color: '#A0A0A3'
            }
        }
    },
    yAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
            style: {
                color: '#A0A0A3'
            }
        }
    },
    tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
            color: '#F0F0F0'
        }
    },
    plotOptions: {
        series: {
            dataLabels: {
                color: '#F0F0F3',
                style: {
                    fontSize: '13px'
                }
            },
            marker: {
                lineColor: '#333'
            }
        },
        boxplot: {
            fillColor: '#505053'
        },
        candlestick: {
            lineColor: 'white'
        },
        errorbar: {
            color: 'white'
        }
    },
    legend: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        itemStyle: {
            color: '#E0E0E3'
        },
        itemHoverStyle: {
            color: '#FFF'
        },
        itemHiddenStyle: {
            color: '#606063'
        },
        title: {
            style: {
                color: '#C0C0C0'
            }
        }
    },
    credits: {
        style: {
            color: '#666'
        }
    },
    labels: {
        style: {
            color: '#707073'
        }
    },
    drilldown: {
        activeAxisLabelStyle: {
            color: '#F0F0F3'
        },
        activeDataLabelStyle: {
            color: '#F0F0F3'
        }
    },
    navigation: {
        buttonOptions: {
            symbolStroke: '#DDDDDD',
            theme: {
                fill: '#505053'
            }
        }
    },
    // scroll charts
    rangeSelector: {
        buttonTheme: {
            fill: '#505053',
            stroke: '#000000',
            style: {
                color: '#CCC'
            },
            states: {
                hover: {
                    fill: '#707073',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                },
                select: {
                    fill: '#000003',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                }
            }
        },
        inputBoxBorderColor: '#505053',
        inputStyle: {
            backgroundColor: '#333',
            color: 'silver'
        },
        labelStyle: {
            color: 'silver'
        }
    },
    navigator: {
        handles: {
            backgroundColor: '#666',
            borderColor: '#AAA'
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(255,255,255,0.1)',
        series: {
            color: '#7798BF',
            lineColor: '#A6C7ED'
        },
        xAxis: {
            gridLineColor: '#505053'
        }
    },
    scrollbar: {
        barBackgroundColor: '#808083',
        barBorderColor: '#808083',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: '#606063',
        buttonBorderColor: '#606063',
        rifleColor: '#FFF',
        trackBackgroundColor: '#404043',
        trackBorderColor: '#404043'
    }
};
// Apply the theme
Highcharts.setOptions(theme);
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
    'hour': {
        voltage_ln_average: 'Average Voltage (Day)',
        frequency: 'Average Frequency (Day)',
        current_average: 'Average Current (Day)',
    },
    'min': {
        voltage_ln_average: 'Average Voltage (Hour)',
        frequency: 'Average Frequency (Hour)',
        current_average: 'Average Current (Hour)',
    },
    'sec': {
        voltage_ln_average: 'Average Voltage (Minute)',
        frequency: 'Average Frequency (Minute)',
        current_average: 'Average Current (Minute)',
    },
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
        name: getChartName[data[0].step][data[0].gauge],
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
            global: {
                useUTC: false
            },
            time: {
                /**
                 * Use moment-timezone.js to return the timezone offset for individual
                 * timestamps, used in the X axis labels and the tooltip header.
                 */
                getTimezoneOffset: function (timestamp) {
                    let d = new Date();
                    let timezoneOffset =  d.getTimezoneOffset()
                    return timezoneOffset;
                }
            },
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
                            key: e.point.gauge,
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
            tooltip: {
                split: false,
                shared: true,
            },
            xAxis: {
                events: {
                    afterSetExtremes: (e) => {
                        afterSetExtremes(e, this.chartComponent);
                    }
                },
            },
            series: [
                //TODO: this should be dynamic generation
                {
                    showInLegend: true,
                    name: 'Average Voltage (Month)',
                    data: this.props.historyData['voltage_ln_average'],
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
                {
                    showInLegend: true,
                    name: 'Average Frequency (Month)',
                    data: this.props.historyData['frequency'],
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
                {
                    showInLegend: true,
                    name: 'Average Current (Month)',
                    data: this.props.historyData['current_average'],
                    tooltip: {
                        valueDecimals: 2,
                    },
                    color: '#d46363',
                    // dataGrouping: {
                    //     forced: true,
                    //     units: [
                    //         ['day', [1]]
                    //     ]
                    // },
                }
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
