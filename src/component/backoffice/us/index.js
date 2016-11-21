import { connect } from 'react-redux';

import Us from './us';
import * as usActions from './actions/us-actions';

export default connect(
  state => ({ usInfo: state.usReducer }),
  usActions
)(Us);
