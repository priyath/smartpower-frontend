import {
    DISMISS_ALERT
} from '../actions/alertActions';
import {removeAlert} from '../../logic/alertManager';
import { fromJS } from 'immutable';

const initialState = {
    alerts: [
        {
            id: 0,
            ava: `${process.env.PUBLIC_URL}/img/topbar/ava.png`,
            name: 'Cristopher Changer',
            message: ' has started a new project',
            date: '09:02',
        },
        {
            id: 1,
            ava: `${process.env.PUBLIC_URL}/img/topbar/ava2.png`,
            name: 'Sveta Narry',
            message: ' has closed a project',
            date: '09:00',
        },
        {
            id: 2,
            ava: `${process.env.PUBLIC_URL}/img/topbar/ava3.png`,
            name: 'Lory McQueen',
            message: ' has started a new project as a Project Managert',
            date: '08:43',
        },
        {
            id: 3,
            ava: `${process.env.PUBLIC_URL}/img/topbar/ava2.png`,
            name: 'Cristopher Changer',
            message: ' has closed a project',
            date: '08:43',
        },
    ]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case DISMISS_ALERT:
            state = fromJS(state);
            return state
                .set('alerts', removeAlert(state.get('alerts').toJS(), action.payload.alertId))
                .toJS();
        default:
            return state;
    }
}
