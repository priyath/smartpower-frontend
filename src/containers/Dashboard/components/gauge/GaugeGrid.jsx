import * as React from "react";
import Grid from '@material-ui/core/Grid';
import GCard from './GCard';
import Gauge from './Gauge';

function GaugeGrid(props) {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
                <GCard title="Current Phase 1" avatar="G1" subheader="Current Phase 1">
                    <Gauge value={50.0}>

                    </Gauge>
                </GCard>
            </Grid>

            <Grid item xs={12} md={4}>
                <GCard title="Current Phase 2" avatar="G2" subheader="Unit 23/Middle Room">
                    <Gauge value={0.0}>

                    </Gauge>
                </GCard>
            </Grid>

            <Grid item xs={12} md={4}>
                <GCard title="Current Phase 3" avatar="G3" subheader="Unit F6-22/Boiler A">
                    <Gauge value={4}>

                    </Gauge>
                </GCard>
            </Grid>

            <Grid item xs={12} md={4}>
                <GCard title="Voltage Phase 1" avatar="G4" subheader="Unit B22/Room A1">
                    <Gauge value={0.0}>

                    </Gauge>
                </GCard>
            </Grid>

            <Grid item xs={12} md={4}>
                <GCard title="Voltage Phase 2" avatar="G5" subheader="Unit G7/Basement">
                    <Gauge value={0.0}>

                    </Gauge>
                </GCard>
            </Grid>

            <Grid item xs={12} md={4}>
                <GCard title="Voltage Phase 3" avatar="G6" subheader="Unit G8/Basement A">
                    <Gauge value={0.0}>

                    </Gauge>
                </GCard>
            </Grid>
        </Grid>
    );
}

export default GaugeGrid;