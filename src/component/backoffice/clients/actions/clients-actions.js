import axios from 'axios';

export const GET_CLIENTS_INFO = 'GET_CLIENTS_INFO';

export function getClients() {
  return (dispatch, getState) => {
    axios.get('http://localhost:3007/api/client')
    .then((response) => {
      
      dispatch( { 
        type: GET_CLIENTS_INFO, 
        newClientsState : response.data
      }, getState());
    });
  };
};

export function saveClient(newClient) {
	return (dispatch, getState) => {
		axios.post('http://localhost:3007/api/client', newClient)
    .then(()=>{
      dispatch(getClients());
    });
	};
};

export function updateClient(client) {
	return (dispatch, getState) => {
		axios.put('http://localhost:3007/api/client/' + client._id, client)
		.then(()=>{
      dispatch(getClients());
		});	
	};
}

export function deleteClient(id) {
  return (dispatch, getState) => {
    axios.delete('http://localhost:3007/api/client/' + id)
    .then(()=>{
      dispatch(getClients());
    }); 
  };
}
