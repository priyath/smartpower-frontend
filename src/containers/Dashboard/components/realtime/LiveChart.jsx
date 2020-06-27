import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Panel from "../../../../shared/components/Panel";
import {ResponsiveContainer} from "recharts";
import {idealRangeColor, upperThresholdColor, lowerThresholdColor} from '../../../../logic/dashboard';
import Highcharts from "highcharts/highstock";

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
            fontSize: '20px'
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
                    text: '',
                    style: {
                        textTransform: 'uppercase',
                        fontSize: '15px'
                    }
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
                        color: idealRangeColor,
                        fillOpacity: 0.4,
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

        if (y > selectedGauge.upperThreshold) {
            chart.series[0].update({
                color: upperThresholdColor,
            }, false);
            chart.update({thresholdBreached: true}, false);
        } else if (y < selectedGauge.lowerThreshold) {
            chart.series[0].update({
                color: lowerThresholdColor,
            }, false);
            chart.update({thresholdBreached: true}, false);
        }
        else {
            if (thresholdBreached) {
                chart.series[0].update({
                    color: idealRangeColor,
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
                            highcharts={Highcharts}
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
