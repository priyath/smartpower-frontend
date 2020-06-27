import React from 'react'
import {RadialGauge} from 'canvas-gauges'
import {getTickInterval, getHighlights} from '../../../../logic/dashboard';

class ReactRadialGauge extends React.Component {
  componentDidMount () {
    const startValue = this.props.gaugeObject.startValue;
    const endValue = this.props.gaugeObject.endValue;
    const tickInterval = this.props.gaugeObject.tickInterval;

    const options = Object.assign({}, this.props, {
      renderTo: this.el,
      width: 140,
      title: "HEXILON",
      height: 140,
      units:"",
      minValue: startValue,
      maxValue: endValue,
      majorTicks: getTickInterval(startValue, endValue, tickInterval),
      strokeTicks: true,
      highlights: getHighlights(this.props.gaugeObject),
      colorPlate:"#232329",
      borderShadowWidth: 0,
      valueBox: true,
      valueInt: 3,
      needleType: "arrow",
      needleWidth: 2,
      needleCircleSize: 7,
      colorValueBoxRect: "#fff",
      needleCircleOuter: true,
      needleCircleInner: false,
      animationDuration: 700,
      animationRule:"linear",
      colorBorderOuter: '#29663c',
      colorBorderOuterEnd: '#232329',
      colorBorderMiddle: '#232329',
      colorBorderMiddleEnd: '#232329',
      colorBorderInner: '#232329',
      colorBorderInnerEnd: '#232329',
      colorNumbers: '#5de2c5'
    });
    this.gauge = new RadialGauge(options).draw()
  }

  componentWillReceiveProps (nextProps) {
    this.gauge.value = nextProps.gaugeObject.value;
    this.gauge.update(nextProps);
  }

  render () {
    return (
      <canvas class="dashboard__gauge-grid-gauge" ref={(canvas) => {
        this.el = canvas
      }} />
    )
  }
}

export default ReactRadialGauge
