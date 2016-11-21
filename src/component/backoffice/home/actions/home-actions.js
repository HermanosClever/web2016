import axios from 'axios';

export const GET_HOME_INFO = 'GET_HOME_INFO';

export function getHomeInfo() {
	return (dispatch, getState) => {
    axios.get('http://localhost:3007/api/backoffice-home')
    .then((response) => {
      dispatch( { 
				type: GET_HOME_INFO, 
				newHomeState : response.data
      }, getState());
    });
  };
};

export function putHome(newHomeState) {
	return () => {
		axios.put('http://localhost:3007/api/backoffice-home', 
			newHomeState);
	};
};
