/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Notifications from '../Notifications';

export const evenNotificationClass = idx => (idx % 2 === 1 ? ' bg-gray' : '');

const NavLinkItem = ({
	linkText,
	linkRoute,
	icon,
	haspopup,
	notifications,
	newNotification,
}) => {
	const [unreadNotifications, setUnreadNotifications] = useState([]);

	useEffect(() => {
		if (notifications && notifications.data) {
			setUnreadNotifications(
				notifications.data.filter(
					notification => notification.isRead === false,
				),
			);
		}
	}, [notifications]);

	useEffect(() => {
		if (newNotification && notifications) {
			const findNotification = unreadNotifications.some(
				el => el.id === newNotification.id,
			);
			if (!findNotification) {
				setUnreadNotifications(prevNotifications => [
					...prevNotifications,
					newNotification,
				]);
			}
		}
	}, [newNotification]);

	useEffect(() => {}, [unreadNotifications]);

	return (
		<li className='nav-item mx-0 mx-md-3'>
			<NavLink
				{...{
					className: `nav-link${haspopup ? ' text-light' : ''}`,
					to: linkRoute,
					...(haspopup && {
						id: 'navbarDropdown',
						role: 'button',
						'data-toggle': 'dropdown',
						'aria-haspopup': 'true',
						'aria-expanded': 'false',
					}),
				}}
			>
				{icon && icon !== ';)' ? (
					<>
						<div data-testid='fa-icon' className={`fa fa-${icon}`}>
							{!!unreadNotifications.length && (
								<span className='notification-number'>
									{unreadNotifications.length}
								</span>
							)}
						</div>
						<span className='pl-2'>{linkText}</span>
					</>
				) : (
					linkText
				)}
			</NavLink>
			{haspopup && (
				<Notifications
					clearNotification={setUnreadNotifications}
					notifications={unreadNotifications.reverse()}
				/>
			)}
		</li>
	);
};

NavLinkItem.propTypes = {
	linkText: PropTypes.string.isRequired,
	linkRoute: PropTypes.string,
	icon: PropTypes.string,
	haspopup: PropTypes.bool,
	notifications: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	newNotification: PropTypes.object,
};

NavLinkItem.defaultProps = {
	linkRoute: '#',
	haspopup: false,
	icon: ';)',
	notifications: null,
	newNotification: null,
};

const mapStateToProps = state => ({
	allAsReadState: state.markAllNotificationsAsReadState,
	notifications: state.notificationState.data,
	newNotification: state.updateNotificationState.newNotification,
});

export default connect(mapStateToProps)(NavLinkItem);
