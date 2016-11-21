import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

import counterReducer from 'component/counter/reducer/counter-reducer';
import contactReducer from 'component/backoffice/contact/reducer/contact-reducer';
import homeReducer from 'component/backoffice/home/reducer/home-reducer';
import clientsReducer from 'component/backoffice/clients/reducer/clients-reducer';

export default combineReducers({
  counterReducer,
  contactReducer,
  clientsReducer,
  homeReducer,

  routing: routeReducer
});

