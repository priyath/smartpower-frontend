import React from 'react';
import Highcharts from "highcharts/highstock";
import Panel from "../../../../shared/components/Panel";
import {ResponsiveContainer} from "recharts";
import HighchartsReact from "highcharts-react-official";

export default class HighComp extends React.Component {
    chartComponent;
    options;
    timer;

    constructor (props) {
        super(props);
        this.chartComponent = React.createRef();
        this.options = {
            chart: {
              type: 'column'
            },
            title: {
                text: 'Historical Data'
            },
            xAxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Energy (kWh)'
                }
            },
            legend : {
                enabled : true
            },
            series: [{
                name: 'Tokyo',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

            }, {
                name: 'New York',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

            }]
        };
    }

    render() {
        return (
            <HighchartsReact
                containerProps={{style: {height: "100%"}}}
                options={this.options}
            />
        )
    }
}
