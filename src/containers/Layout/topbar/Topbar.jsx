import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarProfile from './TopbarProfile';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import ChevronDownIcon from "mdi-react/ChevronDownIcon";

class Topbar extends PureComponent {
  static propTypes = {
    changeMobileSidebarVisibility: PropTypes.func.isRequired,
    changeSidebarVisibility: PropTypes.func.isRequired,
  };

  changeSelectedBranch(e, idx) {
    this.props.updateBranchSelection(idx);
  }

  render() {
    const { topbar, changeMobileSidebarVisibility, changeSidebarVisibility } = this.props;
    const branchDetails = topbar.branchDetails;
    const selectedBranchIdx = topbar.selectedBranchIdx;

    return (
      <div className="topbar">
        <div className="topbar__wrapper">
          <div className="topbar__left">
            <TopbarSidebarButton
              changeMobileSidebarVisibility={changeMobileSidebarVisibility}
              changeSidebarVisibility={changeSidebarVisibility}
            />
            <Link className="topbar__logo" to="/dashboard" />
            <UncontrolledDropdown>
              {
                branchDetails ?
                  <div>
                    <DropdownToggle className="icon icon--right dashboard-comp-dropdown-menu" outline>
                      <p className="topbar__branch_selection_label">{branchDetails[selectedBranchIdx].location}<ChevronDownIcon /></p>
                    </DropdownToggle>
                    <DropdownMenu>
                      {
                        branchDetails ? branchDetails.map((branch, idx)=> {
                          return (
                              <DropdownItem key={idx} onClick={(e)=>this.changeSelectedBranch(e, idx)}>{branch.location}</DropdownItem>
                          )
                        }) :  <DropdownItem>Loading</DropdownItem>
                      }
                    </DropdownMenu>
                  </div> :
                  <DropdownToggle className="icon icon--right dashboard-comp-dropdown-menu" outline>
                    <p className="topbar__branch_selection_label">LOADING BRANCHES ...</p>
                  </DropdownToggle>
              }
            </UncontrolledDropdown>
          </div>
          <div className="topbar__right">
            <TopbarProfile />
          </div>
        </div>
      </div>
    );
  }
}

export default Topbar;
