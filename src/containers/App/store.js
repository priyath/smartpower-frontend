import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as reduxFormReducer } from 'redux-form';
import { sidebarReducer, themeReducer, rtlReducer, dashboardReducer, topbarReducer, alertReducer } from '../../redux/reducers/index';

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  sidebar: sidebarReducer,
  rtl: rtlReducer,
  dashboard: dashboardReducer,
  topbar: topbarReducer,
  alert: alertReducer,
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;
