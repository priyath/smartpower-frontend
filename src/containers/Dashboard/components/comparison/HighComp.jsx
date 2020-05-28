import React from 'react';
import HighchartsReact from "highcharts-react-official";

export default class HighComp extends React.Component {
    chartComponent;

    constructor (props) {
        super(props);
        this.chartComponent = React.createRef();
    }

    render() {
        if (this.chartComponent.current) {
            if (this.props.fetching) {
                this.chartComponent.current.chart.showLoading();
            } else {
                this.chartComponent.current.chart.hideLoading();
            }
        }
        return (
            <HighchartsReact
                containerProps={{style: {height: "100%"}}}
                options={this.props.chartConfig}
                ref={this.chartComponent}
                updateArgs={[true]}
            />
        )
    }
}
