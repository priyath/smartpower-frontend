import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Topbar from './topbar/Topbar';
import Sidebar from './sidebar/Sidebar';

import { changeThemeToDark, changeThemeToLight } from '../../redux/actions/themeActions';
import { changeMobileSidebarVisibility, changeSidebarVisibility } from '../../redux/actions/sidebarActions';
import { loadBranchDetails, updateBranchSelection } from '../../redux/actions/topbarActions';
import { SidebarProps } from '../../shared/prop-types/ReducerProps';

class Layout extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebar: SidebarProps.isRequired,
  };

  changeSidebarVisibility = () => {
    const { dispatch } = this.props;
    dispatch(changeSidebarVisibility());
  };

  changeMobileSidebarVisibility = () => {
    const { dispatch } = this.props;
    dispatch(changeMobileSidebarVisibility());
  };

  changeToDark = () => {
    const { dispatch } = this.props;
    dispatch(changeThemeToDark());
  };

  changeToLight = () => {
    const { dispatch } = this.props;
    dispatch(changeThemeToLight());
  };

  updateBranchSelection = (idx) => {
    const { dispatch } = this.props;
    dispatch(updateBranchSelection(idx));
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadBranchDetails());
  }

  render() {
    const { sidebar, topbar, alert } = this.props;
    const layoutClass = classNames({
      layout: true,
      'layout--collapse': sidebar.collapse,
    });

    return (
      <div className={layoutClass}>
        <Topbar
          topbar={topbar}
          alert={alert}
          changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
          changeSidebarVisibility={this.changeSidebarVisibility}
          updateBranchSelection={this.updateBranchSelection}
        />
        <Sidebar
          sidebar={sidebar}
          changeToDark={this.changeToDark}
          changeToLight={this.changeToLight}
          changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sidebar: state.sidebar,
  topbar: state.topbar,
  alert: state.alert,
});

const mapDispatchToProps = (dispatch) => ({
});

export default withRouter(connect(mapStateToProps)(Layout));
