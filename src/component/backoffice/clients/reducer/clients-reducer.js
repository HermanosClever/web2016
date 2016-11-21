import { GET_CLIENTS_INFO } from '../actions/clients-actions';

function setClients(newClientsState) {
  return newClientsState.slice();
}

export default function clientsReducer(state = [], action) {
  switch (action.type) {
    case GET_CLIENTS_INFO:
      return setClients(action.newClientsState);
    default:
      return state;
  }
}
