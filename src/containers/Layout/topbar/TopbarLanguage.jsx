import React, { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import {Collapse} from 'reactstrap';
import DownIcon from 'mdi-react/ChevronDownIcon';
import PropTypes from 'prop-types';

const DropdownBranch = ({location}) => (
    <span className="topbar__language-btn-title">
    <span>{location}</span>
  </span>
);

class TopbarLanguage extends PureComponent {
    static propTypes = {
        i18n: PropTypes.shape({ changeLanguage: PropTypes.func }).isRequired,
    };

    constructor() {
        super();
        this.state = {
            collapse: false,
            mainButtonContent: <DropdownBranch location='Loading Branches ...'/>,
        };
    }

    toggle = () => {
        this.setState(prevState => ({ collapse: !prevState.collapse }));
    };

    changeSelectedBranch(e, idx) {
        this.toggle();
        this.props.updateBranchSelection(idx);
    }

    render() {
        const { collapse } = this.state;
        const { branchDetails, location } = this.props;

        return (
            branchDetails ?
            <div className="topbar__language topbar__collapse topbar__collapse--language">
                <button className="topbar__btn topbar__dropdown-main-content" type="button" onClick={this.toggle}>
                    {location}
                    <DownIcon className="topbar__icon"/>
                </button>
                {collapse && <button className="topbar__back" type="button" onClick={this.toggle}/>}
                <Collapse
                isOpen={collapse}
                className="topbar__collapse-content topbar__collapse-content--language"
                >
                {
                    branchDetails ? branchDetails.map((branch, idx) => {
                        return (
                            <button
                                className="topbar__language-btn"
                                type="button"
                                onClick={(e) => this.changeSelectedBranch(e, idx)}
                            >
                                <DropdownBranch key={idx} location={branch.location}/>
                            </button>
                        )
                    }) : <button
                        className="topbar__language-btn"
                        type="button"
                        onClick={() => this.changeLanguage('en')}
                    >
                        <DropdownBranch key={0} location={'Loading..'}/>
                    </button>
                }
                </Collapse>
            </div> :
                <div className="topbar__language topbar__collapse topbar__collapse--language">
                    <button className="topbar__btn topbar__dropdown-main-content" type="button" onClick={this.toggle}>
                        Loading Branches ...
                        <DownIcon className="topbar__icon"/>
                    </button>
                </div>
        );
    }
}

export default withTranslation('common')(TopbarLanguage);
