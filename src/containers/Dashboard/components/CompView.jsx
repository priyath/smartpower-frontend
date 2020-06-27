import React from 'react';
import Panel from "../../../shared/components/Panel";
import HighComp from "./comparison/HighComp";
import {ResponsiveContainer} from "recharts";
import { withTranslation } from 'react-i18next';
import {connect} from "react-redux";
import CompControl from "./comparison/CompControl";
import { Row } from 'reactstrap';
import {fetchComparisonData} from "../../../repositories/dashboardRepository";
import {getCompKeys, getCompData} from "../../../logic/dashboard";

class CompView extends React.Component {

    constructor (props) {
        super(props);
        this.chartComponent = React.createRef();
        this.state = {
            chartConfig: this.getChartConfig(),
            fetching: true,
            initialLoad: false,
        }
        this.getComparisonData = this.getComparisonData.bind(this);
    }

    getComparisonData(comparisonFilters) {
        this.setState({fetching: true});
        fetchComparisonData(comparisonFilters).then((res) => {
            const keys = getCompKeys(res.data);
            const fromData = getCompData(res.data.fromDateEnergyData);
            const toData = getCompData(res.data.toDateEnergyData);
            this.setState({chartConfig: this.getChartConfig(keys, fromData, toData), fetching: false, initialLoad: true});
        })
    }

    componentDidMount() {
        //this.getComparisonData();
    }

    getChartConfig(categories=[], fromDataSet=[], toDataSet=[]) {
        return {
            chart: {
                type: 'column',
            },
            title: {
                text: 'Comparison of Energy Consumption'
            },
            xAxis: {
                categories: categories
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
                name: 'Dataset 1',
                data: fromDataSet,
                tooltip: {
                    valueDecimals: 2,
                },
                color: '#126e9c',
            }, {
                name: 'Dataset 2',
                data: toDataSet,
                tooltip: {
                    valueDecimals: 2,
                },
                color: '#8d2d2d',
            }]
        };
    }

    render() {
        const { t, dir, themeName, compKeys } = this.props;
        const tempStyle = {
            textAlign: 'center',
        }
        return (
            <Row>
                <CompControl
                    getComparisonData={this.getComparisonData}
                />
                <Panel md={12} lg={12} xl={12} sm={12} xs={12} title={t('dashboard.comp_view')}>
                    <ResponsiveContainer height={600}>
                        { !this.state.initialLoad ? <div style={tempStyle}>Retrieving Data...</div> :
                            <HighComp
                                compKeys={compKeys}
                                chartConfig={this.state.chartConfig}
                                fetching={this.state.fetching}
                            />
                        }
                    </ResponsiveContainer>
                </Panel>
            </Row>
        )
    }
}

export default connect(state => ({ themeName: state.theme.className }))(withTranslation('common')(CompView));
