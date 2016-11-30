import axios from 'axios';

export const GET_US_INFO = 'GET_US_INFO';

export function getUsInfo() {
  return (dispatch, getState) => {
    axios.get('http://localhost:3007/api/us')
    .then((response) => {
      dispatch( { 
        type: GET_US_INFO, 
        newUsState : response.data
      }, getState());
    });
  };
};

export function saveModule(newModule, id) {
	return (dispatch, getState) => {
		axios.post('http://localhost:3007/api/us/modules/' + id, newModule)
    .then(() => {
      dispatch(getUsInfo());
    });
  };
}

export function deleteModule(id, idModule) {
  return (dispatch, getState) => {
    axios.put('http://localhost:3007/api/us/modules/' + id, { id : idModule })
    .then(()=>{
      dispatch(getUsInfo());
    }); 
  };
}

export function updateModule(id, newModule) {
  return (dispatch, getState) => {
    axios.put('http://localhost:3007/api/us/updateModule/' + id, newModule)
    .then(()=>{
      dispatch(getUsInfo());
    });
  };
}

export function updateUs(id, newUs) {
  return (dispatch, getState) => {
    axios.put('http://localhost:3007/api/us/updateus/' + id, newUs)
    .then(()=>{
      dispatch(getUsInfo());
    });
  };
}
