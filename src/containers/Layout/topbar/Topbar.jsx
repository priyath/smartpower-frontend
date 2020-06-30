import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarProfile from './TopbarProfile';
import TopbarNotification from './TopbarNotification';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import ChevronDownIcon from "mdi-react/ChevronDownIcon";
import TopbarLanguage from "./TopbarLanguage";

class Topbar extends PureComponent {
  static propTypes = {
    changeMobileSidebarVisibility: PropTypes.func.isRequired,
    changeSidebarVisibility: PropTypes.func.isRequired,
  };

  changeSelectedBranch(e, idx) {
    this.props.updateBranchSelection(idx);
  }

  render() {
    const { topbar, alert, changeMobileSidebarVisibility, changeSidebarVisibility, dismissAlert } = this.props;
    const branchDetails = topbar.branchDetails;
    const selectedBranchIdx = topbar.selectedBranchIdx;
    const location = branchDetails ? branchDetails[selectedBranchIdx].location : '';

    return (
      <div className="topbar">
        <div className="topbar__wrapper">
          <div className="topbar__left">
            <TopbarSidebarButton
              changeMobileSidebarVisibility={changeMobileSidebarVisibility}
              changeSidebarVisibility={changeSidebarVisibility}
            />
            <Link className="topbar__logo" to="/dashboard" />
            {/*<UncontrolledDropdown>*/}
            {/*  {*/}
            {/*    branchDetails ?*/}
            {/*        <div>*/}
            {/*          <DropdownToggle className="icon icon--right dashboard-comp-dropdown-menu" outline>*/}
            {/*            <p className="topbar__branch_selection_label">{location}<ChevronDownIcon /></p>*/}
            {/*          </DropdownToggle>*/}
            {/*          <div className="topbar__dropdown">*/}
            {/*            <DropdownMenu>*/}
            {/*              {*/}
            {/*                branchDetails ? branchDetails.map((branch, idx)=> {*/}
            {/*                  return (*/}
            {/*                      <DropdownItem key={idx} onClick={(e)=>this.changeSelectedBranch(e, idx)}>{branch.location}</DropdownItem>*/}
            {/*                  )*/}
            {/*                }) :  <DropdownItem>Loading</DropdownItem>*/}
            {/*              }*/}
            {/*            </DropdownMenu>*/}
            {/*          </div>*/}
            {/*        </div> :*/}
            {/*        <DropdownToggle className="icon icon--right dashboard-comp-dropdown-menu" outline>*/}
            {/*          <p className="topbar__branch_selection_label">LOADING BRANCHES ...</p>*/}
            {/*        </DropdownToggle>*/}
            {/*  }*/}
            {/*</UncontrolledDropdown>*/}
            {
              <TopbarLanguage location={location} branchDetails={branchDetails} updateBranchSelection={this.props.updateBranchSelection}/>
            }
          </div>
          <div className="topbar__right">
            <TopbarNotification alert={alert} dismissAlert={dismissAlert} location={location} />
            <TopbarProfile />
          </div>
        </div>
      </div>
    );
  }
}

export default Topbar;
