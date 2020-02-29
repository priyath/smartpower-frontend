import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';

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
          <SidebarLink title="Control Panel" icon="home" route="/control_panel" onClick={this.hideSidebar} />
          <SidebarLink title="Locations" icon="home" route="/locations" onClick={this.hideSidebar} />
          <SidebarLink title="Log In" icon="exit" route="/log_in" onClick={this.hideSidebar} />
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
