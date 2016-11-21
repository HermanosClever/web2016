import { connect } from 'react-redux';

import Contact from './contact';
import * as contactActions from './actions/contact-actions';

export default connect(
  state => ({ contactInfo: state.contactReducer }),
  contactActions
)(Contact);
