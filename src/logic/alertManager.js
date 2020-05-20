import {getUniqueDataPoints} from "./dashboard";
import { v4 as uuidv4 } from 'uuid';

const ALERT_INTERVAL = 10;

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
        ava: `${process.env.PUBLIC_URL}/img/topbar/ava2.jpg`,
        name: scantype,
        message: ' has exceeded threshold.',
        date: h + ":" + m + ":" + s,
    }
}

const isDiffGreaterThanXmins = (currentTimestamp, lastAlertTimestamp) => {
    const diff = currentTimestamp - lastAlertTimestamp;
    return diff/60000 > ALERT_INTERVAL;
}

export const retrieveNewAlerts = (thresholds, realtimeData, timeSinceLastAlert) => {
    const dataPoints = getUniqueDataPoints(realtimeData);
    let newAlerts = [];

    dataPoints.forEach((datapoint) => {
        const scantype = datapoint.scantype;
        const lastAlertTimestamp = timeSinceLastAlert[scantype];

        if (isDiffGreaterThanXmins(Date.now(), lastAlertTimestamp)){
            const threshold = retrieveThresholdsBasedOnScanType(thresholds, datapoint.scantype);
            if (datapoint.readingvalue > threshold.upperthreshold){
                newAlerts.push(buildNotification(datapoint, datapoint.scantype));
                timeSinceLastAlert[scantype] = Date.now();
            }
        }
    })
    return {newAlerts, timeSinceLastAlert};
}

// {
//     "alerthour": "10",
//     "alertminute": "9",
//     "alertdate": "2020-05-19 04:39:49",
//     "alertdescription": "Power analyzer indicates an alert at LOLC Head Office -01 -Voltage L N avg is 231.61 upper thresould is :230 and lower thresould is :210",
//     "alertstatus": "Active",
//     "location": "LOLC Head Office -01",
//     "scantype": "Voltage L N avg",
//     "readingvalue": 231.61,
//     "primarycontact": "",
//     "primaryemail": "",
//     "secondarycontact": "",
//     "secondaryemail": "",
//     "cameraurl": ""
// }


export const transformAlertToPersist = (alert) => {
    console.log('ALERT: ', alert);
}
