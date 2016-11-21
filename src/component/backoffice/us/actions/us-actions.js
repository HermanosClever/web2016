import axios from 'axios';

export const GET_US_INFO = 'GET_US_INFO';

export function getUsInfo() {
  return (dispatch, getState) => {
    axios.get('http://localhost:3007/api/client')
    .then((response) => {
      
      dispatch( { 
        type: GET_US_INFO, 
        newUsState : response.data
      }, getState());
    });
  };
};
