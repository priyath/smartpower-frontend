import * as React from "react";
import Grid from '@material-ui/core/Grid';
import GCard from './GCard';
import Gauge from './Gauge';

function GaugeGrid(props) {

    const { gauges, onGaugeSelect } = props;

    return (
        <Grid container spacing={1} className="dashboard__gauge">
            {
                gauges.map((gauge)=>(
                    <Grid item xs={12} md={4}>
                        <GCard id={gauge.id} title={gauge.title} avatar={gauge.avatar} selected={gauge.selected} onGaugeSelect={onGaugeSelect}>
                            <Gauge gaugeObject={gauge}>
                            </Gauge>
                        </GCard>
                    </Grid>
                ))
            }
        </Grid>
    );
}

export default GaugeGrid;
