import { GET_CONTACT_INFO } from '../actions/contact-actions';

function setContact(newContactState) {
  return newContactState[0];
}

export default function contactReducer(state = { street: '', facebook: '', twitter: '', email: '', phone: '' }, action) {
  switch (action.type) {
    case GET_CONTACT_INFO:
      return setContact(action.newContactState);
    default:
      return state;
  }
}
