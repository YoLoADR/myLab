import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

class MainWrapper extends PureComponent {
  render() {
    return (
      <div>
        <div className={this.props.sidebar.collapse ? 'wrapper wrapper--full-width' : 'wrapper'}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default connect(state => {
  return {sidebar: state.sidebar}
})(MainWrapper);