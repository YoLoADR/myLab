import React, {Component} from 'react';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';

class SidebarContent extends Component {

  hideSidebar = () => {
    this.props.onClick();
  };

  render() {
    return (
      <div className='sidebar__content'>
        <ul className='sidebar__block'>
          <SidebarCategory title='Exemples de pages' icon='diamond'>
            <SidebarLink title='Page un' route='/pages/one' onClick={this.hideSidebar}/>
            <SidebarLink title='Page deux' route='/pages/two' onClick={this.hideSidebar}/>
          </SidebarCategory>
        </ul>
      </div>
    )
  }
}

export default SidebarContent;