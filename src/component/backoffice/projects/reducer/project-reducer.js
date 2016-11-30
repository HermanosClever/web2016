import { SET_PROJECT_STATE } from '../actions/project-actions';

function setProjectStateInfo(newProjectState) {
  return newProjectState[0];
}

export default function projectReducer(state = { projects: [] }, action) {
  switch (action.type) {
		case SET_PROJECT_STATE:
      return setProjectStateInfo(action.newProjectState);
    default:
      return state;
  }
}
