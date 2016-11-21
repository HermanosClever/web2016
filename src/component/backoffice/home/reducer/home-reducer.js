import { GET_HOME_INFO } from '../actions/home-actions';

function setHomeInfo(newContactState) {
  return newContactState[0];
}

export default function homeReducer(state = { tittle: '', description: '', slider1: '', slider2: '', slider3: '', slider4: '' }, action) {
  switch (action.type) {
		case GET_HOME_INFO:
      return setHomeInfo(action.newHomeState);
    default:
      return state;
  }
}
