import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Panel from "../../../../shared/components/Panel";
import {ResponsiveContainer} from "recharts";
import {getThresholdData} from "../../../../logic/dashboard";

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
                    plotLines: [{
                        color: 'rgba(255,0,0,0.37)', // Color value
                        dashStyle: 'solid', // Style of the plot line. Default to solid
                        value: props.data.upperThreshold, // Value of where the line will appear
                        width: 1.5, // Width of the line
                        zIndex: 5,
                        // style: {
                        //     display: 'none'
                        // },
                        // label: {
                        //     text: 'Upper Threshold',
                        //     align: 'left',
                        //     y: 20
                        // },
                        // events: {
                        //     mouseover: function (e) {
                        //         this.label.element.style.display='block';
                        //     },
                        //     mouseout: function (e) {
                        //         this.label.element.style.display='none';
                        //     }
                        // }
                    },
                    {
                        color: 'rgba(255,0,0,0.37)', // Color value
                        dashStyle: 'solid', // Style of the plot line. Default to solid
                        value: props.data.lowerThreshold, // Value of where the line will appear
                        width: 1.5, // Width of the line
                        zIndex: 5,
                        // style: {
                        //     display: 'none'
                        // },
                        // label: {
                        //     text: 'Upper Threshold',
                        //     align: 'left',
                        //     y: 20
                        // },
                        // events: {
                        //     mouseover: function (e) {
                        //         this.label.element.style.display='block';
                        //     },
                        //     mouseout: function (e) {
                        //         this.label.element.style.display='none';
                        //     }
                        // }
                    }
                    ]
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
                    }
                ],
                selectedGaugeIdx: null,
                selectedBranchIdx: null,
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

        //unchanged updates
        if(selectedGaugeIdx === previousSelectedGaugeIdx) {
            const y = realtimeData[realtimeData.length - 1];
            chart.series[0].addPoint(y, true, true);
        }
        //gauge changed
        else {
            chart.update({selectedGaugeIdx: selectedGaugeIdx}, false);
            chart.setTitle({text: selectedGauge.title});
            chart.series[0].setData(realtimeData);
            chart.yAxis[0].options.plotLines[0].value = selectedGauge.upperThreshold;
            chart.yAxis[0].options.plotLines[1].value = selectedGauge.lowerThreshold;
            chart.yAxis[0].update();

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
