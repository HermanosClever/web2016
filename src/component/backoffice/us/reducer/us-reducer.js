import { GET_US_INFO } from '../actions/us-actions';

function setUsInfo(newUsState) {
  return newUsState[0];
}

var defaultState = {
  tittle: 'Diseñamos buenas experiencias.',
  paragraph: '<p>Esto es un parrafo</p>',
  modules: [{
    id: 'UI/UX Design',
    tittle: 'UI/UX Design',
    paragraph: 'asdasd',
    img: 'https://daks2k3a4ib2z.cloudfront.net/56ab386e6204e5ff5f8b0e2e/570df92fa6123f7a3b4a5ccf_ui_ux_illustration.png'
  }]
};

export default function usReducer(state = defaultState, action) {
  switch (action.type) {
		case GET_US_INFO:
      return setUsInfo(action.newUsState);
    default:
      return state;
  }
}
