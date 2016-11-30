import axios from 'axios';

export const SET_PROJECT_STATE = 'SET_PROJECT_STATE';

export function getProjectState() {
	return (dispatch, getState) => {
    axios.get('http://localhost:3007/api/projects')
    .then((response) => {
      dispatch( { 
				type: SET_PROJECT_STATE, 
				newProjectState : response.data
      }, getState());
    });
  };
};

export function addProject(newProjectState, id) {
	return () => {
		axios.post('http://localhost:3007/api/project/' + id, 
			newProjectState);
	};
};
