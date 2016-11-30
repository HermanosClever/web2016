import { connect } from 'react-redux';

import Projects from './projects';
import * as projectActions from './actions/project-actions';

export default connect(
  state => ({ projectInfo: state.projectReducer }),
  projectActions
)(Projects);
