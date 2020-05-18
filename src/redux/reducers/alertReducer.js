import {
} from '../actions/alertActions';

const initialState = {
    notifications: [
        {
            ava: `${process.env.PUBLIC_URL}/img/topbar/ava.png`,
            name: 'Cristopher Changer',
            message: ' has started a new project',
            date: '09:02',
        },
        {
            ava: `${process.env.PUBLIC_URL}/img/topbar/ava2.png`,
            name: 'Sveta Narry',
            message: ' has closed a project',
            date: '09:00',
        },
        {
            ava: `${process.env.PUBLIC_URL}/img/topbar/ava3.png`,
            name: 'Lory McQueen',
            message: ' has started a new project as a Project Managert',
            date: '08:43',
        },
        {
            ava: `${process.env.PUBLIC_URL}/img/topbar/ava2.png`,
            name: 'Cristopher Changer',
            message: ' has closed a project',
            date: '08:43',
        },
    ]
};

export default function (state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
