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

  changeSelectedBranch(e) {
    console.log(e.currentTarget);
  }

  render() {
    const { topbar, changeMobileSidebarVisibility, changeSidebarVisibility } = this.props;
    const branchDetails = topbar.branchDetails;

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
                      <p className="topbar__branch_selection_label">SELECT BRANCH <ChevronDownIcon /></p>
                    </DropdownToggle>
                    <DropdownMenu>
                      {
                        branchDetails ? branchDetails.map(branch => {
                          return (
                              <DropdownItem onClick={(e)=>this.changeSelectedBranch(e)}>{branch.location}</DropdownItem>
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
