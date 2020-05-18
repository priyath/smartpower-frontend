/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import NotificationsIcon from 'mdi-react/NotificationsIcon';

export default class TopbarNotification extends PureComponent {
    state = {
        collapse: false,
    };

    toggle = () => {
        this.setState(prevState => ({ collapse: !prevState.collapse }));
    };

    removeNotification = () => {
        console.log('removing notification');
    }

    render() {
        const { notifications } = this.props.alert;
        const { collapse } = this.state;
        return (
            <div className="topbar__collapse">
                <button className="topbar__btn" type="button" onClick={this.toggle}>
                    <NotificationsIcon />
                </button>
                {collapse && <button className="topbar__back" type="button" onClick={this.toggle} />}
                <Collapse
                    isOpen={collapse}
                    className="topbar__collapse-content"
                >
                >
                    <div className="topbar__collapse-title-wrap">
                        <p className="topbar__collapse-title">Notifications</p>
                        <button className="topbar__collapse-button" type="button">Mark all as read</button>
                    </div>
                    {notifications.map((notification, index) => (
                        <div className="topbar__collapse-item" key={index} onClick={this.removeNotification}>
                            <div className="topbar__collapse-img-wrap">
                                <img className="topbar__collapse-img" src={notification.ava} alt="" />
                            </div>
                            <p className="topbar__collapse-message">
                                <span className="topbar__collapse-name">{notification.name}</span>
                                {notification.message}
                            </p>
                            <p className="topbar__collapse-date">{notification.date}</p>
                        </div>
                    ))}
                    <Link className="topbar__collapse-link" to="/dashboard" onClick={this.toggle}>
                        See all notifications
                    </Link>
                </Collapse>
            </div>
        );
    }
}
