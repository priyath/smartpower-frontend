import {getUniqueDataPoints} from "./dashboard";
import { v4 as uuidv4 } from 'uuid';

export const removeAlert = (alerts, id) => {
    return alerts.filter(alert => {
        return alert.id !== id;
    })
}

export const retrieveThresholdsBasedOnScanType = (thresholds, scantype) => {
  for (let i = 0; i <= thresholds.length; i++) {
      if (thresholds[i].scantypeid === scantype){
          return thresholds[i];
      }
  }
};

// cameraid: ""
// divvalue: 1
// primarymobile: ""
// secondaryemail: ""
// upperthreshold: 230
// cameraurl: ""
// lowerthreshold: 210
// secondarycontact: ""
// phlocation: ""
// alertstatus: 0
// startvalue: 200
// scantypeid: "Voltage L N avg"
// ticinterval: 5
// endvalue: 240
// secondarymobile: ""
// ActiveStatus: 1
// controlid: "3"
// primaryemail: ""
// scancategory: "1"
// idealvalue: 220
// Description: "Line to Neutral Voltage"
// scanmethod: 1
// primarycontact: ""
//
// controlid: "6"
// scantype: "Current Average"
// readingvalue: 0
// LogDateString: "2020-05-17T11:02:22.000Z"
// location: "LOLC Head Office -01"
// upperthreshold: 15
// lowerthreshold: 5
// idealvalue: 6.5
// primarycontact: ""
// primaryemail: ""
// secondarycontact: ""
// secondaryemail: ""
// cameraurl: ""

export const buildNotification = (datapoint, scantype) => {
    let d = new Date();
    let h = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    let m = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    let s = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
    return {
        id: uuidv4(),
        ava: `${process.env.PUBLIC_URL}/img/topbar/ava2.png`,
        name: scantype,
        message: ' has exceeded threshold.',
        date: h + ":" + m + ":" + s,
    }
}

export const addAlerts = (alerts, thresholds, realtimeData) => {
    const dataPoints = getUniqueDataPoints(realtimeData);

    dataPoints.forEach((datapoint) => {
        const threshold = retrieveThresholdsBasedOnScanType(thresholds, datapoint.scantype);
        if (datapoint.readingvalue > threshold.upperthreshold){
            alerts.push(buildNotification(datapoint, datapoint.scantype));
        }
    })
    return alerts;
}
