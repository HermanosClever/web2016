import { connect } from 'react-redux';

import Clients from './clients';
import * as clientsActions from './actions/clients-actions';

export default connect(
  state => ({ clientsInfo: state.clientsReducer }),
  clientsActions
)(Clients);
