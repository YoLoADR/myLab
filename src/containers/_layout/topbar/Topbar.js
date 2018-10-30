import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarProfile from './TopbarProfile';

export default class Topbar extends PureComponent {
  static propTypes = {
    changeMobileSidebarVisibility: PropTypes.func,
    changeSidebarVisibility: PropTypes.func,
  };

  render() {
    let {changeMobileSidebarVisibility, changeSidebarVisibility} = this.props;

    return (
      <div className='topbar'>
        <div className='topbar__wrapper'>
          <TopbarSidebarButton
            changeMobileSidebarVisibility={changeMobileSidebarVisibility}
            changeSidebarVisibility={changeSidebarVisibility}
          />
          <Link className='topbar__logo' to='/'/>
          <div className='topbar__right'>
            <TopbarProfile/>
          </div>
        </div>
      </div>
    )
  }
}