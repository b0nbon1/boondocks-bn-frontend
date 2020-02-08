/* eslint-disable react/no-array-index-key */
import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import Logout from './auth/Logout';

/**
 * UserAccount
 * @param items
 * @returns {*}
 * @constructor
 */
const UserAccount = ({ items }) => (
	<li
		data-testid='user-account'
		className='nav-item user-account mx-0 mx-md-3 active'
	>
		<div
			className='nav-link dropdown-toggle'
			data-toggle='dropdown'
			role='button'
			aria-haspopup='true'
			aria-expanded='false'
		>
			<span>Account</span>
			<div className='user-avatar'>{localStorage.name_initials}</div>
		</div>
		<div className='dropdown-menu'>
			{items.map((item, idx) => (
				<Link key={idx} className='dropdown-item' to={item.linkRoute}>
					{item.linkText}
				</Link>
			))}
			<Logout />
		</div>
	</li>
);

UserAccount.propTypes = {
	items: PropTypes.array.isRequired,
};

export default UserAccount;
