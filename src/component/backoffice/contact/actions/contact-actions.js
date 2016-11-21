import axios from 'axios';

export const GET_CONTACT_INFO = 'GET_CONTACT_INFO';

export function getContact() {
	return (dispatch, getState) => {
    axios.get('http://localhost:3007/api/contact')
    .then((response) => {
      dispatch( { 
				type: GET_CONTACT_INFO, 
				newContactState : response.data
      }, getState());
    });
  };
};

export function putContact(newContactState) {
	return () => {
		axios.put('http://localhost:3007/api/contact', 
			newContactState);
	};
};
