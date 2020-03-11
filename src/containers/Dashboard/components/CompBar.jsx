import React from 'react';
import {
    HorizontalGridLines,
    VerticalBarSeries,
    VerticalGridLines,
    XAxis,
    FlexibleWidthXYPlot,
    YAxis,
} from 'react-vis';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const CompBar = ({ t }) => (
        <div>
                <div className="card__title">
                </div>
                <div className="react-vis" dir="ltr">
                    <FlexibleWidthXYPlot
                        xType="ordinal"
                        height={500}
                        xDistance={100}
                    >
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis />
                        <VerticalBarSeries
                            data={[
                                { x: 'A', y: 10 },
                                { x: 'B', y: 5 },
                                { x: 'C', y: 15 },
                                { x: 'D', y: 15 },
                                { x: 'E', y: 15 },
                            ]}
                            color="#70bbfd"
                        />
                        <VerticalBarSeries
                            data={[
                                { x: 'A', y: 12 },
                                { x: 'B', y: 2 },
                                { x: 'C', y: 11 },
                                { x: 'D', y: 11 },
                                { x: 'E', y: 11 },
                            ]}
                            color="#c88ffa"
                        />
                    </FlexibleWidthXYPlot>
                </div>
        </div>
);

CompBar.propTypes = {
    t: PropTypes.func.isRequired,
};

export default withTranslation('common')(CompBar);
