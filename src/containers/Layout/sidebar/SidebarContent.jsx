import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';

class SidebarContent extends Component {
  static propTypes = {
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = () => {
    const { onClick } = this.props;
    onClick();
  };

  render() {
   // const { changeToDark, changeToLight } = this.props;
    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          <SidebarLink title="Dashboard" icon="home" route="/dashboard" onClick={this.hideSidebar} />
          <SidebarLink title="History" icon="home" route="/history" onClick={this.hideSidebar} />
          <SidebarLink title="Branch Summary" icon="home" route="/branches" onClick={this.hideSidebar} />
          <SidebarLink title="Locations" icon="home" route="/locations" onClick={this.hideSidebar} />
          <SidebarCategory title="Control Panel" icon="menu">
            <SidebarLink title="User List" route="/control_panel/users" onClick={this.hideSidebar} />
            <SidebarLink title="Add User" route="/control_panel/users_add" onClick={this.hideSidebar} />
            <SidebarLink title="Settings" route="/settings" onClick={this.hideSidebar} />
          </SidebarCategory>
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
