/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { notification } from '../store/actions/notificationAction';
import { formatToTime } from '../lib/time';
import markAllNotificationsAsReadAction from '../store/actions/notifications/markAllNotificationsAsReadAction';

export const evenNotificationClass = idx => (idx % 2 === 1 ? ' bg-gray' : '');

export class Notifications extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		const { props } = this;
		props.notification();
	}

	handleRedirect(id) {
		const { history } = this.props;
		history.push(`/request/${id}`);
		// return <Redirect to={`/request/${id}`} />
		// window.location.replace(`/request/${id}`);
	}

	render() {
		const notifTypes = {
			new_request: { title: 'New request' },
			new_comment: { title: 'New comment on request' },
			request_approved_or_rejected: { title: 'Request Approved/Rejected' },
			edited_request: { title: 'Request edited' },
		};
		const { props } = this;
		const { markAllAsRead, notifications, clearNotification } = props;
		return (
			<div>
				<ul className='dropdown-menu notification'>
					<li className='notification-header'>
						<div className='row'>
							<div className='text-light col-lg-12 col-sm-12 col-12'>
								{notifications.length ? (
									<a
										href='#!'
										onClick={() => {
											markAllAsRead();
											clearNotification([]);
										}}
										className='float-right text-light'
									>
										Mark all as read
									</a>
								) : (
									<span>No unread notifications</span>
								)}
							</div>
						</div>
					</li>
					{notifications && (
						<li>
							<ul className='notifications-list'>
								{notifications.map((notificationItem, idx) => (
									// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
									<li
										style={{ cursor: 'pointer' }}
										data-testid='notification'
										className={`notification-box${evenNotificationClass(idx)}`}
										key={notificationItem.id}
										onClick={() => this.handleRedirect(notificationItem.id)}
									>
										<div className='row'>
											<div className='col-lg-12 col-sm-12 col-12'>
												<div>
													<strong className='text-primary'>
														{notifTypes[notificationItem.type].title}
													</strong>
													<p>{notificationItem.messages}</p>
												</div>
												<small className='text-warning'>
													{formatToTime(notificationItem.createdAt)}
												</small>
											</div>
										</div>
									</li>
								))}
							</ul>
						</li>
					)}
				</ul>
			</div>
		);
	}
}

Notifications.propTypes = {
	notifications: propTypes.arrayOf(propTypes.any).isRequired,
	notification: propTypes.func.isRequired,
	markAllAsRead: propTypes.func.isRequired,
	clearNotification: propTypes.func.isRequired,
	history: propTypes.shape({
		push: propTypes.func.isRequired,
	}).isRequired,
};

const mapDispatchToProps = {
	notification,
	markAllAsRead: markAllNotificationsAsReadAction,
};

export default withRouter(connect(null, mapDispatchToProps)(Notifications));
