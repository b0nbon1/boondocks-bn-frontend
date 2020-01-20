/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Notifications } from "../Notifications";
import Notifications from '../Notifications';

export const NavLinkItem = ({
	linkText,
	linkRoute,
	icon,
	haspopup,
	notifications,
}) => {
	const [unreadNotifications, setUnreadNotifications] = useState([]);

	useEffect(() => {
		if (notifications !== null) {
			setUnreadNotifications(
				notifications.data.filter(
					notification => notification.isRead === false,
				),
			);
		}
	}, [notifications]);

	useEffect(() => {}, [unreadNotifications]);

	return (
		<li className='nav-item mx-0 mx-md-3' data-testid='nav-link-item'>
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
							{unreadNotifications.length ? (
								<span className='notification-number'>
									{unreadNotifications.length}
								</span>
							) : (
								<div data-testid='no-unread-notifications' />
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
					notifications={unreadNotifications}
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
	notifications: PropTypes.object,
};

NavLinkItem.defaultProps = {
	linkRoute: '#',
	haspopup: false,
	icon: ';)',
	notifications: null,
};

export const mapStateToProps = ({ notificationState: { data } }) => ({
	notifications: data,
});

export default connect(mapStateToProps)(NavLinkItem);
