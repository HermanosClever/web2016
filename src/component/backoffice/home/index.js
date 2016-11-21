import { connect } from 'react-redux';

import Home from './home';
import * as homeActions from './actions/home-actions';

export default connect(
  state => ({ homeInfo: state.homeReducer }),
  homeActions
)(Home);
