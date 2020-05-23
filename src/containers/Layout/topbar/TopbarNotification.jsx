/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import NotificationsIcon from 'mdi-react/NotificationsIcon';
import Modal from '../../../../src/shared/components/Modal';
import {buildModalMessage} from '../../../../src/logic/alertManager';

export default class TopbarNotification extends PureComponent {
    state = {
        collapse: false,
        modal: false,
        modalMessage: '',
    };

    toggle = () => {
        this.setState(prevState => ({ collapse: !prevState.collapse }));
    };

    modalToggle(notification) {
        this.setState(prevState => (
            {
                modal: !prevState.modal,
                modalMessage: notification ? buildModalMessage(notification) : ''

            }));
    }

    removeAlert = (notification) => {
        this.props.dismissAlert(notification.id);
        this.modalToggle(notification);
    }

    render() {
        const { alert, location } = this.props;
        const alerts = alert.alerts;

        //avoid state mutation
        const clonedAlerts = alerts.slice();
        clonedAlerts.reverse();

        const { collapse } = this.state;
        const newNotificationClass = alerts.length > 0 ? "topbar__btn topbar__btn--new" : "topbar__btn";
        return (
            <div className="topbar__collapse">
                <button className={newNotificationClass} type="button" onClick={this.toggle}>
                    <NotificationsIcon />
                    <div className="topbar__btn-new-label">
                        <div/>
                    </div>
                </button>
                {collapse && <button className="topbar__back" type="button" onClick={this.toggle} />}
                <Collapse
                    isOpen={collapse}
                    className="topbar__collapse-content"
                >
                    <div className="topbar__collapse-title-wrap">
                        <p className="topbar__collapse-title">Notifications</p>
                    </div>
                    {clonedAlerts.map((notification, index) => (
                        <div className="topbar__collapse-item" key={index} onClick={() => this.removeAlert(notification)}>
                            <div className="topbar__collapse-img-wrap">
                                <img className="topbar__collapse-img" src={notification.ava} alt="" />
                            </div>
                            <p className="topbar__collapse-message">
                                <span className="topbar__collapse-name">{location}</span>&nbsp;|&nbsp;
                                <span className="topbar__collapse-name">{notification.name}</span>&nbsp;|&nbsp;
                                <span className="topbar__collapse-name-reading">{notification.reading}</span>
                            </p>
                            <p className="topbar__collapse-date">{notification.date}</p>
                        </div>
                    ))}
                    <Modal
                        color="danger"
                        title="Threshold Breached"
                        colored
                        showModal={this.state.modal}
                        modalToggle={this.modalToggle.bind(this)}
                        message={this.state.modalMessage}
                    />
                    <Link className="topbar__collapse-link" to="/alerts" onClick={this.toggle}>
                        See all notifications
                    </Link>
                </Collapse>
            </div>
        );
    }
}
