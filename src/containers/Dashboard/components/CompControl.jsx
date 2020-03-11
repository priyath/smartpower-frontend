import React, { PureComponent } from 'react';
import {
    Nav, NavItem, NavLink, TabContent, TabPane,
} from 'reactstrap';
import classnames from 'classnames';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import CompPanel from "./CompPanel";
import Panel from "../../../shared/components/Panel";

class CompControl extends PureComponent {
    static propTypes = {
        t: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
            activeTab: '1',
        };
    }

    toggle = (tab) => {
        const { activeTab } = this.state;
        if (activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    };

    render() {
        const { t } = this.props;
        const { activeTab } = this.state;

        return (
            <Panel
                xl={4}
                lg={12}
                title={t('dashboard.comp_control')}
            >
                        <div className="tabs">
                            <div className="tabs__wrap">
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '1' })}
                                            onClick={() => {
                                                this.toggle('1');
                                            }}
                                        >
                                            Values
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '2' })}
                                            onClick={() => {
                                                this.toggle('2');
                                            }}
                                        >
                                            Cost
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <CompPanel/>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <CompPanel/>
                                    </TabPane>
                                </TabContent>
                            </div>
                        </div>
            </Panel>
        );
    }
}

export default withTranslation('common')(CompControl);
