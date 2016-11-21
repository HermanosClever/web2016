import { GET_US_INFO } from '../actions/us-actions';

function setUsInfo(newUsState) {
  return newUsState[0];
}

export default function usReducer(state = { }, action) {
  switch (action.type) {
		case GET_US_INFO:
      return setUsInfo(action.newUsState);
    default:
      return state;
  }
}
